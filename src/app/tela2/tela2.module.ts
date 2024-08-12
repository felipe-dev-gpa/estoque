import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tela2PageRoutingModule } from './tela2-routing.module';

import { Tela2Page } from './tela2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tela2PageRoutingModule
  ],
  declarations: [Tela2Page]
})
export class Tela2PageModule {}
