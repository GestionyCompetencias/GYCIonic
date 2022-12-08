import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalInfoMarcacionesPageRoutingModule } from './modal-info-marcaciones-routing.module';

import { ModalInfoMarcacionesPage } from './modal-info-marcaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalInfoMarcacionesPageRoutingModule
  ],
  declarations: [ModalInfoMarcacionesPage],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ModalInfoMarcacionesPageModule {}
