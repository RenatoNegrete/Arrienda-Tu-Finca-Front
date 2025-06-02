import { Injectable } from '@angular/core';
import { Departamento } from '../models/Departamento';
import axios from 'axios';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private apiUrl = 'http://10.43.103.211/api/departamento';

  constructor(private authService: AuthServiceService) { }

  getDepartamentos(): Promise< Departamento[] > {
    return axios.get<Departamento[]>(this.apiUrl, {
      headers: this.authService.getAuthHeaders()
    }).then(
      response => response.data
    ).catch((error) => {
      console.error('Error fetching data:', error);
      return [];
    }
    );
  }

  getDepartamentoById(id: number): Promise<Departamento> {
    return axios.get<Departamento>(`${this.apiUrl}/${id}`, {
      headers: this.authService.getAuthHeaders()
    })
    .then(response => response.data)
    .catch((error) => {
      console.error(`Error fetching calificacion with id ${id}:`, error);
      throw error; // Opcional: puedes lanzar el error o manejarlo de otra forma
    });
  }
}
