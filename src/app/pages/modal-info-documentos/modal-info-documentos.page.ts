import { Component, Input, OnInit } from '@angular/core';
import { File } from "@awesome-cordova-plugins/file/ngx";
import { FileTransfer, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { ModalController, Platform, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modal-info-documentos',
  templateUrl: './modal-info-documentos.page.html',
  styleUrls: ['./modal-info-documentos.page.scss'],
})
export class ModalInfoDocumentosPage implements OnInit {

  @Input() trabajador: string;
  @Input() nombre: string;
  @Input() tipo: string;
  @Input() descripcion: string;
  @Input() inicio: string;
  @Input() termino: string;
  @Input() archivo: string;
  @Input() url: string;

  fileTransfer: FileTransferObject;

  constructor(private modalCtrl: ModalController,
              private plt: Platform,
              private transfer: FileTransfer,
              private file: File,
              private http: HTTP,
              private alertCtrl: AlertController) { }

    ngOnInit() {
      this.fileTransfer = this.transfer.create();
    }


  cerrarModal(){
    this.modalCtrl.dismiss();
  }

  downloadFile( _url: string){
    let url = _url.substring(28);
    url = 'https://'+url;

    this.fileTransfer.download(_url, this.file.dataDirectory + this.archivo).then( (entry) => {
      console.log("Descarga completada: ", entry.toUrl());
    }, (error) =>{
      console.log("download error source " + error.source);
      console.log("download error target " + error.target);
      console.log("download error code" + error.code);
    });

    /* const request: DownloadRequest = {
      uri: _url,
      title: 'Documentos Trabajador',
      description: '',
      mimeType: '',
      visibleInDownloadsUi: true,
      notificationVisibility: NotificationVisibility.VisibleNotifyCompleted,
      destinationInExternalFilesDir: {
          dirType: 'Downloads',
          subPath: this.archivo
      }
    }; */



    /* this.downloader.download(request)
              .then((location: string) => this.presentAlert('Archivo descargado satisfactoriamente'))
              .catch((error: any) => this.presentAlert('Archivo no encontraado en el servidor')); */

    /* if (this.plt.is('cordova')) {
      const filePath = this.file.dataDirectory + this.archivo;
      this.http.downloadFile(_url, {}, {}, filePath).then(response => {
        console.log("Descarga completada", response);
      });
    } else {
      
    } */
  }

  async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message,
      buttons: ['Ok']
    });

    await alert.present();
  }

}
