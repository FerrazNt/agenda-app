import { Component, OnInit } from '@angular/core';
import { Contato } from './contato';
import { ContatoService } from '../contato.service';



import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario!: FormGroup;
  contatos: Contato[] = [];

  constructor(
    private servico: ContatoService,
    private fb: FormBuilder,
    ){
    
  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
    
  }

  submit(){
    const formValues = this.formulario.value;
    const contato: Contato = new Contato(formValues.nome, formValues.email);
    
    this.servico
          .salvar(contato)
          .subscribe({
            next: (resp) => {
              this.contatos.push(resp);
              console.log(resp);
            },
            error: (erroResp) => {
              console.log(erroResp);
            }
          }); 
  }
}
