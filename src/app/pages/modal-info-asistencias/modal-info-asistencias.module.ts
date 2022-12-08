import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalInfoAsistenciasPageRoutingModule } from './modal-info-asistencias-routing.module';

import { ModalInfoAsistenciasPage } from './modal-info-asistencias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalInfoAsistenciasPageRoutingModule
  ],
  declarations: [ModalInfoAsistenciasPage]
})
export class ModalInfoAsistenciasPageModule {}
