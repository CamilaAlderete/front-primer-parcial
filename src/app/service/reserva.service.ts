import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {Categoria} from "../model/categoria";
import {Reserva} from "../model/reserva";
import {HttpClient} from "@angular/common/http";
import {url_base} from "./url";
import {Observable} from "rxjs";
import {listadatos} from "../model/datos";

@Injectable({
  providedIn: 'root'
})
export class ReservaService extends HttpService<Reserva, number>{

  constructor(httpClient: HttpClient) {
    super( httpClient, url_base,'reserva');
  }

  override post(t: Reserva): Observable<Reserva> {
    return this.httpClient.post<Reserva>(this.url+ "/"   + this.endpoint, t,
      {
        headers:{
          'usuario':'usuario2',
          //"usuario": localStorage.getItem('userSession') as string,
        }
      });
  }

}
