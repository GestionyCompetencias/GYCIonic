import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { SettingService } from '../../services/setting.service';
import { NavController, AlertController, MenuController } from '@ionic/angular';
import { Geolocation, Geoposition } from '@awesome-cordova-plugins/geolocation/ngx';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  gpsAct = true;
  alertS = true;
  alertE = true;
  vol = 100;
  settings: any;
  rut: string;
  modo: string;

  constructor(private storage: Storage,
              private audioServ: SettingService,
              private navCtrl: NavController,
              private geolocation: Geolocation,
              private alertCtrl: AlertController,
              private loginServ: LoginService,
              private menuCtrl: MenuController) { }

  async ngOnInit() {
    this.menuCtrl.enable(false);
    this.storage.create();
    this.rut = await this.storage.get('rut') || null;
    this.modo = await this.storage.get('modo') || null;
    await this.getSettingsStorage();
  }

  async getSettingsStorage(){
    this.settings = await this.storage.get('settings') || null;

    if (this.settings) {
      this.gpsAct = this.settings.configGPS;
      this.alertS = this.settings.alertSuccess;
      this.alertE = this.settings.alertError;
      this.vol = this.settings.volumen;
    } else {
      this.settings = {
        configGPS: true,
        alertSuccess: true,
        alertError: true,
        volumen: 100
      };
      this.gpsAct = this.settings.configGPS;
      this.storage.set('settings', this.settings);
    }
  }

  changePass(){
    console.log('Load Formulario');
    this.navCtrl.navigateForward('/cambio-clave');
  }

  configGPS( event ){
    this.settings.configGPS = event.detail.checked;
    this.gpsAct = event.detail.checked;
    this.storage.set('settings', this.settings);

    this.geolocation.getCurrentPosition().then(
      (geoposition: Geoposition)=>{
        console.log(geoposition.coords.latitude+' - '+geoposition.coords.longitude);
      }
    ).catch(e=>{
      alert(JSON.stringify(e));
    });

  }

  activateAlertSuccess( event ){
    this.settings.alertSuccess = event.detail.checked;
    this.alertS = event.detail.checked;
    this.storage.set('settings', this.settings);
    if(this.settings.alertSuccess){
      this.audioServ.playExitoso(this.settings.volumen / 100);
    }
  }

  activateAlertError( event ){
    this.settings.alertError = event.detail.checked;
    this.alertE = event.detail.checked;
    this.storage.set('settings', this.settings);
    if(this.settings.alertError){
      this.audioServ.playFallido(this.settings.volumen / 100);
    }
  }

  setVolumen( event ){
    console.log( event.detail.value );
    this.vol = event.detail.value;
    this.settings.volumen = this.vol;
    this.storage.set('settings', this.settings);
  }

  desloguear()
  {
    this.presentAlert('¿Está seguro(a) que desea cerrar su sesion?', 'Advertencia');
  }

  async presentAlert(message: string, title: string) {
    const alert = await this.alertCtrl.create({
      subHeader: title,
      message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            console.log('Logout Ok');
            this.loginServ.logout();
            this.navCtrl.navigateRoot('/');
          }
        }
      ]
    });

    await alert.present();
  }

}
