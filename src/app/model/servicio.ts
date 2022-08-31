import {Categoria} from "./categoria";
import {Subcategoria} from "./subcategoria";

export class Servicio {
  idCategoria!: Categoria;  // se llama idCategoría, pero en realidad el back devuelve el objeto categoría
  idTipoProducto!: Subcategoria;
  idPresentacionProducto!: number; // el id de la clase Servicio
  nombre!: string;
  descripcion!: string;
}

//NO SIRVE, NO SE USA
