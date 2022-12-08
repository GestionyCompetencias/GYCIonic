import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-info-asistencias',
  templateUrl: './modal-info-asistencias.page.html',
  styleUrls: ['./modal-info-asistencias.page.scss'],
})
export class ModalInfoAsistenciasPage implements OnInit {

  @Input() diasem: string;
  @Input() fecha: string;
  @Input() horastrabajadas: string;
  @Input() horasturno: string;
  @Input() id: number;
  @Input() inasistencia: string;
  @Input() manualentrada: string;
  @Input() manualsalida: string;
  @Input() marcaentrada: string;
  @Input() marcasalida: string;
  @Input() retrasos: string;
  @Input() sobretiempos: string;
  @Input() turnoentrada: string;
  @Input() turnosalida: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
