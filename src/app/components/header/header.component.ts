import { Component, Input, OnInit } from '@angular/core';
import { PopUserComponent } from '../pop-user/pop-user.component';
import { PopoverController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title: string;

  constructor(private popoverCtrl: PopoverController,
              private navCtrl: NavController) { }

  ngOnInit() {}

  async mostrarPopover( evento ){

    const popover = await this.popoverCtrl.create({
      component: PopUserComponent,
      event: evento,
      mode: 'ios'
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();
    console.log('Padre', data);

  }

  loadNotificaciones(){
    this.navCtrl.navigateForward('/notificaciones');
  }

}
