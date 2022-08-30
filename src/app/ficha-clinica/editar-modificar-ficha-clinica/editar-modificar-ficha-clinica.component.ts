import { Component, OnInit } from '@angular/core';
import {Categoria} from "../../model/categoria";
import {Subcategoria} from "../../model/subcategoria";
import {CategoriaService} from "../../service/categoria.service";
import {ToastrService} from "ngx-toastr";
import {FichaClinica, FichaClinicaPost} from "../../model/ficha-clinica";
import {SubcategoriaService} from "../../service/subcategoria.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FichaClinicaServiceService} from "../../service/ficha-clinica-service.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-editar-modificar-ficha-clinica',
  templateUrl: './editar-modificar-ficha-clinica.component.html',
  styleUrls: ['./editar-modificar-ficha-clinica.component.css']
})
export class EditarModificarFichaClinicaComponent implements OnInit {

  titulo = "Nueva ficha";

  // para que muestre la fecha de hoy
  fecha: Date = new Date();

  // la ficha
  ficha: FichaClinicaPost = new FichaClinicaPost();

  // los datos recibidos del back
  listaCategorias!: Categoria[];
  listaSubcategorias!: Subcategoria[];

  // para traer la categoría seleccionada
  categoriaSeleccionada!: Categoria;

  // para mostrar las validaciones al usuario
  empleadoFormControl = new FormControl('', [Validators.required]);
  clienteFormControl = new FormControl('', [Validators.required]);

  constructor(
    private httpCategoriaService: CategoriaService,
    private httpSubcategoriaService: SubcategoriaService,
    private httpFichaclinicaService: FichaClinicaServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    // traer del back las categorías para poder listarlas
    this.getCategorias();
  }

  // traer del back los datos necesarios para los campos de filtrado del html
  getCategorias(){
    // traer las categorías
    this.httpCategoriaService.getAll().subscribe({
      next: (datos) => {
        console.log(datos.lista);
        this.listaCategorias = datos.lista;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("No se pudieron obtener las fichas clínicas");
      }
    });
  }

  // para traer las subcategorías al seleccionar una categoría
  traerSubcategorias() {
    let filtro = {
      "idCategoria": {"idCategoria": this.categoriaSeleccionada.idCategoria}
    }
    this.httpSubcategoriaService.getAll({ejemplo: JSON.stringify(filtro)}).subscribe({
      next: (datos) => {
        console.log(datos.lista);
        this.listaSubcategorias = datos.lista;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("No se pudieron obtener las fichas clínicas");
      }
    });
  }

  guardarFicha() {
    console.log(this.ficha);
    this.httpFichaclinicaService.postFicha(this.ficha).subscribe({
      next: (e) => {
        this.toastr.success('Ficha creada exitosamente');
        this.atras();
      },
      error: (err) =>{
        console.log(err);
        this.toastr.error('No se pudo crear la ficha', 'Error');
      }
    });;
  }

  atras() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
