import { Injectable } from '@angular/core';
import { Finca } from '../models/Finca';
import axios from 'axios';
import { FincaCreateDTO } from '../models/FincaCreateDTO';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class FincaService {

  private apiUrl = 'http://10.43.103.211/api/finca';

  constructor(private authService: AuthServiceService) { }

  getFincas(): Promise< Finca[] > {
    return axios.get<Finca[]>(this.apiUrl, {
      headers: this.authService.getAuthHeaders()
    }).then(
      response => response.data
    ).catch((error) => {
      console.error('Error fetching data:', error);
      return [];
    })
  }

  getFincaPorId(id: number): Promise<Finca> {
    return axios.get<Finca>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    })
      .then(response => response.data)
      .catch((error) => {
        console.error(`Error fetching finca with id ${id}:`, error);
        throw error; // Opcional: puedes lanzar el error o manejarlo de otra forma
      });
  }

  saveFinca(finca: FincaCreateDTO): Promise<Finca> {
    return axios.post<Finca>(this.apiUrl, finca, {
      headers: this.authService.getAuthHeaders()
    })
      .then(response => response.data)
      .catch((error) => {
        console.error('Error saving finca:', error);
        throw error;
      });
  }

  updateFinca(finca: Finca): Promise<Finca> {
    return axios.put<Finca>(this.apiUrl, finca, {
      headers: this.authService.getAuthHeaders()
    })
      .then(response => response.data)
      .catch((error) => {
        console.error('Error updating finca:', error);
        throw error;
      });
  }

  deleteFinca(id: number): Promise<void> {
    return axios.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    })
      .then(response => response.data)
      .catch((error) => {
        console.error(`Error deleting finca with id ${id}:`, error);
        throw error;
      });
  }

  getFincasByAdmin(idAdmin: number): Promise<Finca[]> {
    return axios.get<Finca[]>(`${this.apiUrl}/admin/${idAdmin}`, {
      headers: this.authService.getAuthHeaders()
    })
      .then(response => response.data)
      .catch((error) => {
        console.error(`Error fetching fincas for admin id ${idAdmin}:`, error);
        return [];
      });
  }

  getFincasByDepartamento(idDepartamento: number): Promise<Finca[]> {
    return axios.get<Finca[]>(`${this.apiUrl}/departamento/${idDepartamento}`, {
      headers: this.authService.getAuthHeaders()
    })
      .then(response => response.data)
      .catch((error) => {
        console.error(`Error fetching fincas for departamento id ${idDepartamento}:`, error);
        return [];
      });
  }

  getFincasByHabitaciones(cantHabitaciones: number): Promise<Finca[]> {
    return axios.get<Finca[]>(`${this.apiUrl}/habitaciones/${cantHabitaciones}`, {
      headers: this.authService.getAuthHeaders()
    })
      .then(response => response.data)
      .catch((error) => {
        console.error(`Error fetching fincas with ${cantHabitaciones} habitaciones:`, error);
        return [];
      });
  }
}
