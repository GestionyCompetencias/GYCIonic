import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicaConsultaPage } from './medica-consulta.page';

const routes: Routes = [
  {
    path: '',
    component: MedicaConsultaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicaConsultaPageRoutingModule {}
