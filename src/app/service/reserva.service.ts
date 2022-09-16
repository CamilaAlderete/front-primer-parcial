import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {Reserva} from "../model/reserva";
import {HttpClient} from "@angular/common/http";
import {url_base} from "./url";
import {Observable} from "rxjs";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class ReservaService extends HttpService<Reserva, number>{


  constructor(httpClient: HttpClient, private cookies: CookieService) {
    super( httpClient, url_base,'reserva');
  }

  override post(t: Reserva): Observable<Reserva> {
    return this.httpClient.post<Reserva>(this.url+ "/"   + this.endpoint, t,
      {
        headers:{
          //'usuario':'usuario2',
          'usuario': this.cookies.get('username'),
        }
      });
  }

  agregarObservacion(t:{}):Observable<{}>{
    return this.httpClient.put<{}>(this.url+ "/"   + this.endpoint, t);
  }

}
