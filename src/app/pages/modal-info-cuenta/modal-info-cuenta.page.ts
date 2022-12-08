import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-info-cuenta',
  templateUrl: './modal-info-cuenta.page.html',
  styleUrls: ['./modal-info-cuenta.page.scss'],
})
export class ModalInfoCuentaPage implements OnInit {

  @Input() diasacu: string;
  @Input() diascom: string;
  @Input() diasocu: string;
  @Input() diaspen: string;
  @Input() diastot: string;
  @Input() diasusa: string;
  @Input() fcompe: string;
  @Input() finivac: string;
  @Input() ftervac: string;
  @Input() nrt_ruttr: string;
  @Input() periodo: string;
  @Input() tiporden: string;
  @Input() tipouso: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
