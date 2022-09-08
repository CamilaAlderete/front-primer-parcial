import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {HttpClient} from "@angular/common/http";
import { url_base} from "./url";
import {EXTRAproducto} from "../model/EXTRAproducto";


//Hereda del http service generico


@Injectable({
  providedIn: 'root'
})
export class EXTRAproductoService extends HttpService<EXTRAproducto, number>{

  constructor(httpClient: HttpClient) {
    super( httpClient, url_base,'producto');
  }
}
