import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { HttpErrorHandler } from '../shared/http-error-handler';

@Injectable()
export class ServiceHttpService {

  constructor(private http: HttpClient) { }

  getListOfStrings(): Observable<string[]> {
    return this.http.get<string[]>('api/listOfStrings')
    .pipe(
      catchError(HttpErrorHandler.handleError)
    );
  }
}
