import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
export class HttpErrorHandler {
  public static handleError(error: HttpErrorResponse) {
    let errorText;
    if (error.error instanceof ErrorEvent) {
      errorText = error.error.message;
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', errorText);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
        errorText = error.error;
    }
    // return an observable with a user-facing error message
    return throwError(
      errorText);
  }
}
