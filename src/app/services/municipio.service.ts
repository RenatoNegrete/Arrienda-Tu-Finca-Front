import { Injectable } from '@angular/core';
import { Municipio } from '../models/Municipio';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class MunicipioService {

  private apiUrl = 'http://10.43.103.211/api/municipio';

  constructor() { }

  getMunicipios(): Promise< Municipio[] > {
    return axios.get<Municipio[]>(this.apiUrl).then(
      response => response.data
    ).catch((error) => {
      console.error('Error fetching data:', error);
      return [];
    }
    );
  }
}
