import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalInfoDocumentosPageRoutingModule } from './modal-info-documentos-routing.module';

import { ModalInfoDocumentosPage } from './modal-info-documentos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalInfoDocumentosPageRoutingModule
  ],
  declarations: [ModalInfoDocumentosPage]
})
export class ModalInfoDocumentosPageModule {}
