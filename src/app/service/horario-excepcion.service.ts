import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {HorarioExcepcion} from "../model/horario-excepcion";
import {url_base} from "./url";
import {HttpClient} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {Observable} from "rxjs";
import {Paciente} from "../model/paciente";

// para poder hacer post de un HorarioExcepcion
interface HorarioExcepcionPost {
  fechaCadena: string | null; // el null está acá solo por una función de conversión de fechas que se usa abajo
  horaAperturaCadena: string;
  horaCierreCadena: string;
  flagEsHabilitar: string;
  idEmpleado: {idPersona: number};
  intervaloMinutos: number;
}
@Injectable({
  providedIn: 'root'
})
export class HorarioExcepcionService extends HttpService<HorarioExcepcion, number>{

  constructor(httpClient: HttpClient) {
    super(httpClient, url_base, 'horarioExcepcion');
  }

  override post(horario: HorarioExcepcion): Observable<HorarioExcepcion>  {
    let horarioExcepcionPost: HorarioExcepcionPost = {
      fechaCadena: this.formatearFecha(horario.fechaCadena),
      horaAperturaCadena: horario.horaAperturaCadena.replace(':',''),
      horaCierreCadena: horario.horaCierreCadena.replace(':',''),
      flagEsHabilitar: horario.flagEsHabilitar,
      idEmpleado: {idPersona: horario.idEmpleado.idPersona},
      intervaloMinutos: horario.intervaloMinutos
    }
    console.log(horarioExcepcionPost);
    return this.httpClient.post<HorarioExcepcion>(this.url+ "/"   + this.endpoint, horarioExcepcionPost);
  }

  //le da formato a la fecha o algo asi
  formatearFecha(fecha: string){
    return new DatePipe('en-US').transform(fecha, 'yyyyMMdd');
  }
}
