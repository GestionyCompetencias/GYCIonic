import { Component, ViewChild } from '@angular/core';
import { IonRouterOutlet, Platform, AlertController, ToastController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { Storage } from '@ionic/storage-angular';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { MarkerService } from './services/marker.service';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { DataService } from './services/data.service';
import { Geolocation, Geoposition } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  @ViewChild(IonRouterOutlet, { static: true }) _ionRouterOutlet: IonRouterOutlet;
  private backButtonSub: Subscription;
  private disconnectSubscription: any;
  private connectSubscription: any;
  private markers = new Array();
  private settings: any;

  constructor(private platform: Platform,
              private httpSSL: HTTP,
              private geolocation: Geolocation,
              private storage: Storage,
              private network: Network,
              private markerServ: MarkerService,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private device: Device,
              private dataServ: DataService,
              private navCtrl: NavController) {
    this.initializeApp();
  }

  initializeApp(){
    this.platform.ready().then((readySource)=>{
      console.log('platform done...');
      this.getSettingsStorage();
      this.validateUuid();
      this.validate();


      /* this.httpSSL.setServerTrustMode('pinned').then(()=>{
        console.log('Ok pinnig SSL');
        this.presentToast('Ok pinnig SSL');
      }).catch(()=>{
        console.log('Opss, SSL Pining Fail');
        this.presentToast('Opss, SSL Pining Fail');
      }); */

      this.checkInternetConnection();

      if (this.platform.is('tablet')) {
        this.storage.create();
        this.storage.clear();
      }

      this.platform.pause.subscribe(async () => {
        setTimeout(()=>{
          if (this.platform.is('tablet')) {
            this.storage.create();
            this.storage.clear();
          }
        }, 60000);
      });


      this.platform.backButton.subscribeWithPriority(-1, () => {
        // eslint-disable-next-line no-underscore-dangle
        if (!this._ionRouterOutlet.canGoBack()) {
          this.salir();
        }
      });
    });
  }

  async validate(){
    this.storage.create();
    const token = await this.storage.get('token') || null;
    const rut = await this.storage.get('rut') || null;

    if(token !== null){
      this.dataServ.getInfoPersonal(rut, token).subscribe(data => {
        if (data.respuesta.result === 7) {
          this.storage.clear();
          this.navCtrl.navigateRoot('login');
        }
        return 0;
      });
    }
    return 0;
  }


  async salir()
  {
    this.storage.create();
    const modo = await this.storage.get('modo');
    if(modo === 'INDIVIDUAL' || modo === '' || modo === null){
      // eslint-disable-next-line @typescript-eslint/dot-notation
      if (this.platform.is('tablet')) {
        this.storage.create();
        this.storage.clear();
      }
      // eslint-disable-next-line @typescript-eslint/dot-notation
      navigator['app'].exitApp();
    }else{
      const password = await this.storage.get('pass');
      const alert = await this.alertCtrl.create({
        header: 'Confirmacion',
        inputs: [
          {
            name: 'password',
            type: 'password',
            placeholder: 'Ingrese contraseña'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }, {
            text: 'Ok',
            handler: (data) => {
              console.log('Confirm Ok');
              if(data.password === password){
                // eslint-disable-next-line @typescript-eslint/dot-notation
                navigator['app'].exitApp();
              }else{
                this.presentToast('Contraseña de acceso Inválido.');
              }
            }
          }
        ]
      });

      await alert.present();
    }
  }

  async presentToast(message: any) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async validateUuid()
  {
    this.storage.create();
    const uuid = await this.storage.get('uuid') || null;
    console.log(uuid);
    if(uuid == null){
      const uuid_dev = this.device.uuid;
      const alert = await this.alertCtrl.create({
        header: 'Confirmación!',
        cssClass: 'my-confirm-class',
        message: 'Declaro estar de acuerdo y en conocimiento que a través de este dispositivo se registrarán las marcaciones de asistencia y administración de documentación laboral en consistencia con lo señalado en el Dictamen 1140/027 de la Dirección del Trabajo del 24 de febrero de 2016. ',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              navigator['app'].exitApp();
            },
          },
          {
            text: 'Aceptar',
            handler: () => {
              this.storage.set('uuid', uuid_dev);
              this.geolocation.getCurrentPosition().then(
                (geoposition: Geoposition)=>{
                  console.log(geoposition.coords.latitude+' - '+geoposition.coords.longitude);
                }
              ).catch(e=>{
                console.log(JSON.stringify(e));
              });
              return;
            },
          },
        ],
      });

      await alert.present();
    }

  }


  checkInternetConnection()
  {

    this.disconnectSubscription = this.network.onDisconnect().subscribe(async () => {
      console.log('network was disconnected :-(');
    });
    this.connectSubscription = this.network.onConnect().subscribe(async () => {
      console.log('network connected!');
      this.storage.create();
      this.markers = await this.storage.get('markers') || [];

      //console.log(this.markers);
      let result = 0;
      if(this.markers.length > 0){
        this.markers.forEach( async item => {
          //console.log(item);
          if (this.platform.is('cordova')) {
            //alert(JSON.stringify(item));
            this.markerServ.sendMarkerNative(item).then( async (resp: any) =>{
              const data = JSON.parse(resp);
              if (data.result === 0) {
                result = data.result;
              } else {
                result = data.result;
                this.removeItem(item.id);
              }
            }).catch(e => {
              console.log(e);
              //alert(JSON.stringify(e));
            });
          } else {
            (await this.markerServ.sendMarker(item)).subscribe( async resp =>{
              console.log(resp);
              if(resp.result === 0){
                result = resp.result;
              }else{
                result = resp.result;
                this.removeItem(item.id);
              }
            });
          }
        });
      }
    });
  }

  async removeItem(item: number){
    const marks = await this.storage.get('markers') || [];
    const items = marks.filter((values) => values.id !== item);
    console.log(items);
    this.storage.set('markers', items);
    if(items.length === 0){
      this.storage.remove('markers');
    }
  }

  getSettingsStorage(){
    this.storage.create();
    const settings = {
      configGPS: true,
      alertSuccess: true,
      alertError: true,
      volumen: 100
    };
    console.log(settings);
    this.storage.set('settings', settings);
  }


}
