import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'

//enlaces
// https://material.angular.io/components/dialog/overview
//https://material.angular.io/components/datepicker/overview
//https://material.angular.io/components/select/overview
//https://material.angular.io/components/table/overview
//https://material.angular.io/components/input/overview
//https://material.angular.io/components/form-field/overview


@Component({
  selector: 'app-cositas-utiles',
  templateUrl: './cositas-utiles.component.html',
  styleUrls: ['./cositas-utiles.component.css']
})
export class CositasUtilesComponent implements OnInit {

  titulo = 'Cositas útiles para los formularios';
  cadena = '';
  numero = 0;

  item:any;
  lista= ['pepa','hola','Michifuz'];

  minDate = new Date(); //para que solo se pueda elegir fecha de hoy en adelante
  fecha = null;
  fehaElegida = null;

  constructor() { }

  ngOnInit(): void {
  }

  //le da formato a la fecha o algo asi
  cambio(){
    this.fehaElegida = new DatePipe('en-US').transform(this.fecha, 'yyyy-MM-dd')
  }

}
