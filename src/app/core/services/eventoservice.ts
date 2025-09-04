import { Injectable } from "@angular/core";
import { ApiService } from "./apiservice";
import { Evento } from "../../shared/models/Evento";
import { Observable } from "rxjs";

@Injectable()
export class EventoService {
    constructor(private apiService: ApiService) {}

    GetAllEventos(): Observable<Evento[]> {
        return  this.apiService.Get<Evento[]>('Evento');
    }

    InsertOrUpdate(evento: Evento): Observable<Evento> {
        return this.apiService.Post('Evento', evento);
    }

    Delete(id :number): Observable<boolean> {
        return this.apiService.Delete('Evento', id);
    }

}