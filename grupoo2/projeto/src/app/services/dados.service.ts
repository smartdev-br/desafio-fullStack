import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Produto {
  id?: string,
  descricao: "String",
  imagem: "string",
  nome: "string",
  preco: number,
}
@Injectable({
  providedIn: 'root'
})
export class DadosService {

  private Produtos: Observable<Produto[]>;
  private ProdutosCollection: AngularFirestoreCollection<Produto>;

  constructor(private afs: AngularFirestore) {

    this.ProdutosCollection = this.afs.collection<Produto>('Produtos');

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

  getProdutos(): Observable<Produto[]> {
    return this.Produtos;
  }

  getProduto(id: string): Observable<Produto> {
    return this.ProdutosCollection.doc<Produto>(id).valueChanges().pipe(
      take(1),
      map(idea => {
        idea.id = id;
        return idea
      })
    );
  }

  addProduto(dados: Produto): Promise<DocumentReference> {
    return this.ProdutosCollection.add(dados);
  }

  updateProduto(dados: Produto): Promise<void> {
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
