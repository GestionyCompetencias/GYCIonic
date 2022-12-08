import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompensacionPageRoutingModule } from './compensacion-routing.module';

import { CompensacionPage } from './compensacion.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompensacionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CompensacionPage]
})
export class CompensacionPageModule {}
