import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-info-usados',
  templateUrl: './modal-info-usados.page.html',
  styleUrls: ['./modal-info-usados.page.scss'],
})
export class ModalInfoUsadosPage implements OnInit {

  @Input() ano_inicio: number;
  @Input() ano_termino: number;
  @Input() correl: number;
  @Input() dias_admin: number;
  @Input() dias_contr: number;
  @Input() dias_corri: number;
  @Input() dias_especi: number;
  @Input() dias_faena: number;
  @Input() dias_legal: number;
  @Input() dias_otros: number;
  @Input() dias_progr: number;
  @Input() fec_inivac: string;
  @Input() fec_tervac: string;
  @Input() fec_transa: string;
  @Input() nro_solici: number;
  @Input() nrt_ruttr: string;
  @Input() rut_empr: string;
  @Input() tip_uso: string;

  finicio: any;
  ftermino: any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
