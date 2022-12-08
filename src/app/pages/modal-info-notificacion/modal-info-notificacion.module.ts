import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalInfoNotificacionPageRoutingModule } from './modal-info-notificacion-routing.module';

import { ModalInfoNotificacionPage } from './modal-info-notificacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalInfoNotificacionPageRoutingModule
  ],
  declarations: [ModalInfoNotificacionPage]
})
export class ModalInfoNotificacionPageModule {}
