import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaCategoriaComponent } from './categoria/lista-categoria/lista-categoria.component';
import { NuevaCategoriaComponent } from './categoria/nueva-categoria/nueva-categoria.component';
import { EditarCategoriaComponent } from './categoria/editar-categoria/editar-categoria.component';
import { ListaSubcategoriaComponent } from './subcategoria/lista-subcategoria/lista-subcategoria.component';
import { NuevaSubcategoriaComponent } from './subcategoria/nueva-subcategoria/nueva-subcategoria.component';
import { EditarSubcategoriaComponent } from './subcategoria/editar-subcategoria/editar-subcategoria.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';

import { LayoutModule } from '@angular/cdk/layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { CositasUtilesComponent } from './cositas-utiles/cositas-utiles/cositas-utiles.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  //componentes creados
  declarations: [
    AppComponent,
    ListaCategoriaComponent,
    NuevaCategoriaComponent,
    EditarCategoriaComponent,
    ListaSubcategoriaComponent,
    NuevaSubcategoriaComponent,
    EditarSubcategoriaComponent,
    HomeComponent,
    CositasUtilesComponent,
  ],
  // librerias y modulos de angular y librerias externas
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSelectModule

  ],
  providers: [
    //para usar datepicker
    MatDatepickerModule,
    MatNativeDateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
