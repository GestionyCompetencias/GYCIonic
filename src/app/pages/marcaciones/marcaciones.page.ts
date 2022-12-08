import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { DataService } from 'src/app/services/data.service';
import { IonAccordionGroup, LoadingController, ModalController, Platform } from '@ionic/angular';
import { ModalInfoMarcacionesPage } from '../modal-info-marcaciones/modal-info-marcaciones.page';

@Component({
  selector: 'app-marcaciones',
  templateUrl: './marcaciones.page.html',
  styleUrls: ['./marcaciones.page.scss'],
})
export class MarcacionesPage implements OnInit {

  @ViewChild(IonAccordionGroup) accordiongruop: IonAccordionGroup;

  fechaInicio: Date = new Date();
  fechaTermino: Date = new Date();

  datetimeValue: String;

  marcaciones: any[] = [];
  totalMarcaciones: number;

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
    this.totalMarcaciones = 9999;
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
      message: 'Cargando Marcaciones...',
    });
    await loading.present();
  }

  async buscarMarcaciones(){
    this.presentLoading();
    this.dataFind.rut = await this.storage.get('rut');
    this.token = await this.storage.get('token');

    console.log(this.dataFind);
    this.closeAccordion();

    this.dataServ.getInfoMarcacion( this.dataFind, this.token ).subscribe( resp => {
      this.loadingCtrl.dismiss();
      console.log(resp);
      this.marcaciones = resp.respuesta.data2;
      this.totalMarcaciones = resp.respuesta.data2.length;
      console.log(this.marcaciones);
    });

  }

  async detail( item ){
    console.log( item );

    const modal = await this.modalCtrl.create({
      component: ModalInfoMarcacionesPage,
      componentProps: item
    });

    await modal.present();
  }

  cambioFechaInicio( event ){
    const fecha1 = new Date( event.detail.value );
    let mes = ''+(fecha1.getMonth()+1);
    mes = mes.length > 1 ? mes : '0'+mes;
    this.dataFind.fecha1 = fecha1.getFullYear()+'-'+mes+'-'+fecha1.getDate();
    this.datetimeValue = fecha1.getFullYear()+'-'+mes+'-'+fecha1.getDate();
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
