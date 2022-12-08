import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PermisoConsultaPageRoutingModule } from './permiso-consulta-routing.module';

import { PermisoConsultaPage } from './permiso-consulta.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PermisoConsultaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PermisoConsultaPage]
})
export class PermisoConsultaPageModule {}
