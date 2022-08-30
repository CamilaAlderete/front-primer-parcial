import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Reserva} from "../../model/reserva";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {ReservaService} from "../../service/reserva.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import { MatTableDataSource} from "@angular/material/table";
import {Persona} from "../../model/persona";
import {delay} from "rxjs/operators";
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
  selector: 'app-lista-reservas',
  templateUrl: './lista-reservas.component.html',
  styleUrls: ['./lista-reservas.component.css']
})
export class ListaReservasComponent implements OnInit {

  // para el div que contiene los campos del filtro
  @ViewChild('filtro', {static: true}) Filtro!: ElementRef;

  listaReservas: Reserva[] = [];
  titulo = "Reserva de turnos - listado";
  listaPersonas: Persona[] = [];
  fecha!: Date;
  hoy = new Date();
  idProfesional!: number;
  idPaciente!: number;

  //  displayedColumns: string[] = ['idReserva','profesional','cliente', 'fecha', 'horario','acciones'];
  displayedColumns: string[] = ['idReserva','idEmpleado.nombreCompleto','idCliente.nombreCompleto', 'fecha', 'horaInicio','horaFin','acciones'];

  constructor(
    private httpService: ReservaService, //para hacer peticiones http
    private toastr: ToastrService, //para notificaciones en pantalla
    private route: ActivatedRoute, //ruteo a otros componentes
    private router: Router,
    private renderer: Renderer2,
    private observer: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.getAll({});
  }

  getAll(queryParams:{}){
    this.httpService.getAll(queryParams)
      .subscribe({
        next: (e) => {
          console.log(e)
          this.listaReservas = e.lista

        },
        error: (err) =>{
          console.log(err);
          this.toastr.error('No se pudo obtener las reservas', 'Error');
        }

      });
  }

  filtrar(){

  }

  //cuando la pantalla sea menor a 900px, los campos del filtro se van a colocar en vertical, sino en horizontal
  ngAfterViewInit() {
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
  }

}
