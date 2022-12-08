import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { LoadingController, AlertController, NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-compensacion',
  templateUrl: './compensacion.page.html',
  styleUrls: ['./compensacion.page.scss'],
})
export class CompensacionPage implements OnInit {

  rut: string;
  dias: number;
  idsol: any;
  trabajador: string;
  token: string;

  solicitud: any[] = [];

  constructor(private dataServ: DataService,
              private loadingCtrl: LoadingController,
              private storage: Storage,
              private alertCtrl: AlertController,
              private navCtrl: NavController,
              private plt: Platform) { }

  ngOnInit() {
    this.storage.create();
  }



  async onClickCargar(){
    if(this.dias === undefined || this.dias.toString() === '' || this.dias === 0){
      this.presentAlert('Ingrese el numero de días por favor.', 'Error');
      return;
    }
    this.rut = await this.storage.get('rut');
    this.token = await this.storage.get('token');

    this.presentLoading('Cargando Solicitud...');

    this.dataServ.sendSolicitudCompensacion(this.rut, this.dias, this.token).subscribe( resp => {
      this.loadingCtrl.dismiss();
      console.log(resp);
      this.loadInfoUSer(this.rut, this.token);
      if (resp.respuesta.data2 !== null) {
        this.solicitud = resp.respuesta.data2;
        this.idsol = resp.respuesta.data2[0].idsolicitud;
      } else {
        this.presentAlert(resp.respuesta.message, 'Alert');
      }
    });
    console.log('cargar');
  }

  solicitarCompensacion(){
    this.presentLoading('Enviando Solicitud');
    this.dataServ.confirmSolicitud(this.rut, this.idsol, this.token).subscribe( resp => {
      this.loadingCtrl.dismiss();
      console.log(resp);
      this.presentAlert(resp.respuesta.message, 'Notificación', true);
    });
  }

  async presentLoading(message) {
    const loading = await this.loadingCtrl.create({
      message,
    });
    await loading.present();
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
              this.navCtrl.navigateForward('/home');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async loadInfoUSer(rut: string, token: string){
    this.dataServ.getInfoPersonal(rut, token).subscribe( resp => {
      this.trabajador = resp.respuesta.data2.apaterno;
      this.trabajador += ' '+resp.respuesta.data2.amaterno;
      this.trabajador += ' '+resp.respuesta.data2.nombre;
    });
  }

}
