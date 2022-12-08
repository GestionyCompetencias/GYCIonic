import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocFirmaPage } from './doc-firma.page';

const routes: Routes = [
  {
    path: '',
    component: DocFirmaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocFirmaPageRoutingModule {}
