import { Component, OnInit } from '@angular/core';
import { Contato } from './contato';
import { ContatoService } from '../contato.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  nome: string = "Teste";

  constructor(private servico: ContatoService){
    
  }

  ngOnInit(): void {

    let contato: Contato = new Contato();
    contato.nome="José Gregório Ferraz";
    contato.email="gregorioferraznt@gmail.com";
    contato.favorito=true;
    
    this.servico
          .salvar(contato)
          .subscribe({
            next(value) {
              console.log(value);
            },
            error(err) {
                console.log(err);
            },
          });
  }
  


}
