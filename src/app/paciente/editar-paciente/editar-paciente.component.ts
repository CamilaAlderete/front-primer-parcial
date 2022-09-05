import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Paciente} from "../../model/paciente";
import {PacienteService} from "../../service/paciente.service";
import {FormControl, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-editar-paciente',
  templateUrl: './editar-paciente.component.html',
  styleUrls: ['./editar-paciente.component.css']
})
export class EditarPacienteComponent implements OnInit {


  titulo = 'Editar paciente'
  maxDate =  new Date();
  fecha!: Date;
  listatipoPersona: string [] = ['FISICA','JURIDICA'];
  paciente: Paciente = new Paciente();  // el paciente que se está modificando actualmente

  // para validar el input del html
  textFormControl = new FormControl('', [Validators.required]);

  date = new FormControl();

  // inyecciones
  constructor(
    private httpPacienteService: PacienteService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    // traer el paciente actual
    this.paciente.idPersona = this.route.snapshot.params['id'];
    this.getById();
  }


  // se busca el objeto de acuerdo a su id
  getById(){
    this.httpPacienteService.getById(this.paciente.idPersona)
      .subscribe({
        next: (e) => {
          this.paciente = e;
          let string= new DatePipe('en-US').transform(this.paciente.fechaNacimiento, 'MM-dd-yyyy');
          // @ts-ignore
          this.date = new FormControl(new Date(string));

        },
        error: (err) => {
          console.log(err);
          this.toastr.error('No se pudo obtener el paciente','Error');
          this.atras(); //comentar esta línea en caso de querer mirar el error en consola
        }
      })
  }

  guardar() {

    //le da formato a la fecha o algo asi
    this.paciente.fechaNacimiento= new DatePipe('en-US').transform(this.fecha.toString(), 'yyyy-MM-dd hh:mm:ss');

    // si no se cargó datos requeridos
    if (this.paciente.nombre === '' || this.paciente.apellido === '' || this.paciente.telefono === ''
      || this.paciente.cedula === '' || this.paciente.email === '' || this.paciente.ruc === ''
      || this.paciente.tipoPersona === '' || this.paciente.fechaNacimiento === '') {
      this.toastr.error('Debe completar todos los campos', 'Error');
    }else{
      this.guardarPaciente();
    }
  }

  guardarPaciente(){
    console.log(this.paciente);
    this.httpPacienteService.put(this.paciente)
      .subscribe({
        next: (e) => {
          this.toastr.success('Paciente "'+ this.paciente.nombre +' '+this.paciente.apellido + '" editado exitosamente');
          this.atras();
        },
        error: (err) =>{
          console.log(err);
          this.toastr.error('No se pudo editar el paciente', 'Error');
        }
      });
  }

  // para que el input mat-select pueda inicializar su dato seleccionado
  compararObjetosTipoPersona(object1: String, object2: String) {
    return object1===object2;
  }

  atras() {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

}
