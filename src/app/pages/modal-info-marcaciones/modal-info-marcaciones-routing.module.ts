import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalInfoMarcacionesPage } from './modal-info-marcaciones.page';

const routes: Routes = [
  {
    path: '',
    component: ModalInfoMarcacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalInfoMarcacionesPageRoutingModule {}
