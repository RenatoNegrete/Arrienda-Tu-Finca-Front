import { Injectable } from '@angular/core';
import { CalifFinca } from '../models/CalifFinca';
import axios from 'axios';
import { CalifFincaCreateDTO } from '../models/CalifFincaCreateDTO';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class CalifFincaService {

  private apiUrl = 'http://10.43.103.211/api/calif-finca'

  constructor(private authService: AuthServiceService) { }

  getCalificacionById(id: number): Promise<CalifFinca> {
    return axios.get<CalifFinca>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    })
    .then(response => response.data)
    .catch((error) => {
      console.error(`Error fetching calificacion with id ${id}:`, error);
      throw error; // Opcional: puedes lanzar el error o manejarlo de otra forma
    });
  }

  saveCalificacion(calificacion: CalifFincaCreateDTO): Promise<CalifFinca> {
    return axios.post<CalifFinca>(this.apiUrl, calificacion, {
      headers: this.authService.getAuthHeaders()
    })
      .then(response => response.data)
      .catch((error) => {
        console.error('Error saving calificacion:', error);
        throw error;
      });
  }

  getCalificacionesByFinca(idFinca: number): Promise<CalifFinca[]> {
    return axios.get<CalifFinca[]>(`${this.apiUrl}/departamento/${idFinca}`, {
      headers: this.authService.getAuthHeaders()
    })
      .then(response => response.data)
      .catch((error) => {
        console.error(`Error fetching calificacoines for finca id ${idFinca}:`, error);
        return [];
      });
  }
}
