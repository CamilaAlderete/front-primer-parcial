import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {HttpClient} from "@angular/common/http";
import {url_base} from "./url";
import {Observable} from "rxjs";
import {Reserva} from "../model/reserva";
import {Servicio} from "../model/servicio";
import {listadatos} from "../model/datos";
import {Servicio2} from "../model/servicio2";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class Servicio2Service extends HttpService<Servicio2, number>{

  constructor(httpClient: HttpClient, private cookies: CookieService) {
    super(httpClient, url_base, 'servicio');
  }

  override post(t: Servicio2): Observable<Servicio2> {
    return this.httpClient.post<Servicio2>(this.url+ "/"   + this.endpoint, t,
      {
        headers:{
          'usuario': this.cookies.get('username'),
        }
      });
  }

  getDetalles(idServicio: number): Observable<listadatos<any>>{
    return this.httpClient.get<listadatos<any>>(`${this.url}/${this.endpoint}/${idServicio}/detalle`);
  }

  postDetalle(idServicio: number, detalle:{}): Observable<any>{
    return this.httpClient.post<any>(`${this.url}/${this.endpoint}/${idServicio}/detalle`, detalle,
      {
        headers:{
          'usuario': this.cookies.get('username'),
          'Content-Type':  'application/json',
        }
      });
  }

  deteleDetalle(idServicio: number, idDetalle:number): Observable<any>{
    return this.httpClient.delete<any>(`${this.url}/${this.endpoint}/${idServicio}/detalle/${idDetalle}`);
  }

  getPresentacionProducto(queryParams: {}): Observable<listadatos<any>>{
    return this.httpClient.get<listadatos<any>>(`${this.url}/presentacionProducto`, {params: queryParams});
  }



}
