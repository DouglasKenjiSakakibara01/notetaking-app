import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const authReq = adicionarToken(req, authService);

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log("Erro na requisição:", {
        status: error.status,
        statusText: error.statusText,
        url: error.url
      });

      // Trata erro 401 (Unauthorized)
      if (error.status === 401) {
        tratarErro401(authService, router);
      } else if (error.status === 0) {
        console.error("Erro de CORS ou conexão:", error);
      }

      return throwError(() => error);
    })
  );
};

const adicionarToken = (request: any, authService: AuthService) => {
  const token = authService.getToken();
  
  if (token) {
    const cloned = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return cloned;
  }
  
  return request;
};

const tratarErro401 = (authService: AuthService, router: Router): void => {
  console.warn("Token inválido ou expirado. Redirecionando para login...");
  authService.logout();
  router.navigate(['/login']);
};