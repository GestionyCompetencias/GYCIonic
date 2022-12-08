import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalInfoDocumentosPage } from './modal-info-documentos.page';

const routes: Routes = [
  {
    path: '',
    component: ModalInfoDocumentosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalInfoDocumentosPageRoutingModule {}
