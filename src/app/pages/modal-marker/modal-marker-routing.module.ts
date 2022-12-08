import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalMarkerPage } from './modal-marker.page';

const routes: Routes = [
  {
    path: '',
    component: ModalMarkerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalMarkerPageRoutingModule {}
