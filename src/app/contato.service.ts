import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Contato } from './contato/contato';
import { environment } from '../environments/environment';




@Injectable({
  providedIn: 'root'
})
export class ContatoService {


  url: string =  environment.apiBaseUrl + "/api/contatos";

  constructor(private http: HttpClient) { 

  } 

  salvar(contato: Contato): Observable<Contato>{
      return this.http.post<Contato>(this.url+"/novo", contato);
  }

}
