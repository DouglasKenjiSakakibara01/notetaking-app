import { Usuario, UsuarioLogin } from './../models/Usuario';
import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { Observable } from "rxjs";
import bcrypt from 'bcryptjs';

@Injectable()
export class UsuarioService {
    constructor(private apiService: ApiService) {}

    GetUsuario(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin> {
        return this.apiService.Post('Usuario/login', usuarioLogin);
    }

    Insert(usuario: Usuario): Observable<Usuario> {
        return this.apiService.Post('Usuario', usuario);
    }

}