import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {throwError as observableThrowError,  Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemons():Observable<any>{
    return this.http.get<any>('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151')
      .pipe(
        tap(data =>{
          console.log(data)
        }),
        catchError(this.handleError('getPokemons', []))
      )
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return (error);
    };
  }
}
