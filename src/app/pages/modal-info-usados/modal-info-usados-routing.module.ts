import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalInfoUsadosPage } from './modal-info-usados.page';

const routes: Routes = [
  {
    path: '',
    component: ModalInfoUsadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalInfoUsadosPageRoutingModule {}
