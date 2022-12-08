import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { DataService } from 'src/app/services/data.service';
import { IonAccordionGroup, LoadingController, ModalController, Platform } from '@ionic/angular';
import { ModalInfoAsistenciasPage } from '../modal-info-asistencias/modal-info-asistencias.page';

@Component({
  selector: 'app-registro-asistencia',
  templateUrl: './registro-asistencia.page.html',
  styleUrls: ['./registro-asistencia.page.scss'],
})
export class RegistroAsistenciaPage implements OnInit {

  @ViewChild(IonAccordionGroup) accordiongruop: IonAccordionGroup;

  fechaInicio: Date = new Date();
  fechaTermino: Date = new Date();

  asistencias: any[] = [];
  cabezera: any;

  token: string;

  dataFind =  {
    rut: '',
    fecha1: '',
    fecha2: ''
  };

  constructor(private storage: Storage,
              private dataServ: DataService,
              private loadingCtrl: LoadingController,
              private modalCtrl: ModalController,
              private plt: Platform) { }

  ngOnInit() {
    this.storage.create();
    this.initDates();
  }

  initDates(){
    let mes = ''+(this.fechaInicio.getMonth()+1);
    mes = mes.length > 1 ? mes : '0'+mes;
    this.dataFind.fecha1 = this.fechaInicio.getFullYear()+'-'+mes+'-'+this.fechaInicio.getDate();

    let mes2 = ''+(this.fechaTermino.getMonth()+1);
    mes2 = mes2.length > 1 ? mes2 : '0'+mes2;
    this.dataFind.fecha2 = this.fechaTermino.getFullYear()+'-'+mes2+'-'+this.fechaTermino.getDate();
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando Información...',
    });
    await loading.present();
  }

  async onClickBuscar(){
    this.presentLoading();
    this.dataFind.rut = await this.storage.get('rut');
    this.token = await this.storage.get('token');

    this.closeAccordion();

    this.dataServ.getInfoAsistencia( this.dataFind, this.token ).subscribe( resp => {
      this.loadingCtrl.dismiss();
      console.log(resp);
      this.cabezera = resp.respuesta.data2.Data.cabezera;
      this.asistencias = resp.respuesta.data2.Data.asistencia;
    });

  }

  async detail( item ){
    console.log( item );
    const modal = await this.modalCtrl.create({
      component: ModalInfoAsistenciasPage,
      componentProps: item
    });

    await modal.present();
  }

  cambioFechaInicio( event ){
    const fecha1 = new Date( event.detail.value );
    let mes = ''+(fecha1.getMonth()+1);
    mes = mes.length > 1 ? mes : '0'+mes;
    this.dataFind.fecha1 = fecha1.getFullYear()+'-'+mes+'-'+fecha1.getDate();
  }

  cambioFechaTermino( event ){
    const fecha2 = new Date( event.detail.value );
    let mes = ''+(fecha2.getMonth()+1);
    mes = mes.length > 1 ? mes : '0'+mes;
    this.dataFind.fecha2 = fecha2.getFullYear()+'-'+mes+'-'+fecha2.getDate();
  }

  closeAccordion(){
    this.accordiongruop.value = '';
  }

}
