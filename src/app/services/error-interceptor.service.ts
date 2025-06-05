import {
  HttpRequest, HttpErrorResponse,
  HttpInterceptorFn,
  HttpHandlerFn
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const msg = error.error?.message || 'Error inesperado del servidor';

      switch (error.status) {
        case 400:
          alert(`${error.status}: ${msg}`);
          break;
        case 401:
          alert(`${error.status}: ${msg}`);
          break;
        case 403:
          alert(`${error.status}: ${msg}`);
          break;
        case 404:
          alert(`${error.status}: ${msg}`);
          break;
        case 409:
          alert(`${error.status}: ${msg}`);
          break;
        case 401:
          alert('Sesión expirada. Por favor inicia sesión nuevamente.');
          break;
        case 500:
          alert(`Error del servidor: ${msg}`);
          break;
        default:
          alert('Error inesperado');
      }

      return throwError(() => error);
    })
  );
};
