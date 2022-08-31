import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {Servicio} from "../model/servicio";
import {HttpClient} from "@angular/common/http";
import {url_base} from "./url";

@Injectable({
  providedIn: 'root'
})
export class ServicioService extends HttpService<String, number> {

  constructor(httpClient: HttpClient) {
    super(httpClient, url_base, 'presentacionProducto');
  }
}
