import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-marker',
  templateUrl: './modal-marker.page.html',
  styleUrls: ['./modal-marker.page.scss'],
})
export class ModalMarkerPage implements OnInit {

  @Input() image: any;
  @Input() rut: any;
  @Input() fecha: any;
  @Input() hora: any;
  @Input() status: any;
  @Input() message: string;
  @Input() tipo: string;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  IMAGE_PATH: any;


  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    //this.IMAGE_PATH = 'data:image/jpeg;base64,' + this.image;
    this.loadInfoModal();
  }

  loadInfoModal(){
    let successP = document.getElementById('successP');
    let errorP = document.getElementById('errorP');
    let messag = document.getElementById('messag');
    let messageNull = document.getElementById('messageNull');

    
    
    if(this.status === 'success'){
      successP.style.display="block";
      errorP.style.display="none";
      console.log("entro a success", this.status);
    }else{
      errorP.style.display="block";
      successP.style.display="none";
      console.log("entro a error", this.status);
    }
    
    if (this.message === null) {
      messag.style.display="none";
      messageNull.style.display="block";
    } else {
      messageNull.style.display="none";
      messag.style.display="block";
    }
  }

  onCloseModal(){
    this.modalCtrl.dismiss('Modal Close');
  }

}