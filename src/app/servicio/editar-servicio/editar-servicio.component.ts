import { Component, OnInit } from '@angular/core';
import {Subcategoria} from "../../model/subcategoria";
import {FormControl, Validators} from "@angular/forms";
import {ServicioService} from "../../service/servicio.service";
import {SubcategoriaService} from "../../service/subcategoria.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styleUrls: ['./editar-servicio.component.css']
})
export class EditarServicioComponent implements OnInit {

  titulo = 'Editar servicio'
  listaSubcategoria!: Subcategoria [];  // para mostrar la lista de subcategorias

  //campos= en vez del modelo de servicio:
  idProducto!: number;
  subcategoria!: Subcategoria;
  idPresentacionProducto!: number; // el id de la clase Servicio
  nombre!: string;
  descripcion!: string;


   // para validar el input del html
   textFormControl = new FormControl('', [Validators.required]);


  // inyecciones
  constructor(
    private httpServicioService: ServicioService,
    private httpSubcategoriaService: SubcategoriaService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    // traer todas las subcategorias ya existentes en el server
    this.getAll();

    // traer el servicio actual
    this.idPresentacionProducto = this.route.snapshot.params['id'];
    this.getById();
  }

  // se busca el objeto de acuerdo a su id
  getById(){
    this.httpServicioService.getById(this.idPresentacionProducto)
      .subscribe({
        next: (e) => {
         // let servicio = JSON.parse(e.toString());
          // @ts-ignore
          this.idProducto= e.idProducto.idProducto; //no hay model de este
          // @ts-ignore
          this.subcategoria= e.idProducto.idTipoProducto; //subcategoria es
          // @ts-ignore
      //    this.subcategoria.descripcion= e.idProducto.idTipoProducto.descripcion; //subcategoria es

          // @ts-ignore
          this.idPresentacionProducto= e.idPresentacionProducto; // el id de la clase Servicio
          // @ts-ignore
          this.nombre= e.nombre;
          // @ts-ignore
          this.descripcion= e.descripcion;
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('No se pudo obtener el servicio','Error');
   //       this.atras(); //comentar esta línea en caso de querer mirar el error en consola
        }
      })
  }

  // Traer todas las subcategorías ya existentes en el server y guardarlas en el array subcategorias
  getAll() {
    this.httpSubcategoriaService.getAll().subscribe({
        next: (datos) => {
          console.log(datos.lista);
          this.listaSubcategoria= datos.lista;
        },
        error: (err) => {
          console.log(err);
          this.toastr.error("No se pudo obtener la lista de subcategorias", "Error");
        }
      }
    );
  }

  guardar() {
    // si no se cargó el servicio
    if( this.descripcion === '' ||  this.nombre === '' || this.subcategoria.idTipoProducto.toString() === ''
    ||  this.idProducto.toString() === ''){
      this.toastr.error('Debe completar todos los campos', 'Error');
    }else{
      this.guardarServicio();
    }
  }

  guardarServicio(){
    let editarServicio = {
      "idProducto": {
        "idPresentacionProducto": this.idPresentacionProducto,
        "idProducto": this.idProducto,
        "idTipoProducto": this.subcategoria.idTipoProducto
      },
      "nombre": this.nombre,
      "descripcion": this.descripcion
    }
    console.log(editarServicio);
    this.httpServicioService.put(JSON.stringify(editarServicio))
      .subscribe({
        next: (e) => {
          this.toastr.success('Servicio "'+ this.nombre + '" editado exitosamente');
          this.atras();
        },
        error: (err) =>{
          console.log(err);
          this.toastr.error('No se pudo editar el servicio', 'Error');
        }
      });
  }

  atras() {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

  // para que el input mat-select pueda inicializar su dato seleccionado
  compararObjetosSubCategorias(object1: Subcategoria, object2: Subcategoria) {
    return object1.idTipoProducto == object2.idTipoProducto;
  }
}
