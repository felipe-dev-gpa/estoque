import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tela2Page } from './tela2.page';

const routes: Routes = [
  {
    path: '',
    component: Tela2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tela2PageRoutingModule {}
