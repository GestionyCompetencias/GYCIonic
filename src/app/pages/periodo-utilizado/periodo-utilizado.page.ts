import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { DataService } from 'src/app/services/data.service';
import { LoadingController, ModalController, Platform } from '@ionic/angular';
import { ModalInfoUsadosPage } from '../modal-info-usados/modal-info-usados.page';

@Component({
  selector: 'app-periodo-utilizado',
  templateUrl: './periodo-utilizado.page.html',
  styleUrls: ['./periodo-utilizado.page.scss'],
})
export class PeriodoUtilizadoPage implements OnInit {

  rut: string;
  token: string;
  trabajador: string;

  periodos: any[] = [];

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
      message: 'Cargando información...',
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

    this.dataServ.getInfoUtilizados(this.rut, this.token).subscribe( resp => {
      this.loadingCtrl.dismiss();
      console.log(resp);
      this.periodos = resp.respuesta.data2;
      console.log( this.periodos );
    });
  }

  async detail( item ){
    console.log( item );
    const modal = await this.modalCtrl.create({
      component: ModalInfoUsadosPage,
      componentProps: item
    });

    await modal.present();
  }

}
