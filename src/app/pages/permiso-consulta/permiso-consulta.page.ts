import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalInfoSolicitudPermisoPage } from '../modal-info-solicitud-permiso/modal-info-solicitud-permiso.page';
import { DataService } from 'src/app/services/data.service';
import { IonAccordionGroup, LoadingController, ModalController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-permiso-consulta',
  templateUrl: './permiso-consulta.page.html',
  styleUrls: ['./permiso-consulta.page.scss'],
})
export class PermisoConsultaPage implements OnInit {
  @ViewChild(IonAccordionGroup) accordiongruop: IonAccordionGroup;

  fechaInicio: Date = new Date();
  fechaTermino: Date = new Date();

  solicitudes: any[] = [];

  solicitudesTemp: number;

  token: string;

  dataSolicitud = {
    user: '',
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
    this.loadInfoUSer();
    this.solicitudesTemp = 999;
  }

  initDates(){
    const primerDia = new Date(this.fechaInicio.getFullYear(), this.fechaInicio.getMonth(), 1);
    let mes = ''+(primerDia.getMonth()+1);
    mes = mes.length > 1 ? mes : '0'+mes;
    this.dataSolicitud.fecha1 = primerDia.getFullYear()+'-'+mes+'-'+primerDia.getDate();

    const ultimoDia = new Date(this.fechaTermino.getFullYear(), this.fechaTermino.getMonth() + 1, 0);
    let mes2 = ''+(ultimoDia.getMonth()+1);
    mes2 = mes2.length > 1 ? mes2 : '0'+mes2;
    this.dataSolicitud.fecha2 = ultimoDia.getFullYear()+'-'+mes2+'-'+ultimoDia.getDate();
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando Permisos...',
    });
    await loading.present();
  }

  async loadInfoUSer(){
    this.dataSolicitud.rut = await this.storage.get('rut');
    this.token = await this.storage.get('token');
    this.dataServ.getInfoPersonal(this.dataSolicitud.rut, this.token).subscribe( resp => {
      this.dataSolicitud.user = resp.respuesta.data2.apaterno;
      this.dataSolicitud.user += ' '+resp.respuesta.data2.amaterno;
      this.dataSolicitud.user += ' '+resp.respuesta.data2.nombre;
    });
  }

  async onSubmitFind(){
    this.presentLoading();
    this.closeAccordion(); 
    this.dataServ.getInfoPermisos(this.dataSolicitud, this.token).subscribe( resp => {
      this.loadingCtrl.dismiss();
      console.log(resp);
      this.solicitudes = resp.respuesta.data2;
      this.solicitudesTemp = resp.respuesta.data2.length;
      console.log( this.solicitudes );
    });
  }

  async detail(item){
    console.log( item );
    const modal = await this.modalCtrl.create({
      component: ModalInfoSolicitudPermisoPage,
      componentProps: item
    });

    await modal.present();
  }

  cambioFechaInicio( event ){
    const fecha1 = new Date( event.detail.value );
    const primerDia = new Date(fecha1.getFullYear(), fecha1.getMonth(), 1);
    let mes = ''+(primerDia.getMonth()+1);
    mes = mes.length > 1 ? mes : '0'+mes;
    this.dataSolicitud.fecha1 = primerDia.getFullYear()+'-'+mes+'-'+primerDia.getDate();
    console.log(this.dataSolicitud.fecha1);
  }

  cambioFechaTermino( event ){
    const fecha2 = new Date( event.detail.value );
    const ultimoDia = new Date(fecha2.getFullYear(), fecha2.getMonth() + 1, 0);
    let mes = ''+(ultimoDia.getMonth()+1);
    mes = mes.length > 1 ? mes : '0'+mes;
    this.dataSolicitud.fecha2 = ultimoDia.getFullYear()+'-'+mes+'-'+ultimoDia.getDate();
    console.log(this.dataSolicitud.fecha2);
  }

  closeAccordion(){
    this.accordiongruop.value = '';
  }

}
