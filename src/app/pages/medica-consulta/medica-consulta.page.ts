import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalInfoLicenciasPage } from '../modal-info-licencias/modal-info-licencias.page';
import { DataService } from 'src/app/services/data.service';
import { LoadingController, Platform, ModalController, AlertController, IonAccordionGroup } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-medica-consulta',
  templateUrl: './medica-consulta.page.html',
  styleUrls: ['./medica-consulta.page.scss'],
})
export class MedicaConsultaPage implements OnInit {

  @ViewChild(IonAccordionGroup) accordiongruop: IonAccordionGroup;


  fechaInicio: Date = new Date();
  fechaTermino: Date = new Date();

  licencias: any[] = [];

  dataFind = {
    rut: '',
    user: '',
    fecha1: '',
    fecha2: ''
  };

  token: string;

  constructor(private dataServ: DataService,
              private loadingCtrl: LoadingController,
              private plt: Platform,
              private storage: Storage,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.storage.create();
    this.initDates();
    this.loadInfoUSer();
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
      message: 'Cargando Licencias...',
    });
    await loading.present();
  }

  async loadInfoUSer(){
    this.dataFind.rut = await this.storage.get('rut');
    this.token = await this.storage.get('token');

    if (this.plt.is('cordova')) {
      this.dataServ.getInfoPersonalNative(this.dataFind.rut, this.token).then( resp => {
        const data = JSON.parse(resp.data);
        this.dataFind.user = data.respuesta.data2.apaterno;
        this.dataFind.user += ' '+data.respuesta.data2.amaterno;
        this.dataFind.user += ' '+data.respuesta.data2.nombre;
      });
    } else {
      this.dataServ.getInfoPersonal(this.dataFind.rut, this.token).subscribe( resp => {
        this.dataFind.user = resp.respuesta.data2.apaterno;
        this.dataFind.user += ' '+resp.respuesta.data2.amaterno;
        this.dataFind.user += ' '+resp.respuesta.data2.nombre;
      });
    }
  }

  onSubmitFind(){
    this.presentLoading();
    this.closeAccordion();
    /* if (this.plt.is('cordova')) {
      this.dataServ.getInfoLicenciaMedicaNative(this.dataFind, this.token).then( resp => {
        this.loadingCtrl.dismiss();
        const data = JSON.parse(resp.data);
        if(data.respuesta.data2 !== null){
          this.licencias = data.respuesta.data2;
        }else{
          this.presentAlert('Usted no posee licencias medicas registradas para el periodo de tiempo seleccionado.');
        }
        console.log(this.licencias);
      });
    } else { */
      this.dataServ.getInfoLicenciaMedica(this.dataFind, this.token).subscribe( resp => {
        this.loadingCtrl.dismiss();
        console.log(resp);
        if(resp.respuesta.data2 !== null){
          this.licencias = resp.respuesta.data2;
        }else{
          this.licencias = null;
          //this.presentAlert('Usted no posee licencias medicas registradas para el periodo de tiempo seleccionado.');
        }
        console.log(this.licencias);
      });
    /* } */
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

  async detail( item ){
    console.log( item );
    const modal = await this.modalCtrl.create({
      component: ModalInfoLicenciasPage,
      componentProps: item
    });

    await modal.present();
  }

  async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message,
      buttons: ['Ok']
    });

    await alert.present();
  }

  closeAccordion(){
    this.accordiongruop.value = '';
  }

}
