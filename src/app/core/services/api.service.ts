import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, timeout } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private baseUrl: string = 'https://localhost:7213/api';

    private headers = new HttpHeaders()
                        .set('Content-Type', 'application/json');

    constructor(private http: HttpClient,
    ) {}


    Get<T>(endpoint: string, params?: any): Observable<T> {
        const url = `${this.baseUrl}/${endpoint}`;
        const options = { 
            params: this.CriarParametrosRequisicao(params)
        };

        return this.http.get<T>(url, options)
        .pipe();
    }

    Post<T>(endpoint: string, body: any, params?: any): Observable<T> {
        const url = `${this.baseUrl}/${endpoint}`;
        const options = { 
            params: this.CriarParametrosRequisicao(params),
            headers: this.headers 
        };
        return this.http.post<T>(url, body, options)
        .pipe();
    }

    Delete<T>(endpoint: string, id: number) {
        const url = `${this.baseUrl}/${endpoint}/${id}`;
        
        return this.http.delete<T>(url)
        .pipe();
    }

    private CriarParametrosRequisicao(params: any): HttpParams {
        let httpParams = new HttpParams();
        if (params) {
            Object.keys(params).forEach(key => {
                if (params[key] !== null && params[key] !== undefined) {
                    httpParams = httpParams.set(key, params[key].toString());
                }
            });
        }
        return httpParams;
    }
}