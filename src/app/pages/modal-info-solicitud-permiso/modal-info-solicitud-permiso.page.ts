import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-info-solicitud-permiso',
  templateUrl: './modal-info-solicitud-permiso.page.html',
  styleUrls: ['./modal-info-solicitud-permiso.page.scss'],
})
export class ModalInfoSolicitudPermisoPage implements OnInit {

  @Input() AUTORIZAEMPRESA: boolean;
  @Input() AUTORIZATRABAJADOR:  boolean;
  @Input() COMPENSADO:  number;
  @Input() FECHA:  string;
  @Input() FINICIO:  string;
  @Input() FTERMINO:  string;
  @Input() ID:  number;
  @Input() MOTIVO:  string;
  @Input() TRABAJADOR:  string;

  constructor(private modalCtrl: ModalController) { }


  ngOnInit() {
    this.loadAutosizacionItem();
  }

  loadAutosizacionItem(){
    let autorizado = document.getElementById('autorizado');
    let pendiente = document.getElementById('pendiente');

    if(this.AUTORIZAEMPRESA){
      autorizado.style.display="block";
      pendiente.style.display="none"
    }else{
      pendiente.style.display="block"
      autorizado.style.display="none";
    }
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
