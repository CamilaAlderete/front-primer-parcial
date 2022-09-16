import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {Servicio2Service} from "../../service/servicio2.service";
import {FichaClinica} from "../../model/ficha-clinica";
import {Servicio2} from "../../model/servicio2";
import {Reserva} from "../../model/reserva";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-lista-servicio2',
  templateUrl: './lista-servicio2.component.html',
  styleUrls: ['./lista-servicio2.component.css']
})
export class ListaServicio2Component implements OnInit {

  idFicha!: any;
  ficha!: FichaClinica | undefined;
  servicios: any = [];
  observacion = '';

  textFormControl = new FormControl('', [Validators.required]);


  displayedColumns: string[] = ['Fecha','Profesional','Cliente', 'Observacion', 'Presupuesto', 'Estado','Acciones'];


  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: Servicio2Service
  ) { }

  ngOnInit(): void {
    this.idFicha =  decodeURI( this.route.snapshot.paramMap.get('id') || '0') ;
    this.filtrar();
  }


  getAll(queryParams:{}){

    this.httpService.getAll(queryParams)
      .subscribe({
        next: (e) => {
          console.log(e)
          this.servicios = e.lista

        },
        error: (err) =>{
          console.log(err);
          this.toastr.error('No se pudo obtener los servicios', 'Error');
        }

      });
  }

  filtrar(){

    if(this.idFicha){

      let filtros: any = {}
      filtros["idFichaClinica"] = {
        idFichaClinica: this.idFicha
      };

      this.getAll({ejemplo: JSON.stringify(filtros)});
    }
  }

  guardar(){

    if( this.observacion !== '') {
      let datos = {
        idFichaClinica: {
          idFichaClinica: this.idFicha
        },
        observacion: this.observacion
      }

      let servicio: Servicio2 = JSON.parse(JSON.stringify(datos));

      this.httpService.post(servicio).subscribe({
        next: (e) => {
          this.toastr.success('Servicio creado con exito');
          this.filtrar();
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('No se pudo crear el servicio', 'Error');
        }
      });

    }else{
      this.toastr.error('Debe ingresar una observación');
    }


  }

  /* backend no permite delete
  eliminar(id: number){
    this.httpService.delete(id).subscribe({
      next: (e) => {
        this.toastr.success('Servicio eliminado con exito');
        this.filtrar();
      },
      error: (err) => {
        console.log(err);
        this.toastr.error('No se pudo eliminar el servicio', 'Error');
      }
    });
  }*/



}
