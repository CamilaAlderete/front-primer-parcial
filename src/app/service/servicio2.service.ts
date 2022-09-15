import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {HttpClient} from "@angular/common/http";
import {url_base} from "./url";
import {Observable} from "rxjs";
import {Reserva} from "../model/reserva";
import {Servicio} from "../model/servicio";
import {listadatos} from "../model/datos";
import {Servicio2} from "../model/servicio2";

@Injectable({
  providedIn: 'root'
})
export class Servicio2Service extends HttpService<Servicio2, number>{

  constructor(httpClient: HttpClient) {
    super(httpClient, url_base, 'servicio');
  }

  getServiciosDetallados(idServicio: number,params: {}): Observable<listadatos<{}>> {
    return this.httpClient.get<listadatos<{}>>(this.url+ "/" + this.endpoint, {params});
  }


}
