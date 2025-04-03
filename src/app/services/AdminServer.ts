import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Administrador } from '../models/Administrador';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private apiUrl = 'http://10.43.103.211/api/administradores'; // Ajusta la URL según tu backend

  constructor(private http: HttpClient) { }

  // Obtener un administrador por ID
  getById(id: number): Observable<Administrador> {
    return this.http.get<Administrador>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener todos los administradores
  getAll(): Observable<Administrador[]> {
    return this.http.get<Administrador[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Guardar un nuevo administrador
  save(admin: Administrador): Observable<Administrador> {
    return this.http.post<Administrador>(this.apiUrl, admin).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar un administrador existente
  update(admin: Administrador): Observable<Administrador> {
    return this.http.put<Administrador>(`${this.apiUrl}/${admin.id}`, admin).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar (marcar como inactivo) un administrador por ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Autenticar administrador (Login)
  authenticate(email: string, contrasena: string): Observable<Administrador> {
    return this.http.post<Administrador>(`${this.apiUrl}/login`, { email, contrasena }).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores HTTP
  private handleError(error: HttpErrorResponse) {
    console.error('Ocurrió un error:', error);
    return throwError(() => new Error('Error en la solicitud, intenta nuevamente.'));
  }
}
