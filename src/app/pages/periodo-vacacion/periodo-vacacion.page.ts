import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { DataService } from 'src/app/services/data.service';
import { LoadingController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-periodo-vacacion',
  templateUrl: './periodo-vacacion.page.html',
  styleUrls: ['./periodo-vacacion.page.scss'],
})
export class PeriodoVacacionPage implements OnInit {

  rut: string;
  token: string;
  trabajador: string;

  periodos: any[] = [];

  constructor(private dataServ: DataService,
              private storage: Storage,
              private loadingCtrl: LoadingController,
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

    this.dataServ.getInfoPeriodos(this.rut, this.token).subscribe( resp => {
      this.loadingCtrl.dismiss();
      this.periodos = resp.respuesta.data2;
      console.log( resp );
    });
  }
}
