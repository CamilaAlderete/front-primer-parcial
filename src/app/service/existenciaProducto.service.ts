import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {HttpClient, HttpEvent, HttpHeaders, HttpResponse} from "@angular/common/http";
import { url_base} from "./url";
import {Observable} from "rxjs";


//Hereda del http service generico

@Injectable({
  providedIn: 'root'
})
export class ExistenciaProductoService extends HttpService<String, number>{

  constructor(httpClient: HttpClient) {
    super( httpClient, url_base,'existenciaProducto');
  }

  //hecho para poder ponerle el usuario en el header
  serviceGet(t:{}): Observable<ArrayBuffer> | Observable<Blob> | Observable<string> | Observable<HttpEvent<ArrayBuffer>> | Observable<HttpEvent<Blob>> | Observable<HttpEvent<string>> | Observable<HttpEvent<Object>> | Observable<HttpEvent<{}>> | Observable<HttpResponse<ArrayBuffer>> | Observable<HttpResponse<Blob>> | Observable<HttpResponse<string>> | Observable<HttpResponse<Object>> | Observable<HttpResponse<{}>> | Observable<Object> | Observable<{}>{
    const headers: HttpHeaders = new HttpHeaders()
      .append('usuario','usuario2')

    return this.httpClient.post<{  }>(this.url+ "/"   + this.endpoint, t,{headers:headers});
  }
}
