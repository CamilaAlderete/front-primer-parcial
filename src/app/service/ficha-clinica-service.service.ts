import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {url_base} from "./url";
import {HttpService} from "./http.service";
import {FichaClinica} from "../model/ficha-clinica";

@Injectable({
  providedIn: 'root'
})
export class FichaClinicaServiceService extends HttpService<FichaClinica,number>{

  constructor(httpClient: HttpClient) {
    super(httpClient, url_base, 'fichaClinica');
  }
}
