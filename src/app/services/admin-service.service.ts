import { Injectable } from '@angular/core';
import { Administrador } from '../models/Administrador';

import axios from 'axios'
import { AdminCreateDTO } from '../models/AdminCreateDTO';
import { RegisterRequest } from '../models/RegisterRequest';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  private apiUrl = 'http://10.43.103.211/api/administrador';
  private authUrl = 'http://10.43.103.211/auth';

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

  login(email: string, contrasena: string, type: string): Promise<any> {
    return axios.post(`${this.authUrl}/login`, {
      email: email,
      contrasena: contrasena,
      type: type
    }).then(response => response.data)
      .catch(error => {
        console.error('Login error:', error);
        throw error;
      });
  }

  register(request: RegisterRequest): Promise<any> {
    return axios.post(`${this.authUrl}/register`, request)
      .then(response => response.data)
      .catch(error => {
        console.error('Register error', error);
        throw error;
      })
  }

  createAdministrador(admin: AdminCreateDTO): Promise<Administrador> {
    return axios.post<Administrador>(this.apiUrl, admin)
      .then(response => response.data)
      .catch(error => {
        console.error('Error creando administrador:', error);
        throw error;
      });
  }

}
