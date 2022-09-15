import { Component, OnInit } from '@angular/core';
import {FichaClinica} from "../../model/ficha-clinica";
import {CategoriaService} from "../../service/categoria.service";
import {SubcategoriaService} from "../../service/subcategoria.service";
import {FichaClinicaServiceService} from "../../service/ficha-clinica-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ListaServicioComponent} from "../../servicio/lista-servicio/lista-servicio.component";
import {ServicioService} from "../../service/servicio.service";
import {Servicio} from "../../model/servicio";

@Component({
  selector: 'app-editar-ficha-clinica',
  templateUrl: './editar-ficha-clinica.component.html',
  styleUrls: ['./editar-ficha-clinica.component.css']
})
export class EditarFichaClinicaComponent implements OnInit {

  titulo = "Editar ficha";

  // la ficha
  ficha: FichaClinica = new FichaClinica();

  // los servicios creados a partir de esta ficha
  listaServicios: String[] = [];
  displayedColumns: string[] = [
    'fechaHoraCadenaFormateada',
    'presupuesto',
    'acciones'
  ];

  constructor(
    private httpCategoriaService: CategoriaService,
    private httpSubcategoriaService: SubcategoriaService,
    private httpFichaclinicaService: FichaClinicaServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private httpServiceServicio: ServicioService // El service de servicio

  ) {
  }

  ngOnInit(): void {
    this.getFicha();
    // this.getServicios();
  }

  // traer la ficha del back
  getFicha(){
    this.httpFichaclinicaService.getById(this.route.snapshot.params['id']).subscribe({
      next: (dato) => {
        console.log(dato);
        this.ficha = dato;
      },
      error: (err) => {
        console.log(err);
        this.toastr.error("No se pudo obtener la ficha clínica");
      }
  });
  }

  // guardar cambios
  guardarFicha() {
    console.log(this.ficha);
    this.httpFichaclinicaService.put(this.ficha).subscribe({
      next: (e) => {
        this.toastr.success('Ficha editada exitosamente');
        this.atras();
      },
      error: (err) =>{
        console.log(err);
        this.toastr.error('No se pudo editar la ficha', 'Error');
      }
    });
  }

  atras() {
    this.router.navigate(['../../'], {relativeTo: this.route});
  }

  eliminarServicio(idPresentacionProducto: number) {
    this.httpServiceServicio.delete(idPresentacionProducto).subscribe(
      {
        next: (e) => {
          this.toastr.success('Servicio eliminado');
          this.getServicios();
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('Error al eliminar Servicio', 'Error');
        }
      }
    );
  }

  // traer toda la lista de servicios creados a partir de esta ficha
  getServicios(){
    this.httpServiceServicio.getAll({"idFichaClinica":{"idFichaClinica":this.ficha.idFichaClinica}}).subscribe({
        next: (datos) => {
          console.log(datos.lista);
          this.listaServicios = datos.lista;
        },
        error: (err) => {
          console.log(err);
          this.toastr.error("No se pudo obtener la lista", "Error");
        }
      }
    );
  }
}
