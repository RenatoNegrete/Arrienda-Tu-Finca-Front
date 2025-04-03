import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Banco } from '../models/Banco';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  private apiUrl = 'http://10.43.103.211/api/bancos'; // Ajusta esto según tu API

  constructor(private http: HttpClient) { }

  // Obtener un banco por ID
  getById(id: number): Observable<Banco> {
    return this.http.get<Banco>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener todos los bancos
  getAll(): Observable<Banco[]> {
    return this.http.get<Banco[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Guardar un nuevo banco
  save(banco: Banco): Observable<Banco> {
    return this.http.post<Banco>(this.apiUrl, banco).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar un banco existente
  update(banco: Banco): Observable<Banco> {
    return this.http.put<Banco>(`${this.apiUrl}/${banco.id}`, banco).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar un banco por ID
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
