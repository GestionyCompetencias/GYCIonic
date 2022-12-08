import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermisoConsultaPage } from './permiso-consulta.page';

const routes: Routes = [
  {
    path: '',
    component: PermisoConsultaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermisoConsultaPageRoutingModule {}
