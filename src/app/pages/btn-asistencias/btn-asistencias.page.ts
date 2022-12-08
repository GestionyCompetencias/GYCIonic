import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-btn-asistencias',
  templateUrl: './btn-asistencias.page.html',
  styleUrls: ['./btn-asistencias.page.scss'],
})
export class BtnAsistenciasPage implements OnInit {

  constructor(private actionSheetCtrl: ActionSheetController,
              private navCtrl: NavController) { }

  ngOnInit() {
  }

  async presentActionSheetReports(){
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Reportes',
      backdropDismiss: false,
      mode: 'ios',
      buttons: [{
        text: 'Marcaciones',
        icon: 'arrow-forward-circle',
        handler: () => {
          this.navCtrl.navigateForward('/marcaciones');
        }
      }, {
        text: 'Registro Asistencia',
        icon: 'arrow-forward-circle',
        handler: () => {
          this.navCtrl.navigateForward('/registro-asistencia');
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentActionSheetVacations(){
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Vacaciones',
      mode: 'ios',
      backdropDismiss: false,
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Solicitudes',
        icon: 'arrow-forward-circle',
        handler: () => {
          this.navCtrl.navigateForward('/solicitudes');
        }
      }, {
        text: 'Reportes',
        icon: 'arrow-forward-circle',
        handler: () => {
          this.navCtrl.navigateForward('/reportes');
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentActionSheetPermission(){
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Permisos',
      backdropDismiss: false,
      mode: 'ios',
      buttons: [{
        text: 'Solicitud',
        icon: 'arrow-forward-circle',
        handler: () => {
          this.navCtrl.navigateForward('/permiso-solicitud');
        }
      }, {
        text: 'Consulta',
        icon: 'arrow-forward-circle',
        handler: () => {
          this.navCtrl.navigateForward('/permiso-consulta');
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async presentActionSheetMedicine(){
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Licencia Médica',
      backdropDismiss: false,
      mode: 'ios',
      buttons: [{
        text: 'Consulta',
        icon: 'arrow-forward-circle',
        handler: () => {
          this.navCtrl.navigateForward('/medica-consulta');
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
