import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Activity } from '../domain/activity';


@Injectable({
    providedIn: 'root',
})
export class GitHubService {

    private url = 'https://api.github.com/users/SirBisgaard/events';

    constructor(private http: HttpClient) { }

    public getLatestActivity(): Observable<Activity[]> {
        return this.http.get<Activity[]>(this.url)
        .pipe(
          catchError(this.handleError<Activity[]>('getLatestActivity', []))
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