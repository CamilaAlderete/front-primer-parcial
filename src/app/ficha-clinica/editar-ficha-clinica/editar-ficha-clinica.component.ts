import { Component, OnInit } from '@angular/core';
import {FichaClinica} from "../../model/ficha-clinica";
import {CategoriaService} from "../../service/categoria.service";
import {SubcategoriaService} from "../../service/subcategoria.service";
import {FichaClinicaServiceService} from "../../service/ficha-clinica-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-editar-ficha-clinica',
  templateUrl: './editar-ficha-clinica.component.html',
  styleUrls: ['./editar-ficha-clinica.component.css']
})
export class EditarFichaClinicaComponent implements OnInit {

  titulo = "Editar ficha";

  // la ficha
  ficha: FichaClinica = new FichaClinica();

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
    this.getFicha();
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
}
