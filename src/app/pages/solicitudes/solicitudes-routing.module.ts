import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitudesPage } from './solicitudes.page';

const routes: Routes = [
  {
    path: 'solicitudes',
    component: SolicitudesPage,
    children: [
      {
        path: 'vacaciones',
        loadChildren: () => import('../vacaciones/vacaciones.module').then( m => m.VacacionesPageModule)
      },
      {
        path: 'compensacion',
        loadChildren: () => import('../compensacion/compensacion.module').then( m => m.CompensacionPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'solicitudes/vacaciones',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitudesPageRoutingModule {}
