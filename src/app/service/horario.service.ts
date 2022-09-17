import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {url_base} from "./url";
import {Horario} from "../model/horario";
import {FichaClinica} from "../model/ficha-clinica";
import {Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})

export class HorarioService extends HttpService<Horario, number> {

  constructor(httpClient: HttpClient, private cookies: CookieService) {
    super(httpClient, url_base, 'personaHorarioAgenda');
  }

  override post(t: Horario): Observable<Horario> {
    return this.httpClient.post<Horario>(this.url+ "/"   + this.endpoint, t,
      {
        headers:{
          'usuario': this.cookies.get('username'),
          //"usuario": localStorage.getItem('userSession') as string,
        }
      });
  }
}




