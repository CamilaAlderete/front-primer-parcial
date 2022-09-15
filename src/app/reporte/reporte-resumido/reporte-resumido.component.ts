import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DatePipe} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {PopupElegirPersonaService} from "../../service/popup-elegir-persona.service";
import {Paciente} from "../../model/paciente";
//import {Servicio} from "../../model/servicio";
//import {ServicioService} from "../../service/servicio.service";

import jsPDF from 'jspdf';
import {Servicio2Service} from "../../service/servicio2.service";
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-reporte-resumido',
  templateUrl: './reporte-resumido.component.html',
  styleUrls: ['./reporte-resumido.component.css']
})
export class ReporteResumidoComponent implements OnInit {

  hoy = new Date();
  //servicios: Servicio[] = [];
  servicios: any = [];

  fechaDesde!: Date | undefined;
  fechaHasta!: Date | undefined;
  idProfesional!: number | undefined;
  idPaciente!: number | undefined;

  cliente!: Paciente | undefined;
  empleado!: Paciente | undefined;


  displayedColumns: string[] = ['Fecha','Profesional','Cliente', 'Presupuesto', 'Tipo Producto'];

  @ViewChild('tabla') tabla!: ElementRef; //pdf

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private popupElegirPersonaService: PopupElegirPersonaService,
    private httpService: Servicio2Service,

  ) { }

  ngOnInit(): void {
    this.getAll({});
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

    let filtros: any = {}
    if(this.cliente){
      filtros["idFichaClinica"] = { idCliente :{idPersona: this.cliente?.idPersona} };
    }
    if(this.empleado){
      filtros["idEmpleado"] = {idPersona: this.empleado?.idPersona};
    }
    if(this.fechaDesde && this.fechaHasta){
      filtros["fechaDesdeCadena"] = this.formatearFecha(this.fechaDesde);
      filtros["fechaHastaCadena"] = this.formatearFecha(this.fechaHasta);
    }


    this.getAll({ejemplo: JSON.stringify(filtros)});

  }

  limpiarFiltro(){
    this.cliente = undefined;
    this.empleado = undefined;
    this.fechaDesde = undefined;
    this.fechaHasta = undefined;

  }

  popupElegirCliente() {
    this.popupElegirPersonaService.abrirSelector(false,"Cliente").subscribe(result=>{
      this.cliente = result;
    });
  }

  popupElegirEmpleado() {
    this.popupElegirPersonaService.abrirSelector(true,"Fisioterapeuta").subscribe(result=>{
      this.empleado = result;
    });
  }



  formatearFecha(fecha: Date){
    return new DatePipe('en-US').transform(fecha, 'yyyyMMdd')
  }


  exportarPdf(){

    let pdf = new jsPDF();
    pdf.setFontSize(11);
    pdf.text("Reporte resumido de servicios", pdf.internal.pageSize.getWidth() / 2, 10, {align: 'center'});

    autoTable(pdf, {
      head: [this.displayedColumns],
      body: this.getLista(),
    });

    pdf.save('reporte-resumido.pdf')

  }



  getLista(){
    let lista:any =  []
    for( let s of this.servicios){
      let item = [s.fechaHora.split(' ')[0], s.idEmpleado.nombreCompleto, s.idFichaClinica.idCliente.nombreCompleto, s.presupuesto, s.idFichaClinica.idTipoProducto.descripcion]
      lista.push(item);
    }

    return lista;
  }



}
