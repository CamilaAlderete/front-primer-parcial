import {Persona} from "./persona";

export class Reserva {
  idReserva!: number;
  fecha!: string;
  fechaCadena!: string;
  horaInicio!: string;
  horaFin!: string;
  horaInicioCadena!: string;
  horaFinCadena!: string;
  observacion!: string;
  flagAsistio!: string;
  idEmpleado!: Persona;
  idCliente!: Persona;

}
