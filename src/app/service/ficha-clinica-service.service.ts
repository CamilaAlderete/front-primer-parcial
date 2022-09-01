import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {url_base} from "./url";
import {HttpService} from "./http.service";
import {FichaClinica} from "../model/ficha-clinica";
import {Observable} from "rxjs";

// interfaz para poder postear una ficha clínica
interface FichaClinicaPost {
  motivoConsulta: string;
  diagnostico: string;
  observacion: string;
  idEmpleado: {idPersona: number};
  idCliente: {idPersona: number};
  idTipoProducto: {idTipoProducto: number};
}

// interfaz para hacer put de una ficha clinica
interface FichaClinicaPut {
  idFichaClinica: number;
  observacion: string
}
@Injectable({
  providedIn: 'root'
})
export class FichaClinicaServiceService extends HttpService<FichaClinica,number>{

  constructor(httpClient: HttpClient) {
    super(httpClient, url_base, 'fichaClinica');
  }

  // override hecho para poder ponerle el usuario en el header
  override post(t:FichaClinica | FichaClinicaPost): Observable<FichaClinica>{
    const headers: HttpHeaders = new HttpHeaders()
      .append('usuario','usuario2')

    // para que el back pueda aceptar la FichaClinica
    const sentData: FichaClinicaPost = {
      motivoConsulta: t.motivoConsulta,
      diagnostico: t.diagnostico,
      observacion: t.observacion,
      idEmpleado: {idPersona: t.idEmpleado.idPersona},
      idCliente: {idPersona: t.idCliente.idPersona},
      idTipoProducto: {idTipoProducto: t.idTipoProducto.idTipoProducto}
    }

    return this.httpClient.post<FichaClinica>(this.url+ "/"   + this.endpoint, sentData,{headers:headers});
  }

  // override hecho para poder poner el usuario en el header
  override put(t: FichaClinica | FichaClinicaPut): Observable<FichaClinica> {
    const headers: HttpHeaders = new HttpHeaders()
      .append('usuario','usuario2')

    // para que el back pueda aceptar la FichaClinica
    const sentData: FichaClinicaPut = {
      idFichaClinica: t.idFichaClinica,
      observacion: t.observacion
    }

    return this.httpClient.put<FichaClinica>(this.url+ "/"   + this.endpoint, sentData,{headers:headers});
  }
}
