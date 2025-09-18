import { Router } from "@angular/router";
import { UsuarioService } from "../../core/services/usuario.service";
import { UsuarioLogin, UsuarioLoginResponse } from "../../core/models/Usuario";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  login(email: string, senha: string): Promise<boolean> {
    const usuarioLogin: UsuarioLogin = { Email: email, Senha: senha };
    
    return new Promise((resolve, reject) => {
      this.usuarioService.GetUsuario(usuarioLogin).subscribe({
        next: (usuario: any) => {
          if (usuario && usuario.Token) {
            this.setAuthData(usuario.Token, usuario.Email);
            resolve(true);
          } else {
            resolve(false);
          }
        },
        error: (error) => {
          console.error('Erro no login:', error);
          resolve(false);
        }
      });
    });
  }

  setAuthData(token: string, email: string): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userEmail', email);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp < (Date.now() / 1000);
    } catch {
      return true;
    }
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }

  getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }
}