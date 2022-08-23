import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url: any;

  constructor(private http: HttpClient) {
    this.url = 'https://equipoyosh.com/stock-nutrinatalia';

  }

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
  }

  /*list(queryOptions: QueryOptions, endpoint: string) {
    return this.http
      .get(`${this.url}/${endpoint}?${queryOptions.toQueryString()}`)
      .pipe(map((data: any) => this.convertData(data.items)));
  }*/


}

