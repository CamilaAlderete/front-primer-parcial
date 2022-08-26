import { Component, OnInit } from '@angular/core';
import {Categoria} from "../../model/categoria";
import {CategoriaService} from "../../service/categoria.service";
import {ToastrService} from "ngx-toastr";
import {Subcategoria} from "../../model/subcategoria";
import {SubcategoriaService} from "../../service/subcategoria.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-nueva-subcategoria',
  templateUrl: './nueva-subcategoria.component.html',
  styleUrls: ['./nueva-subcategoria.component.css']
})
export class NuevaSubcategoriaComponent implements OnInit {

  titulo: String = "Nueva subcategoría";
  listaCategorias!: Categoria[];

  nuevaSubcategoria: Subcategoria = new Subcategoria();

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
    if( this.nuevaSubcategoria.descripcion === ''){
      this.toastr.error('Debe completar todos los campos', 'Error');
    }else{
      this.guardarSubcategoria();
    }
  }

  guardarSubcategoria(){
    console.log(this.nuevaSubcategoria);
    this.httpSubcategoriaService.post(this.nuevaSubcategoria)
      .subscribe({
        next: (e) => {
          this.toastr.success('Subcategoria "'+ this.nuevaSubcategoria.descripcion + '" creada exitosamente');
          this.atras();
        },
        error: (err) =>{
          console.log(err);
          this.toastr.error('No se pudo crear la subcategoria', 'Error');
        }
      });
  }

  atras() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
