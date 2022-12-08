import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalInfoAsistenciasPage } from './modal-info-asistencias.page';

const routes: Routes = [
  {
    path: '',
    component: ModalInfoAsistenciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalInfoAsistenciasPageRoutingModule {}
