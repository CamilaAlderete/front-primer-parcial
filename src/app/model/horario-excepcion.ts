import {Paciente} from "./paciente";

export class HorarioExcepcion {
  idHorarioExcepcion!: number;
  fecha!: string;
  fechaCadena!: string;
  horaAperturaCadena!: string;
  horaCierreCadena!: string;
  flagEsHabilitar!: string;
  idEmpleado!: Paciente;
  intervaloMinutos!: number;
  horaApertura!: string;
  horaCierre!: string;
}
