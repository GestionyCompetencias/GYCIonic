import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalInfoCuentaPageRoutingModule } from './modal-info-cuenta-routing.module';

import { ModalInfoCuentaPage } from './modal-info-cuenta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalInfoCuentaPageRoutingModule
  ],
  declarations: [ModalInfoCuentaPage]
})
export class ModalInfoCuentaPageModule {}
