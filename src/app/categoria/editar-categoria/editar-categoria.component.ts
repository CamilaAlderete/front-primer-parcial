import { Component, OnInit } from '@angular/core';
import {CategoriaService} from "../../service/categoria.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Categoria} from "../../model/categoria";

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {

  id: any;
  categoria: any;
  titulo = 'Editar categoria'

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private httpService: CategoriaService
  ) { }

  //es obtiene el id que se paso por http://localhost:4200/categoria/1/editar
  //obtener el objeto debe hacerse antes de renderizar la página
  ngOnInit(): void {
    this.id =  decodeURI( this.route.snapshot.paramMap.get('id') || '0') ;
    this.getById();
  }

  //se busca el objeto de acuerdo a su id
  getById(){
    this.httpService.getById(this.id)
      .subscribe({
        next: (e) => {
          this.categoria = e
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('No se pudo obtener la categoria','Error');
          this.atras(); //comentar esta linea en caso de querer mirar el error en consola
        }
      })
  }

  atras() {
    this.router.navigate(['../../'], {relativeTo: this.route});
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

}
