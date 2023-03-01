import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';

import { Observable } from 'rxjs';

import { Contato } from './contato/contato';
import { PaginaContato } from './contato/paginaContato';





@Injectable({
  providedIn: 'root'
})
export class ContatoService {


  baseUrl: string =  environment.apiBaseUrl ;

  url: string = this.baseUrl + '/api/contatos';

  constructor(private http: HttpClient) { 

  } 

  salvar(contato: Contato): Observable<Contato>{
      return this.http.post<any>(this.url+"/novo", contato);
  }

  buscarTudo(page: number, size: number): Observable<PaginaContato>{
    const parametros = new HttpParams()
                              .set('page', page)
                              .set('size', size);
    return this.http.get<any>(`${this.url}/?${parametros.toString()}`);
  }

  favoritar(contato: Contato) : Observable<any>{
    return this.http.patch<any>(`${this.url}/${contato.id}/favorito`, null);
  }

  uploadFoto(contato: Contato, formData: FormData) : Observable<any>{
    return this.http.put(`${this.url}/${contato.id}/foto`, formData, { responseType: 'blob' });
  }

}
