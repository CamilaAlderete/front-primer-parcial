import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Reserva} from "../../model/reserva";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {ReservaService} from "../../service/reserva.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import { MatTableDataSource} from "@angular/material/table";
import {Persona} from "../../model/persona";
import {BreakpointObserver} from "@angular/cdk/layout";
import {HttpParams} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {PersonaService} from "../../service/persona.service";
import {MatDialog} from "@angular/material/dialog";
import {FiltroReservaComponent} from "./filtro-reserva/filtro-reserva.component";

@Component({
  selector: 'app-lista-reservas',
  templateUrl: './lista-reservas.component.html',
  styleUrls: ['./lista-reservas.component.css']
})
export class ListaReservasComponent implements OnInit {

  // colocar #filtro en un div
  //@ViewChild('filtro', {static: true}) Filtro!: ElementRef;

  //paginado
  //@ViewChild(MatPaginator) paginator!: MatPaginator;
  //@ViewChild(MatSort) sort!: MatSort;
  //deshabilitarPaginado: boolean = false;

  listaReservas: Reserva[] = [];
  titulo = "Reserva de turnos - listado";
  hoy = new Date();

  displayedColumns: string[] = ['idReserva','idEmpleado.nombreCompleto','idCliente.nombreCompleto', 'fecha', 'horaInicio','horaFin','acciones'];


  constructor(
    private httpService: ReservaService, //para hacer peticiones http
    private toastr: ToastrService, //para notificaciones en pantalla
    private route: ActivatedRoute, //ruteo a otros componentes
    private router: Router,
    public dialog: MatDialog
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

  //POP UP
  openDialog(){

    //abre el pop up
    const dialogRef = this.dialog.open(FiltroReservaComponent);

    //al cerrar, recibe la lista de reservas
    dialogRef.afterClosed().subscribe(result => {

      if(result){
        this.listaReservas = result;
      }

    });
  }

  formatearFecha(fecha: Date){
    return new DatePipe('en-US').transform(fecha, 'yyyyMMdd')
  }


  /*cambioPaginacion() {

    this.getAll({
        inicio: this.paginator.pageIndex*this.paginator.pageSize,
        cantidad: this.paginator.pageSize,
    });

    console.log(this.paginator.pageIndex);
  }*/

  //cuando la pantalla sea menor a 900px, los campos del filtro se van a colocar en vertical, sino en horizontal
  /*ngAfterViewInit() {
    this.observer
      .observe(["(max-width: 900px)"])
      .pipe(delay(1)) // delay 1mS
      .subscribe((res) => {
        if (res.matches) {
          this.renderer.setAttribute(this.Filtro.nativeElement,'class','d-flex flex-column justify-content-around m-3')
        }else{
          this.renderer.setAttribute(this.Filtro.nativeElement,'class','d-flex justify-content-around m-3')
        }
      });
  }*/


}
