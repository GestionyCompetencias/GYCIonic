import { Component, OnInit } from '@angular/core';
import { DocumentViewer } from '@awesome-cordova-plugins/document-viewer/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-doc-firma',
  templateUrl: './doc-firma.page.html',
  styleUrls: ['./doc-firma.page.scss'],
})
export class DocFirmaPage implements OnInit {

  rut: string;
  token: string;
  password: string;

  documento: any;
  documentos: any = new Array();

  constructor(private dataServ: DataService,
              private loadingCtrl: LoadingController,
              private plf: Platform,
              private storage: Storage,
              private file: File,
              private ft: FileTransfer,
              private fileOpener: FileOpener,
              private document: DocumentViewer,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController                              ) { }


  async ngOnInit() {
    await this.loadRut();
    await this.loadDocs();
  }

  async loadRut(){
    await this.storage.create();
    this.rut = await this.storage.get('rut');
    this.password = await this.storage.get('pass');
    this.token = await this.storage.get('token');
  }

  loadDocs(){
    this.presentLoading('Cargando Información...');
    if(this.plf.is('cordova')){
      this.dataServ.pendientesFirmaNative(this.rut, this.token).then( resp => {
        this.loadingCtrl.dismiss();
        const data = JSON.parse(resp.data);
        if(data.respuesta.data2 !== '' && data.respuesta.data2 !== null){
          this.documentos = data.respuesta.data2;
        }
      }).catch( error => {
        this.presentAlert('Falla de comunicación con el servidor, intente mas tarde', 'Error');
      });
    }else{
      this.dataServ.pendientesFirma(this.rut, this.token).subscribe(resp => {
        console.log(resp);

        if(resp.respuesta.data2 !== '' && resp.respuesta.data2 !== null){
          this.documentos = resp.respuesta.data2;
        }

        this.loadingCtrl.dismiss();
      }, error =>{
        this.loadingCtrl.dismiss();
        this.presentAlert('Falla de comunicación con el servidor, intente mas tarde', 'Error');
        console.log(error);
      });
    }

  }



  show( item: any ){
    let url = '';
    if(this.plf.is('cordova')){
      this.dataServ.showDocumentNative(this.rut, this.token, item.tipo, item.id).then( resp => {
        const data = JSON.parse(resp.data);
        url = data.respuesta.data2;
        const arrUrl = url.split('/');
        const newUrl = 'https://appgyc.gycsol.cl///temp//'+arrUrl[arrUrl.length - 1];
        console.log(newUrl);
        this.loadPDF(newUrl, arrUrl[arrUrl.length - 1]);
      } ).catch( error => {
        this.presentAlert('No se ha podido cargar el archivo desde el servidor', 'Error');
        console.log(error);
      });
    }else{
      this.dataServ.showDocument(this.rut, this.token, item.tipo, item.id).subscribe( resp => {
        console.log(resp);
        url = resp.respuesta.data2;
        const arrUrl = url.split('/');
        const newUrl = 'https://appgyc.gycsol.cl///temp//'+arrUrl[arrUrl.length - 1];
        console.log(newUrl);
        this.loadPDF(newUrl, arrUrl[arrUrl.length - 1]);
      }, error => {
        console.log(error);
        this.presentAlert('No se ha podido cargar el archivo desde el servidor', 'Error');
      });
    }
  }

  loadPDF( url: string, nameFile: string ){
    const downloadUrl = url;
    const path = this.file.dataDirectory;

    const transfer = this.ft.create();
    transfer.download(downloadUrl, path + nameFile).then( entry => {
      const toUrl = entry.toURL();

      if(this.plf.is('ios')){
        this.document.viewDocument(toUrl, 'application/pdf', {});
      }else{
        this.fileOpener.open(toUrl, 'application/pdf')
        .then(() => console.log('File is opened'))
        .catch(e => this.presentAlert('Error opening file '+e, 'Error'));;
      }
    }, error => {
      this.presentAlert(error, 'Error');
    });
  }

  async confirmSignature(item: any){
    const alert = await this.alertCtrl.create({
      header: 'Confirmacion',
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Ingrese su contraseña'
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
            if(data.password === this.password){
              this.signature(item);
            }else{
              this.presentToast('Contraseña de acceso Inválido.');
            }
          }
        }
      ]
    });

    await alert.present();
  }

  signature( item: any ){
    this.presentLoading('Firmando Documento');
    if(this.plf.is('cordova')){
      this.dataServ.firmarDocumentNative(this.rut, this.token, item.tipo, item.id).then( resp => {
        this.loadingCtrl.dismiss();
        const data = JSON.parse(resp.data);
        const message = data.respuesta.data2;
        this.presentAlert(message, 'Exito');
      } ).catch( error => {
        this.loadingCtrl.dismiss();
        this.presentAlert('Falla de comunicación con el servidor, intente mas tarde', 'Error');
        console.log(error);
      });
    }else{
      this.dataServ.firmarDocument(this.rut, this.token, item.tipo, item.id).subscribe( resp => {
        this.loadingCtrl.dismiss();
        console.log(resp);
        const message = resp.respuesta.data2;
        this.presentAlert(message, 'Exito');
      }, error => {
        console.log(error);
        this.loadingCtrl.dismiss();
        this.presentAlert('Falla de comunicación con el servidor, intente mas tarde', 'Error');
      });
    }
  }

  async presentLoading(message: string) {
    const loading = await this.loadingCtrl.create({
      message,
      spinner: 'circles',

    });
    await loading.present();
  }

  async presentAlert(message: string, title: string) {
    const alert = await this.alertCtrl.create({
      subHeader: title,
      message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Boton Ok');
            this.loadDocs();
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(message: any) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }


}
