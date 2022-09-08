import { Component, OnInit } from '@angular/core';
import {Subcategoria} from "../../model/subcategoria";
import {FormControl, Validators} from "@angular/forms";
import {ServicioService} from "../../service/servicio.service";
import {SubcategoriaService} from "../../service/subcategoria.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {EXTRAproducto} from "../../model/EXTRAproducto";
import {EXTRAproductoService} from "../../service/EXTRAproducto.service";

@Component({
  selector: 'app-editar-servicio',
  templateUrl: './editar-servicio.component.html',
  styleUrls: ['./editar-servicio.component.css']
})
export class EditarServicioComponent implements OnInit {

  titulo = 'Editar servicio'
  listaSubcategoria!: Subcategoria [];  // para mostrar la lista de subcategorias
  listaProductos!: EXTRAproducto[];

  //campos= en vez del modelo de servicio:
  codigo!: string;
  idProducto!: number;
  idPresentacionProducto!: number; // el id de la clase Servicio
  nombre!: string;
  descripcion!: string;


   // para validar el input del html
   textFormControl = new FormControl('', [Validators.required]);
   productoFormControl = new FormControl('', [Validators.required]);


  // inyecciones
  constructor(
    private httpServicioService: ServicioService,
    private httpSubcategoriaService: SubcategoriaService,
    private httpEXTRAproductoService: EXTRAproductoService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    // traer todas los productos ya existentes en el server
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
          // @ts-ignore
          this.codigo= e.codigo;
          // @ts-ignore
          this.idProducto= e.idProducto;
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

  // Traer todas los productos ya existentes en el server y guardarlas en el array
  getAll() {
    this.httpEXTRAproductoService.getAll().subscribe({
        next: (datos) => {
          console.log(datos.lista);
          this.listaProductos = datos.lista;
        },
        error: (err) => {
          console.log(err);
          this.toastr.error("No se pudo obtener la lista", "Error");
        }
      }
    );
  }

  guardar() {
    // si no se cargó el servicio
    if( this.descripcion === '' ||  this.nombre === ''
    ||  this.idProducto.toString() === ''){
      this.toastr.error('Debe completar todos los campos', 'Error');
    }else{
      this.guardarServicio();
    }
  }

  guardarServicio(){
    let editarServicio = {
      "idPresentacionProducto": this.idPresentacionProducto,
      "codigo": this.codigo,
      "idProducto": this.idProducto,
      "nombre": this.nombre,
      "descripcion": this.descripcion
    }
    console.log(editarServicio);
    this.httpServicioService.servicePut(editarServicio)
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
  compararObjetosProducto(object1: EXTRAproducto, object2: EXTRAproducto) {
    return object1.idProducto == object2.idProducto;
  }
}
