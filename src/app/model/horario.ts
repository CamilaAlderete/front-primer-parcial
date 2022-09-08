import {Paciente} from "./paciente";
 export class Horario{
   dia!: number;
   horaAperturaCadena!: string;
   horaCierreCadena!: string;
   intervaloMinutos!: number;
   idEmpleado!: Paciente;

 }
/*
{
"dia": 2,
"horaAperturaCadena":"0900",
"horaCierreCadena":"1100",
"intervaloMinutos":15,
"idEmpleado":{
"idPersona":3
}
}
 */
