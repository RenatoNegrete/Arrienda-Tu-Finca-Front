import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Foto } from '../models/Foto';

@Injectable({
  providedIn: 'root'
})
export class FotoService {

  private apiUrl = 'http://10.43.103.211/api/fotos'; // Ajusta según tu API

  constructor(private http: HttpClient) { }

  // Obtener una foto por ID
  getById(id: number): Observable<Foto> {
    return this.http.get<Foto>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener todas las fotos
  getAll(): Observable<Foto[]> {
    return this.http.get<Foto[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Guardar una nueva foto
  save(foto: Foto): Observable<Foto> {
    return this.http.post<Foto>(this.apiUrl, foto).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar una foto existente
  update(foto: Foto): Observable<Foto> {
    return this.http.put<Foto>(`${this.apiUrl}/${foto.id}`, foto).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar una foto por ID
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
