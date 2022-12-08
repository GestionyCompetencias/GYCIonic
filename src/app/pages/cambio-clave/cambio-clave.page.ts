import { Component, OnInit } from '@angular/core';
import { AlertController, Platform, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-cambio-clave',
  templateUrl: './cambio-clave.page.html',
  styleUrls: ['./cambio-clave.page.scss'],
})
export class CambioClavePage implements OnInit {

  dataPass =  {
    rut: '',
    old: '',
    new: '',
    conf: ''
  };
  token: string;
  password: string;

  constructor(private alertCtrl: AlertController,
              private storage: Storage,
              private plt: Platform,
              private navCtrl: NavController,
              private loginServ: LoginService) { }

  ngOnInit() {
    this.storage.create();
  }

  async sendPass()
  {
    this.dataPass.rut = await this.storage.get('rut');
    this.token = await this.storage.get('token');
    this.password = await this.storage.get('pass');

    if (this.dataPass.old !== this.password) {
      this.presentAlert('La contraseña actual no coincide con la que ha ingresado.', 'Validación');
      return;
    }

    if(this.dataPass.new.length < 6){
      this.presentAlert('La contraseña debe contener un minimo de 6 caracteres.', 'Validación');
      return;
    }

    if(this.dataPass.new !== this.dataPass.conf){
      this.presentAlert('No conciden las contraseñas para su confirmación.', 'Validación');
      return;
    }

    /* if(this.plt.is('cordova')){
      this.loginServ.changePassNative(this.dataPass, this.token).then( resp => {
        const data = JSON.parse(resp.data);
        const message = data.respuesta.message;
        const band = (data.respuesta.result == 0)? false : true;
        this.presentAlert(message, 'Notificación', band);
      });
    }else{ */
      this.loginServ.changePass(this.dataPass, this.token).subscribe( resp => {
        const message = resp.respuesta.message;
        console.log(resp);
        const band = (resp.respuesta.result === 0)? false : true;
        if(message === 'Ok' || message === 'ok' || message === 'OK'){
          this.presentAlert("La contraseña ha sido cambiada satisfactoriamente.", 'Notificación', band);
        }
      }, error => {
        this.presentAlert(error.error, 'Notificacion');
      });
    //}

  }

  async presentAlert(message: string, title: string, action: boolean = false) {
    const alert = await this.alertCtrl.create({
      subHeader: title,
      message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Boton Ok');
            if(action){
              this.navCtrl.navigateRoot('/setting');
            }
          }
        }
      ]
    });

    await alert.present();
  }

}
