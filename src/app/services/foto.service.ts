import { Injectable } from '@angular/core';
import { Foto } from '../models/Foto';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class FotoService {

  private apiUrl = 'http://10.43.103.211/api/foto';

  constructor() { }

  getFOtos(): Promise< Foto[] > {
    return axios.get<Foto[]>(this.apiUrl).then(
      response => response.data
    ).catch((error) => {
      console.error('Error fetching data:', error);
      return [];
    }
    );
  }
}
