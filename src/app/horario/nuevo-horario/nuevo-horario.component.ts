import { Component, OnInit } from '@angular/core';
import {Categoria} from "../../model/categoria";
import {Subcategoria} from "../../model/subcategoria";
import {FormControl, Validators} from "@angular/forms";
import {PopupElegirPersonaService} from "../../service/popup-elegir-persona.service";
import {FichaClinica} from "../../model/ficha-clinica";
import {Horario} from "../../model/horario";
import {HorarioService} from "../../service/horario.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Paciente} from "../../model/paciente";
import {HttpHeaders} from "@angular/common/http";


@Component({
  selector: 'app-nuevo-horario',
  templateUrl: './nuevo-horario.component.html',
  styleUrls: ['./nuevo-horario.component.css']
})
export class NuevoHorarioComponent implements OnInit {

  titulo: String = "Nuevo horario";
  horario: Horario = new Horario();
  fecha: Date = new Date();
  dia!: number;
  horaapertura!: string;
  horacierre!:string;
  intervalo!:number;
  empleado!: Paciente;

  // para validar los input del html
  textFormControl = new FormControl('', [Validators.required]);
  constructor(
    private popupElegirPersonaService: PopupElegirPersonaService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private httpHorarioService: HorarioService,

  ) { }

  ngOnInit(): void {
  }
  // para abrir el popup para elegir el empleado
  popupElegirEmpleado() {
    this.popupElegirPersonaService.abrirSelector(true,"Fisioterapeuta").subscribe(result=>{
      this.horario.idEmpleado = result;
    });
  }
  atras() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  guardar() {
    if (this.dia.toString() === '' || this.horaapertura.toString() === ''|| this.horacierre.toString() === ''
      || this.intervalo.toString() === '' || this.horario.idEmpleado.toString() === '') {
      this.toastr.error('Debe completar todos los campos', 'Error');
    } else {
      this.guardarHorario();
    }
  }

  guardarHorario() {
    let nuevoHorario = {
      "dia": this.dia,
      "horaAperturaCadena": this.horaapertura.replace(":",""),
      "horaCierreCadena": this.horacierre.replace(":",""),
      "intervaloMinutos": this.intervalo,
      "idEmpleado":this.horario.idEmpleado,
    }
    console.log(nuevoHorario);
    let nuevoHorario2: Horario = JSON.parse( JSON.stringify(nuevoHorario) );
    this.httpHorarioService.post(nuevoHorario2)
      .subscribe({
        next: (e) => {
          this.toastr.success('Horario creado exitosamente');
          this.atras();
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('No se pudo crear el horario', 'Error');
        }
      });
  }




}
