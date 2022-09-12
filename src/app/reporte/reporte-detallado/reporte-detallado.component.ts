import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {PopupElegirPersonaService} from "../../service/popup-elegir-persona.service";
import {ServicioService} from "../../service/servicio.service";
import {DatePipe} from "@angular/common";
import {Paciente} from "../../model/paciente";

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-reporte-detallado',
  templateUrl: './reporte-detallado.component.html',
  styleUrls: ['./reporte-detallado.component.css']
})
export class ReporteDetalladoComponent implements OnInit {

  //servicios: Servicio[] = [];
  servicios: any = [];

  fechaDesde!: Date | undefined;
  fechaHasta!: Date | undefined;
  idProfesional!: number | undefined;
  idPaciente!: number | undefined;
  idPresentacionProducto!: number | undefined;

  cliente!: Paciente | undefined;
  empleado!: Paciente | undefined;

  displayedColumns: string[] = ['fechaHora','nombreEmpleado','nombreCliente', 'precioUnitario', 'cantidad', 'total', 'nombrePresentacionProducto'];

  @ViewChild('tabla') tabla!: ElementRef; //pdf

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private popupElegirPersonaService: PopupElegirPersonaService,
    private httpService: ServicioService, //arreglar service, porque url no corresponde

  ) { }

  ngOnInit(): void {
  }

  /*getAll(queryParams:{}){
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
  }*/

  filtrar(){

    let filtros: any = {}
    if(this.idPaciente){
      filtros["idCliente"] = {idPersona: this.cliente?.idPersona};
    }
    if(this.idProfesional){
      filtros["idEmpleado"] = {idPersona: this.empleado?.idPersona};
    }
    if(this.fechaDesde && this.fechaHasta){
      filtros["fechaDesdeCadena"] = this.formatearFecha(this.fechaDesde);
      filtros["fechaHastaCadena"] = this.formatearFecha(this.fechaHasta);
    }

    if(this.fechaDesde && this.fechaHasta){
      let params = new HttpParams()
        .set('detalle', 'S')
        .set('ejemplo', filtros)

      //this.getAll(params);

    }else{
      this.toastr.error('Debe completar las fechas', 'Error');
    }



  }

  limpiarFiltro(){
    this.idProfesional = undefined;
    this.idPaciente = undefined;
    this.fechaDesde = undefined;
    this.fechaHasta = undefined;
    this.idPresentacionProducto = undefined;

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
    html2canvas(this.tabla.nativeElement, { scale: 3 }).then((canvas) => {
      const imageGeneratedFromTemplate = canvas.toDataURL('image/png');
      const fileWidth = 200;
      const generatedImageHeight = (canvas.height * fileWidth) / canvas.width;
      let PDF = new jsPDF('p', 'mm', 'a4',);
      PDF.addImage(imageGeneratedFromTemplate, 'PNG', 0, 5, fileWidth, generatedImageHeight,);
      PDF.html(this.tabla.nativeElement.innerHTML)
      PDF.save('reporte-resumido.pdf');
    });
  }


}
