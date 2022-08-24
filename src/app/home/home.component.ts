import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { Pais } from '../model/pais';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  paises: Pais[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
