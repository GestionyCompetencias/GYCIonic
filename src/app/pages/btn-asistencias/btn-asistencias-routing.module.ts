import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BtnAsistenciasPage } from './btn-asistencias.page';

const routes: Routes = [
  {
    path: '',
    component: BtnAsistenciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BtnAsistenciasPageRoutingModule {}
