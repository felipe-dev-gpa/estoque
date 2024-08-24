import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ProdutoServiceService, Produto } from './../produto.service';

@Component({
  selector: 'app-tela3',
  templateUrl: './tela3.page.html',
  styleUrls: ['./tela3.page.scss'],
})
export class Tela3Page implements OnInit {
  produtos: Produto[] = [];

  constructor(
    public produtoService: ProdutoServiceService,
    private navCtrl: NavController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loadProdutos();
  }

  ionViewWillEnter() {
    this.loadProdutos();
  }

  loadProdutos() {
    this.produtoService.list().subscribe(
      (dados) => {
        this.produtos = dados;
      },
      (error) => {
        console.error('Erro ao carregar produtos', error);
      }
    );
  }

  goToForm() {
    this.navCtrl.navigateForward('/produtoform');
  }

  goToEdit(produto: Produto) {
    this.navCtrl.navigateForward(['/produtoform'], {
      queryParams: { produto: JSON.stringify(produto) }
    });
  }

  async deleteProduto(event: Event, produto: Produto) {
    event.stopPropagation(); // Previne a propagação do click

    const alert = await this.alertCtrl.create({
      header: 'Excluir Produto',
      message: `Tem certeza de que deseja excluir o produto ${produto.nome}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Exclusão cancelada');
          }
        },
        {
          text: 'Excluir',
          handler: () => {
            this.produtoService.delete(produto.id).subscribe(
              () => {
                this.loadProdutos();
                console.log('Produto excluído com sucesso!');
              },
              async (error) => {
                console.error('Erro ao excluir produto', error);
                const errorAlert = await this.alertCtrl.create({
                  header: 'Erro',
                  message: 'Erro ao excluir produto: ' + error.message,
                  buttons: ['OK']
                });
                await errorAlert.present();
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }
}
