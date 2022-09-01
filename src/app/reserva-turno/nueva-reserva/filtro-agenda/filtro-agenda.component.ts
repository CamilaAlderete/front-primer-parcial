import { Component, OnInit } from '@angular/core';
import {ReservaService} from "../../../service/reserva.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {PersonaService} from "../../../service/persona.service";
import {MatDialogRef} from "@angular/material/dialog";
import {Persona} from "../../../model/persona";
import {Reserva} from "../../../model/reserva";
import {HttpParams} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-filtro-agenda',
  templateUrl: './filtro-agenda.component.html',
  styleUrls: ['./filtro-agenda.component.css']
})
export class FiltroAgendaComponent implements OnInit {


  profesionales: Persona[] = [];
  agenda: Reserva[] = [];
  idProfesional!: number;
  idPaciente!: number;
  profesional!: Persona;
  fecha: Date = new Date();

  //control en los campos del filtro
  profesionalFormControl = new FormControl('', [Validators.required]);
  fechaFormControl = new FormControl('', [Validators.required]);

  constructor(
    private httpService: ReservaService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private personaService: PersonaService,
    public dialogRef: MatDialogRef<FiltroAgendaComponent>,
  ) { }

  ngOnInit(): void {
    this.getProfesionales();
  }

  getProfesionales(){
    let params = new HttpParams()
      .set('orderBy', 'idPersona')
      .set('orderDir', 'asc')

    this.personaService.getAll(params).subscribe({
      next:(e) =>{
        this.profesionales = e.lista;
      },
      error: (err)=>{
        console.log(err);
        this.toastr.error('No se pudo obtener la lista de personas', 'Error');
      }
    });

  }

  getAgenda(fecha:Date){

    let params = new HttpParams()
      .set('fecha', new DatePipe('en-US').transform(fecha, 'yyyyMMdd') || '')
      .set('disponible', 'S')

    this.personaService.getAgenda(this.idProfesional, params).subscribe({
      next:(e) =>{
        this.agenda = e;
        console.log(this.agenda);
        this.dialogRef.close([this.idProfesional, this.agenda]);
      },
      error: (err)=>{
        console.log(err);
        this.toastr.error('No se pudo obtener la agenda del profesional', 'Error');
      }
    });
  }

  filtrar(){
    if(this.idProfesional!=null && this.fecha!=null){
      this.getAgenda(this.fecha)
    }else{
      this.toastr.error('Debe completar todos los campos', 'Error');
    }

  }

}
