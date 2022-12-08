import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalInfoNotificacionPage } from './modal-info-notificacion.page';

const routes: Routes = [
  {
    path: '',
    component: ModalInfoNotificacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalInfoNotificacionPageRoutingModule {}
