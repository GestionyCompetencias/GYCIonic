import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BtnDocumentalPage } from './btn-documental.page';

const routes: Routes = [
  {
    path: '',
    component: BtnDocumentalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BtnDocumentalPageRoutingModule {}
