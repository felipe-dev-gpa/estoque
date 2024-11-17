import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { ProdutoServiceService, Produto } from './../produto.service';
import * as XLSX from 'xlsx';
import * as Quagga from 'quagga';

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

  GoToInfo(){
    this.navCtrl.navigateForward('/info');
  }

  GoToHome(){
    this.navCtrl.navigateForward('/home');
  }

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
  exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.filteredProdutos); // Converte os produtos filtrados em uma planilha
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Produtos');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'produtos');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';

    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });

    const link = document.createElement('a');
    const url = window.URL.createObjectURL(data);
    link.href = url;
    link.download = fileName + EXCEL_EXTENSION;
    link.click();
    window.URL.revokeObjectURL(url);
  }
  startBarcodeScanner() {
    Quagga.init(
      {
        inputStream: {
          name: 'Live',
          type: 'LiveStream',
          target: document.querySelector('#scanner-container'), // Elemento para renderizar o scanner
        },
        decoder: {
          readers: ['code_128_reader'], // Tipos de códigos de barras suportados
        },
      },
      (err: Error | null) => {
        if (err) {
          console.error('Erro ao inicializar o scanner:', err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((result: any) => {
      if (result && result.codeResult && result.codeResult.code) {
        this.searchTerm = result.codeResult.code; // Insere o código de barras na barra de busca
        this.filterItems(); // Filtra os produtos com base no código escaneado
        Quagga.stop(); // Para o scanner após a detecção
      }
    });
  }
}
