import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Solicitud } from '../models/Solicitud';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private apiUrl = 'http://10.43.103.211/api/solicitudes'; // Ajusta según tu API

  constructor(private http: HttpClient) { }

  // Obtener una solicitud por ID
  getById(id: number): Observable<Solicitud> {
    return this.http.get<Solicitud>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener todas las solicitudes
  getAll(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Guardar una nueva solicitud
  save(solicitud: Solicitud): Observable<Solicitud> {
    solicitud.status = 0; // Estado inicial
    return this.http.post<Solicitud>(this.apiUrl, solicitud).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar una solicitud existente
  update(solicitud: Solicitud): Observable<Solicitud> {
    solicitud.status = 0; // Mantener el estado en 0
    return this.http.put<Solicitud>(`${this.apiUrl}/${solicitud.id}`, solicitud).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar una solicitud por ID
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
