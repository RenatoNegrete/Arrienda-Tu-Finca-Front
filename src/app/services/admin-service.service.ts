import { Injectable } from '@angular/core';
import { Administrador } from '../models/Administrador';

import axios from 'axios'

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor() { }

  getAdministradores(): Promise< Administrador[] > {
    return axios.get<Administrador[]>('http://10.43.103.211/api/finca').then(
      response => response.data
    ).catch((error) => {
      console.error('Error fetching data:', error);
      return [];
    }
    );
  }

}
