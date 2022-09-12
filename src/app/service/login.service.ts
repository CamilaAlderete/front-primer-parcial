import { Injectable } from '@angular/core';
import {PacienteService} from "./paciente.service";
import {Paciente} from "../model/paciente";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  listaUsuariosSistema: Paciente[] = [];

  constructor(
    private pacienteService: PacienteService,
    private router: Router,
    private cookies:CookieService,
    private toastr: ToastrService,
  ) { }

  // para loguear a un usuario
  login(usuario: string) {

    // traer usuarios del sistema
    let fisio = {
      "soloUsuariosDelSistema":true
    }
    this.pacienteService.getAll({ejemplo: JSON.stringify(fisio)}).subscribe(
      {
        next: (datos) => {
          console.log(datos.lista);
          this.listaUsuariosSistema = datos.lista;

          // ver si el usuario es uno del sistema
          for (var user of this.listaUsuariosSistema){
            if (user.usuarioLogin == usuario){
              // loguear al usuario
              this.cookies.set("username", usuario);
              this.cookies.set("userId", user.idPersona.toString());
              this.toastr.success('Ha iniciado sesión');
              this.router.navigate(['/']);
              return;
            }
          }

          // si llega acá, entonces no es un usuario del sistema
          this.toastr.error("No es un usuario del sistema", "Error");
        },
        error: (err) => {
          console.log(err);
          this.toastr.error("No se pudo obtener la lista de usuarios", "Error");
        }
      }
    );

  }

  // para saber si hay un usuario que ha iniciado sesión
  estaLogueado():string{
    return this.cookies.get("username");
  }

  // para cerrar sesión
  logout(){
    this.cookies.delete("username");
    this.cookies.delete("userId");
  }

}
