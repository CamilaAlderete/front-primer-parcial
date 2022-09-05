import {Component, OnInit, ViewChild} from '@angular/core';
import {Categoria} from "../../model/categoria";
import {Subcategoria} from "../../model/subcategoria";
import {FichaClinica} from "../../model/ficha-clinica";
import {MatSort, Sort} from "@angular/material/sort";
import {FichaClinicaServiceService} from "../../service/ficha-clinica-service.service";
import {ToastrService} from "ngx-toastr";
import {MatPaginator} from "@angular/material/paginator";
import {CategoriaService} from "../../service/categoria.service";
import {SubcategoriaService} from "../../service/subcategoria.service";
import {DatePipe} from "@angular/common";
import {PopupElegirPersonaService} from "../../service/popup-elegir-persona.service";
import {Paciente} from "../../model/paciente";

@Component({
  selector: 'app-lista-ficha-clinica',
  templateUrl: './lista-ficha-clinica.component.html',
  styleUrls: ['./lista-ficha-clinica.component.css']
})
export class ListaFichaClinicaComponent implements OnInit {

  titulo = "Fichas Clínicas - Listado";

  // los campos de los filtros. Uso el undefined porque así puedo limpiar los campos igualando a undefined las variables
  fechaDesde!: Date | undefined;
  fechaHasta!: Date | undefined;
  empleado!: Paciente | undefined;
  cliente!: Paciente | undefined;
  categoria!: Categoria | undefined;
  subcategoria!: Subcategoria | undefined;

  // los datos recibidos del back
  listaCategorias!: Categoria[];
  listaSubcategorias!: Subcategoria[] | undefined;
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
    private httpCategoriaService: CategoriaService,
    private httpSubcategoriaService: SubcategoriaService,
    private popupElegirPersonaService: PopupElegirPersonaService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // traer las fichas clínicas ya existentes en el server
    this.getAll();
    // traer del back los datos necesarios para los campos de filtrado del html
    this.getDatosFiltros();
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

  // traer del back los datos necesarios para los campos de filtrado del html
  getDatosFiltros(){
    // traer las categorías
    this.httpCategoriaService.getAll().subscribe({
      next: (datos) => {
        console.log(datos.lista);
        this.listaCategorias = datos.lista;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("No se pudieron obtener las fichas clínicas");
      }
    });
  }

  // para aplicar los filtros seleccionados por el usuario en la tabla
  filtrarTabla() {

    // los filtros a aplicar. Se van guardando nomas los campos que no estén vacíos
    let filtros: any = {}
    if(this.subcategoria){
      filtros["idTipoProducto"] = {idTipoProducto: this.subcategoria.idTipoProducto};
    }
    if(this.cliente){
      filtros["idCliente"] = {idPersona: this.cliente.idPersona};
    }
    if(this.empleado){
      filtros["idEmpleado"] = {idPersona: this.empleado.idPersona};
    }
    if(this.fechaDesde && this.fechaHasta){
      filtros["fechaDesdeCadena"] = this.formatearFecha(this.fechaDesde);
      filtros["fechaHastaCadena"] = this.formatearFecha(this.fechaHasta);
    }

    // pedirle al back
    this.httpService.getAll({ejemplo: JSON.stringify(filtros)}).subscribe({
      next: (datos) => {
        console.log(datos.lista);
        this.listaFichasClinicas = datos.lista;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("No se pudieron obtener las fichas clínicas");
      }
    });
  }

  // para recibir la información de que se está cambiando el orden, y poder pedirle al back ya ordenado
  sortChange(sortState: Sort) {
    // le paso en los parámetros nomas lo que quiero ordenar y cómo ordenar
    if (this.deshabilitarPaginado) {
      this.getAll({
        orderBy: sortState.active,  // el elemento a ordenar ya viene del html
        orderDir: sortState.direction  // la dirección ya viene del angular mat
      });
    } else {
      this.getAll({
        inicio: 1,
        cantidad: this.paginator.pageSize,
        orderBy: sortState.active,  // el elemento a ordenar ya viene del html
        orderDir: sortState.direction  // la dirección ya viene del angular mat
      });
    }
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
    }

    // ejecutar el paginado
    this.cambioPaginacion();
  }

  // para traer las subcategorías al seleccionar una categoría
  traerSubcategorias() {
    let filtro = {
      "idCategoria": {"idCategoria": this.categoria?.idCategoria}
    }
    this.httpSubcategoriaService.getAll({ejemplo: JSON.stringify(filtro)}).subscribe({
      next: (datos) => {
        console.log(datos.lista);
        this.listaSubcategorias = datos.lista;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("No se pudieron obtener las fichas clínicas");
      }
    });
  }

  //le da formato a la fecha o algo asi
  formatearFecha(fecha: Date){
    return new DatePipe('en-US').transform(fecha, 'yyyyMMdd')
  }

  // limpiar filtros y volver a traer todos los datos
  limpiarFiltros() {
    this.subcategoria = undefined;
    this.cliente = undefined;
    this.empleado = undefined;
    this.fechaDesde = undefined;
    this.fechaHasta = undefined;
    this.categoria = undefined;
    this.listaSubcategorias = undefined;

    this.getAll();
  }

  // para abrir el popup para elegir el cliente
  popupElegirCliente() {
    this.popupElegirPersonaService.abrirSelector(false,"Cliente").subscribe(result=>{
      this.cliente = result;
    });
  }

  // para abrir el popup para elegir el empleado
  popupElegirEmpleado() {
    this.popupElegirPersonaService.abrirSelector(true,"Fisioterapeuta").subscribe(result=>{
      this.empleado = result;
    });
  }
}
