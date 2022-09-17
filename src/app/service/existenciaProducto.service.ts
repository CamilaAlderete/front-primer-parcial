import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {HttpClient, HttpEvent, HttpHeaders, HttpResponse} from "@angular/common/http";
import { url_base} from "./url";
import {Observable} from "rxjs";
import {precio_presentacionProducto} from "../model/precio_presentacionProducto";
import {Reserva} from "../model/reserva";
import {listadatos} from "../model/datos";
import {CookieService} from "ngx-cookie-service";


//Hereda del http service generico

@Injectable({
  providedIn: 'root'
})
export class ExistenciaProductoService extends HttpService<String, number>{

  constructor(httpClient: HttpClient, private cookies: CookieService) {
    super( httpClient, url_base,'existenciaProducto');
  }

  //hecho para poder ponerle el usuario en el header
  serviceGet(t:{}):Observable<listadatos<precio_presentacionProducto>> {
    const headers: HttpHeaders = new HttpHeaders()
      .append('usuario', this.cookies.get('username'));

  return this.httpClient.get<listadatos<precio_presentacionProducto>>(this.url+ "/"+ this.endpoint,{params: t, headers:{ 'usuario': this.cookies.get('username')}});
  }
}
