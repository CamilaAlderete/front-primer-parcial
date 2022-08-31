import { Component, OnInit } from '@angular/core';
import {Subcategoria} from "../../model/subcategoria";
import {FormControl, Validators} from "@angular/forms";
import {CategoriaService} from "../../service/categoria.service";
import {SubcategoriaService} from "../../service/subcategoria.service";
import {ServicioService} from "../../service/servicio.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-nuevo-servicio',
  templateUrl: './nuevo-servicio.component.html',
  styleUrls: ['./nuevo-servicio.component.css']
})
export class NuevoServicioComponent implements OnInit {

  titulo: String = "Nuevo servicio";

//  listaCategorias!: Categoria[];  // la lista completa de categorias
  listaSubCategorias!: Subcategoria[];  // la lista completa de subcategorias

//  nuevoServicio: Servicio = new Servicio(); // el nuevo servicio siendo creado


  //campos= en vez del modelo de servicio:
  idProducto!: number;
  idTipoProducto!: number;
  idPresentacionProducto!: number; // el id de la clase Servicio
  nombre!: string;
  descripcion!: string;


  // para validar los input del html
  textFormControl = new FormControl('', [Validators.required]);
//  categoriaFormControl = new FormControl('', [Validators.required]);
  subCategoriaFormControl = new FormControl('', [Validators.required]);

  // inyecciones
  constructor(
    private httpCategoriaService: CategoriaService,
    private httpSubcategoriaService: SubcategoriaService,
    private httpServicioService: ServicioService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    // traer todas las categorías y subcategorias ya existentes en el server
    this.getAll();
  }

  // Traer todas las categorías ya existentes en el server y guardarlas en el array subcategorias
  getAll() {
    // this.httpCategoriaService.getAll().subscribe({
    //     next: (datos) => {
    //       console.log(datos.lista);
    //       this.listaCategorias = datos.lista;
    //     },
    //     error: (err) => {
    //       console.log(err);
    //       this.toastr.error("No se pudo obtener la lista", "Error");
    //     }
    //   }
    // );

    this.httpSubcategoriaService.getAll().subscribe({
        next: (datos) => {
          console.log(datos.lista);
          this.listaSubCategorias = datos.lista;
        },
        error: (err) => {
          console.log(err);
          this.toastr.error("No se pudo obtener la lista", "Error");
        }
      }
    );
  }

  guardar() {

    if (this.descripcion === '' || this.nombre === ''
      || this.idProducto.toString() === '' || this.idTipoProducto.toString() === '') {

      this.toastr.error('Debe completar todos los campos', 'Error');

    } else {
      this.guardarServicio();
    }
  }

  guardarServicio() {
    let nuevoServicio = {
      "idProducto": {
        "idProducto": this.idProducto,
        "idTipoProducto": this.idTipoProducto
      },
      "nombre": this.nombre,
      "descripcion": this.descripcion
    }
    console.log(nuevoServicio);
    this.httpServicioService.post(JSON.stringify(nuevoServicio))
      .subscribe({
        next: (e) => {
          this.toastr.success('Servicio "' + this.nombre + '" creado exitosamente');
          this.atras();
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('No se pudo crear el servicio', 'Error');
        }
      });
  }

  atras() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
