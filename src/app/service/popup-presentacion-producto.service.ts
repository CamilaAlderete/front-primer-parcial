import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {Paciente} from "../model/paciente";
import {PopupPresentacionProductoComponent} from "../popup-presentacion-producto/popup-presentacion-producto.component";

@Injectable({
  providedIn: 'root'
})
export class PopupPresentacionProductoService {

  constructor(
    public dialog: MatDialog
  ) { }

  abrirSelector(): Observable<Paciente>{

    // abrir el selector
    const selectorRef = this.dialog.open(PopupPresentacionProductoComponent, {
      width: '75%',
      maxHeight: '90vh',
    });


    return selectorRef.afterClosed();
  }
}
