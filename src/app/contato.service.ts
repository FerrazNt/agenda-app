import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';

import { Observable } from 'rxjs';

import { Contato } from './contato/contato';





@Injectable({
  providedIn: 'root'
})
export class ContatoService {


  baseUrl: string =  environment.apiBaseUrl ;

  url: string = this.baseUrl + '/api/contatos';

  constructor(private http: HttpClient) { 

  } 

  salvar(contato: Contato): Observable<Contato>{
      console.log(contato);
      return this.http.post<Contato>(this.url+"/novo", contato);
  }

}
