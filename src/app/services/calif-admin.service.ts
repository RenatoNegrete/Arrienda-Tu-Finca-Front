import { Injectable } from '@angular/core';
import axios from 'axios';
import { CalifAdmin } from '../models/CalifAdmin';
import { CalifAdminCreateDTO } from '../models/CalifAdminCreateDTO';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class CalifAdminService {

  private apiUrl = 'http://10.43.103.211/api/calif-administrador'

  constructor(private authService: AuthServiceService) { }

  getCalificacionById(id: number): Promise<CalifAdmin> {
    return axios.get<CalifAdmin>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    })
    .then(response => response.data)
    .catch((error) => {
      console.error(`Error fetching calificacion with id ${id}:`, error);
      throw error; // Opcional: puedes lanzar el error o manejarlo de otra forma
    });
  }

  saveCalificacion(calificacion: CalifAdminCreateDTO): Promise<CalifAdmin> {
    return axios.post<CalifAdmin>(this.apiUrl, calificacion, {
      headers: this.authService.getAuthHeaders()
    })
      .then(response => response.data)
      .catch((error) => {
        console.error('Error saving calificacion:', error);
        throw error;
      });
  }

  getCalificacionesByFinca(idAdmin: number): Promise<CalifAdmin[]> {
    return axios.get<CalifAdmin[]>(`${this.apiUrl}/departamento/${idAdmin}`, {
      headers: this.authService.getAuthHeaders()
    })
      .then(response => response.data)
      .catch((error) => {
        console.error(`Error fetching calificacoines for finca id ${idAdmin}:`, error);
        return [];
      });
  }
}
