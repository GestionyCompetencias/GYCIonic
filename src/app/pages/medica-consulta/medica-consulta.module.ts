import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicaConsultaPageRoutingModule } from './medica-consulta-routing.module';

import { MedicaConsultaPage } from './medica-consulta.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicaConsultaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MedicaConsultaPage]
})
export class MedicaConsultaPageModule {}
