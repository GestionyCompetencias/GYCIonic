import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VacacionesPage } from './vacaciones.page';

const routes: Routes = [
  {
    path: '',
    component: VacacionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacacionesPageRoutingModule {}
