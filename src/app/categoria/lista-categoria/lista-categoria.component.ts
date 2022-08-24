import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../service/http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {listadatos} from "../../model/datos";
import {Categoria} from "../../model/categoria";
import {CategoriaService} from "../../service/categoria.service";

@Component({
  selector: 'app-lista-categoria',
  templateUrl: './lista-categoria.component.html',
  styleUrls: ['./lista-categoria.component.css']
})
export class ListaCategoriaComponent implements OnInit {

  //atributos
  lista: Categoria[] = [];
  titulo = 'Categorias';

  //columnas del la tabla (ojo: si no se colocan todas las columnas correspondientes en el html no se va poder ver nada)
  displayedColumns: string[] = ['id','descripcion','acciones'];


  //inyeccion de dependencias
  constructor(
    private httpService: CategoriaService, //para hacer peticiones http
    private toastr: ToastrService, //para notificaciones en pantalla
    private route: ActivatedRoute, //ruteo a otros componentes
    private router: Router
  ) { }

  //apenas se inicia, se llama a la funcion getAll
  //obtener la lista debe hacerse antes de renderizar la página
  ngOnInit(): void {
    this.getAll();
  }

  //trae todas las listas
  getAll(){
    this.httpService.getAll()
      .subscribe({
        next: (e) => {
          console.log(e)
          this.lista = e.lista
        },
        error: (err) =>{
          console.log(err);
          this.toastr.error('No se pudo obtener la lista', 'Error');
        }

      });
  }

  delete(id: number){
    this.httpService.delete(id)
      .subscribe({
        next: (e) => {
          this.toastr.success('Categoria eliminada');
          this.getAll();
        },
        error: (err) =>{
          console.log(err);
          this.toastr.error('Error al eliminar categoria', 'Error');
        }

      });
  }

}
