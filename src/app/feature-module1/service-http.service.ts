import { Article } from './models/article';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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

  createNewArticle(article: Article): Observable<Article> {
    return this.http.post<HttpResponse<Article>>(
      'api/article/add',
      JSON.stringify(article),
      {
        headers: { 'Content-Type': 'application/json' },
        observe: 'response' })
      .pipe(
        map((response: HttpResponse<Article>) =>
        response.status === 201 ? response.body : null),
        catchError(HttpErrorHandler.handleError)
      );
  }
}
