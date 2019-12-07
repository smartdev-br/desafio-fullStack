import { Component } from '@angular/core';
import { DadosService } from '../services/dados.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  items: Observable<any[]>;


  constructor(public dadosService: DadosService) {
    this.getProducts();
  }

  getProducts() {
    console.log("aaa")
    this.dadosService.getProdutos().subscribe((res:any) => { 
      this.items = res;
      console.log(res);
    })
  }
}
