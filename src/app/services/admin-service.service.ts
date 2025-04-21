import { Injectable } from '@angular/core';
import { Administrador } from '../models/Administrador';

import axios from 'axios'

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  private apiUrl = 'http://10.43.103.211/api/administrador';

  constructor() { }

  getAdministradores(): Promise< Administrador[] > {
    return axios.get<Administrador[]>(this.apiUrl).then(
      response => response.data
    ).catch((error) => {
      console.error('Error fetching data:', error);
      return [];
    }
    );
  }

  getAdministradorPorId(id: number): Promise<Administrador | null> {
    return axios.get<Administrador>(`${this.apiUrl}/${id}`)
      .then(response => response.data)
      .catch((error) => {
        console.error(`Error fetching administrador with id ${id}:`, error);
        return null;
      });
  }

  login(email: string, contrasena: string): Promise<any> {
    return axios.post(`${this.apiUrl}/login`, {
      email: email,
      contrasena: contrasena
    }).then(response => response.data)
      .catch(error => {
        console.error('Login error:', error);
        throw error;
      });
  }

}
