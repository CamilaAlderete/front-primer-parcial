import {Component, OnInit, ViewChild} from '@angular/core';
import {Categoria} from "../../model/categoria";
import {Subcategoria} from "../../model/subcategoria";
import {CategoriaService} from "../../service/categoria.service";
import {SubcategoriaService} from "../../service/subcategoria.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {MatSelect} from "@angular/material/select";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-editar-subcategoria',
  templateUrl: './editar-subcategoria.component.html',
  styleUrls: ['./editar-subcategoria.component.css']
})
export class EditarSubcategoriaComponent implements OnInit {


  listaCategorias!: Categoria[];  // para mostrar la lista de subcategorías
  subcategoria: Subcategoria = new Subcategoria();  // la subcategoría que se está modificando actualmente

  // para validar el input del html
  textFormControl = new FormControl('', [Validators.required]);


  // inyecciones
  constructor(
    private httpCategoriaService: CategoriaService,
    private httpSubcategoriaService: SubcategoriaService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {

    // traer todas las categorías ya existentes en el server
    this.getAll();

    // traer la subcategoría actual
    this.subcategoria.idTipoProducto = this.route.snapshot.params['id'];
    this.getById();
  }

  // se busca el objeto de acuerdo a su id
  getById(){
    this.httpSubcategoriaService.getById(this.subcategoria.idTipoProducto)
      .subscribe({
        next: (e) => {
          this.subcategoria = e;
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('No se pudo obtener la subcategoría','Error');
          this.atras(); //comentar esta línea en caso de querer mirar el error en consola
        }
      })
  }

  // Traer todas las categorías ya existentes en el server y guardarlas en el array subcategorias
  getAll() {
    this.httpCategoriaService.getAll().subscribe({
        next: (datos) => {
          console.log(datos.lista);
          this.listaCategorias = datos.lista;
        },
        error: (err) => {
          console.log(err);
          this.toastr.error("No se pudo obtener la lista", "Error");
        }
      }
    );
  }

  guardar() {
    // si no se cargó la subcategoría
    if( this.subcategoria.descripcion === ''){
      this.toastr.error('Debe completar todos los campos', 'Error');
    }else{
      this.guardarSubcategoria();
    }
  }

  guardarSubcategoria(){
    console.log(this.subcategoria);
    this.httpSubcategoriaService.put(this.subcategoria)
      .subscribe({
        next: (e) => {
          this.toastr.success('Subcategoria "'+ this.subcategoria.descripcion + '" editada exitosamente');
          this.atras();
        },
        error: (err) =>{
          console.log(err);
          this.toastr.error('No se pudo editar la subcategoria', 'Error');
        }
      });
  }

  atras() {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

  // para que el input mat-select pueda inicializar su dato seleccionado
  compararObjetosCategorias(object1: Categoria, object2: Categoria) {
    return object1.idCategoria == object2.idCategoria;
  }
}

