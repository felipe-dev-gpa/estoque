  import { Component } from '@angular/core';
  import { AlertController } from '@ionic/angular';
  import { Router } from '@angular/router'; // Importando Router

  @Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
  })
  export class HomePage {
    numeroAcesso: number = 0; // Inicializando com 0 ou use null se preferir

    constructor(private alertController: AlertController, private router: Router) {} // Adicionando Router no construtor

    async login() {
      // Suponha que o número de acesso correto seja 1234
      const CodigoDeAcesso = 1234;


      if (this.numeroAcesso !== CodigoDeAcesso) {
        const alert = await this.alertController.create({
          header: 'Erro',
          message: 'Número de acesso incorreto!',
          buttons: ['OK']
        });

        await alert.present();
      } else {
        // Navegando para a próxima tela se o número de acesso estiver correto
        this.router.navigate(['/tela2']);
      }
    }
  }
