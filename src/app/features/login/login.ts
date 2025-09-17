import { UsuarioLogin } from './../../core/models/Usuario';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../core/services/usuarioservice';

@Component({
  selector: 'app-login',
  providers: [UsuarioService],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  email = new FormControl('', [Validators.required, Validators.email]);
  senha = new FormControl('', [Validators.required, Validators.minLength(8)]);

  constructor(private usuarioService: UsuarioService) {}

  async Login() {
    const UsuarioLogin: UsuarioLogin = {
      Email: this.email.value ?? '',
      Senha: this.senha.value? await this.usuarioService.GerarHashSenha(this.senha.value) : ''
    };

    this.usuarioService.GetUsuario(UsuarioLogin).subscribe({
      next: (usuario) => {
        console.log('Login efetuado com sucesso', usuario);
      },
      error: (erro) => {
        console.error('Erro ao efetuar login', erro);
      }
    });

  }
}
