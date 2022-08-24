import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {Categoria} from "../model/categoria";
import {HttpClient} from "@angular/common/http";
import { url_base} from "./url";


//Hereda del http service generico

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends HttpService<Categoria, number>{

  constructor(httpClient: HttpClient) {
    super( httpClient, url_base,'categoria');
  }
}
