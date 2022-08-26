import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {Subcategoria} from "../model/subcategoria";
import {HttpClient} from "@angular/common/http";
import {url_base} from "./url";

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService extends HttpService<Subcategoria, number> {

  constructor(httpClient: HttpClient) {
    super(httpClient, url_base, 'tipoProducto');
  }
}
