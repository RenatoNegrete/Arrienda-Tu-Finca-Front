import { Injectable } from '@angular/core';
import { Solicitud } from '../models/Solicitud';
import axios from 'axios';
import { SolicitudCreateDTO } from '../models/SolicitudCreateDTO';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private apiUrl = 'http://10.43.103.211/api/solicitud'; // Ajusta esta URL

  constructor(private authService: AuthServiceService) {}

  getSolicitudes(): Promise<Solicitud[]> {
    return axios.get<Solicitud[]>(this.apiUrl, {
      headers: this.authService.getAuthHeaders()
    })
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching data:', error);
        return [];
      });
  }

  getSolicitud(id: number): Promise<Solicitud> {
    return axios.get<Solicitud>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    })
      .then(response => response.data)
      .catch(error => {
        console.error(`Error fetching solicitud with id ${id}:`, error);
        throw error;
      });
  }

  saveSolicitud(solicitud: SolicitudCreateDTO): Promise<Solicitud> {
    return axios.post<Solicitud>(this.apiUrl, solicitud, {
      headers: this.authService.getAuthHeaders()
    })
      .then(response => response.data)
      .catch(error => {
        console.error('Error saving solicitud:', error);
        throw error;
      });
  }

  actualizarSolicitud(solicitud: Solicitud): Promise<Solicitud> {
    return axios.put(this.apiUrl, solicitud, {
      headers: this.authService.getAuthHeaders()
    })
      .then(response => response.data)
      .catch(error => {
        console.error('Error updating data:', error);
        throw error;
      });
  }

  deleteSolicitud(id: number): Promise<void> {
    return axios.delete(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    })
      .then(() => {})
      .catch(error => {
        console.error(`Error deleting solicitud with id ${id}:`, error);
        throw error;
      });
  }

  getSolicitudesByFinca(idFinca: number): Promise<Solicitud[]> {
    return axios.get<Solicitud[]>(`${this.apiUrl}/finca/${idFinca}`, {
      headers: this.authService.getAuthHeaders()
    })
      .then(response => response.data)
      .catch(error => {
        console.error(`Error fetching solicitudes for finca id ${idFinca}:`, error);
        return [];
      });
  }

  getSolicitudesByArrendador(idArrendador: number): Promise<Solicitud[]> {
    return axios.get<Solicitud[]>(`${this.apiUrl}/arrendador/${idArrendador}`, {
      headers: this.authService.getAuthHeaders()
    })
      .then(response => response.data)
      .catch(error => {
        console.error(`Error fetching solicitudes for arrendador id ${idArrendador}:`, error);
        return [];
      });
  }
}
