import { Component } from '@angular/core';
import { DadosService } from '../services.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public services:DadosService) {
    services.getProdutos().subscribe((res:any) => {
      console.log(res);
    })
  }

}
