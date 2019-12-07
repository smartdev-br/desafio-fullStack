import { Component } from '@angular/core';
import { DadosService } from '../services.service';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  items: Observable<any[]>;
  cartItems = [];
  constructor(public services: DadosService, private storage: Storage) {

    services.getProdutos().subscribe((res: any) => {
      console.log(res);
      this.items = res;
    })



  }
  addToCart(item: any) {
    this.cartItems.push(item);
    this.storage.set("carrinho", this.cartItems);
    this.storage.get('carrinho').then(res => {
      console.log("O CARRINHO", res);
    });
  }

}
