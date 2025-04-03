import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Municipio } from '../models/Municipio';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  private apiUrl = 'http://10.43.103.211/api/municipios'; // Ajusta según tu API

  constructor(private http: HttpClient) { }

  // Obtener un municipio por ID
  getById(id: number): Observable<Municipio> {
    return this.http.get<Municipio>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener todos los municipios
  getAll(): Observable<Municipio[]> {
    return this.http.get<Municipio[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Guardar un nuevo municipio
  save(municipio: Municipio): Observable<Municipio> {
    return this.http.post<Municipio>(this.apiUrl, municipio).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar un municipio existente
  update(municipio: Municipio): Observable<Municipio> {
    return this.http.put<Municipio>(`${this.apiUrl}/${municipio.id}`, municipio).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar un municipio por ID
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
