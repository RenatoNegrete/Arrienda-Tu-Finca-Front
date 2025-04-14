import { Injectable } from '@angular/core';
import { Arrendador } from '../models/Arrendador';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ArrendadorService {

  private apiUrl = 'http://10.43.103.211/api/arrendador';

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
  
}
