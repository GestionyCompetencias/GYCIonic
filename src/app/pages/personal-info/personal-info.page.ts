import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { DataService } from 'src/app/services/data.service';
import { LoadingController, Platform, AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.page.html',
  styleUrls: ['./personal-info.page.scss'],
})
export class PersonalInfoPage implements OnInit {

  rut: string;
  token: string;
  dataResp: any;

  trabajador = {
      nombre: '',
      apaterno: '',
      amaterno: '',
      fnacimiento: '',
      nacionalidad: '',
      telefono1: '',
      telefono2: '',
      correo: '',
      direccion: '',
      region: '',
      ciudad: '',
      comuna: '',
      sexo: '',
      banco: '',
      tcuenta: '',
      ncuenta: '',
      ecivil: '',
      nhijos: '',
      salud: '',
      adicionalsalud: '',
      prevision: '',
      apv: '',
      ahorro: '',
      empresaactual: '',
      estadocontractual: '',
      faena: '',
      turno: '',
      finicio: '',
      ftermi: '',
      fferia: '',
      dias: '',
      fsindi: '',
      sindicato: '',
      razonsocial: '',
      cargo: '',
      tipocontrato: '',
      sueldo: '',
      existe: ''
    };

  constructor(private storage: Storage,
              private dataServ: DataService,
              private loadingCtrl: LoadingController,
              private plt: Platform,
              private alertCtrl: AlertController,
              private navCtrl: NavController) { }

  async ngOnInit() {
    this.presentLoading();
    await this.loadRut();
    await this.loadInfo();
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargado información...',
    });
    await loading.present();
  }

  async loadRut(){
    await this.storage.create();
    this.rut = await this.storage.get('rut');
    this.token = await this.storage.get('token');
  }

  async loadInfo(){

    /* if(this.plt.is('cordova')){

      this.dataServ.getInfoPersonalNative(this.rut, this.token).then( resp => {
        const data = JSON.parse(resp.data);
        this.dataResp = data.respuesta.data2;

        this.loadingCtrl.dismiss();

        this.trabajador.nombre = this.dataResp.nombre;
        this.trabajador.apaterno = this.dataResp.apaterno;
        this.trabajador.amaterno = this.dataResp.amaterno;
        this.trabajador.fnacimiento = this.dataResp.fnacimiento;
        this.trabajador.nacionalidad = this.dataResp.nacionalidad;
        this.trabajador.telefono1 = this.dataResp.telefono1;
        this.trabajador.telefono2 = this.dataResp.telefono2;
        this.trabajador.correo = this.dataResp.correo;
        this.trabajador.direccion = this.dataResp.direccion;
        this.trabajador.region = this.dataResp.region;
        this.trabajador.ciudad = this.dataResp.ciudad;
        this.trabajador.comuna = this.dataResp.comuna;
        this.trabajador.sexo = this.dataResp.sexo;
        this.trabajador.banco = this.dataResp.banco;
        this.trabajador.tcuenta = this.dataResp.tcuenta;
        this.trabajador.ncuenta = this.dataResp.ncuenta;
        this.trabajador.ecivil = this.dataResp.ecivil;
        this.trabajador.nhijos = this.dataResp.nhijos;
        this.trabajador.salud = this.dataResp.salud;
        this.trabajador.adicionalsalud = this.dataResp.adicionalsalud;
        this.trabajador.prevision = this.dataResp.prevision;
        this.trabajador.apv = this.dataResp.apv;
        this.trabajador.ahorro = this.dataResp.ahorro;
        this.trabajador.empresaactual = this.dataResp.empresaactual;
        this.trabajador.estadocontractual = this.dataResp.estadocontractual;
        this.trabajador.faena = this.dataResp.faena;
        this.trabajador.turno = this.dataResp.turno;
        this.trabajador.finicio = this.dataResp.finicio;
        this.trabajador.ftermi = this.dataResp.ftermi;
        this.trabajador.fferia = this.dataResp.fferia;
        this.trabajador.dias = this.dataResp.dias;
        this.trabajador.fsindi = this.dataResp.fsindi;
        this.trabajador.sindicato = this.dataResp.sindicato;
        this.trabajador.razonsocial = this.dataResp.razonsocial;
        this.trabajador.cargo = this.dataResp.cargo;
        this.trabajador.tipocontrato = this.dataResp.tipocontrato;
        this.trabajador.sueldo = this.dataResp.sueldo;
        this.trabajador.existe = this.dataResp.existe;
      }).catch(error => {
        console.log(error);
        this.loadingCtrl.dismiss();
        this.presentAlert('Disculpe ha ocurrido algun error interno en el servidor; por favor, intente mas tarde', 'Error', true);
      });
    }else{ */

      this.dataServ.getInfoPersonal(this.rut, this.token).subscribe( resp => {
        console.log(resp);
        this.dataResp = resp.respuesta.data2;

        console.log(this.dataResp);


        this.loadingCtrl.dismiss();

        this.trabajador.nombre = this.dataResp.nombre;
        this.trabajador.apaterno = this.dataResp.apaterno;
        this.trabajador.amaterno = this.dataResp.amaterno;
        this.trabajador.fnacimiento = this.dataResp.fnacimiento;
        this.trabajador.nacionalidad = this.dataResp.nacionalidad;
        this.trabajador.telefono1 = this.dataResp.telefono1;
        this.trabajador.telefono2 = this.dataResp.telefono2;
        this.trabajador.correo = this.dataResp.correo;
        this.trabajador.direccion = this.dataResp.direccion;
        this.trabajador.region = this.dataResp.region;
        this.trabajador.ciudad = this.dataResp.ciudad;
        this.trabajador.comuna = this.dataResp.comuna;
        this.trabajador.sexo = this.dataResp.sexo;
        this.trabajador.banco = this.dataResp.banco;
        this.trabajador.tcuenta = this.dataResp.tcuenta;
        this.trabajador.ncuenta = this.dataResp.ncuenta;
        this.trabajador.ecivil = this.dataResp.ecivil;
        this.trabajador.nhijos = this.dataResp.nhijos;
        this.trabajador.salud = this.dataResp.salud;
        this.trabajador.adicionalsalud = this.dataResp.adicionalsalud;
        this.trabajador.prevision = this.dataResp.prevision;
        this.trabajador.apv = this.dataResp.apv;
        this.trabajador.ahorro = this.dataResp.ahorro;
        this.trabajador.empresaactual = this.dataResp.empresaactual;
        this.trabajador.estadocontractual = this.dataResp.estadocontractual;
        this.trabajador.faena = this.dataResp.faena;
        this.trabajador.turno = this.dataResp.turno;
        this.trabajador.finicio = this.dataResp.finicio;
        this.trabajador.ftermi = this.dataResp.ftermi;
        this.trabajador.fferia = this.dataResp.fferia;
        this.trabajador.dias = this.dataResp.dias;
        this.trabajador.fsindi = this.dataResp.fsindi;
        this.trabajador.sindicato = this.dataResp.sindicato;
        this.trabajador.razonsocial = this.dataResp.razonsocial;
        this.trabajador.cargo = this.dataResp.cargo;
        this.trabajador.tipocontrato = this.dataResp.tipocontrato;
        this.trabajador.sueldo = this.dataResp.sueldo;
        this.trabajador.existe = this.dataResp.existe;

        console.log("trabajador", this.trabajador);
        
      }, error => {
        console.log(error);
        this.loadingCtrl.dismiss();
        this.presentAlert('Disculpe ha ocurrido algun error interno en el servidor; por favor, intente mas tarde', 'Error', true);
      });
    //}

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

}
