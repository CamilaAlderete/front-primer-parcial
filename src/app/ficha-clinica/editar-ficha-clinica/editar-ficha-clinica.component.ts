import {Component, OnInit, ViewChild} from '@angular/core';
import {FichaClinica} from "../../model/ficha-clinica";
import {CategoriaService} from "../../service/categoria.service";
import {SubcategoriaService} from "../../service/subcategoria.service";
import {FichaClinicaServiceService} from "../../service/ficha-clinica-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ListaServicioComponent} from "../../servicio/lista-servicio/lista-servicio.component";
import {ServicioService} from "../../service/servicio.service";
import {Servicio} from "../../model/servicio";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-editar-ficha-clinica',
  templateUrl: './editar-ficha-clinica.component.html',
  styleUrls: ['./editar-ficha-clinica.component.css']
})
export class EditarFichaClinicaComponent implements OnInit {

  titulo = "Editar ficha";

  // la ficha
  ficha: FichaClinica = new FichaClinica();

  // los servicios creados a partir de esta ficha, por ahora son sólo datos de prueba
  listaServicios = new MatTableDataSource([
    {
      'fechaHoraCadenaFormateada': 'fecha',
      'presupuesto': 'pres',
      'acciones': 'acc',
      'idServicio': '1'
    },
    {
      'fechaHoraCadenaFormateada': '2fecha',
      'presupuesto': 'pres2',
      'acciones': 'acc2',
      'idServicio': '2'
    }
  ]);

  displayedColumns: string[] = [
    'fechaHoraCadenaFormateada',
    'presupuesto',
    'acciones'
  ];

  // para poder ordenar por columnas
  @ViewChild(MatSort) sort!: MatSort;

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

  ngAfterViewInit() {
    // para poder ordenar por columnas
    this.listaServicios.sort = this.sort;
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

  // traer toda la lista de servicios creados a partir de esta ficha
  getServicios(){
    let filtroFicha: {} = {
      "idFichaClinica":{"idFichaClinica":this.ficha.idFichaClinica}
    }

    this.httpServiceServicio.getAll({ejemplo: JSON.stringify(filtroFicha)}).subscribe({
        next: (datos) => {
          console.log(datos.lista);
          //this.listaServicios = datos.lista;
        },
        error: (err) => {
          console.log(err);
          this.toastr.error("No se pudo obtener la lista", "Error");
        }
      }
    );
  }
}
