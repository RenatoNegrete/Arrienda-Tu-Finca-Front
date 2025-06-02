import { Injectable } from '@angular/core';
import { Municipio } from '../models/Municipio';
import axios from 'axios';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  private apiUrl = 'http://10.43.103.211/api/municipio';

  constructor(private authService: AuthServiceService) { }

  getMunicipios(): Promise< Municipio[] > {
    return axios.get<Municipio[]>(this.apiUrl, {
      headers: this.authService.getAuthHeaders()
    }).then(
      response => response.data
    ).catch((error) => {
      console.error('Error fetching data:', error);
      return [];
    }
    );
  }

  getMunicipioById(id: number): Promise<Municipio> {
    return axios.get<Municipio>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    })
    .then(response => response.data)
    .catch((error) => {
      console.error(`Error fetching calificacion with id ${id}:`, error);
      throw error; // Opcional: puedes lanzar el error o manejarlo de otra forma
    });
  }
}
