import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {Paciente} from "../model/paciente";
import {HttpClient} from "@angular/common/http";
import { url_base} from "./url";


//Hereda del http service generico

@Injectable({
  providedIn: 'root'
})
export class PacienteService extends HttpService<Paciente, number>{

  constructor(httpClient: HttpClient) {
    super( httpClient, url_base,'persona');
  }
}
