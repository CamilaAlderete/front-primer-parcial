import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {PacienteService} from "../../service/paciente.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Paciente} from "../../model/paciente";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-nuevo-paciente',
  templateUrl: './nuevo-paciente.component.html',
  styleUrls: ['./nuevo-paciente.component.css']
})
export class NuevoPacienteComponent implements OnInit {

  titulo: String = "Nuevo paciente";
  nuevoPaciente: Paciente = new Paciente(); // la nuevo paciente siendo creado
  fecha!: Date;
  listatipoPersona: string [] = ['FISICA','JURIDICA'];
  maxDate =  new Date();

  // para validar los input del html
  textFormControl = new FormControl('', [Validators.required]);

  // inyecciones
  constructor(
    private httpPacienteService: PacienteService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {

  }

  guardar() {
    //le da formato a la fecha o algo asi
    this.nuevoPaciente.fechaNacimiento= new DatePipe('en-US').transform(this.fecha, 'yyyy-MM-dd hh:mm:ss');
    // @ts-ignore
    this.nuevoPaciente.fechaNacimiento=  this.nuevoPaciente.fechaNacimiento.toString();
    // si no se cargó datos requeridos
    if (this.nuevoPaciente.nombre === '' || this.nuevoPaciente.apellido === '' || this.nuevoPaciente.telefono === ''
      || this.nuevoPaciente.cedula === '' || this.nuevoPaciente.email === '' || this.nuevoPaciente.ruc === ''
      || this.nuevoPaciente.tipoPersona === '' || this.nuevoPaciente.fechaNacimiento === '') {
      this.toastr.error('Debe completar todos los campos', 'Error');

    } else {
      this.guardarPaciente();
    }
  }

  guardarPaciente() {
    console.log(this.nuevoPaciente);
    this.httpPacienteService.post(this.nuevoPaciente)
      .subscribe({
        next: (e) => {
          this.toastr.success('Paciente "' + this.nuevoPaciente.nombre + ' ' + this.nuevoPaciente.apellido + '" creada exitosamente');
          this.atras();
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('No se pudo crear el paciente', 'Error');
        }
      });
  }

  atras() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}

