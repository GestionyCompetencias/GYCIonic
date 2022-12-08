import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarcacionesPageRoutingModule } from './marcaciones-routing.module';

import { MarcacionesPage } from './marcaciones.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarcacionesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MarcacionesPage]
})
export class MarcacionesPageModule {}
