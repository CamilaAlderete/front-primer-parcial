import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {url_base} from "./url";
import {HttpService} from "./http.service";
import {FichaClinica, FichaClinicaPost} from "../model/ficha-clinica";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FichaClinicaServiceService extends HttpService<FichaClinica,number>{

  constructor(httpClient: HttpClient) {
    super(httpClient, url_base, 'fichaClinica');
  }

  /**
   * Usar este para hacer el post de una nueva ficha, ya que es distinto a recibir una ficha y por eso
   * no le gusta a la clase padre HttpService
   */
  postFicha(t: {  }): Observable<{  }> {
    const headers: HttpHeaders = new HttpHeaders()
      .append('usuario','usuario2')

    return this.httpClient.post<{}>(this.url+ "/"   + this.endpoint, t,{headers:headers});
  }
}
