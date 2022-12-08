import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalMarkerPageRoutingModule } from './modal-marker-routing.module';

import { ModalMarkerPage } from './modal-marker.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalMarkerPageRoutingModule
  ],
  declarations: [ModalMarkerPage]
})
export class ModalMarkerPageModule {}
