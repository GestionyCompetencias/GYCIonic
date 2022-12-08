import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PeriodoUtilizadoPage } from './periodo-utilizado.page';

const routes: Routes = [
  {
    path: '',
    component: PeriodoUtilizadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeriodoUtilizadoPageRoutingModule {}
