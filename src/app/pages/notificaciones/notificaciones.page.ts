import { Component, OnInit } from '@angular/core';
import { ModalInfoNotificacionPage } from '../modal-info-notificacion/modal-info-notificacion.page';
import { DataService } from 'src/app/services/data.service';
import { Storage } from '@ionic/storage-angular';
import { LoadingController, ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {

  rut: string;
  token: string;
  notifications: any[] = [];

  constructor(private dataServ: DataService,
              private storage: Storage,
              private modalCtrl: ModalController,
              private plt: Platform,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.storage.create();
    this.loadNotifications();
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando Notificaciones...',
    });
    await loading.present();
  }

  async loadNotifications(){
    this.presentLoading();
    this.rut = await this.storage.get('rut');
    this.token = await this.storage.get('token');
    this.dataServ.getNotificaciones(this.rut, this.token).subscribe( resp => {
      this.loadingCtrl.dismiss();
      console.log(resp);
      this.notifications = resp.respuesta.data2;
    });
  }

  async detail( item ){
    console.log( item );
    const modal = await this.modalCtrl.create({
      component: ModalInfoNotificacionPage,
      componentProps: {
        TIPO: item.TIPO,
        FECHA: item.FECHA,
        OBSERVACION: item.OBSERVACION
      }
    });

    await modal.present();
  }

  checkRead( item ){
    console.log('leido check');
  }

  checkReadAll(){
    console.log('todos leidos');
  }

}
