import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Pais } from '../model/pais';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  paises: Pais[] = [];

  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.httpService.getAll('pais')
      .subscribe(e => {
        console.log(e);
        this.paises = e;
      },
      err => {
        console.log(err);
        /*this.toastr.error(
          'No se pudo obtener la lista de clientes',
          'Error'
        );*/

      });
  }

}
