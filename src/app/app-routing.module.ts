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

const routes: Routes = [
  {
    path:'',
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
      {path:'cositas', component: CositasUtilesComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
