import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  numeroAcesso: number = 0; // Inicializando com 0 ou use null se preferir
  senha: string = ''; // Adicionando a variável para a senha

  constructor(
    private alertController: AlertController,
    private router: Router
  ) {}

  async login() {
    const CodigoDeAcesso = 1234;
    const SenhaCorreta = 'senha123'; // Suponha que esta seja a senha correta

    if (this.numeroAcesso !== CodigoDeAcesso || this.senha !== SenhaCorreta) {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Número de acesso ou senha incorretos!',
        buttons: ['OK']
      });

      await alert.present();
    } else {
      this.router.navigate(['/tela3']); // Navegando para a próxima tela se os dados estiverem corretos
    }
  }
}
