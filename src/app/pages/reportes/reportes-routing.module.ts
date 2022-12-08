import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportesPage } from './reportes.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'reportes/vacacion',
    pathMatch: 'prefix'
  },
  {
    path: 'reportes',
    component: ReportesPage,
    children: [
      {
        path: 'vacacion',
        loadChildren: () => import('../periodo-vacacion/periodo-vacacion.module').then( m => m.PeriodoVacacionPageModule)
      },
      {
        path: 'utilizados',
        loadChildren: () => import('../periodo-utilizado/periodo-utilizado.module').then( m => m.PeriodoUtilizadoPageModule)
      },
      {
        path: 'cuenta',
        loadChildren: () => import('../cuenta/cuenta.module').then( m => m.CuentaPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesPageRoutingModule {}
