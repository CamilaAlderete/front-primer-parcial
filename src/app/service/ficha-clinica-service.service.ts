import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {url_base} from "./url";
import {HttpService} from "./http.service";
import {FichaClinica} from "../model/ficha-clinica";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FichaClinicaServiceService extends HttpService<FichaClinica,number>{

  constructor(httpClient: HttpClient) {
    super(httpClient, url_base, 'fichaClinica');
  }

  // override hecho para poder ponerle el usuario en el header
  override post(t:FichaClinica): Observable<FichaClinica>{
    const headers: HttpHeaders = new HttpHeaders()
      .append('usuario','usuario2')

    return this.httpClient.post<FichaClinica>(this.url+ "/"   + this.endpoint, t,{headers:headers});
  }

  // override hecho para poder poner el usuario en el header
  override put(t: FichaClinica): Observable<FichaClinica> {
    const headers: HttpHeaders = new HttpHeaders()
      .append('usuario','usuario2')

    return this.httpClient.put<FichaClinica>(this.url+ "/"   + this.endpoint, t,{headers:headers});
  }
}
