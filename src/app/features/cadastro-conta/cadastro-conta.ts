import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cadastro-conta',
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDatepickerModule],
  templateUrl: './cadastro-conta.html',
  styleUrl: './cadastro-conta.scss'
})
export class CadastroConta {
  constructor(private router: Router) {}

  formCadastro = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    cpf: new FormControl('', [Validators.required, Validators.pattern(/^\d{11}$/)]),
    dataNascimento: new FormControl('', [Validators.required, Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/[0-9]{4}$/)]),
    telefone: new FormControl('', [Validators.required, Validators.pattern(/^\d{10,11}$/)]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  Cadastrar() {
    console.log('cadastro efetuado com sucesso', this.formCadastro);
    this.router.navigate(['/home']);
  }
}
