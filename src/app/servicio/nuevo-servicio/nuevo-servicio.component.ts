import { Component, OnInit } from '@angular/core';
import {Subcategoria} from "../../model/subcategoria";
import {FormControl, Validators} from "@angular/forms";
import {CategoriaService} from "../../service/categoria.service";
import {SubcategoriaService} from "../../service/subcategoria.service";
import {ServicioService} from "../../service/servicio.service";
import {EXTRAproductoService} from "../../service/EXTRAproducto.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {EXTRAproducto} from "../../model/EXTRAproducto";

@Component({
  selector: 'app-nuevo-servicio',
  templateUrl: './nuevo-servicio.component.html',
  styleUrls: ['./nuevo-servicio.component.css']
})
export class NuevoServicioComponent implements OnInit {

  titulo: String = "Nuevo servicio";

  listaProductos!: EXTRAproducto[];

  //campos= en vez del modelo de servicio:
  idProducto!: number;
  idPresentacionProducto!: number; // el id de la clase Servicio
  nombre!: string;
  descripcion!: string;


  // para validar los input del html
  textFormControl = new FormControl('', [Validators.required]);
  productoFormControl = new FormControl('', [Validators.required]);

  // inyecciones
  constructor(
    private httpCategoriaService: CategoriaService,
    private httpServicioService: ServicioService,
    private httpEXTRAproductoService: EXTRAproductoService,

    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    // traer todas los productos ya existentes en el server
    this.getAll();
  }

  // Traer todas las categorías ya existentes en el server y guardarlas en el array subcategorias
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
    if (this.descripcion === '' || this.nombre === ''
      || this.idProducto.toString() === '') {

      this.toastr.error('Debe completar todos los campos', 'Error');

    } else {
      this.guardarServicio();
    }
  }

  guardarServicio() {
    let nuevoServicio = {
      "codigo":  String((Math.floor(Math.random() * (1000 - 0) + 0 )) + (Math.floor(Math.random() * (1000 - 0) + 0 )) + (Math.floor(Math.random() * (1000 - 0) + 0 ))),
      "idProducto": this.idProducto,
      "nombre": this.nombre,
      "descripcion": this.descripcion
    }
    console.log(nuevoServicio);
    this.httpServicioService.servicePost(nuevoServicio)
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
