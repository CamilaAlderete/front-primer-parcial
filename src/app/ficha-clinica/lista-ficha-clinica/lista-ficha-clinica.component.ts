import {Component, OnInit, ViewChild} from '@angular/core';
import {Categoria} from "../../model/categoria";
import {Subcategoria} from "../../model/subcategoria";
import {FichaClinica} from "../../model/ficha-clinica";
import {MatSort, Sort} from "@angular/material/sort";
import {FichaClinicaServiceService} from "../../service/ficha-clinica-service.service";
import {ToastrService} from "ngx-toastr";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-lista-ficha-clinica',
  templateUrl: './lista-ficha-clinica.component.html',
  styleUrls: ['./lista-ficha-clinica.component.css']
})
export class ListaFichaClinicaComponent implements OnInit {

  titulo = "Fichas Clínicas - Listado";

  // los campos de los filtros
  fechaDesde!: Date;
  fechaHasta!: Date;
  empleado!: String;
  cliente!: String;
  categoria!: Categoria;
  subcategoria!: Categoria;

  // los datos recibidos del back
  listaCategorias!: Categoria[];
  listaSubcategorias!: Subcategoria[];
  listaFichasClinicas!:  FichaClinica[];

  // para poder trabajar con la paginación
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  deshabilitarPaginado: boolean = true; // deshabilitado al principio, porque este módulo no dice que hace falta paginar

  // para decirle al mat-table qué columnas poner
  displayedColumns: string[] = [
    "fechaHora",
    "idEmpleado",
    "idCliente",
    "idTipoProducto.idCategoria",
    "idTipoProducto",
    "acciones"
  ]

  constructor(
    private httpService: FichaClinicaServiceService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // traer las fichas clínicas ya existentes en el server
    this.getAll();
  }

  // traer del back las fichas clínicas
  getAll(queryParams:{}={}){
    this.httpService.getAll(queryParams).subscribe({
      next: (datos) => {
        console.log(datos.lista);
        this.listaFichasClinicas = datos.lista;
        this.paginator.length = datos.totalDatos;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("No se pudieron obtener las fichas clínicas");
      }
    });
  }

  // para aplicar los filtros seleccionados por el usuario en la tabla
  filtrarTabla() {

  }

  // para recibir la información de que se está cambiando el orden, y poder pedirle al back ya ordenado
  sortChange(sortState: Sort) {
      // le paso en los parámetros nomas lo que quiero ordenar y cómo ordenar
      this.getAll({
        inicio: 1,
        cantidad: this.paginator.pageSize,
        orderBy: sortState.active,  // el elemento a ordenar ya viene del html
        orderDir: sortState.direction  // la dirección ya viene del angular mat
      });
    }

  cambioPaginacion() {
    // pedirle a sort que vuelva a traer los datos del back pero en base a estas nuevas condiciones
    // en caso de que se tenga activada la ordenación en alguna columna
    if (this.sort.active) {
      this.sortChange(this.sort);
    }
    else {
      this.getAll({
        inicio: this.paginator.pageIndex*this.paginator.pageSize, // página_actual*tamaño_paginación, para saber desde dónde hay que pedirle los datos al back
        cantidad: this.paginator.pageSize,
      });
    }
    console.log(this.paginator.pageIndex);
  }

  habilitarPaginado() {

    // poner en habilitado el paginado en el html
    if (this.deshabilitarPaginado) {
      this.deshabilitarPaginado = false;
    };

    // ejecutar el paginado
    this.cambioPaginacion();
  }
}
