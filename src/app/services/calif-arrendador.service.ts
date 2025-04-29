import { Injectable } from '@angular/core';
import { CalifArrendador } from '../models/CalifArrendador';
import axios from 'axios';
import { CalifArrendadorCreateDTO } from '../models/CalifArrendadorCreateDTO';

@Injectable({
  providedIn: 'root'
})
export class CalifArrendadorService {

  private apiUrl = 'http://10.43.103.211/api/calif-arrendador'

  constructor() { }

  getCalificacionById(id: number): Promise<CalifArrendador> {
    return axios.get<CalifArrendador>(`${this.apiUrl}/${id}`)
    .then(response => response.data)
    .catch((error) => {
      console.error(`Error fetching calificacion with id ${id}:`, error);
      throw error; // Opcional: puedes lanzar el error o manejarlo de otra forma
    });
  }

  saveCalificacion(calificacion: CalifArrendadorCreateDTO): Promise<CalifArrendador> {
    return axios.post<CalifArrendador>(this.apiUrl, calificacion)
      .then(response => response.data)
      .catch((error) => {
        console.error('Error saving calificacion:', error);
        throw error;
      });
  }

  getCalificacionesByFinca(idAdmin: number): Promise<CalifArrendador[]> {
    return axios.get<CalifArrendador[]>(`${this.apiUrl}/departamento/${idAdmin}`)
      .then(response => response.data)
      .catch((error) => {
        console.error(`Error fetching calificacoines for finca id ${idAdmin}:`, error);
        return [];
      });
  } 
}
