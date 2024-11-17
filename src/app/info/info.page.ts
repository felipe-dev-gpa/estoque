import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoServiceService, Produto } from '../produto.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  constructor(
    private produtoService: ProdutoServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private toastCtrl: ToastController
  ) { }
  GotoTela3() {
    this.router.navigate(['/tela3']);
  }
  

  ngOnInit() {
  }

}
