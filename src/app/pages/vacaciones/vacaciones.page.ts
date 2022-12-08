import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { DataService } from 'src/app/services/data.service';
import { LoadingController, AlertController, Platform, NavController, IonAccordionGroup } from '@ionic/angular';

@Component({
  selector: 'app-vacaciones',
  templateUrl: './vacaciones.page.html',
  styleUrls: ['./vacaciones.page.scss'],
})
export class VacacionesPage implements OnInit {

  @ViewChild(IonAccordionGroup) accordiongruop: IonAccordionGroup;

  fechaInicio: Date = new Date();
  fechaTermino: Date = new Date();

  dataSolicitud = {
    rut: '',
    fecha1: '',
    fecha2: '',
    idsol: 0
  };

  token: string;
  trabajador: string;

  solicitud: any[] = [];

  constructor(private dataServ: DataService,
              private storage: Storage,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController,
              private plt: Platform,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.storage.create();
    this.initDates();
  }

  async loadInfoUSer(){
    this.dataSolicitud.rut = await this.storage.get('rut');
    this.token = await this.storage.get('token');
    this.dataServ.getInfoPersonal(this.dataSolicitud.rut, this.token).subscribe( resp => {
      this.trabajador = resp.respuesta.data2.apaterno;
      this.trabajador += ' '+resp.respuesta.data2.amaterno;
      this.trabajador += ' '+resp.respuesta.data2.nombre;
    });

  }

  initDates(){
    let mes = ''+(this.fechaInicio.getMonth()+1);
    mes = mes.length > 1 ? mes : '0'+mes;
    this.dataSolicitud.fecha1 = this.fechaInicio.getFullYear()+'-'+mes+'-'+this.fechaInicio.getDate();

    let mes2 = ''+(this.fechaTermino.getMonth()+1);
    mes2 = mes2.length > 1 ? mes2 : '0'+mes2;
    this.dataSolicitud.fecha2 = this.fechaTermino.getFullYear()+'-'+mes2+'-'+this.fechaTermino.getDate();
  }

  async presentLoading(message) {
    const loading = await this.loadingCtrl.create({
      message,
    });
    await loading.present();
  }

  async onClickCargar(){
    this.presentLoading('Generando Solicitud');
    this.dataSolicitud.rut = await this.storage.get('rut');
    this.token = await this.storage.get('token');
    console.log('Data', this.dataSolicitud);
    this.closeAccordion();
    this.dataServ.sendSolicitudVacaciones(this.dataSolicitud, this.token).subscribe( resp => {
      this.loadingCtrl.dismiss();
      this.loadInfoUSer();
      console.log(resp);
      if (resp.respuesta.data2 !== null) {
        this.solicitud = resp.respuesta.data2;
        this.dataSolicitud.idsol = this.solicitud[0].idsolicitud;
        console.log(this.solicitud[0]);
      } else {
        this.presentAlert(resp.respuesta.message, 'Alert');
      }
    });
  }

  solicitarVacaciones(){
    this.presentLoading('Enviando Solicitud');
    this.dataServ.confirmSolicitud(this.dataSolicitud.rut, this.dataSolicitud.idsol, this.token).subscribe( resp => {
      this.loadingCtrl.dismiss();
      console.log(resp);
      this.presentAlert(resp.respuesta.message, 'Notificación', true);
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

  async presentAlert(message: string, title: string, action: boolean = false) {
    const alert = await this.alertCtrl.create({
      subHeader: title,
      message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Boton Ok');
            if(action){
              this.navCtrl.navigateForward('/home-app');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  closeAccordion(){
    this.accordiongruop.value = '';
  }

}
