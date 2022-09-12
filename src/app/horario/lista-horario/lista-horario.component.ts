import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {HorarioService} from "../../service/horario.service";
import {ToastrService} from "ngx-toastr";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {Horario} from "../../model/horario";
import {Paciente} from "../../model/paciente";
import {PopupElegirPersonaService} from "../../service/popup-elegir-persona.service";
import {FormControl, Validators} from "@angular/forms";


@Component({
  selector: 'app-lista-horario',
  templateUrl: './lista-horario.component.html',
  styleUrls: ['./lista-horario.component.css']
})
export class ListaHorarioComponent implements OnInit {
  titulo = "Horarios"; // título de la página
  listaHorarios: MatTableDataSource<Horario>;  // datos listados en la página
  displayedColumns: string[] = [
    'dia',
    'horaAperturaCadena',
    'horaCierreCadena',
    'intervaloMinutos',
    'idEmpleado.nombre',
    'idEmpleado.apellido',
  ];
  dia!: number | undefined;
  empleado!: Paciente | undefined;

  // para la paginación de la tabla y el ordenamiento
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // para validar los input del html
  textFormControl = new FormControl('', [Validators.required]);

  // dependencias
  constructor(
    private httpService: HorarioService, // El service de servicio
    private toastr: ToastrService, //para notificaciones en pantalla
    private popupElegirPersonaService: PopupElegirPersonaService,
  ) {
    // para inicializar en vacío la lista
    this.listaHorarios = new MatTableDataSource();


    // para que la tabla pueda filtrar también los elementos anidados
    this.listaHorarios.filterPredicate = (data, filter: string) => {
      const accumulator = (currentTerm: any, key: any) => {
        return this.nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();

      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;

    };
  };


  ngOnInit(): void {
    this.getAll();
  }

  // para que el mat-table pueda paginar y filtrar
  ngAfterViewInit() {
    this.listaHorarios.paginator = this.paginator;
    this.listaHorarios.sort = this.sort;
  }

  // para el input de filtro que está arriba de la tabla
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listaHorarios.filter = filterValue.trim().toLowerCase();

    if (this.listaHorarios.paginator) {
      this.listaHorarios.paginator.firstPage();
    }
  }


  getAll(queryParams: {} = {}) {
    this.httpService.getAll(queryParams).subscribe({
        next: (datos) => {
          console.log(datos.lista);
          this.listaHorarios.data = datos.lista;
        },
        error: (err) => {
          console.log(err);
          this.toastr.error("No se pudo obtener la lista", "Error");
        }
      }
    );
  }


  // para recibir la información de que se está cambiando el orden, y poder pedirle al back ya ordenado
  sortChange(sortState: Sort) {

    // en caso de que sean las columnas que angular material no puede ordenar por sí mismo porque están
    // anidados los objetos, ya que en otro caso entonces no hace falta pedir _todo de nuevo del back
    if (sortState.active.includes('.')) {

      // le paso en los parámetros nomas lo que quiero ordenar y cómo ordenar
      this.getAll({
        orderBy: sortState.active,  // el elemento a ordenar ya viene del html
        orderDir: sortState.direction  // la dirección ya viene del angular mat
      });

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

  consoleLog(event: MouseEvent) {
    console.log(event);
  }


  limpiarFiltro() {
    this.dia = undefined;
    this.empleado = undefined;
  }


  filtrar() {
    let filtros: any = {}
    if (this.dia ) {
      filtros["dia"] = this.dia;
    }
    if (this.empleado) {
      filtros["idEmpleado"] = {idPersona: this.empleado?.idPersona};
    }
    this.getAll({ejemplo: JSON.stringify(filtros)});
  }

  popupElegirEmpleado() {
    this.popupElegirPersonaService.abrirSelector(true,"Fisioterapeuta").subscribe(result=>{
      this.empleado = result;
    });
  }
}

