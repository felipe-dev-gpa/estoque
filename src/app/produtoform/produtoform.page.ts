import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoServiceService, Produto } from '../produto.service';
import { ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms'; // Import necessário para usar NgForm

@Component({
  selector: 'app-produtoform',
  templateUrl: './produtoform.page.html',
  styleUrls: ['./produtoform.page.scss'],
})
export class ProdutoformPage implements OnInit {
  produto: Produto = { id: '', nome: '', tipo: '', local: '', codigoDeBarra: '', marca: '' };

  @ViewChild('produtoForm', { static: false }) produtoForm!: NgForm; // Adicione o operador de asserção de não nulo

  constructor(
    private produtoService: ProdutoServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const produtoParam = params['produto'];
      if (produtoParam) {
        this.produto = JSON.parse(produtoParam);
      }
    });
  }

  async showMessage(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 4000
    });
    await toast.present();
  }

  save() {
    if (this.produtoForm.valid) { // Verifica se o formulário é válido
      if (this.produto.id) {
        // Atualizar produto existente
        this.produtoService.update(this.produto).subscribe(
          () => {
            this.showMessage('Produto atualizado com sucesso!');
            this.router.navigate(['/tela3']);
          },
          (error) => {
            this.showMessage('Erro ao atualizar produto: ' + error.message);
          }
        );
      } else {
        // Salvar novo produto
        this.produtoService.save({ ...this.produto, id: this.generateUniqueId() }).subscribe(
          () => {
            this.showMessage('Produto salvo com sucesso!');
            this.router.navigate(['/tela3']);
          },
          (error) => {
            this.showMessage('Erro ao salvar produto: ' + error.message);
          }
        );
      }
    } else {
      this.showMessage('Por favor, preencha todos os campos obrigatórios.');
    }
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
