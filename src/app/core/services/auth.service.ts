import { Router } from "@angular/router";
import { UsuarioLogin, UsuarioLoginResponse } from "../models/Usuario";
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { catchError, map, Observable, of, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  login(email: string, senha: string): Observable<boolean> {
    const usuarioLogin: UsuarioLogin = { Email: email, Senha: senha };
    
   return this.apiService.Post('Auth/login', usuarioLogin).pipe(
      tap((usuario: any) => {
        if (usuario?.Token) {
          this.setAuthData(usuario.Token, usuario.Email);
        }
      }),
      map((usuario: any) => !!usuario?.Token),
      catchError(err => {
        console.error('Erro no login:', err);
        return of(false);
      })
    );
  }

  setAuthData(token: string, email: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('userEmail', email);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
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
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }

  getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }
}