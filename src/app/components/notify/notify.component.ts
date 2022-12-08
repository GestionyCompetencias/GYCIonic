import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { DataService } from 'src/app/services/data.service';
import { Platform, NavController } from '@ionic/angular';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss'],
})
export class NotifyComponent implements OnInit {

  cantidad = 0;
  notifications: any[] = [];

  constructor(private dataServ: DataService,
              private storage: Storage,
              private plt: Platform,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.storage.create();
    this.getNotifications();
  }

  async getNotifications(){
    const rut = await this.storage.get('rut_log');
    const token = await this.storage.get('_token');
    this.dataServ.getNotificaciones(rut, token).subscribe(resp => {
      if(resp.respuesta.data2 != null){
        let cont = 0;
        this.notifications = resp.respuesta.data2;
        this.notifications.forEach( item => {
          if(!item.VISTO){
            cont++;
          }
        });
        this.cantidad = cont;
      }else{
        this.cantidad = 0;
      }
    });
  }

  loadNotificaciones(){
    this.navCtrl.navigateForward('/notificaciones');
  }

}
