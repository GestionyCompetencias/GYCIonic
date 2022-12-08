import { Component, OnInit } from '@angular/core';
import { ModalInfoCuentaPage } from '../modal-info-cuenta/modal-info-cuenta.page';
import { DataService } from 'src/app/services/data.service';
import { Storage } from '@ionic/storage-angular';
import { LoadingController, ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {

  rut: string;
  token: string;
  trabajador: string;

  cuenta: any[] = [];

  constructor(private dataServ: DataService,
              private storage: Storage,
              private loadingCtrl: LoadingController,
              private modalCtrl: ModalController,
              private plt: Platform) { }

  ngOnInit() {
    this.presentLoading();
    this.storage.create();
    this.loadInfoPage();
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargado información...',
    });
    await loading.present();
  }

  async loadInfoPage(){
    this.rut = await this.storage.get('rut');
    this.token = await this.storage.get('token');

    this.dataServ.getInfoPersonal(this.rut, this.token).subscribe( resp => {
      this.trabajador = resp.respuesta.data2.apaterno;
      this.trabajador += ' '+resp.respuesta.data2.amaterno;
      this.trabajador += ' '+resp.respuesta.data2.nombre;
    });

    this.dataServ.getInfoCtaCorriente(this.rut, this.token).subscribe( resp => {
      this.loadingCtrl.dismiss();
      console.log(resp);
      this.cuenta = resp.respuesta.data2;
      console.log("cuenta", this.cuenta );
    });
  }

  async detail( item ){
    console.log(item);
    const modal = await this.modalCtrl.create({
      component: ModalInfoCuentaPage,
      componentProps: item
    });

    await modal.present();
  }

}
