import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Paciente} from "../model/paciente";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {PacienteService} from "../service/paciente.service";
import {ToastrService} from "ngx-toastr";
import {delay} from "rxjs/operators";
import {BreakpointObserver} from "@angular/cdk/layout";

interface DatosRecibidos {
  titulo: string;
  soloFisioterapeutas: boolean;
}
@Component({
  selector: 'app-popup-elegir-persona',
  templateUrl: './popup-elegir-persona.component.html',
  styleUrls: ['./popup-elegir-persona.component.css']
})
export class PopupElegirPersonaComponent implements OnInit {

  // para hacer responsive
  estiloTabla: string = "";

  // para la paginación de la tabla y el ordenamiento
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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

  constructor(
    public dialogRef: MatDialogRef<PopupElegirPersonaComponent>,
    // con este recibo información y también la envío devuelta
    @Inject(MAT_DIALOG_DATA) public data: DatosRecibidos,
    private httpService: PacienteService, // El service de paciente
    private toastr: ToastrService, //para notificaciones en pantalla
    private observer: BreakpointObserver
  ) {
    // para inicializar en vacío la lista
    this.listaPacientes = new MatTableDataSource();

    // para que la tabla pueda filtrar también los elementos anidados
    this.listaPacientes.filterPredicate = (data, filter: string) => {
      const accumulator = (currentTerm: any, key: any) => {
        return this.nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();

      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    }
  }

  ngOnInit(): void {
    if(this.data.soloFisioterapeutas) {
      // traer sólo los fisioterapeutas
      this.fisioterapeutas();
    }
    else {
      // traer todas las personas
      this.getAll();
    }

  }

  // para que el mat-table pueda paginar y filtrar
  ngAfterViewInit() {
    this.listaPacientes.paginator = this.paginator;
    this.listaPacientes.sort = this.sort;

    // para hacer que sea responsive
    this.observer
      .observe(["(max-width: 700px)"])
      .pipe(delay(1)) // delay 1mS
      .subscribe((res) => {
        if (res.matches) {
          this.estiloTabla = "width: 700px";
        } else {
          this.estiloTabla = "";
        }
      });
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
   * Traer todos los pacientes ya existentes en el server y guardarlas en el array pacientes.
   * Puede recibir query params en caso de necesitar, omitir si no se necesita
   * */
  getAll(queryParams:{}={}) {
    this.httpService.getAll(queryParams).subscribe({
        next: (datos) => {
          console.log(datos.lista);
          this.listaPacientes.data = datos.lista;
        },
        error: (err) => {
          console.log(err);
          this.toastr.error("No se pudo obtener la lista de pacientes", "Error");
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
      "soloUsuariosDelSistema":true
    }
    this.httpService.getAll({ejemplo: JSON.stringify(fisio)}).subscribe(
      {
        next: (datos) => {
          console.log(datos.lista);
          this.listaPacientes.data = datos.lista;
        },
        error: (err) => {
          console.log(err);
          this.toastr.error("No se pudo obtener la lista de fisioterapeutas", "Error");
        }
      }
    );

  }

}
