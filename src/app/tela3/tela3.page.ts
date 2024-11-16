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
  filteredProdutos: Produto[] = []; // Lista filtrada de produtos
  searchTerm: string = ''; // Termo de busca

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
        this.filteredProdutos = dados; // Inicializa a lista filtrada com todos os produtos
      },
      (error) => {
        console.error('Erro ao carregar produtos', error);
      }
    );
  }

  filterItems() {
    const searchTermLower = this.searchTerm.toLowerCase(); // Converte para minúsculas para uma busca case-insensitive
    this.filteredProdutos = this.produtos.filter(produto =>
      produto.marca.toLowerCase().includes(searchTermLower) ||
      produto.nome.toLowerCase().includes(searchTermLower) ||
      produto.tipo.toLowerCase().includes(searchTermLower) ||
      produto.local.toLowerCase().includes(searchTermLower) ||
      produto.codigoDeBarra.toLowerCase().includes(searchTermLower) ||
      produto.id.includes(this.searchTerm)
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
    event.stopPropagation(); // Impede que o clique no botão de exclusão acione o clique do item

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
              (error) => {
                console.error('Erro ao excluir produto', error);
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }
}
