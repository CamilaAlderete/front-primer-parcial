import {Subcategoria} from "./subcategoria";
import {Categoria} from "./categoria";

class Persona {
  nombreCompleto!: String;
}

export class FichaClinica {
  motivoConsulta!: string;
  diagnostico!: string;
  observacion!: string;
  idEmpleado!: Persona;
  idCliente!: Persona;
  idTipoProducto!: Subcategoria;  // se llama tipo producto, pero en realidad es la subcategoría
  fechaHoraCadenaFormateada!: string;
  idFichaClinica!: number;
}


