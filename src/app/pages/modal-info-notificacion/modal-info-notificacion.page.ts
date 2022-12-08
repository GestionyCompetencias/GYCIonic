import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-info-notificacion',
  templateUrl: './modal-info-notificacion.page.html',
  styleUrls: ['./modal-info-notificacion.page.scss'],
})
export class ModalInfoNotificacionPage implements OnInit {

  @Input() TIPO: string;
  @Input() FECHA: string;
  @Input() OBSERVACION: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
