import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Importando o HttpClientModule

// Importações necessárias para o Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,

    // Declare outros componentes aqui, se necessário
    // Tela3Page não precisa ser declarada aqui, pois é carregada pelo AppRoutingModule
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Adicionando HttpClientModule para permitir requisições HTTP
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,

    // Inicializando o Firebase com as configurações do projeto
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule // Módulo de autenticação do Firebase
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    // Não é necessário declarar ProdutoServiceService aqui, pois é fornecido em 'root'
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
