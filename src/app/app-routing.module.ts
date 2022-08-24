import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {ListaCategoriaComponent} from "./categoria/lista-categoria/lista-categoria.component";
import {NuevaCategoriaComponent} from "./categoria/nueva-categoria/nueva-categoria.component";
import {EditarCategoriaComponent} from "./categoria/editar-categoria/editar-categoria.component";

const routes: Routes = [
  {
    path:'',
    children: [
      {path:'', redirectTo: 'home', pathMatch: 'full'},
      {path:'home', component:HomeComponent},
      {path: 'categoria',
        children: [
          { path: '', redirectTo: 'lista', pathMatch: 'full'},
          { path: 'lista', component: ListaCategoriaComponent },
          { path: 'nuevo', component: NuevaCategoriaComponent },
          { path: ':id/editar', component: EditarCategoriaComponent }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
