import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define a interface para o Produto
export interface Produto {
  marca: string;
  id: string;
  nome: string;
  tipo: string;
  local: string;
  codigoDeBarra: string;
}

@Injectable({
  providedIn: 'root', // Isso torna o serviço disponível em toda a aplicação
})
export class ProdutoServiceService {
  // URL da API
  private url = 'http://localhost:3000/produtos';

  constructor(private http: HttpClient) {}

  // Método para obter a lista de produtos
  list(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.url); // Retorna um Observable do tipo Produto[]
  }

  // Método para salvar um produto
  save(obj: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.url, obj);
  }

  // Método para atualizar um produto
  update(obj: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.url}/${obj.id}`, obj);
  }

  // Método para excluir um produto
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
