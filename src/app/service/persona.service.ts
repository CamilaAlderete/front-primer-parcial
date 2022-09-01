import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {Reserva} from "../model/reserva";
import {Persona} from "../model/persona";
import {HttpClient} from "@angular/common/http";
import {url_base} from "./url";
import {Observable} from "rxjs";
import {listadatos} from "../model/datos";

@Injectable({
  providedIn: 'root'
})
export class PersonaService extends HttpService<Persona, number> {

  constructor(httpClient: HttpClient) {
    super(httpClient, url_base, 'persona');
  }

  getAgenda(idProfesional: number, params: {}): Observable<Reserva[]> {
    return this.httpClient.get<Reserva[]>(`${this.url}/${this.endpoint}/${idProfesional}/agenda`, {params});
  }

}
