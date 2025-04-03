import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Arrendador } from '../models/Arrendador';


@Injectable({
  providedIn: 'root'
})
export class ArrendadorService {

  private apiUrl = 'http://10.43.103.211/api/arrendadores'; // Cambia esto según tu endpoint real

  constructor(private http: HttpClient) { }

  // Obtener un arrendador por ID
  getById(id: number): Observable<Arrendador> {
    return this.http.get<Arrendador>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener todos los arrendadores
  getAll(): Observable<Arrendador[]> {
    return this.http.get<Arrendador[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Guardar un nuevo arrendador
  save(arrendador: Arrendador): Observable<Arrendador> {
    return this.http.post<Arrendador>(this.apiUrl, arrendador).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar un arrendador existente
  update(arrendador: Arrendador): Observable<Arrendador> {
    return this.http.put<Arrendador>(`${this.apiUrl}/${arrendador.id}`, arrendador).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar (marcar como inactivo)
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Autenticación de arrendador (login)
  authenticate(email: string, contrasena: string): Observable<Arrendador> {
    return this.http.post<Arrendador>(`${this.apiUrl}/login`, { email, contrasena }).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    console.error('Error en la petición HTTP:', error);
    return throwError(() => new Error('Algo salió mal. Intenta nuevamente.'));
  }
}
