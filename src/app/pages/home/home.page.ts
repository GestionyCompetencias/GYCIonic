import { Component, OnInit } from '@angular/core';
import { PopoverController, MenuController, NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { DataService } from 'src/app/services/data.service';
import { PopUserComponent } from '../../components/pop-user/pop-user.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  fechaAct: Date = new Date;
  asistencias: any [] = [];
  permisos: any [] = [];
  totalDescansos = 0;
  totalInasistencias = 0;
  totalPermisos = 0;
  totalLicencias = 0;
  totalVacacion = 0;

  token: string;

  dataFind = {
    rut: '',
    fecha1: '',
    fecha2: '',
  };

  constructor(private popoverCtrl: PopoverController,
              private menuCtrl: MenuController,
              private navCtrl: NavController,
              private dataServ: DataService,
              private storage: Storage,
              private plt: Platform) { }

  async ngOnInit() {
    this.menuCtrl.enable(true);
    this.storage.create();
    await this.loadRut();
    await this.initFechas();
  }

  async loadRut(){
    this.dataFind.rut = await this.storage.get('rut_log');
    this.token = await this.storage.get('_token');
    this.totalDescansos = await this.storage.get('diasdescanso');
    this.totalInasistencias = await this.storage.get('diasfalla');
    this.totalLicencias = await this.storage.get('diaslicencia');
    this.totalPermisos = await this.storage.get('diaspermiso');
    this.totalVacacion = await this.storage.get('diasvacacion');
    return;
  }

  initFechas(){
    const primerDia = new Date(this.fechaAct.getFullYear(), this.fechaAct.getMonth(), 1);
    let mes = ''+(primerDia.getMonth()+1);
    mes = mes.length > 1 ? mes : '0'+mes;
    this.dataFind.fecha1 = primerDia.getFullYear()+'-'+mes+'-'+primerDia.getDate();

    let mes2 = ''+(this.fechaAct.getMonth()+1);
    mes2 = mes2.length > 1 ? mes2 : '0'+mes2;
    this.dataFind.fecha2 = this.fechaAct.getFullYear()+'-'+mes2+'-'+this.fechaAct.getDate();
  }

  loadNotificaciones(){
    this.navCtrl.navigateForward('/notificaciones');
  }

  async mostrarPopover( evento ){
    const popover = await this.popoverCtrl.create({
      component: PopUserComponent,
      event: evento,
      mode: 'ios'
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();
    console.log('Padre', data);
  }

  redireccionar( ruta: string ){
    this.navCtrl.navigateForward(ruta);
  }

}
