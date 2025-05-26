import { Injectable } from '@angular/core';
import { Arrendador } from '../models/Arrendador';
import axios from 'axios';
import { ArrendadorCreateDTO } from '../models/ArrendadorCreateDTO';
import { RegisterRequest } from '../models/RegisterRequest';

@Injectable({
  providedIn: 'root'
})
export class ArrendadorService {

  private apiUrl = 'http://10.43.103.211/api/arrendador';
  private authUrl = 'http://10.43.103.211/auth'

  constructor() { }

  getArrendadores(): Promise< Arrendador[] > {
    return axios.get<Arrendador[]>(this.apiUrl).then(
      response => response.data
    ).catch((error) => {
      console.error('Error fetching data:', error);
      return [];
    }
    );
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
  
  createArrendador(arrendador: ArrendadorCreateDTO): Promise<Arrendador> {
    return axios.post<Arrendador>(this.apiUrl, arrendador)
      .then(response => response.data)
      .catch(error => {
        console.error('Error creando arrendador:', error);
        throw error;
      });
  }
}
