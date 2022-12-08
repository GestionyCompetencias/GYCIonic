import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalInfoUsadosPageRoutingModule } from './modal-info-usados-routing.module';

import { ModalInfoUsadosPage } from './modal-info-usados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalInfoUsadosPageRoutingModule
  ],
  declarations: [ModalInfoUsadosPage]
})
export class ModalInfoUsadosPageModule {}
