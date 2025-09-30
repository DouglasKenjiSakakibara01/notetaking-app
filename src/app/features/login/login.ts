import { UsuarioLogin } from './../../core/models/Usuario';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../core/services/usuario.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  providers: [],
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  email = new FormControl('', [Validators.required, Validators.email]);
  senha = new FormControl('', [Validators.required, Validators.minLength(8)]);

  constructor(private authService: AuthService,
              private router: Router
  ) {}

  async Login() {
    const UsuarioLogin: UsuarioLogin = {
      Email: this.email.value ?? '',
      Senha: this.senha.value ?? ''
    };

    const ret = await this.authService.login(UsuarioLogin.Email, UsuarioLogin.Senha);

    if (ret) {
      this.router.navigate(['/home']);
    }
    else {
      alert('Falha no login. Verifique suas credenciais.');
    }

  }
}
