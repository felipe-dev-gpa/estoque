import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProdutoformPageRoutingModule } from './produtoform-routing.module';

import { ProdutoformPage } from './produtoform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProdutoformPageRoutingModule
  ],
  declarations: [ProdutoformPage]
})
export class ProdutoformPageModule {}
