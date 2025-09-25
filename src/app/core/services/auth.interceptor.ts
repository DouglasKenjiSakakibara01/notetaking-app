import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = this.adicionarToken(req);

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Trata erro 401 (Unauthorized)
        if (error.status === 401) {
          this.tratarErro401();
        }
        return throwError(() => error);
      })
    );
  }

  private adicionarToken(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.authService.getToken();
    
    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    
    return request;
  }

  private tratarErro401(): void {
    console.warn('Token inválido ou expirado. Redirecionando para login...');
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}