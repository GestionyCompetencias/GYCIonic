import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalInfoSolicitudPermisoPage } from './modal-info-solicitud-permiso.page';

const routes: Routes = [
  {
    path: '',
    component: ModalInfoSolicitudPermisoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalInfoSolicitudPermisoPageRoutingModule {}
