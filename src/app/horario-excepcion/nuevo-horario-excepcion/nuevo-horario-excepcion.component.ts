import { Component, OnInit } from '@angular/core';
import {Paciente} from "../../model/paciente";
import {PopupElegirPersonaService} from "../../service/popup-elegir-persona.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HorarioExcepcionService} from "../../service/horario-excepcion.service";
import {HorarioExcepcion} from "../../model/horario-excepcion";
import {ToastrService} from "ngx-toastr";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-nuevo-horario-excepcion',
  templateUrl: './nuevo-horario-excepcion.component.html',
  styleUrls: ['./nuevo-horario-excepcion.component.css']
})
export class NuevoHorarioExcepcionComponent implements OnInit {

  titulo: string = "Nueva excepción";

  horarioExcepcion: HorarioExcepcion = new HorarioExcepcion();

  // S: atenderá de forma excepcional, N: no se habilitará la agenda
  opcionesHabilitar: string [] = ["S", "N"];

  constructor(
    private popupElegirPersonaService: PopupElegirPersonaService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private httpService: HorarioExcepcionService
  ) { }

  ngOnInit(): void {
  }

  guardarHorario() {
    this.httpService.post(this.horarioExcepcion).subscribe({
      next: (e) => {
        this.toastr.success('Ficha creada exitosamente');
        this.atras();
      },
      error: (err) =>{
        console.log(err);
        this.toastr.error('No se pudo crear la ficha', 'Error');
      }
    });
  }

  atras() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  // para abrir el popup para elegir el empleado
  popupElegirEmpleado() {
    this.popupElegirPersonaService.abrirSelector(true,"Fisioterapeuta").subscribe(result=>{
      this.horarioExcepcion.idEmpleado = result;
    });
  }

}
