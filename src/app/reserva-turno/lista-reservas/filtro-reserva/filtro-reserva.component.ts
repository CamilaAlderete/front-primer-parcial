import {Component, OnInit, Renderer2} from '@angular/core';
import {DatePipe} from "@angular/common";
import {ReservaService} from "../../../service/reserva.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {PersonaService} from "../../../service/persona.service";
import {Persona} from "../../../model/persona";
import {HttpParams} from "@angular/common/http";
import {Reserva} from "../../../model/reserva";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-filtro-reserva',
  templateUrl: './filtro-reserva.component.html',
  styleUrls: ['./filtro-reserva.component.css']
})
export class FiltroReservaComponent implements OnInit {

  listaProfesionales: Persona[] = [];
  listaPacientes: Persona[] = [];
  listaReservas: Reserva[] = [];
  fechaDesde!: Date | undefined;
  fechaHasta!: Date | undefined;
  idProfesional!: number | undefined;
  idPaciente!: number | undefined;

  constructor(
    private httpService: ReservaService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private personaService: PersonaService,
    public dialogRef: MatDialogRef<FiltroReservaComponent>,

  ) { }

  ngOnInit(): void {

    //obtener los listados de personas
    let params = new HttpParams()
      .set('orderBy', 'idPersona')
      .set('orderDir', 'asc')

    this.getProfesionales(params);
    this.getPacientes(params);
  }

  getAll(queryParams:{}){
    this.httpService.getAll(queryParams)
      .subscribe({
        next: (e) => {
          console.log(e)
          this.listaReservas = e.lista;
          this.dialogRef.close(this.listaReservas);
        },
        error: (err) =>{
          console.log(err);
          this.toastr.error('No se pudo obtener las reservas de turnos', 'Error');
        }

      });
  }

  getProfesionales(queryParams:{}){
    this.personaService.getAll(queryParams)
      .subscribe({
        next: (e) => {
          console.log(e)
          this.listaProfesionales = e.lista

        },
        error: (err) =>{
          console.log(err);
          this.toastr.error('No se pudo obtener la lista de profesionales', 'Error');
        }

      });
  }


  getPacientes(queryParams:{}){
    this.personaService.getAll(queryParams)
      .subscribe({
        next: (e) => {
          console.log(e)
          this.listaPacientes = e.lista

        },
        error: (err) =>{
          console.log(err);
          this.toastr.error('No se pudo obtener la lista de pacientes', 'Error');
        }

      });
  }

  filtrar(){

    let filtros: any = {}
    if(this.idPaciente){
      filtros["idCliente"] = {idPersona: this.idPaciente};
    }
    if(this.idProfesional){
      filtros["idEmpleado"] = {idPersona: this.idProfesional};
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

  formatearFecha(fecha: Date){
    return new DatePipe('en-US').transform(fecha, 'yyyyMMdd')
  }

  //cerrar dialog
  cerrar(): void {
    this.dialogRef.close(this.listaReservas);
  }


}
