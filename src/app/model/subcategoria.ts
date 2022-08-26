import {Categoria} from "./categoria";

export class Subcategoria {
  idCategoria!: Categoria;  // se llama idCategoría, pero en realidad el back devuelve el objeto categoría
  descripcion!: string;
  idTipoProducto!: number;  // se llama tipo producto, pero en realidad es el id de la subcategoría

}


