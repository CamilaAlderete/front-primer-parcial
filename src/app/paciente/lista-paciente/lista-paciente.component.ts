import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Paciente} from "../../model/paciente";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {ToastrService} from "ngx-toastr";
import {PacienteService} from "../../service/paciente.service";

@Component({
  selector: 'app-lista-paciente',
  templateUrl: './lista-paciente.component.html',
  styleUrls: ['./lista-paciente.component.css']
})
export class ListaPacienteComponent implements OnInit {

  titulo = ""; // título de la página
  listaPacientes: MatTableDataSource<Paciente>;  // datos listados en la página
  displayedColumns: string[] = [
    'idPersona',
    'nombre',
    'apellido',
    'telefono',
    'email',
    'ruc',
    'cedula',
    'tipoPersona',
    'fechaNacimiento',
    'acciones'
  ];

  // para la paginación de la tabla y el ordenamiento
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // dependencias
  constructor(
    private httpService: PacienteService, // El service de paciente
    private toastr: ToastrService //para notificaciones en pantalla
  ) {
    // para inicializar en vacío la lista
    this.listaPacientes = new MatTableDataSource();

    // para que la tabla pueda filtrar también los elementos anidados
    this.listaPacientes.filterPredicate = (data, filter:string)=> {
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
    // traer las subcategorías ya existentes en el server
    this.getAll();
    this.titulo = "Pacientes"; // título de la página
  }

  // para que el mat-table pueda paginar y filtrar
  ngAfterViewInit() {
    this.listaPacientes.paginator = this.paginator;
    this.listaPacientes.sort = this.sort;
  }

  // para el input de filtro que está arriba de la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listaPacientes.filter = filterValue.trim().toLowerCase();

    if (this.listaPacientes.paginator) {
      this.listaPacientes.paginator.firstPage();
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
   * Traer todas los pacientes ya existentes en el server y guardarlas en el array pacientes.
   * Puede recibir query params en caso de necesitar, omitir si no se necesita
   * */
  getAll(queryParams:{}={}) {
    this.httpService.getAll(queryParams).subscribe({
        next: (datos) => {
          console.log(datos.lista);
          this.listaPacientes.data = datos.lista;
          this.titulo = "Pacientes"; // título de la página
        },
        error: (err) => {
          console.log(err);
          this.toastr.error("No se pudo obtener la lista de pacientes", "Error");
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
          this.toastr.success('Paciente eliminado');
          this.getAll();
        },
        error: (err) =>{
          console.log(err);
          this.toastr.error('Error al eliminar Paciente', 'Error');
        }

      });
  }

  eliminar(idPaciente: number) {
    this.httpService.delete(idPaciente).subscribe(
      {
        next: (e) => {
          this.toastr.success('Paciente eliminado');
          this.getAll();
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('Error al eliminar paciente', 'Error');
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

  fisioterapeutas() {
    let fisio = {
      "soloUsuariosDelSistema": true
    }
    this.httpService.getAll({ejemplo: JSON.stringify(fisio)}).subscribe(
      {
        next: (datos) => {
          console.log(datos.lista);
          this.listaPacientes.data = datos.lista;
          this.titulo = "Fisioterapeutas"; // título de la página
        },
        error: (err) => {
          console.log(err);
          this.toastr.error("No se pudo obtener la lista de fisioterapeutas", "Error");
        }
      }
    );
  }
  filtro() {
    // let fisio = {
    //   "soloUsuariosDelSistema":true
    // }
    // this.httpService.getAll({ejemplo: JSON.stringify(fisio)}).subscribe(
    //   {
    //     next: (datos) => {
    //       console.log(datos.lista);
    //       this.listaPacientes.data = datos.lista;
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.toastr.error("No se pudo obtener la lista de fisioterapeutas", "Error");
    //     }
    //   }
    // );
  }
}
