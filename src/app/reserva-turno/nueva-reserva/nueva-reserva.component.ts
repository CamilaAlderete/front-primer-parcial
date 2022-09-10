import {Component, ElementRef, OnInit, ViewChild, Renderer2, AfterViewInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoriaService} from "../../service/categoria.service";
import {PacienteService} from "../../service/paciente.service";
import {Reserva} from "../../model/reserva";
import {HttpParams} from "@angular/common/http";
import { DatePipe } from '@angular/common'
import {FormControl, Validators} from "@angular/forms";
import {ReservaService} from "../../service/reserva.service";
import {MatDialog} from "@angular/material/dialog";
import {Paciente} from "../../model/paciente";
import {PopupElegirPersonaService} from "../../service/popup-elegir-persona.service";
import {MatPaginator} from "@angular/material/paginator";
import {tap} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {CookieService} from "ngx-cookie-service";


@Component({
  selector: 'app-nueva-reserva',
  templateUrl: './nueva-reserva.component.html',
  styleUrls: ['./nueva-reserva.component.css']
})
export class NuevaReservaComponent implements OnInit {

  //agenda: Reserva[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  agenda: MatTableDataSource<Reserva> = new MatTableDataSource();
  idProfesional!: number;
  idPaciente!: number;
  fecha!: Date;
  titulo= 'Reserva De Turno'


  cliente!: Paciente;
  empleado!: Paciente;

  //control en los campos del filtro
  fechaFormControl = new FormControl('', [Validators.required]);

  displayedColumns: string[] = ['fecha', 'horaInicioCadena','horaFinCadena','acciones'];

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService,
    private pacienteService: PacienteService,
    private reservaService: ReservaService,
    public dialog: MatDialog,
    private popupElegirPersonaService: PopupElegirPersonaService,
    private cookies:CookieService,

  ) { }

  ngOnInit(): void {
    this.getPaciente();
  }

  getPaciente(){
    this.pacienteService.getById( Number(this.cookies.get('userId')) ).subscribe({
      next:(e) =>{
        this.cliente = e;
      },
      error:(err)=>{
        console.log(err);
        this.toastr.error('No se pudo obtener los datos del paciente','Error');
      }
    })
  }

  reservar(turno: Reserva){

    if( this.empleado!=null && this.cliente!= null){
      this.reservaTurno(turno);
    }else{
      this.toastr.error('No se puede reservar turno', 'Error');

    }

  }

  reservaTurno(turno: Reserva){

    let datos = {
      fechaCadena: turno.fechaCadena,
      horaInicioCadena: turno.horaInicioCadena,
      horaFinCadena: turno.horaFinCadena,
      idEmpleado: { "idPersona": this.empleado.idPersona },
      idCliente: { "idPersona": this.cliente.idPersona}
    }

    console.log(datos)
    let nuevaReserva: Reserva = JSON.parse( JSON.stringify(datos) );

    this.reservaService.post(nuevaReserva).subscribe({
      next:(e)=>{
        this.toastr.success('Turno reservado exitosamente');
        this.getAgenda();
      },
      error: (err)=>{
        console.log(err);
        this.toastr.error('No se pudo reservar el turno');
      }
    });
  }

  getAgenda(){
    let params = new HttpParams()
      .set('fecha', new DatePipe('en-US').transform(this.fecha, 'yyyyMMdd') || '')
      .set('disponible', 'S')
      //.set('incio', 1) no anda
      //.set('cantidad', 5) no anda

    this.getAll(params)
  }

  getAll(params:{}){

    this.pacienteService.getAgenda(this.empleado.idPersona, params).subscribe({
      next:(e: Reserva[]) =>{
        this.agenda.data = e;

      },
      error: (err: any)=>{
        console.log(err);
        this.toastr.error('No se pudo obtener la agenda del profesional', 'Error');
      }
    });
  }

  filtrar(){
    if(this.empleado!=null && this.fecha!=null){
      this.getAgenda()
    }else{
      this.toastr.error('Debe completar todos los campos', 'Error');
    }

  }


  atras() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  popupElegirEmpleado() {
    this.popupElegirPersonaService.abrirSelector(true,"Fisioterapeuta").subscribe(result=>{
      this.empleado = result;
    });
  }

  ngAfterViewInit() {
    this.agenda.paginator = this.paginator;
  }



}

