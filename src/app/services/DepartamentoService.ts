import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Departamento } from '../models/Departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private apiUrl = 'http://10.43.103.211/api/departamentos'; // Ajusta según tu API

  constructor(private http: HttpClient) { }

  // Obtener un departamento por ID
  getById(id: number): Observable<Departamento> {
    return this.http.get<Departamento>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener todos los departamentos
  getAll(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Guardar un nuevo departamento
  save(departamento: Departamento): Observable<Departamento> {
    return this.http.post<Departamento>(this.apiUrl, departamento).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar un departamento existente
  update(departamento: Departamento): Observable<Departamento> {
    return this.http.put<Departamento>(`${this.apiUrl}/${departamento.id}`, departamento).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar un departamento por ID
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
