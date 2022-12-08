import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalInfoLicenciasPageRoutingModule } from './modal-info-licencias-routing.module';

import { ModalInfoLicenciasPage } from './modal-info-licencias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalInfoLicenciasPageRoutingModule
  ],
  declarations: [ModalInfoLicenciasPage]
})
export class ModalInfoLicenciasPageModule {}
