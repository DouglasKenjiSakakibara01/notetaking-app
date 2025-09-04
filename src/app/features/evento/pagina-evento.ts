import { Component } from '@angular/core';
import { EventoService } from '../../core/services/eventoservice';
import { CommonModule } from '@angular/common';
import { DateAdapter, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Evento } from '../../shared/models/Evento';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-evento',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDatepickerModule, MatProgressSpinnerModule, MatIconModule],
  providers: [EventoService, provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
  templateUrl: './pagina-evento.html',
  styleUrl: './pagina-evento.scss'
})
export class PaginaEvento {
  public listaEvento: Array<Evento> = []
  public formEvento: boolean = false;
  public carregando: boolean = false;
  public eventoForm: Evento = new Evento();
  public editandoForm: boolean = false
  public consultandoForm: boolean = false
  formCadastro = new FormGroup({
    titulo: new FormControl(
      this.editandoForm? this.eventoForm.Titulo: '',
      [Validators.required]),
    descricao: new FormControl(
      this.editandoForm? this.eventoForm.Descricao : ''
    ),
    dtEvento: new FormControl(
      this.editandoForm && this.eventoForm.DtEvento? this.eventoForm.DtEvento : null
    ),
  })

  constructor(private eventoService : EventoService){

  }

  ngOnInit() {
    this.CarregarLista();
  }

  CarregarLista() {
    this.carregando = true;
    this.eventoService.GetAllEventos().subscribe({
      next: (eventos) => {
        this.listaEvento = eventos;
        this.carregando = false
        console.log(this.listaEvento);
      },
      error: (erro) => {
        console.error('Erro ao carregar lista de eventos', erro);
        this.carregando = false;
      }
    });
  }  

  AbrirFormulario(item?: Evento, consultando: boolean = false) {
    if (item) {
      this.eventoForm = item;
      consultando? this.editandoForm = true : this.consultandoForm = true;
    }

    this.formEvento = !this.formEvento; 
  }

  ExcluirEvento(id: number) {
    if (id > 0) {
      this.eventoService.Delete(id).subscribe();
      this.CarregarLista();
    }  
    
  }


  Cadastrar() {
    let evento = new Evento();
    if (this.formCadastro.value.dtEvento) evento.DtEvento = new Date(this.formCadastro.value.dtEvento);
    if (this.formCadastro.value.titulo) evento.Titulo = this.formCadastro.value.titulo;

    this.formEvento = !this.formEvento;
    this.eventoService.InsertOrUpdate(evento).subscribe({
      next: (evento) => {
        this.CarregarLista();
      },
      error: (erro) => {
        console.error('Erro ao inserir evento', erro);
      }
    });
  }
}
