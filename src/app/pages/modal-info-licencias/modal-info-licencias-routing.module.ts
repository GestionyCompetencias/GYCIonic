import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalInfoLicenciasPage } from './modal-info-licencias.page';

const routes: Routes = [
  {
    path: '',
    component: ModalInfoLicenciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalInfoLicenciasPageRoutingModule {}
