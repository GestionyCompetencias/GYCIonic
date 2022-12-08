import { Component, OnInit } from '@angular/core';
import { ModalInfoDocumentosPage } from '../modal-info-documentos/modal-info-documentos.page';
import { DataService } from 'src/app/services/data.service';
import { LoadingController, Platform, ModalController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {

  dataFind = {
    rut: '',
    user: '',
    tipo: '',
  };

  token: string;

  documents: any[] = [];

  tipoOpc: any[] = [];

  constructor(private dataServ: DataService,
              private loadingCtrl: LoadingController,
              private storage: Storage,
              private plt: Platform,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController) { }

  async ngOnInit() {
    this.storage.create();
    await this.loadInfoUSer();
    this.dataFind.tipo = '0';
    await this.loadTiposDoc();
  }

  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando Documentos...',
    });
    await loading.present();
  }

  async loadInfoUSer(){
    this.dataFind.rut = await this.storage.get('rut');
    this.token = await this.storage.get('token');
    this.dataServ.getInfoPersonal(this.dataFind.rut, this.token).subscribe( resp => {
      this.dataFind.user = resp.respuesta.data2.apaterno;
      this.dataFind.user += ' '+resp.respuesta.data2.amaterno;
      this.dataFind.user += ' '+resp.respuesta.data2.nombre;
    });
  }

  async loadTiposDoc(){
    this.dataFind.rut = await this.storage.get('rut');
    this.token = await this.storage.get('token');
    this.dataServ.getTipoDocumentos(this.dataFind.rut, this.token).subscribe( resp => {
      console.log('tipos Doc.', resp);
      this.tipoOpc = resp.respuesta.data2;
    });
  }

  onSubmitFind(){
    this.presentLoading();
    this.dataServ.getInfoDocumentacion(this.dataFind, this.token).subscribe( resp => {
      this.loadingCtrl.dismiss();
      if (resp.respuesta.data2 !== null && resp.respuesta.data2.length > 0) {
        this.documents = resp.respuesta.data2;
      } else {
        this.presentAlert('No posee documentos registrados.');
      }
      console.log(resp);
    });
  }

  async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message,
      buttons: ['Ok']
    });

    await alert.present();
  }

  async detail(item){
    console.log( item );
    const modal = await this.modalCtrl.create({
      component: ModalInfoDocumentosPage,
      componentProps: item
    });

    await modal.present();
  }

}
