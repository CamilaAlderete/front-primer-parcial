import {Component, OnInit} from '@angular/core';
import {Categoria} from "../../model/categoria";
import {Subcategoria} from "../../model/subcategoria";
import {CategoriaService} from "../../service/categoria.service";
import {ToastrService} from "ngx-toastr";
import {FichaClinica} from "../../model/ficha-clinica";
import {SubcategoriaService} from "../../service/subcategoria.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FichaClinicaServiceService} from "../../service/ficha-clinica-service.service";
import {PopupElegirPersonaService} from "../../service/popup-elegir-persona.service";

@Component({
  selector: 'app-nueva-ficha-clinica',
  templateUrl: './nueva-ficha-clinica.component.html',
  styleUrls: ['./nueva-ficha-clinica.component.css']
})
export class NuevaFichaClinicaComponent implements OnInit {

  titulo = "Nueva ficha";

  // para que muestre la fecha de hoy
  fecha: Date = new Date();

  // la ficha
  ficha: FichaClinica = new FichaClinica();

  // los datos recibidos del back
  listaCategorias!: Categoria[];
  listaSubcategorias!: Subcategoria[];

  // para traer la categoría seleccionada
  categoriaSeleccionada!: Categoria;

  constructor(
    private httpCategoriaService: CategoriaService,
    private httpSubcategoriaService: SubcategoriaService,
    private httpFichaclinicaService: FichaClinicaServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private popupElegirPersonaService: PopupElegirPersonaService,
    private toastr: ToastrService
  ) {
    // traer del back las categorías para poder listarlas
    this.getCategorias();
  }

  ngOnInit(): void {
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
    this.httpFichaclinicaService.post(this.ficha).subscribe({
      next: (e) => {
        this.toastr.success('Ficha creada exitosamente');
        this.atras();
      },
      error: (err) =>{
        console.log(err);
        this.toastr.error('No se pudo crear la ficha', 'Error');
      }
    });
  }

  atras() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  // para abrir el popup para elegir el cliente
  popupElegirCliente() {
    this.popupElegirPersonaService.abrirSelector(false,"Cliente").subscribe(result=>{
      this.ficha.idCliente = result;
    });
  }

  // para abrir el popup para elegir el empleado
  popupElegirEmpleado() {
    this.popupElegirPersonaService.abrirSelector(true,"Fisioterapeuta").subscribe(result=>{
      this.ficha.idEmpleado = result;
    });
  }
}
