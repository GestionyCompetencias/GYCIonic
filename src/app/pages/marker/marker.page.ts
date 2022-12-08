import { Component, OnInit } from '@angular/core';
import { CameraPreview, CameraPreviewPictureOptions } from '@awesome-cordova-plugins/camera-preview/ngx';
import { Geolocation, Geoposition } from '@awesome-cordova-plugins/geolocation/ngx';
import { NavController, LoadingController, Platform, ModalController, AlertController, ToastController, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { MarkerService } from '../../services/marker.service';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { SettingService } from '../../services/setting.service';
import { MarkerDataLocalService } from '../../services/marker-data-local.service';
import { ModalMarkerPage } from '../modal-marker/modal-marker.page';
import { CameraPreviewTakePictureOptions } from 'cordova-plugin-camera-preview';

@Component({
  selector: 'app-marker',
  templateUrl: './marker.page.html',
  styleUrls: ['./marker.page.scss'],
})
export class MarkerPage implements OnInit {

  lat: number;
  lng: number;
  configGPS: boolean;
  tipoMarcaje: string;
  horaMarcaje: string = null;
  fechaMarcaje: string = null;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  IMAGE_PATH: any;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  GPSFun = true;
  netActive = true;

  imageDataOr: any;

  settings = {
    configGPS: true,
    alertSuccess: true,
    alertError: true,
    volumen: 100
  };

  rutEmpresa: string;
  razonSocial: string;
  direccion: string;
  comuna: any;

  logo: any;


  markers = new Array();
  enviados: any = new Array();

  now: Date = null;

  marker = {
    lat: 0,
    lng: 0,
    fecha: '',
    hora: '',
    tipo: '',
    rut: '',
    trabajador: 0,
    modo: '',
    photo: ''
  };

  constructor(private cameraPreview: CameraPreview,
              private geolocation: Geolocation,
              private navCtrl: NavController,
              private storage: Storage,
              private diagnostic: Diagnostic,
              private settingServ: SettingService,
              private markerServ: MarkerService,
              private network: Network,
              private loadingCtrl: LoadingController,
              private plt: Platform,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private toastController: ToastController,
              private markerDatLocal: MarkerDataLocalService,
              private screen: ScreenOrientation,
              private menuCtrl: MenuController) {
              }

  async ngOnInit() {
    this.menuCtrl.enable(false);
    this.screen.lock(this.screen.ORIENTATIONS.PORTRAIT);
    this.storage.create();
    await this.getSettingsStorage();
    await this.getCoordenadas();
    this.rutEmpresa = await this.storage.get('rutEmpresa') || 'RUT EMPRESA';
    this.razonSocial = await this.storage.get('razonEmpresa') || 'RAZON SOCIAL EMPRESA';
    this.direccion = await this.storage.get('direccion') || 'DIRECCION EMPRESA';
    this.logo = await this.storage.get('logo') || null;
    this.comuna = await this.storage.get('comuna') || null;

    /* this.startCameraAbove();
    this.cameraPreview.show(); */
    
  }

  
  ionViewWillEnter()
  {
    this.getSettingsStorage();
    
    this.network.onConnect().subscribe(()=>{
      //alert('Conectado a internet');
      this.netActive = true;
      this.sendMarkersLocals();
    });
  }
  
  ionViewDidEnter() {
    this.startCameraAbove();
    this.cameraPreview.show();
    

    this.network.onDisconnect().subscribe(()=>{
      console.log('Desconectado');
      this.netActive = false;
    });

    this.network.onConnect().subscribe(()=>{
      //console.log('Conectado');
      this.netActive = true;
      this.sendMarkersLocals();
    });

    this.sendMarkersLocals();
  }

  async sendMarkersLocals()
  {
    this.markers = await this.storage.get('markers') || [];

    console.log(this.markers);
    let result = 0;
    if(this.markers.length > 0){
      this.markers.forEach( async item => {
        (await this.markerServ.sendMarker(item)).subscribe( async resp =>{
          console.log(JSON.stringify(resp));
          
          if(resp.respuesta.result === 0){
            result = resp.respuesta.result;
          }else{
            console.log(resp.respuesta.id);
            this.removeItem(item.id);
            this.markerServ.uploadImages(item.photo, resp.respuesta.id);
            result = resp.respuesta.result;
          }
        }, error => {
          //this.cameraPreview.hide();
          console.log(JSON.stringify(error));
          //this.presentToast(JSON.stringify(error));
        });
      });
    }
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

  startCameraAbove() {
    const options = {
      x: (window.screen.width / 2)-150,
      y: 60,
      width: 300,
      height: 300,
      toBack: false,
      previewDrag: false,
      storeToFile: true,
      tapPhoto: false,
    };

    this.cameraPreview.startCamera(options);
  }

  takePicture() {

    // picture options
    const pictureOpts: CameraPreviewTakePictureOptions = {
      width: 1280,
      height: 1280,
      quality: 85
    };

    //this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
    this.cameraPreview.takeSnapshot(pictureOpts).then((imageData) => {
      this.imageDataOr = imageData;
      this.IMAGE_PATH = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
      this.IMAGE_PATH = 'assets/img/test.jpg';
    });
  }

  async confirmMarker(tipo: string)
  {
    let message: string;
    await this.getFechaHora();
    await this.takePicture();
    this.cameraPreview.hide();

    if (tipo === 'I') {
      message = '¿Está seguro que desea marcar una <strong>ENTRADA</strong>?';
    } else {
      message = '¿Está seguro que desea marcar una <strong>SALIDA</strong>?';
    }

    const alert = await this.alertCtrl.create({
      header: 'Confirmación!',
      cssClass: 'my-confirm-class',
      message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirmacion Cancelada');
            this.cameraPreview.show();
          },
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.captureMarcaje(tipo);
          },
        },
      ],
    });

    await alert.present();
  }

  async captureMarcaje(tipo: string){
    this.tipoMarcaje = tipo;


    const rut = await this.storage.get('rut') || null;
    const trabajador = await this.storage.get('idTrabajador') || null;

    this.marker.lat = this.lat;
    this.marker.lng = this.lng;
    this.marker.fecha = this.fechaMarcaje;
    this.marker.hora = this.horaMarcaje;
    this.marker.tipo = this.tipoMarcaje;
    this.marker.rut = rut;
    this.marker.trabajador = trabajador;
    this.marker.modo = 'MANUAL';
    this.marker.photo = this.IMAGE_PATH;



    if(this.netActive){

      this.markers = await this.storage.get('markers') || [];

      //const index = (this.markers !== null)?this.markers.length + 1:1;
      const index = this.markers.length + 1;
      const newMarker = {
        id: index,
        latitud: this.lat,
        longitud: this.lng,
        fecha: this.marker.fecha,
        hora: this.marker.hora,
        tipo: this.marker.tipo,
        rut: this.marker.rut,
        trabajador: this.marker.trabajador,
        modo: this.marker.modo,
        photo: this.IMAGE_PATH,
      };
      this.markers.push(newMarker);


      this.modalMarker('success');
      if (this.settings.alertSuccess) {
        this.settingServ.playExitoso(this.settings.volumen / 100);
      }
      this.storage.set('markers', this.markers);

    }else{

      this.markers = await this.storage.get('markers') || [];

      //const index = (this.markers !== null)?this.markers.length + 1:1;
      const index = this.markers.length + 1;
      const newMarker = {
        id: index,
        latitud: this.lat,
        longitud: this.lng,
        fecha: this.marker.fecha,
        hora: this.marker.hora,
        tipo: this.marker.tipo,
        rut: this.marker.rut,
        trabajador: this.marker.trabajador,
        modo: this.marker.modo,
        photo: this.IMAGE_PATH,
      };
      this.markers.push(newMarker);

      this.modalMarker('success');
      if (this.settings.alertSuccess) {
        this.settingServ.playExitoso(this.settings.volumen / 100);
      }
      this.storage.set('markers', this.markers);
    }
  }

  async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message,
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.cameraPreview.show();
        },
      }]
    });

    await alert.present();
  }

  loadSettings(){
    this.cameraPreview.hide();
    this.navCtrl.navigateForward('setting');
  }

  async getSettingsStorage(){
    const settings = await this.storage.get('settings') || null;
    if(settings !== null){
      this.settings = settings;
    }
  }

  getFechaHora(){
    this.now = new Date();
    this.fechaMarcaje = null;
    this.horaMarcaje = null;
    let mes = ''+(this.now.getMonth()+1);
    mes = mes.length > 1 ? mes : '0'+mes;
    let hor = ''+this.now.getHours();
    hor = hor.length > 1 ? hor : '0'+hor;
    let min = ''+this.now.getMinutes();
    min = min.length > 1 ? min : '0'+min;
    this.fechaMarcaje = this.now.getFullYear()+'-'+mes+'-'+this.now.getDate();
    this.horaMarcaje = hor+':'+min+':00';

    console.log('Hora Marcaje: ', this.horaMarcaje);
  }

  async getCoordenadas()
  {

    this.geolocation.getCurrentPosition().then(
      (geoposition: Geoposition)=>{
        this.lat = geoposition.coords.latitude;
        this.lng = geoposition.coords.longitude;

        //this.presentToast('lat:'+this.lat+' - lon:'+this.lng);
        console.log(geoposition.coords.latitude+' - '+geoposition.coords.longitude);
      }
    ).catch(e=>{
      this.lat = 0;
      this.lng = 0;
      console.log(JSON.stringify(e));
    });

    /* await this.getSettingsStorage();
    if(this.settings.configGPS){
      this.geolocation.getCurrentPosition().then(
        (geoposition: Geoposition)=>{
          this.lat = geoposition.coords.latitude;
          this.lng = geoposition.coords.longitude;

          //this.presentToast('lat:'+this.lat+' - lon:'+this.lng);
          console.log(geoposition.coords.latitude+' - '+geoposition.coords.longitude);
        }
      ).catch(e=>{
        console.log(JSON.stringify(e));
      });
    }else{
      this.lat = 0;
      this.lng = 0;
      this.presentToast('La función de Geolocalizacion esta deshabilitada.');
    } */
  }

  switchCamera() {
    this.cameraPreview.switchCamera();
  }

  closeApp(){
    // eslint-disable-next-line @typescript-eslint/dot-notation
    navigator['app'].exitApp();
  }

  async modalMarker(status: any, message: string = null)
  {
    let tipoMarcaje = '';
    this.cameraPreview.hide();
    this.cameraPreview.stopCamera();
    if (this.marker.tipo === 'I') {
      tipoMarcaje = 'ENTRADA';
    } else {
      tipoMarcaje = 'SALIDA';
    }

    const modal = await this.modalCtrl.create({
      component: ModalMarkerPage,
      componentProps: {
        image: this.IMAGE_PATH,
        rut: this.marker.rut,
        fecha: this.marker.fecha,
        hora: this.marker.hora,
        tipo: tipoMarcaje,
        status,
        message
      }
    });

    modal.onDidDismiss().then(modalData=>{
      this.startCameraAbove();
      this.cameraPreview.show();
      this.sendMarkersLocals();
      this.fechaMarcaje = null;
      this.horaMarcaje = null;
    });

    await modal.present();
  }

  async presentLoading(message: any) {
    const loading = await this.loadingCtrl.create({
      message,
      spinner: 'circles',
    });
    await loading.present();
  }

  async presentToast(message: any) {
    const toast = await this.toastController.create({
      message,
      duration: 10000
    });
    toast.present();
  }

  volverAtras()
  {
    this.cameraPreview.hide();
    this.navCtrl.navigateForward('/home');
  }

  openAdmon(){
    this.cameraPreview.stopCamera();
    this.navCtrl.navigateRoot('/home');
  }

}
