import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {Subcategoria} from "../model/subcategoria";
import {PopupSubcategoriaComponent} from "../popup-subcategoria/popup-subcategoria.component";

// más info en https://v6.material.angular.io/components/dialog/overview
@Injectable({
  providedIn: 'root'
})
export class PopupElegirSubcategoriaService {

  constructor(
    public dialog: MatDialog
  ) { }


  abrirSelector(): Observable<Subcategoria>{

    // abrir el selector
    const selectorRef = this.dialog.open(PopupSubcategoriaComponent, {
      width: '75%',
      maxHeight: '90vh',
    });


    return selectorRef.afterClosed();
  }
}
