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
import {Servicio2Service} from "../../service/servicio2.service";
import autoTable from "jspdf-autotable";
import {PopupPresentacionProductoService} from "../../service/popup-presentacion-producto.service";

type Filtro = {
  fechaDesde ?: string,
  fechaHasta?: string,
  idEmpleado?: number,
  idCliente?: number,
  idCategoria?: number,
  idTipoProducto?: number,
  idPresentacionProducto?: number,
};


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
  presentacionProducto: any = undefined;


  cliente!: Paciente | undefined;
  empleado!: Paciente | undefined;

  displayedColumns: string[] = ['Fecha','Profesional','Cliente', 'Precio Unitario', 'Cantidad', 'Total', 'Presentacion Producto'];

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private popupElegirPersonaService: PopupElegirPersonaService,
    private httpService: Servicio2Service,
    private popUpPresentacionProducto: PopupPresentacionProductoService


  ) { }

  ngOnInit(): void {

    let params = new HttpParams().set('detalle', 'S');
    this.getAll(params);
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

  /*


  let data = {
        idServicio: {
          idFichaClinica: {
            idCliente: {idPersona: this.cliente.idPersona}
          },
          idEmpleado: {
            idPersona: this.empleado.idPersona
          },
          fechaDesdeCadena: this.formatearFecha(this.fechaDesde),
          fechaHastaCadena: this.formatearFecha(this.fechaHasta)
        },
        idPresentacionProducto: {
          idPresentacionProducto: this.presentacionProducto.idPresentacionProducto
        }
      }

  */

  filtrar(){

    let filtros: any = {}
    if(this.cliente){
      filtros["idServicio"] = {
        idFichaClinica: {
          idCliente: {idPersona: this.cliente.idPersona}
        }
      };
    }
    if(this.empleado){
      filtros["idServicio"] = {
        idEmpleado: {
        idPersona: this.empleado.idPersona
        },
        ...filtros["idServicio"]
      };
    }
    if(this.fechaDesde && this.fechaHasta){
      filtros["idServicio"] = {
        fechaDesdeCadena: this.formatearFecha(this.fechaDesde),
        fechaHastaCadena: this.formatearFecha(this.fechaHasta),
        ...filtros["idServicio"]
      }
    }

    if(this.presentacionProducto){
      filtros["idPresentacionProducto"] = {idPresentacionProducto: this.presentacionProducto.idPresentacionProducto};
    }

    console.log(filtros);

    if(this.fechaDesde && this.fechaHasta){
      let params = new HttpParams()
        .set('detalle', 'S')
        .set('ejemplo', JSON.stringify(filtros));

      this.getAll(params);

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
    this.presentacionProducto = undefined;

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

    pdf.save('reporte-detallado.pdf')

  }

  //cambiar
  getLista(){
    let lista:any =  []
    for( let s of this.servicios){
      let item = [s.idServicio.fechaHora.split(" ")[0], s.idServicio.idFichaClinica.idEmpleado.nombreCompleto, s.idServicio.idFichaClinica.idCliente.nombreCompleto, s.idPresentacionProducto.existenciaProducto.precioVenta, s.cantidad, s.idPresentacionProducto.existenciaProducto.precioVenta * s.cantidad, s.idPresentacionProducto.nombre]
      lista.push(item);
    }

    return lista;
  }

  popupPresentacionProducto(){
    this.popUpPresentacionProducto.abrirSelector().subscribe(result=>{
      this.presentacionProducto = result;
    });
  }


}
