import { Component, OnInit } from '@angular/core';
import { Contato } from './contato';
import { ContatoService } from '../contato.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog'; 

import { ContatoDetalheComponent } from '../contato-detalhe/contato-detalhe.component';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario!: FormGroup;
  contatos: Contato[] = [];
  colunas: string[] = ['foto','id','nome','email','favorito'];

  fotoName = '';

  totalElementos = 0;
  pagNumber = 0;
  pagSize = 10;
  pageSizeOption: number[] = [5, 10, 30, 50];

  constructor(
      private servico: ContatoService,
      private fb: FormBuilder,
      private dialog: MatDialog,
      private snackBar: MatSnackBar
    ){ }

  ngOnInit(): void {
    this.montarFormulario();
    this.listarContatos();    
  }

  montarFormulario(){
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  listarContatos(pagina = 0, tamanho = 10){
    this.servico
      .buscarTudo(pagina, tamanho).subscribe({
        next: (valueResp) => {
            this.contatos = valueResp.content;
            this.totalElementos = valueResp.totalElements;
            this.pagNumber = valueResp.number;
         },
         error: (valueErr) => {
            console.log(valueErr.content);
        }
    });
  }

  paginar(event: PageEvent){
    this.pagNumber = event.pageIndex;
    this.pagSize = event.pageSize;
    this.listarContatos(this.pagNumber, this.pagSize);
  }

  submit(){
    const formValues = this.formulario.value;
    const contato: Contato = new Contato(formValues.nome, formValues.email);
    
    this.servico
          .salvar(contato)
          .subscribe({
            next: (nextValue) => {
              this.listarContatos();
              this.snackBar.open('O novo Contato foi adicionado.','Sucesso',{
                duration: 2000
              });
              this.formulario.reset();
            },
            error: (errValue) => {
              console.log(errValue);
            }
          }); 
  }

  favoritar(contato: Contato){
    this.servico.favoritar(contato).subscribe({
      next(nxtValue) {
        contato.favorito = !contato.favorito;
      },
    });    
  }

  uploadFoto(event: any, contato: Contato){

    const files = event.target.files;
    this.fotoName = files.name;

    if(files){
      const foto = files[0];
      const formData: FormData = new FormData();
      formData.append("foto", foto);
      this.servico.uploadFoto(contato, formData)
                  .subscribe({
                    next: (value) => {
                        this.listarContatos(this.pagNumber, this.pagSize);
                    }
                  });
    }
  }

  visualizarContato(contato: Contato){
    this.dialog.open(ContatoDetalheComponent, {
      width:'400px',
      enterAnimationDuration:500,
      exitAnimationDuration:300,
      data: contato
    });
  }
  
}
