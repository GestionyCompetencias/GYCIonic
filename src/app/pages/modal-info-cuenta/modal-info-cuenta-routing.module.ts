import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalInfoCuentaPage } from './modal-info-cuenta.page';

const routes: Routes = [
  {
    path: '',
    component: ModalInfoCuentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalInfoCuentaPageRoutingModule {}
