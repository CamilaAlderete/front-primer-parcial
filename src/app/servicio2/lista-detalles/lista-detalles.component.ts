import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {Servicio2Service} from "../../service/servicio2.service";
import {PopupPresentacionProductoService} from "../../service/popup-presentacion-producto.service";
import {stringify} from "@angular/compiler/src/util";

@Component({
  selector: 'app-lista-detalles',
  templateUrl: './lista-detalles.component.html',
  styleUrls: ['./lista-detalles.component.css']
})
export class ListaDetallesComponent implements OnInit {


  cantidad = 1;
  presentacionProducto: any = undefined;
  idServicio: any;
  detalles: any[]= [];

  displayedColumns: string[] = ['Servicio','Cantidad', 'Presentacion Producto','Acciones'];

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: Servicio2Service,
    private popUpPresentacionProducto: PopupPresentacionProductoService
  ) { }

  ngOnInit(): void {
    this.idServicio =  decodeURI( this.route.snapshot.paramMap.get('idServicio') || '0') ;
    this.getDetalles();
  }

  getDetalles(){
    this.httpService.getDetalles(this.idServicio)
      .subscribe({
        next: (e) => {
          console.log(e)
          this.detalles = e.lista

        },
        error: (err) =>{
          console.log(err);
          this.toastr.error('No se pudo obtener los detalles', 'Error');
        }

      });
  }

  postDetalle(){

    let detalle = {
      cantidad: this.cantidad,
      idPresentacionProducto: {
        idPresentacionProducto: this.presentacionProducto.idPresentacionProducto
      },
      idServicio: {
        idServicio: Number(this.idServicio)
      }
    }

    this.httpService.postDetalle(this.idServicio, detalle).subscribe({
      next: (e) => {
        console.log(e)
        this.toastr.success('Detalle agregado con éxito');
        this.getDetalles();
        this.cantidad = 1;
        this.presentacionProducto = undefined;
      },
      error: (err) =>{
        console.log(err);
        this.toastr.error('No se pudo agregar detalle', 'Error');
      }

    });


  }

  guardar(){

    if(this.presentacionProducto){
      this.postDetalle();
    }else{
      this.toastr.error('Debe elegir presentación de producto', 'Error');
    }

  }

  popupPresentacionProducto(){
    this.popUpPresentacionProducto.abrirSelector().subscribe(result=>{
      this.presentacionProducto = result;
    });
  }

  eliminar(idDetalle: number){
    this.httpService.deteleDetalle(this.idServicio, idDetalle).subscribe({
      next: (e) => {
        console.log(e)
        this.toastr.success('Detalle eliminado con éxito');
        this.getDetalles();
      },
      error: (err) =>{
        console.log(err);
        this.toastr.error('No se pudo eliminar detalle', 'Error');
      }

    });
  }

}
