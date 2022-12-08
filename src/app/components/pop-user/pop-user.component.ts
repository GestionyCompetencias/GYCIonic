import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController, AlertController } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-pop-user',
  templateUrl: './pop-user.component.html',
  styleUrls: ['./pop-user.component.scss'],
})
export class PopUserComponent implements OnInit {

  constructor(private popoverCtrl: PopoverController,
              private navCtrl: NavController,
              private loginServ: LoginService,
              private alertCtrl: AlertController) { }

  ngOnInit() {}

  navClick( navOpc: string )
  {
    this.popoverCtrl.dismiss({
      item: navOpc
    });

    if (navOpc === 'profile') {
      this.navCtrl.navigateForward('/personal-info');
    }
    if (navOpc === 'updatepass') {
      this.navCtrl.navigateForward('/cambio-clave');
    }
    if (navOpc === 'logout') {
      this.presentAlert('¿Está seguro que desea cerrar su sesión?', 'Advertencia');
    }
  }

  async presentAlert(message: string, title: string) {
    const alert = await this.alertCtrl.create({
      subHeader: title,
      message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Logout Ok');
            this.loginServ.logout();
            this.navCtrl.navigateRoot('/');
          }
        }
      ]
    });

    await alert.present();
  }

}
