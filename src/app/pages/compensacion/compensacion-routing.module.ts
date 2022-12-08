import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompensacionPage } from './compensacion.page';

const routes: Routes = [
  {
    path: '',
    component: CompensacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompensacionPageRoutingModule {}
