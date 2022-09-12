import { Component, OnInit } from '@angular/core';
import {LoginService} from "../service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario!: string;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // si lo que se busca es cerrar sesión
    if (this.router.url === '/logout') {
      this.loginService.logout();
      this.router.navigate(['login']);
    }
    console.log(this.router.url);
  }

  // para iniciar sesión al usuario
  login() {
    console.log("El usuario es: " + this.usuario);
    this.loginService.login(this.usuario);
  }

}
