import { Usuario, UsuarioLogin } from './../models/Usuario';
import { Injectable } from "@angular/core";
import { ApiService } from "./apiservice";
import { Observable } from "rxjs";
import bcrypt from 'bcryptjs';

@Injectable()
export class UsuarioService {
    constructor(private apiService: ApiService) {}

    GetUsuario(usuarioLogin: UsuarioLogin): Observable<Usuario> {
        return this.apiService.Post<Usuario>('Usuario/login', usuarioLogin);
    }

    Insert(usuario: Usuario): Observable<Usuario> {
        return this.apiService.Post('Usuario', usuario);
    }

    // Gerar hash da senha
    async GerarHashSenha(password: string): Promise<string> {
        try {
            const salt = await bcrypt.genSalt(12);
            return await bcrypt.hash(password, salt);
        } 
        catch (error) {
            throw new Error('Erro ao criptografar senha');
        }
    }



}