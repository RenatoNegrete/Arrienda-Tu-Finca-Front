import { Injectable } from '@angular/core';
import { CalifArrendador } from '../models/CalifArrendador';
import axios from 'axios';
import { CalifArrendadorCreateDTO } from '../models/CalifArrendadorCreateDTO';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class CalifArrendadorService {

  private apiUrl = 'http://10.43.103.211/api/calif-arrendador'

  constructor(private authService: AuthServiceService) { }

  getCalificacionById(id: number): Promise<CalifArrendador> {
    return axios.get<CalifArrendador>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    })
    .then(response => response.data)
    .catch((error) => {
      console.error(`Error fetching calificacion with id ${id}:`, error);
      throw error; // Opcional: puedes lanzar el error o manejarlo de otra forma
    });
  }

  saveCalificacion(calificacion: CalifArrendadorCreateDTO): Promise<CalifArrendador> {
    return axios.post<CalifArrendador>(this.apiUrl, calificacion, {
      headers: this.authService.getAuthHeaders()
    })
      .then(response => response.data)
      .catch((error) => {
        console.error('Error saving calificacion:', error);
        throw error;
      });
  }

  getCalificacionesByFinca(idAdmin: number): Promise<CalifArrendador[]> {
    return axios.get<CalifArrendador[]>(`${this.apiUrl}/departamento/${idAdmin}`, {
      headers: this.authService.getAuthHeaders()
    })
      .then(response => response.data)
      .catch((error) => {
        console.error(`Error fetching calificacoines for finca id ${idAdmin}:`, error);
        return [];
      });
  } 
}
