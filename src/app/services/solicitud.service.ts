import { Injectable } from '@angular/core';
import { Solicitud } from '../models/Solicitud';
import axios from 'axios';
import { SolicitudCreateDTO } from '../models/SolicitudCreateDTO';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private apiUrl = 'http://10.43.103.211/api/solicitud'; // Ajusta esta URL

  constructor() {}

  getSolicitudes(): Promise<Solicitud[]> {
    return axios.get<Solicitud[]>(this.apiUrl)
      .then(response => response.data)
      .catch(error => {
        console.error('Error fetching data:', error);
        return [];
      });
  }

  getSolicitud(id: number): Promise<Solicitud> {
    return axios.get<Solicitud>(`${this.apiUrl}/${id}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error fetching solicitud with id ${id}:`, error);
        throw error;
      });
  }

  saveSolicitud(solicitud: SolicitudCreateDTO): Promise<Solicitud> {
    return axios.post<Solicitud>(this.apiUrl, solicitud)
      .then(response => response.data)
      .catch(error => {
        console.error('Error saving solicitud:', error);
        throw error;
      });
  }

  actualizarSolicitud(solicitud: Solicitud): Promise<Solicitud> {
    return axios.put(this.apiUrl, solicitud)
      .then(response => response.data)
      .catch(error => {
        console.error('Error updating data:', error);
        throw error;
      });
  }

  deleteSolicitud(id: number): Promise<void> {
    return axios.delete(`${this.apiUrl}/${id}`)
      .then(() => {})
      .catch(error => {
        console.error(`Error deleting solicitud with id ${id}:`, error);
        throw error;
      });
  }

  getSolicitudesByFinca(idFinca: number): Promise<Solicitud[]> {
    return axios.get<Solicitud[]>(`${this.apiUrl}/finca/${idFinca}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error fetching solicitudes for finca id ${idFinca}:`, error);
        return [];
      });
  }

  getSolicitudesByArrendador(idArrendador: number): Promise<Solicitud[]> {
    return axios.get<Solicitud[]>(`${this.apiUrl}/arrendador/${idArrendador}`)
      .then(response => response.data)
      .catch(error => {
        console.error(`Error fetching solicitudes for arrendador id ${idArrendador}:`, error);
        return [];
      });
  }
}
