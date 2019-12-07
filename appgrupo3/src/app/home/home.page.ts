import { Component } from '@angular/core';
import { DadosService } from '../services.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  items: Observable<any[]>;

  constructor(public services:DadosService) {
    
    services.getProdutos().subscribe((res:any) => {
      console.log(res);
      this.items = res;
    })
  
  }

}
