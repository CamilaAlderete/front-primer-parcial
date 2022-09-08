import {Component, OnInit, ViewChild} from '@angular/core';
import {HorarioExcepcion} from "../../model/horario-excepcion";
import {HorarioExcepcionService} from "../../service/horario-excepcion.service";
import {ToastrService} from "ngx-toastr";
import {PopupElegirPersonaService} from "../../service/popup-elegir-persona.service";
import {Paciente} from "../../model/paciente";
import {DatePipe} from "@angular/common";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-lista-horario-excepcion',
  templateUrl: './lista-horario-excepcion.component.html',
  styleUrls: ['./lista-horario-excepcion.component.css']
})
export class ListaHorarioExcepcionComponent implements OnInit {

  titulo: string = "Horarios de excepción";

  // datos de la tabla
  listaHorariosExcepcion: HorarioExcepcion [] = [];

  // para el filtro
  empleado!: Paciente | undefined;
  fecha!: Date | undefined;

  // para poder trabajar con la paginación
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // para decirle al mat-table qué columnas poner
  displayedColumns: string[] = [
    "fecha",
    "idEmpleado.nombre",
    "horaApertura",
    "horaCierre",
    "acciones"
  ]

  constructor(
    private httpService: HorarioExcepcionService,
    private popupElegirPersonaService: PopupElegirPersonaService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // traer del back todos los horarios de excepción
    this.getAll({inicio:0, cantidad:5});
  }

  // traer del back los horarios de excepción
  getAll(queryParams:{}={}){
    this.httpService.getAll(queryParams).subscribe({
      next: (datos) => {
        console.log(datos.lista);
        this.listaHorariosExcepcion = datos.lista;
        this.paginator.length = datos.totalDatos;
        console.log(datos.totalDatos);
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("No se pudieron obtener los horarios de excepción");
      }
    });
  }

  // para abrir el popup para elegir el empleado
  popupElegirEmpleado() {
    this.popupElegirPersonaService.abrirSelector(true,"Fisioterapeuta").subscribe(result=>{
      this.empleado = result;
    });
  }

  filtrarTabla() {
    let filtro: any = {};
    if (this.empleado){
      filtro["idEmpleado"] = {idPersona: this.empleado.idPersona};
    }
    if (this.fecha){
      filtro["fechaCadena"] =  this.formatearFecha(this.fecha);
    }
    console.log(filtro);
    this.httpService.getAll({ejemplo: JSON.stringify(filtro)}).subscribe({
      next: (datos) => {
        console.log(datos.lista);
        this.listaHorariosExcepcion= datos.lista;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("No se pudieron obtener los horarios de excepción");
      }
    });
    }

  limpiarFiltros() {
    this.empleado = undefined;
    this.fecha = undefined;

    this.getAll();
  }

  //le da formato a la fecha o algo asi
  formatearFecha(fecha: Date){
    return new DatePipe('en-US').transform(fecha, 'yyyyMMdd');
  }

  eliminar(idHorarioExcepcion: number) {
    this.httpService.delete(idHorarioExcepcion).subscribe({
      next: (datos) => {
        console.log(datos);
        this.toastr.success("Horario eliminado");
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("No se pudo eliminar el horario");
      }
    })

  }

  // para recibir la información de que se está cambiando el orden, y poder pedirle al back ya ordenado
  sortChange(sortState: Sort) {
    this.getAll({
      inicio: 0,
      cantidad: this.paginator.pageSize,
      orderBy: sortState.active,  // el elemento a ordenar ya viene del html
      orderDir: sortState.direction  // la dirección ya viene del angular mat
    });
  }

  cambioPaginacion() {
    let filtro: any = {
      inicio: this.paginator.pageIndex * this.paginator.pageSize, // página_actual*tamaño_paginación, para saber desde dónde hay que pedirle los datos al back
      cantidad: this.paginator.pageSize
    }
    if (this.sort.active){
      filtro["orderBy"] = this.sort.active;  // el elemento a ordenar ya viene del html
      filtro["orderDir"] = this.sort.direction  // la dirección ya viene del angular mat
    }

    this.getAll(filtro);
  }
}
