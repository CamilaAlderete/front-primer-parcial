import {Subcategoria} from "./subcategoria";
import {Paciente} from "./paciente";

export class FichaClinica {
  motivoConsulta!: string;
  diagnostico!: string;
  observacion!: string;
  idEmpleado!: Paciente;
  idCliente!: Paciente;
  idTipoProducto!: Subcategoria;  // se llama tipo producto, pero en realidad es la subcategoría
  fechaHoraCadenaFormateada!: string;
  idFichaClinica!: number;
  fechaHora!: string;

  constructor() {
    this.idEmpleado = new Paciente();
    this.idCliente = new Paciente();
    this.idTipoProducto = new Subcategoria();
  }
}
