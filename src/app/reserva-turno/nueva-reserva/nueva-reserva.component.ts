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


@Component({
  selector: 'app-nueva-reserva',
  templateUrl: './nueva-reserva.component.html',
  styleUrls: ['./nueva-reserva.component.css']
})
export class NuevaReservaComponent implements OnInit {

  // para el div que contiene los campos del filtro
  @ViewChild('filtro', {static: true}) Filtro!: ElementRef;


  profesionales: Persona[] = [];
  agenda: Reserva[] = [];
  idProfesional!: number;
  profesional!: Persona;
  fecha!: Date;
  hoy = new Date();

  //control en los campos del filtro
  profesionalFormControl = new FormControl('', [Validators.required]);
  fechaFormControl = new FormControl('', [Validators.required]);

  displayedColumns: string[] = ['fecha', 'horaInicio','horaFin','acciones'];


  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private categoriaService: CategoriaService,
    private personaService: PersonaService,
    private renderer: Renderer2,
    private observer: BreakpointObserver
  ) { }

  ngOnInit(): void {
    this.getProfesionales();

  }

  guardar(){

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
      },
      error: (err)=>{
        console.log(err);
        this.toastr.error('No se pudo obtener la agenda del profesional', 'Error');
      }
    });
  }


  atras() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  filtrar(){
    if(this.idProfesional!= null && this.fecha!= null){
            this.getAgenda(this.fecha)
    }else{
      this.toastr.error('Debe completar todos los campos', 'Error');
    }

  }

  /*limpiarFiltro(){

  }*/

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
