import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Servicio2Service} from "../service/servicio2.service";
import {delay} from "rxjs/operators";
import {HttpParams} from "@angular/common/http";
import {ExistenciaProductoService} from "../service/existenciaProducto.service";
import {precio_presentacionProducto} from "../model/precio_presentacionProducto";

@Component({
  selector: 'app-popup-presentacion-producto',
  templateUrl: './popup-presentacion-producto.component.html',
  styleUrls: ['./popup-presentacion-producto.component.css']
})
export class PopupPresentacionProductoComponent implements OnInit {
// para hacer responsive
  estiloTabla: string = "";
  nombre = '';
  idPresentacionProducto = "";

  //para get de precio ambos:
  precioProducto!: precio_presentacionProducto;
  precioBandera: boolean = false;

  // para la paginación de la tabla y el ordenamiento
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  lista: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'idPresentacionProducto',
    'nombre',
    'acciones'
  ];

  constructor(
    public dialogRef: MatDialogRef<PopupPresentacionProductoComponent>,
    private httpService: Servicio2Service,
    private toastr: ToastrService,
    private observer: BreakpointObserver,
    private httpExistenciaProducto: ExistenciaProductoService
  ) {

    this.lista = new MatTableDataSource();

  }

  ngOnInit(): void {
  }

  filtrar() {

    let params = new HttpParams()
      .set('ejemplo', `{"nombre": "${this.nombre}"}`)
      .set('like', 'S')

    this.getPresentacionProducto(params);

  }

  getPresentacionProducto(params: {}) {
    this.httpService.getPresentacionProducto(params).subscribe({
      next: (e) => {
        this.lista.data = e.lista;

      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error('No se pudo obtener la presentación del producto', 'Error');
      }
    });

  }


  ngAfterViewInit() {
    this.lista.paginator = this.paginator;
    this.lista.sort = this.sort;

    this.observer
      .observe(["(max-width: 700px)"])
      .pipe(delay(1)) // delay 1mS
      .subscribe((res) => {
        if (res.matches) {
          this.estiloTabla = "width: 700px";
        } else {
          this.estiloTabla = "";
        }
      });
  }

  // precio(id: number) {
  //   let precio = {
  //     "idPresentacionProductoTransient": id
  //   }
  //   this.httpExistenciaProducto.serviceGet({ejemplo: JSON.stringify(precio)}).subscribe(
  //     {
  //       next: (datos) => {
  //         console.log(datos);
  //         this.precioProducto = datos;
  //         this.precioBandera = true;
  //       },
  //       error: (err) => {
  //         console.log(err);
  //         this.toastr.error("No se pudo obtener el precio del producto/servicio", "Error");
  //       }
  //     }
  //   );
  //}
}
