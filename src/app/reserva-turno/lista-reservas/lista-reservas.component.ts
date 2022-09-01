import {Component, OnInit} from '@angular/core';
import {Reserva} from "../../model/reserva";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {ReservaService} from "../../service/reserva.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import { MatTableDataSource} from "@angular/material/table";

import {DatePipe} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {PopupElegirPersonaService} from "../../service/popup-elegir-persona.service";
import {Paciente} from "../../model/paciente";
import {ObservacionComponent} from "./observacion/observacion.component";

@Component({
  selector: 'app-lista-reservas',
  templateUrl: './lista-reservas.component.html',
  styleUrls: ['./lista-reservas.component.css']
})
export class ListaReservasComponent implements OnInit {

  titulo = "Reserva de Turnos - listado";
  hoy = new Date();
  listaReservas: Reserva[] = [];
  fechaDesde!: Date | undefined;
  fechaHasta!: Date | undefined;
  idProfesional!: number | undefined;
  idPaciente!: number | undefined;

  cliente!: Paciente | undefined;
  empleado!: Paciente | undefined;


  displayedColumns: string[] = ['idReserva','idEmpleado.nombreCompleto','idCliente.nombreCompleto', 'fecha', 'horaInicio','horaFin','acciones'];


  constructor(
    private httpService: ReservaService, //para hacer peticiones http
    private toastr: ToastrService, //para notificaciones en pantalla
    private route: ActivatedRoute, //ruteo a otros componentes
    private popupElegirPersonaService: PopupElegirPersonaService,
    public popupDetalleReserva: MatDialog
  ) { }

  ngOnInit(): void {

    let ejemplo: any = {}

    ejemplo['fechaDesdeCadena'] = this.formatearFecha(this.hoy);
    ejemplo['fechaHastaCadena'] = this.formatearFecha(this.hoy);
    ejemplo['idEmpleado'] = { 'idPersona': '2'}; //cambiar luego con el id del usuario en sesion
    ejemplo['flagEstado'] = "R";

    /*let params1 = new HttpParams()
      .set('orderBy','idReserva')
      .set('orderDir','desc')
      .set('ejemplo',JSON.stringify(ejemplo))

      this.getAll(params1);

      no ordena por fecha ni nada
      */

    this.getAll({ejemplo: JSON.stringify(ejemplo)});

  }

  getAll(queryParams:{}){
    this.httpService.getAll(queryParams)
      .subscribe({
        next: (e) => {
          console.log(e)
          this.listaReservas = e.lista
          //this.paginator.length = e.totalDatos;

        },
        error: (err) =>{
          console.log(err);
          this.toastr.error('No se pudo obtener las reservas de turnos', 'Error');
        }

      });
  }

  filtrar(){

    let filtros: any = {}
    if(this.idPaciente){
      filtros["idCliente"] = {idPersona: this.cliente?.idPersona};
    }
    if(this.idProfesional){
      filtros["idEmpleado"] = {idPersona: this.empleado?.idPersona};
    }
    if(this.fechaDesde && this.fechaHasta){
      filtros["fechaDesdeCadena"] = this.formatearFecha(this.fechaDesde);
      filtros["fechaHastaCadena"] = this.formatearFecha(this.fechaHasta);
    }


    this.getAll({ejemplo: JSON.stringify(filtros)});

  }

  limpiarFiltro(){
    this.idProfesional = undefined;
    this.idPaciente = undefined;
    this.fechaDesde = undefined;
    this.fechaHasta = undefined;

  }

  popupElegirCliente() {
    this.popupElegirPersonaService.abrirSelector(false,"Cliente").subscribe(result=>{
      this.cliente = result;
    });
  }

  popupElegirEmpleado() {
    this.popupElegirPersonaService.abrirSelector(true,"Fisioterapeuta").subscribe(result=>{
      this.empleado = result;
    });
  }



  formatearFecha(fecha: Date){
    return new DatePipe('en-US').transform(fecha, 'yyyyMMdd')
  }

  popUpEditarReserva(idReserva: number){
    const dialogRef = this.popupDetalleReserva.open(ObservacionComponent, {
      data: idReserva
    });
    dialogRef.afterClosed().subscribe(result => {
      this.filtrar();

    });
 }

 eliminar(idReserva: number){
    this.httpService.delete(idReserva).subscribe({
      next:(e)=> {
        this.toastr.success('Reserva fue cancelada exitosamente');
        this.ngOnInit();
      },
      error:(err)=>{
        this.toastr.error('No se pudo cancelar la reserva', 'Error')
      }
    });
 }


}
