import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {PopupElegirPersonaComponent} from "../popup-elegir-persona/popup-elegir-persona.component";
import {Observable} from "rxjs";
import {Paciente} from "../model/paciente";

// más info en https://v6.material.angular.io/components/dialog/overview
@Injectable({
  providedIn: 'root'
})
export class PopupElegirPersonaService {

  constructor(
    public dialog: MatDialog
  ) { }

  abrirSelector(soloFisioterapeutas: boolean = false, titulo: string = ""): Observable<Paciente>{

    // abrir el selector
    const selectorRef = this.dialog.open(PopupElegirPersonaComponent, {
      width: '70%',
      data: {
        titulo: titulo,
        soloFisioterapeutas: soloFisioterapeutas
      }
    });

    // retornar el Observable para después poder suscribirse a él
    // y poder utilizar los datos en donde sea utilizado este servicio
    return selectorRef.afterClosed();
  }
}
