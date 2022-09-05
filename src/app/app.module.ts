import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaCategoriaComponent } from './categoria/lista-categoria/lista-categoria.component';
import { NuevaCategoriaComponent } from './categoria/nueva-categoria/nueva-categoria.component';
import { EditarCategoriaComponent } from './categoria/editar-categoria/editar-categoria.component';
import { ListaSubcategoriaComponent } from './subcategoria/lista-subcategoria/lista-subcategoria.component';
import { NuevaSubcategoriaComponent } from './subcategoria/nueva-subcategoria/nueva-subcategoria.component';
import { EditarSubcategoriaComponent } from './subcategoria/editar-subcategoria/editar-subcategoria.component';
import { ListaPacienteComponent } from "./paciente/lista-paciente/lista-paciente.component";
import { NuevoPacienteComponent } from "./paciente/nuevo-paciente/nuevo-paciente.component";
import { EditarPacienteComponent } from "./paciente/editar-paciente/editar-paciente.component";
import { ListaServicioComponent } from "./servicio/lista-servicio/lista-servicio.component";
import { NuevoServicioComponent } from "./servicio/nuevo-servicio/nuevo-servicio.component";
import { EditarServicioComponent } from "./servicio/editar-servicio/editar-servicio.component";

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
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { CositasUtilesComponent } from './cositas-utiles/cositas-utiles/cositas-utiles.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from "@angular/material/list";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import { ListaFichaClinicaComponent } from './ficha-clinica/lista-ficha-clinica/lista-ficha-clinica.component';
import {NuevaFichaClinicaComponent} from "./ficha-clinica/nueva-ficha-clinica/nueva-ficha-clinica.component";
import { EditarFichaClinicaComponent } from './ficha-clinica/editar-ficha-clinica/editar-ficha-clinica.component';
import { PopupElegirPersonaComponent } from './popup-elegir-persona/popup-elegir-persona.component';
import { ListaReservasComponent } from './reserva-turno/lista-reservas/lista-reservas.component';
import { NuevaReservaComponent } from './reserva-turno/nueva-reserva/nueva-reserva.component';
import { ObservacionComponent } from './reserva-turno/lista-reservas/observacion/observacion.component';
import { LoginComponent } from './login/login.component';
import {CookieService} from "ngx-cookie-service";


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
    ListaPacienteComponent,
    NuevoPacienteComponent,
    EditarPacienteComponent,
    ListaServicioComponent,
    NuevoServicioComponent,
    EditarServicioComponent,
    HomeComponent,
    CositasUtilesComponent,
    ListaFichaClinicaComponent,
    NuevaFichaClinicaComponent,
    EditarFichaClinicaComponent,
    PopupElegirPersonaComponent,
    ListaReservasComponent,
    NuevaReservaComponent,
    ObservacionComponent,
    LoginComponent
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
    MatSelectModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [
    //para usar datepicker
    MatDatepickerModule,
    MatNativeDateModule,
    {
      provide: MatDialogRef,
      useValue: {}
    },
    { provide: LOCALE_ID, useValue: 'en-nz' },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
