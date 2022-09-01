import {Component, ElementRef, OnInit, ViewChild, Renderer2} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoriaService} from "../../service/categoria.service";
import {PersonaService} from "../../service/persona.service";
import {Persona} from "../../model/persona";
import {Reserva} from "../../model/reserva";
import {HttpParams} from "@angular/common/http";
import { DatePipe } from '@angular/common'
import {FormControl, Validators} from "@angular/forms";
import { BreakpointObserver } from "@angular/cdk/layout";
import { delay } from "rxjs/operators";
import {ReservaService} from "../../service/reserva.service";
import {MatDialog} from "@angular/material/dialog";
import {FiltroAgendaComponent} from "./filtro-agenda/filtro-agenda.component";
import {LogicalFileSystem} from "@angular/compiler-cli";


@Component({
  selector: 'app-nueva-reserva',
  templateUrl: './nueva-reserva.component.html',
  styleUrls: ['./nueva-reserva.component.css']
})
export class NuevaReservaComponent implements OnInit {

  agenda: Reserva[] = [];
  idProfesional!: number;
  idPaciente!: number;
  profesional!: Persona;
  fecha!: Date;

  displayedColumns: string[] = ['fecha', 'horaInicioCadena','horaFinCadena','acciones'];

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService,
    private personaService: PersonaService,
    private reservaService: ReservaService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.idPaciente = 293;
  }

  reservar(turno: Reserva){

    if( this.idProfesional!=null && this.idPaciente!= null){
      console.log('PROFESIONAL');
      console.log(this.idProfesional);
      console.log('PACIENTE')
      console.log(this.idPaciente);
      console.log('TURNO')
      console.log(turno)
      this.reservaTurno(turno);
    }else{
      this.toastr.error('No se puede reservar turno', 'Error');
    }

  }

  reservaTurno(turno: Reserva){

    /*let nuevaReserva = new Reserva();
    nuevaReserva.fechaCadena = turno.fechaCadena;
    nuevaReserva.horaInicioCadena = turno.horaInicioCadena;
    nuevaReserva.horaFinCadena = turno.horaFinCadena;
    nuevaReserva.idEmpleado.idPersona = this.idProfesional;
    nuevaReserva.idCliente.idPersona = this.idPaciente;*/

    let json = {
      "fechaCadena": turno.fechaCadena,
      "horaInicioCadena": turno.horaInicioCadena,
      "horaFinCadena": turno.horaFinCadena,
      "idEmpleado": {
        "idPersona":this.idProfesional
      },
      "idCliente": {
        "idPersona": this.idPaciente
      }
    }
    let nuevaReserva: Reserva = JSON.parse( JSON.stringify(json) );

    this.reservaService.post(nuevaReserva).subscribe({
      next:(e)=>{
        this.toastr.success('Turno reservado exitosamente');
      },
      error: (err)=>{
        console.log(err);
        this.toastr.error('No se pudo reservar el turno');
      }
    });
  }


  openDialog(){
    //abre el pop up
    const dialogRef = this.dialog.open(FiltroAgendaComponent);

    //al cerrar, recibe la lista de reservas
    dialogRef.afterClosed().subscribe(result => {

      if(result){
        this.idProfesional = result[0];
        this.agenda = result[1];
      }

    });
  }



  atras() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}



//@ViewChild('filtro', {static: true}) Filtro!: ElementRef;

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
