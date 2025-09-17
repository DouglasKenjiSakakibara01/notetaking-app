import { Usuario } from './../../core/models/Usuario';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../core/services/usuarioservice';


@Component({
  selector: 'app-cadastro-conta',
  providers: [provideNativeDateAdapter(), { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }, UsuarioService],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatDatepickerModule],
  templateUrl: './cadastro-conta.html',
  styleUrl: './cadastro-conta.scss'
})
export class CadastroConta {
  constructor(private router: Router,
              private usuarioService: UsuarioService
  ) {}

  formCadastro = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    cpf: new FormControl('', [Validators.required, Validators.pattern(/^\d{11}$/)]),
    dataNascimento: new FormControl(null, [Validators.required]),
    telefone: new FormControl('', [Validators.required, Validators.pattern(/^\d{10,11}$/)]),
    senha: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  public async Cadastrar() {
    const formValue = this.formCadastro.value;
    const usuario = new Usuario();
    usuario.Id = 0;
    usuario.Nome = formValue.nome || "";
    usuario.Email = formValue.email || "";
    usuario.Cpf = formValue.cpf || "";
    usuario.DtNascimento = formValue.dataNascimento? formValue.dataNascimento : new Date();
    usuario.Senha = formValue.senha ? await this.usuarioService.GerarHashSenha(formValue.senha) : "";

    this.usuarioService.Insert(usuario).subscribe({
      next: (usuario) => {
        console.log('Usuário cadastrado com sucesso', usuario);
        this.router.navigate(['/home']);
      },
      error: (erro) => {
        console.error('Erro ao cadastrar usuário', erro);
      }
    });    
  }
}
