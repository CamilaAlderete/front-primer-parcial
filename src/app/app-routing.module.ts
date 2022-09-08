import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {ListaCategoriaComponent} from "./categoria/lista-categoria/lista-categoria.component";
import {NuevaCategoriaComponent} from "./categoria/nueva-categoria/nueva-categoria.component";
import {EditarCategoriaComponent} from "./categoria/editar-categoria/editar-categoria.component";
import {CositasUtilesComponent} from "./cositas-utiles/cositas-utiles/cositas-utiles.component";
import {ListaSubcategoriaComponent} from "./subcategoria/lista-subcategoria/lista-subcategoria.component";
import {NuevaSubcategoriaComponent} from "./subcategoria/nueva-subcategoria/nueva-subcategoria.component";
import {EditarSubcategoriaComponent} from "./subcategoria/editar-subcategoria/editar-subcategoria.component";
import {ListaPacienteComponent} from "./paciente/lista-paciente/lista-paciente.component";
import {NuevoPacienteComponent} from "./paciente/nuevo-paciente/nuevo-paciente.component";
import {EditarPacienteComponent} from "./paciente/editar-paciente/editar-paciente.component";
import {ListaServicioComponent} from "./servicio/lista-servicio/lista-servicio.component";
import {NuevoServicioComponent} from "./servicio/nuevo-servicio/nuevo-servicio.component";
import {EditarServicioComponent} from "./servicio/editar-servicio/editar-servicio.component";
import {ListaFichaClinicaComponent} from "./ficha-clinica/lista-ficha-clinica/lista-ficha-clinica.component";
import {NuevaFichaClinicaComponent} from "./ficha-clinica/nueva-ficha-clinica/nueva-ficha-clinica.component";
import {EditarFichaClinicaComponent} from "./ficha-clinica/editar-ficha-clinica/editar-ficha-clinica.component";
import {ListaHorarioComponent} from "./horario/lista-horario/lista-horario.component";
import {NuevoHorarioComponent} from "./horario/nuevo-horario/nuevo-horario.component";
import {ListaReservasComponent} from "./reserva-turno/lista-reservas/lista-reservas.component";
import {NuevaReservaComponent} from "./reserva-turno/nueva-reserva/nueva-reserva.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuardService} from "./service/auth-guard.service";
import {
  ListaHorarioExcepcionComponent
} from "./horario-excepcion/lista-horario-excepcion/lista-horario-excepcion.component";
import {
  NuevoHorarioExcepcionComponent
} from "./horario-excepcion/nuevo-horario-excepcion/nuevo-horario-excepcion.component";

const routes: Routes = [
  {
    path:'',
    canActivate: [AuthGuardService],  // para requerir el login en caso de que no esté logueado
    children: [
      {path:'', redirectTo: 'home', pathMatch: 'full'}, //http://localhost:4200/home
      {path:'home', component:HomeComponent},           //http://localhost:4200/home
      {path: 'categoria',
        children: [
          { path: '', redirectTo: 'lista', pathMatch: 'full'},
          { path: 'lista', component: ListaCategoriaComponent },  //http://localhost:4200/categoria/lista
          { path: 'nuevo', component: NuevaCategoriaComponent }, //http://localhost:4200/categoria/nuevo
          { path: ':id/editar', component: EditarCategoriaComponent } //http://localhost:4200/categoria/1/editar
        ]
      },
      {path: 'subcategoria',
        children: [
          { path: '', redirectTo: 'lista', pathMatch: 'full'},
          { path: 'lista', component: ListaSubcategoriaComponent },  //http://localhost:4200/subcategoria/lista
          { path: 'nueva', component: NuevaSubcategoriaComponent }, //http://localhost:4200/subcategoria/nuevo
          { path: ':id/editar', component: EditarSubcategoriaComponent } //http://localhost:4200/subcategoria/1/editar
        ]
      },
      {path: 'paciente',
        children: [
          { path: '', redirectTo: 'lista', pathMatch: 'full'},
          { path: 'lista', component: ListaPacienteComponent },  //http://localhost:4200/paciente/lista
          { path: 'nueva', component: NuevoPacienteComponent }, //http://localhost:4200/paciente/nuevo
          { path: ':id/editar', component: EditarPacienteComponent } //http://localhost:4200/paciente/1/editar
        ]
      },
      {path: 'servicio',
        children: [
          { path: '', redirectTo: 'lista', pathMatch: 'full'},
          { path: 'lista', component: ListaServicioComponent },  //http://localhost:4200/servicio/lista
          { path: 'nueva', component: NuevoServicioComponent }, //http://localhost:4200/servicio/nuevo
          { path: ':id/editar', component: EditarServicioComponent } //http://localhost:4200/servicio/1/editar
        ]
      },
      {path: 'ficha-clinica',
        children: [
          { path: '', redirectTo: 'lista', pathMatch: 'full'},
          { path: 'lista', component: ListaFichaClinicaComponent },  //http://localhost:4200/ficha-clinica/lista
          { path: 'nueva', component: NuevaFichaClinicaComponent }, //http://localhost:4200/ficha-clinica/nueva
          { path: ':id/editar', component: EditarFichaClinicaComponent } //http://localhost:4200/ficha-clinica/1/editar
        ]
      },
      {path: 'horario',
        children: [
          { path: '', redirectTo: 'lista', pathMatch: 'full'},
          { path: 'lista', component: ListaHorarioComponent },  //http://localhost:4200/horario/lista
          { path: 'nuevo', component: NuevoHorarioComponent }, //http://localhost:4200/horario/nuevo
          { path: ':id/editar', component: EditarFichaClinicaComponent } //http://localhost:4200/horario/1/editar
        ]
      },
      {path: 'reserva-turno',
        children: [
          { path: '', redirectTo: 'lista', pathMatch: 'full'},
          { path: 'lista', component: ListaReservasComponent },  //http://localhost:4200/reserva-turno/lista
          { path: 'nueva', component: NuevaReservaComponent } //http://localhost:4200/reserva-turno/nuevo
        ]
      },
      {path: 'horario-excepcion',
        children: [
          { path: '', redirectTo: 'lista', pathMatch: 'full'},
          { path: 'lista', component: ListaHorarioExcepcionComponent },  //http://localhost:4200/horario-excepcion/lista
          { path: 'nuevo', component: NuevoHorarioExcepcionComponent } //http://localhost:4200/horario-excepcion/nuevo
        ]
      },
      {path:'cositas', component: CositasUtilesComponent}

    ]
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'logout',
    component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
