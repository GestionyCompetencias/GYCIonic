import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BtnDocumentalPageRoutingModule } from './btn-documental-routing.module';

import { BtnDocumentalPage } from './btn-documental.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BtnDocumentalPageRoutingModule,
    ComponentsModule
  ],
  declarations: [BtnDocumentalPage]
})
export class BtnDocumentalPageModule {}
