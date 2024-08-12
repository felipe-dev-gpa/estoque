import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela2',
  templateUrl: './tela2.page.html',
  styleUrls: ['./tela2.page.scss'],
})
export class Tela2Page implements OnInit {
  numerodousuario: number = 0; // Inicializando com um valor padrão

  constructor(private alertController: AlertController, private router: Router) {}

  ngOnInit() {}

  async login() {
    const Numerodousuario = 201;

    if (this.numerodousuario !== Numerodousuario) {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Número de usuário incorreto',
        buttons: ['OK']
      });
      await alert.present(); // Apresentando o alerta
    } else {
      this.router.navigate(['/tela3']);
    }
  }
}
