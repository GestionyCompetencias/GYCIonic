import { Component, Input, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-modal-info-licencias',
  templateUrl: './modal-info-licencias.page.html',
  styleUrls: ['./modal-info-licencias.page.scss'],
})
export class ModalInfoLicenciasPage implements OnInit {

  @Input() CODIGO_LICENCIA: number;
  @Input() COMENTARIO: string;
  @Input() DIAS: number;
  @Input() FINICIO: string;
  @Input() FTERMINO: string;
  @Input() ID: number;
  @Input() PDF: string;
  @Input() PERSONA: string;
  @Input() TIPOLICENCIASMEDICAS: string;
  @Input() TIPOMEDICO: string;
  @Input() TIPO_LICENCIA: number;
  @Input() TIPO_MEDICO: string;
  @Input() TRABAJADOR: string;

  token: string;
  trabajador: string;

  constructor(private modalCtrl: ModalController,
              private dataServ: DataService,
              private plt: Platform,
              private storage: Storage) { }

  ngOnInit() {
    this.storage.create();
  }

  async loadNameTrabajador(){
    this.token = await this.storage.get('token');
    this.dataServ.getInfoPersonal(this.TRABAJADOR, this.token).subscribe( resp => {
      this.trabajador = resp.trabajador.Data.trabajador.apaterno;
      this.trabajador += ' '+resp.trabajador.Data.trabajador.amaterno;
      this.trabajador += ' '+resp.trabajador.Data.trabajador.nombre;
    });
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
