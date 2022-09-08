import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {HttpClient} from "@angular/common/http";
import {url_base} from "./url";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServicioService extends HttpService<String, number> {

  constructor(httpClient: HttpClient) {
    super(httpClient, url_base, 'presentacionProducto');
  }
  servicePost(t:{}): Observable<{  }>{
    return this.httpClient.post<{}>(this.url+ "/"   + this.endpoint, t);
  }
  servicePut(t:{}): Observable<{  }>{
    return this.httpClient.put<{}>(this.url+ "/"   + this.endpoint, t);
  }
}
