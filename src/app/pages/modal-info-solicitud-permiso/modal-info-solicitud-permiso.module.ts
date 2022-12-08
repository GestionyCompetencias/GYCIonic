import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalInfoSolicitudPermisoPageRoutingModule } from './modal-info-solicitud-permiso-routing.module';

import { ModalInfoSolicitudPermisoPage } from './modal-info-solicitud-permiso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalInfoSolicitudPermisoPageRoutingModule
  ],
  declarations: [ModalInfoSolicitudPermisoPage]
})
export class ModalInfoSolicitudPermisoPageModule {}
