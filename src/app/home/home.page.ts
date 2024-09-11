import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  numeroAcesso: string = '';
  senha: string = '';

  constructor(
    private alertController: AlertController,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  async login() {
    try {
      await this.afAuth.signInWithEmailAndPassword(this.numeroAcesso, this.senha);
      this.router.navigate(['/tela3']);
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Número de acesso ou senha incorretos!',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
