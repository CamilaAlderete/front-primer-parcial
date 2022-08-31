import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {ServicioService} from "../../service/servicio.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-lista-servicio',
  templateUrl: './lista-servicio.component.html',
  styleUrls: ['./lista-servicio.component.css']
})
export class ListaServicioComponent implements OnInit {

  titulo = "Servicios"; // título de la página
  listaServicios: MatTableDataSource<String>;  // datos listados en la página
  displayedColumns: string[] = [
    'idPresentacionProducto',
    'nombre',
    'descripcion',

    'idProducto.descripcion',
    'idProducto.idProducto',

    'idProducto.idTipoProducto.descripcion',
    'idProducto.idTipoProducto.idTipoProducto',

    'acciones'
  ];

  // para la paginación de la tabla y el ordenamiento
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // dependencias
  constructor(
    private httpService: ServicioService, // El service de servicio
    private toastr: ToastrService //para notificaciones en pantalla
  ) {
    // para inicializar en vacío la lista
    this.listaServicios = new MatTableDataSource();

    // para que la tabla pueda filtrar también los elementos anidados
    this.listaServicios.filterPredicate = (data, filter:string)=> {
      const accumulator = (currentTerm: any, key: any) => {
        return this.nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();

      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;

    };
  }

  // apenas se inicializa
  ngOnInit(): void {
    // traer los servicios ya existentes en el server
    this.getAll();
  }

  // para que el mat-table pueda paginar y filtrar
  ngAfterViewInit() {
    this.listaServicios.paginator = this.paginator;
    this.listaServicios.sort = this.sort;
  }

  // para el input de filtro que está arriba de la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listaServicios.filter = filterValue.trim().toLowerCase();

    if (this.listaServicios.paginator) {
        this.listaServicios.paginator.firstPage();
    }
  }

  // también para que la tabla pueda filtrar también los elementos anidados
  // el del constructor utiliza esta función
  nestedFilterCheck(search: any, data: any, key: string) {

    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;

  }

  /**
   * Traer todas los servicios ya existentes en el server y guardarlas en el array servicios.
   * Puede recibir query params en caso de necesitar, omitir si no se necesita
   * */
  getAll(queryParams:{}={}) {
    this.httpService.getAll(queryParams).subscribe({
        next: (datos) => {
          console.log(datos.lista);
          this.listaServicios.data = datos.lista;
        },
        error: (err) => {
          console.log(err);
          this.toastr.error("No se pudo obtener la lista", "Error");
        }
      }
    );
  }

  consoleLog(event: MouseEvent) {
    console.log(event);
  }

  delete(id: number){
    this.httpService.delete(id)
      .subscribe({
        next: (e) => {
          this.toastr.success('Servicio eliminado');
          this.getAll();
        },
        error: (err) =>{
          console.log(err);
          this.toastr.error('Error al eliminar Servicio', 'Error');
        }

      });
  }

  eliminar(idPresentacionProducto: number) {
    this.httpService.delete(idPresentacionProducto).subscribe(
      {
        next: (e) => {
          this.toastr.success('Servicio eliminado');
          this.getAll();
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('Error al eliminar Servicio', 'Error');
        }
      }
    );

  }

  // para recibir la información de que se está cambiando el orden, y poder pedirle al back ya ordenado
  sortChange(sortState: Sort) {

    // en caso de que sean las columnas que angular material no puede ordenar por sí mismo porque están
    // anidados los objetos, ya que en otro caso entonces no hace falta pedir _todo de nuevo del back
    if(sortState.active.includes('.')){

      // le paso en los parámetros nomas lo que quiero ordenar y cómo ordenar
      this.getAll({
        orderBy: sortState.active,  // el elemento a ordenar ya viene del html
        orderDir: sortState.direction  // la dirección ya viene del angular mat
      });

    }

  }
}
