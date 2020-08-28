import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { StarWarsQuote } from '../domain/starwars-quote';


@Injectable({
    providedIn: 'root',
})
export class StarWarsQuoteService {

    private url = 'http://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuote';

    constructor(private http: HttpClient) { }

    public getRandomQuote(): Observable<StarWarsQuote> {
        return this.http.get<StarWarsQuote>(this.url)
        .pipe(
          catchError(this.handleError<StarWarsQuote>('StarWarsQuote', new StarWarsQuote()))
        );
    }

    private log(message: string) {
        console.error(message); 
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            this.log(`${operation} failed: ${error.message}`)

            return of(result as T);
        };
    }
}