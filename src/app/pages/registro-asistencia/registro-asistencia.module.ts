import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroAsistenciaPageRoutingModule } from './registro-asistencia-routing.module';

import { RegistroAsistenciaPage } from './registro-asistencia.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroAsistenciaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RegistroAsistenciaPage]
})
export class RegistroAsistenciaPageModule {}
