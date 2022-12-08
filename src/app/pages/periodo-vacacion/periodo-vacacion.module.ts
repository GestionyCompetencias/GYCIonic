import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PeriodoVacacionPageRoutingModule } from './periodo-vacacion-routing.module';

import { PeriodoVacacionPage } from './periodo-vacacion.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PeriodoVacacionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PeriodoVacacionPage]
})
export class PeriodoVacacionPageModule {}
