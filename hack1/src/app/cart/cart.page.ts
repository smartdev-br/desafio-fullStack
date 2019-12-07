import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  public produtos;

  constructor() { }

  ngOnInit() {
    var result = JSON.parse(localStorage.getItem("cart"))
    console.log(result);
    this.produtos = result;
  }

  remover(){
    localStorage.removeItem("cart")
  }
}
