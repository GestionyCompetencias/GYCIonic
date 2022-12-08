import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PeriodoUtilizadoPageRoutingModule } from './periodo-utilizado-routing.module';

import { PeriodoUtilizadoPage } from './periodo-utilizado.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PeriodoUtilizadoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PeriodoUtilizadoPage]
})
export class PeriodoUtilizadoPageModule {}
