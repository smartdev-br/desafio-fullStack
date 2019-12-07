import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DadosService {

  private Produtos: Observable<any[]>;
  private ProdutosCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {

    this.ProdutosCollection = this.afs.collection<any>('produtos');

    this.Produtos = this.ProdutosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

  }

  getProdutos(): Observable<any[]> {
    console.log("Getting", this.Produtos);
    return this.Produtos;
  }

  getProduto(id: string): Observable<any> {
    return this.ProdutosCollection.doc<any>(id).valueChanges().pipe(
      take(1),
      map(idea => {
        idea.id = id;
        return idea
      })
    );
  }

  addProduto(dados: any): Promise<DocumentReference> {
    return this.ProdutosCollection.add(dados);
  }

  updateProduto(dados: any): Promise<void> {
    return this.ProdutosCollection.doc(dados.id).update(
      {
        nome: dados.nome,
        descricao: dados.descricao,
        imagem: dados.imagem,
        preco: dados.preco
      }
    );
  }

  deletarProduto(id: string): Promise<void> {
    return this.ProdutosCollection.doc(id).delete();
  }

}
