import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { AlertController, IonAccordionGroup, LoadingController, NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-permiso-solicitud',
  templateUrl: './permiso-solicitud.page.html',
  styleUrls: ['./permiso-solicitud.page.scss'],
})
export class PermisoSolicitudPage implements OnInit {

  @ViewChild(IonAccordionGroup) accordiongruop: IonAccordionGroup;


  fechaInicio: Date = new Date();
  fechaTermino: Date = new Date();
  horaInicio: Date = new Date();
  horaTermino: Date = new Date();

  dataSolicitud = {
    rut: '',
    user: '',
    fecha1: '',
    hora1: '',
    fecha2: '',
    hora2: '',
    motivo: ''
  };

  token: string;

  motivosOpc: any[] = [];

  customActionSheetOptions: any = {
    header: 'Motivos',
    subHeader: 'Seleccione un Motivo'
  };


  constructor(private storage: Storage,
              private dataServ: DataService,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private navCtrl: NavController,
              private plt: Platform) { }

  async ngOnInit() {
    this.storage.create();
    this.dataSolicitud.motivo = '0';
    this.initDates();
    await this.loadInfoUSer();
    await this.motivos();
  }



  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Enviando Solicitud...',
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
            if(action){
              this.ngOnInit();

            }
            console.log('Boton Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  initDates(){
    let mes = ''+(this.fechaInicio.getMonth()+1);
    mes = mes.length > 1 ? mes : '0'+mes;
    this.dataSolicitud.fecha1 = this.fechaInicio.getFullYear()+'-'+mes+'-'+this.fechaInicio.getDate();

    let mes2 = ''+(this.fechaTermino.getMonth()+1);
    mes2 = mes2.length > 1 ? mes2 : '0'+mes2;
    this.dataSolicitud.fecha2 = this.fechaTermino.getFullYear()+'-'+mes2+'-'+this.fechaTermino.getDate();
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

  async motivos(){
    this.dataServ.getMotivos(this.dataSolicitud.rut, this.token).subscribe( resp => {
      console.log('Motivos: ', resp);
      this.motivosOpc = resp.respuesta.data2;
    });
  }

  onSubmitSolicitud(){

    this.closeAccordion();

    if(this.dataSolicitud.hora1  === ''){
      this.presentAlert('Ingrese la hora de incio del permiso solicitado', 'Error');
      return;
    }
    if(this.dataSolicitud.hora2  === ''){
      this.presentAlert('Ingrese la hora de termino del permiso solicitado', 'Error');
      return;
    }
    if(this.dataSolicitud.motivo === '0'){
      this.presentAlert('Seleccionel el motivo del permiso solicitado', 'Error');
      return;
    }

    this.presentLoading();

    console.log(this.dataSolicitud);
    this.dataServ.sendSolicitudPermiso(this.dataSolicitud, this.token).subscribe( resp =>{
      console.log( resp );
      this.loadingCtrl.dismiss();
      this.presentAlert(resp.resultado.message, 'Satisfactorio');
    });
  }

  cambioFechaInicio( event ){
    const fecha1 = new Date( event.detail.value );
    let mes = ''+(fecha1.getMonth()+1);
    mes = mes.length > 1 ? mes : '0'+mes;
    this.dataSolicitud.fecha1 = fecha1.getFullYear()+'-'+mes+'-'+fecha1.getDate();
  }

  cambioFechaTermino( event ){
    const fecha2 = new Date( event.detail.value );
    let mes = ''+(fecha2.getMonth()+1);
    mes = mes.length > 1 ? mes : '0'+mes;
    this.dataSolicitud.fecha2 = fecha2.getFullYear()+'-'+mes+'-'+fecha2.getDate();
  }

  cambioHoraInicio(event){
    const hora1 = new Date( event.detail.value );
    this.dataSolicitud.hora1 = hora1.getHours()+':'+hora1.getMinutes()+':00';
    console.log(this.dataSolicitud.hora1);
  }

  cambioHoraTermino(event){
    const hora2 = new Date( event.detail.value );
    this.dataSolicitud.hora2 = hora2.getHours()+':'+hora2.getMinutes()+':00';
    this.horaInicio = hora2;
    console.log(this.dataSolicitud.hora2);
  }

  closeAccordion(){
    this.accordiongruop.value = '';
  }

}
