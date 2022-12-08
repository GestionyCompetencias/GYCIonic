import { Component, OnInit } from '@angular/core';
import { FileTransferObject, FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';
import { AlertController, LoadingController, MenuController, NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { LoginService } from '../../services/login.service';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { BarcodeScanner, BarcodeScannerOptions } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { DataEmployeesService } from '../../services/data-employees.service';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { CameraPreview } from '@awesome-cordova-plugins/camera-preview/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: string;
  password: string;

  fileTransfer: FileTransferObject = this.transfer.create();

  constructor(private alertCtrl: AlertController,
    private storage: Storage,
    private navCtrl: NavController,
    private loginServ: LoginService,
    private loadingCtrl: LoadingController,
    private plt: Platform,
    private file: File,
    private transfer: FileTransfer,
    private barcodeScanner: BarcodeScanner,
    private employees: DataEmployeesService,
    private screen: ScreenOrientation,
    private menuCtrl: MenuController,
    private cameraPreview: CameraPreview) { }

  ngOnInit() {
    this.cameraPreview.stopCamera();
    this.menuCtrl.enable(false);
    this.screen.lock(this.screen.ORIENTATIONS.PORTRAIT);
    this.storage.create();
  }

  onSubmit()
  {
    console.log('Formilario enviado');
    this.login(this.user, this.password);
  }

  scan()
  {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Por favor enfoque su codigo QR',
      resultDisplayDuration: 500,
      formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
      orientation: 'portrait',
    };

    this.barcodeScanner.scan(options).then(data => {
      if(data.text){
        const uri = data.text;
        const separate_uri = uri.split('?');
        if(separate_uri.length < 2){
          this.presentAlert('Codigo QR no válido.');
          return;
        }

        const uri_variables = separate_uri[1].split('&');
        const var1 = uri_variables[0];
        const rut = var1.substring(4).replace('-', '');

        const var2 = uri_variables[1];
        const var3 = uri_variables[2];
        const var4 = uri_variables[3];
        const values_var3 = var3.split('=');
        const values_var4 = var4.split('=');

        let fecha = values_var4[1].replace(values_var3[1], '');
        fecha = fecha.substring(1, 7);

        const dia = fecha.substring(4, 6);
        const mes = fecha.substring(2, 4);
        let anio = fecha.substring(0, 2);

        const anioInt = parseInt(anio, 10);

        if (anioInt > 45){
          anio = '19'+anio;
        }
        if(anioInt >= 0 && anioInt <= 45){
          anio = '20'+anio;
        }

        const fechaNac = dia+'-'+mes+'-'+anio;

        this.loginQR(rut, fechaNac);

        //his.presentAlert(`doc ${ rut } - fecha ${ fechaNac }`);
        /* const user = res.split(';');
        this.user = user[0];
        this.password = user[1];
        this.login(this.user, this.password); */
      }
    }).catch(err => {
      this.presentAlert( err );
    });
  }

  async presentAlert(message: any = "") {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message,
      buttons: ['Ok']
    });

    await alert.present();
  }

  loginQR(documento: string, fecha: string){
    console.log('Iniciando sesion');
    this.presentLoading();
    
    this.loginServ.loginStandar(documento, fecha).subscribe(async resp => {
      this.loadingCtrl.dismiss();
      if (resp.respuesta.result === 0) {
        this.loadingCtrl.dismiss();
      } else {
        await this.storage.set('rut', documento);
        await this.storage.set('token', resp.respuesta.data2.token);
        await this.storage.set('modo', resp.respuesta.data2.modo);
        await this.storage.set('idTrabajador', resp.respuesta.data2.idTrabajador);
        await this.storage.set('rutEmpresa', resp.respuesta.dataE.rut_empresa);
        await this.storage.set('razonEmpresa', resp.respuesta.dataE.nombre_empresa);
        await this.storage.set('direccion', resp.respuesta.dataF.direccion);
        await this.storage.set('logo', resp.respuesta.dataE.logo_empresa);
        await this.storage.set('comuna', resp.respuesta.dataF.comuna);
        await this.storage.set('diasdescanso', resp.respuesta.data2.diasdescanso);
        await this.storage.set('diasfalla', resp.respuesta.data2.diasfalla);
        await this.storage.set('diaslicencia', resp.respuesta.data2.diaslicencia);
        await this.storage.set('diaspermiso', resp.respuesta.data2.diaspermiso);
        await this.storage.set('diasvacacion', resp.respuesta.data2.diasvacacion);
        if(resp.data2.modo === 'INDIVIDUAL'){
          this.navCtrl.navigateRoot('/marker');
        }
        if(resp.data2.modo === 'COLECTIVO'){
          await this.storage.set('pass', 'admin.2022');
          await this.load_employees(resp.data2.token);
        }
      }
    }, error => {
      this.loadingCtrl.dismiss();
      console.log(error);
      this.presentAlert(JSON.stringify(error));
    });

  }

  login(user: string, pass: string){
    console.log('Iniciando sesion');
    this.presentLoading();
      this.loginServ.loginStandar(user, pass).subscribe(async resp => {
      this.loadingCtrl.dismiss();

      console.log("resultado", resp);
      
      if (resp.respuesta.result === 0) {
        this.loadingCtrl.dismiss();
        this.presentAlert(resp.respuesta.message);
      } else {
        await this.storage.set('rut', this.user);
        await this.storage.set('token', resp.respuesta.data2.token);
        await this.storage.set('modo', resp.respuesta.data2.modo);
        await this.storage.set('idTrabajador', resp.respuesta.data2.idTrabajador);
        await this.storage.set('rutEmpresa', resp.respuesta.dataE.rut_empresa);
        await this.storage.set('razonEmpresa', resp.respuesta.dataE.nombre_empresa);
        await this.storage.set('direccion', resp.respuesta.dataF.direccion);
        await this.storage.set('comuna', resp.respuesta.dataF.comuna);
        await this.storage.set('diasdescanso', resp.respuesta.data2.diasdescanso);
        await this.storage.set('diasfalla', resp.respuesta.data2.diasfalla);
        await this.storage.set('diaslicencia', resp.respuesta.data2.diaslicencia);
        await this.storage.set('diaspermiso', resp.respuesta.data2.diaspermiso);
        await this.storage.set('diasvacacion', resp.respuesta.data2.diasvacacion);
        await this.storage.set('pass', pass);
        await this.storage.set('logo', resp.respuesta.dataE.logo_empresa);

        //this.downloadLogo(resp.respuesta.dataE.logo_empresa);

        if(resp.respuesta.data2.modo === 'INDIVIDUAL'){
          this.navCtrl.navigateRoot('/marker');
        }
        if(resp.respuesta.data2.modo === 'COLECTIVO'){
          await this.storage.set('pass', pass);
          await this.load_employees(resp.respuesta.data2.token);
        }
      }
    }, error => {
      this.loadingCtrl.dismiss();
      console.log(JSON.stringify(error));
      this.presentAlert(error);
    });
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Validando Datos...',
      spinner: 'circles',
    });
    await loading.present();
  }

  async load_employees(token: string)
  {
  
      this.employees.getTrabajadores(token).subscribe( async resp => {
        await this.storage.set('empleados', resp.respuesta.data);
        this.navCtrl.navigateRoot('/marker-colective');
      });
  }

  downloadLogo(url: string){

    const urlLogo = url.split('?');
    const path = urlLogo[0].split('.');
    const ext = path[path.length - 1];

    console.log(urlLogo);

    this.fileTransfer.download(url, `${this.file.dataDirectory}logo_empresa.${ext}`).then(async (entry)=>{
      console.log("entry", entry.toURL());
      await this.storage.set('logo', entry.toURL());
    }).catch( error=>{
      console.log(error);
    });

  }

}
