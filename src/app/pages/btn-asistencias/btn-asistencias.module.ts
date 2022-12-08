import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BtnAsistenciasPageRoutingModule } from './btn-asistencias-routing.module';

import { BtnAsistenciasPage } from './btn-asistencias.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BtnAsistenciasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [BtnAsistenciasPage]
})
export class BtnAsistenciasPageModule {}
