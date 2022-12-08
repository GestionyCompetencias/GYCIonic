import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocFirmaPageRoutingModule } from './doc-firma-routing.module';

import { DocFirmaPage } from './doc-firma.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    DocFirmaPageRoutingModule
  ],
  declarations: [DocFirmaPage]
})
export class DocFirmaPageModule {}
