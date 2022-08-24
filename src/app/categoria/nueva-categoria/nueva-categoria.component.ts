import { Component, OnInit } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import { Router, ActivatedRoute} from "@angular/router";
import {Categoria} from "../../model/categoria";
import {CategoriaService} from "../../service/categoria.service";

@Component({
  selector: 'app-nueva-categoria',
  templateUrl: './nueva-categoria.component.html',
  styleUrls: ['./nueva-categoria.component.css']
})
export class NuevaCategoriaComponent implements OnInit {

  categoria = new Categoria('');

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: CategoriaService
  ) { }

  ngOnInit(): void {
  }

  guardar(){
    if( this.categoria.descripcion === ''){
      this.toastr.error('Debe completar todos los campos', 'Error');
    }else{
      this.guardarCategoria();
    }
  }

  guardarCategoria(){
    this.httpService.post(this.categoria)
      .subscribe({
        next: (e) => {
          this.toastr.success('Categoria creada exitosamente');
          this.atras();
        },
        error: (err) =>{
          console.log(err);
          this.toastr.error('No se pudo crear la categoria', 'Error');
        }
      });

  }

  atras() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
