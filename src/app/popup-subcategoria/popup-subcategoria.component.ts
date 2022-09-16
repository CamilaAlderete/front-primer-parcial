import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {BreakpointObserver} from "@angular/cdk/layout";
import {delay} from "rxjs/operators";
import {HttpParams} from "@angular/common/http";
import {SubcategoriaService} from "../service/subcategoria.service";
;

@Component({
  selector: 'app-popup-subcategoria',
  templateUrl: './popup-subcategoria.component.html',
  styleUrls: ['./popup-subcategoria.component.css']
})
export class PopupSubcategoriaComponent implements OnInit {
// para hacer responsive
  estiloTabla: string = "";
  descripcion = '';

  // para la paginación de la tabla y el ordenamiento
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  lista: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'idTipoProducto',
    'descripcion',
    'acciones'
  ];
  constructor(
    public dialogRef: MatDialogRef<PopupSubcategoriaComponent>,
    private httpService: SubcategoriaService,
    private toastr: ToastrService,
    private observer: BreakpointObserver

  ) {

    this.lista = new MatTableDataSource();

  }

  ngOnInit(): void {
  }

  filtrar(){

    let params = new HttpParams()
      .set('ejemplo', `{"descripcion": "${this.descripcion}"}`)
      .set('like', 'S')

    this.getSubcategoria(params);

  }

  getSubcategoria(params:{}){
    this.httpService.getAll(params).subscribe({
      next:(e) =>{
        this.lista.data = e.lista;

      },
      error: (err: any)=>{
        console.log(err);
        this.toastr.error('No se pudo obtener la subcategoría', 'Error');
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

}
