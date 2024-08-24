import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoServiceService } from '../produto.service';
import { Produto } from '../produto.service'; // Importando a interface Produto
import { ToastController } from '@ionic/angular'; // Importando o ToastController

@Component({
  selector: 'app-produtoform',
  templateUrl: './produtoform.page.html',
  styleUrls: ['./produtoform.page.scss'],
})
export class ProdutoformPage implements OnInit {
  produto: Produto = { id: '', nome: '', tipo: '' }; // Definindo a propriedade produto

  constructor(
    private produtoService: ProdutoServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private toastCtrl: ToastController // Adicionando o ToastController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const produtoParam = params['produto'];
      if (produtoParam) {
        this.produto = JSON.parse(produtoParam); // Parsing JSON para converter em objeto
      }
    });
  }

  async showMessage(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 4000
    });
    toast.present();
  }

  save() {
    if (this.produto.id) {
      // Atualizar produto existente
      this.produtoService.update(this.produto).subscribe(
        (response) => {
          this.showMessage('Produto atualizado com sucesso!');
          this.router.navigate(['/tela3']); // Redirecionando para a Tela3
        },
        (error) => {
          this.showMessage('Erro ao atualizar produto: ' + error.message);
        }
      );
    } else {
      // Salvar novo produto
      this.produtoService.save(this.produto).subscribe(
        (response) => {
          this.showMessage('Produto salvo com sucesso!');
          this.router.navigate(['/tela3']); // Redirecionando para a Tela3
        },
        (error) => {
          this.showMessage('Erro ao salvar produto: ' + error.message);
        }
      );
    }
  }
}
