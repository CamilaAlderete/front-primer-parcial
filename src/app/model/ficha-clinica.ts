import {Subcategoria} from "./subcategoria";

class Persona {
  nombreCompleto!: string;
  idPersona!: any;
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
  fechaHora!: string;
}

// esto está así por mientras nomas, después cuando esté la clase persona voy a ver
// para poner como tiene que ser realmente
class PersonaNumero{
  idPersona!: number
}

// interfaz para poder hacer post de una ficha clínica con el formato que recibe el back
export class FichaClinicaPost {
  motivoConsulta!: string;
  diagnostico!: string;
  observacion!: string;
  idEmpleado: PersonaNumero = new PersonaNumero();
  idCliente: PersonaNumero = new PersonaNumero();
  idTipoProducto: Subcategoria = new Subcategoria();  // es en realidad la subcategoría
}
