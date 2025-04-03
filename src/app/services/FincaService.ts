import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Finca } from '../models/Finca';

@Injectable({
  providedIn: 'root'
})
export class FincaService {

  private apiUrl = 'http://10.43.103.211/api/fincas'; // Ajusta según tu API

  constructor(private http: HttpClient) { }

  // Obtener una finca por ID
  getById(id: number): Observable<Finca> {
    return this.http.get<Finca>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener todas las fincas
  getAll(): Observable<Finca[]> {
    return this.http.get<Finca[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Guardar una nueva finca
  save(finca: Finca): Observable<Finca> {
    return this.http.post<Finca>(this.apiUrl, finca).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar una finca existente
  update(finca: Finca): Observable<Finca> {
    return this.http.put<Finca>(`${this.apiUrl}/${finca.id}`, finca).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar una finca por ID
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
