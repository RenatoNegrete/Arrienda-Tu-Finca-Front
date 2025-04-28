import { Injectable } from '@angular/core';
import { Foto } from '../models/Foto';
import axios from 'axios';
import { FotoCreateDTO } from '../models/FotoCreateDTO';

@Injectable({
  providedIn: 'root'
})
export class FotoService {

  private apiUrl = 'http://10.43.103.211/api/foto';

  constructor() { }

  getFotos(): Promise< Foto[] > {
    return axios.get<Foto[]>(this.apiUrl).then(
      response => response.data
    ).catch((error) => {
      console.error('Error fetching data:', error);
      return [];
    }
    );
  }

  saveFoto(foto: FotoCreateDTO): Promise<Foto> {
    return axios.post<Foto>(this.apiUrl, foto)
      .then(response => response.data)
      .catch((error) => {
        console.error('Error saving foto:', error);
        throw error;
      });
  }

  getFotosByFinca(idFinca: number): Promise<Foto[]> {
    return axios.get<Foto[]>(`${this.apiUrl}/finca/${idFinca}`)
      .then(response => response.data)
      .catch((error) => {
        console.error(`Error fetching fotos for finca id ${idFinca}:`, error);
        return [];
      });
  }

}
