import { Usuario } from './../models/Usuario';
import { Injectable } from "@angular/core";
import { ApiService } from "./apiservice";
import { Evento } from "../models/Evento";
import { Observable } from "rxjs";

@Injectable()
export class EventoService {
    constructor(private apiService: ApiService) {}

    GetUsuario(): Observable<Usuario[]> {
        return  this.apiService.Get<Usuario[]>('Usuario');
    }

    Insert(usuario: Usuario): Observable<Usuario> {
        return this.apiService.Post('Usuario', usuario);
    }

}