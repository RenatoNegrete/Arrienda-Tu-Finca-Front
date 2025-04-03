import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pago } from '../models/Pago';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private apiUrl = 'http://10.43.103.211/api/pagos'; // Ajusta según tu API

  constructor(private http: HttpClient) { }

  // Obtener un pago por ID
  getById(id: number): Observable<Pago> {
    return this.http.get<Pago>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener todos los pagos
  getAll(): Observable<Pago[]> {
    return this.http.get<Pago[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Guardar un nuevo pago
  save(pago: Pago): Observable<Pago> {
    return this.http.post<Pago>(this.apiUrl, pago).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar un pago existente
  update(pago: Pago): Observable<Pago> {
    return this.http.put<Pago>(`${this.apiUrl}/${pago.id}`, pago).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar un pago por ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores HTTP
  private handleError(error: HttpErrorResponse) {
    console.error('Error en la petición HTTP:', error);
    return throwError(() => new Error('Algo salió mal. Intenta nuevamente.'));
  }
}
