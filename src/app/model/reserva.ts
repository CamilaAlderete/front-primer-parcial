import {Paciente} from "./paciente";

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
  idEmpleado!: Paciente;
  idCliente!: Paciente;

}
