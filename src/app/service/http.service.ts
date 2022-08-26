import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {throwError, catchError, Observable} from 'rxjs';
import {listadatos} from "../model/datos";

//http service generico
export abstract class HttpService<T, ID> {

  constructor(
    protected httpClient: HttpClient,
    protected url: string,
    protected endpoint: string
  ){  }

  post(t: T): Observable<T> {
    return this.httpClient.post<T>(this.url+ "/"   + this.endpoint, t);
  }

  /*put(id: ID, t: T): Observable<T> {
    return this.httpClient.put<T>(this.url + "/"  + this.endpoint  + '/' +  id, t, {});
  }*/


  //la api del profe acepta asi
  put(t: T): Observable<T> {
    return this.httpClient.put<T>(this.url + "/"  + this.endpoint, t, {});
  }


  getById(id: ID): Observable<T> {
    return this.httpClient.get<T>(this.url + "/"  + this.endpoint  + '/' + id);
  }

  // puede recibir query params, en caso de que se quiera
  getAll(queryParams: {} ={}): Observable<listadatos<T>> {
    return this.httpClient.get<listadatos<T>>(this.url+ '/' + this.endpoint + '/', {params: queryParams});
  }

  delete(id: ID): Observable<T> {
    return this.httpClient.delete<T>(this.url + '/' + this.endpoint  + '/' + id);
  }



}




/*
//A lo shaco
getById(endpoint: string, id: string){
  return this.http.get<any>(`${this.url}/${endpoint}`+ id).pipe(
    catchError((err) => {
      return throwError( ()=> err);
    })
  );
}

getAll(endpoint: string){
  return this.http.get<any[]>(`${this.url}/${endpoint}`).pipe(
    catchError((err) => {
      return throwError( ()=> err);
    })
  );
}

post(endpoint: string, payload: Object){
  return this.http.post<any>(`${this.url}/${endpoint}`, payload).pipe(
    catchError((err) => {
      return throwError( ()=> err);
    })
  );
}

put(endpoint: string, id: string, payload: Object){
  return this.http.put<any>(`${this.url}/${endpoint}`+id, payload).pipe(
    catchError((err) => {
      return throwError( ()=> err);
    })
  );
}

delete(endpoint: string, id: string){
  return this.http.delete(`${this.url}/${endpoint}`+ id).pipe(
    catchError((err) => {
      return throwError( ()=> err);
    })
  );
}*/


