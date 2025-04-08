import { Injectable } from '@angular/core';
import { Finca } from '../models/Finca';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class FincaService {

  private apiUrl = 'http://10.43.103.211/api/finca';

  constructor() { }

  getFincas(): Promise< Finca[] > {
    return axios.get<Finca[]>(this.apiUrl).then(
      response => response.data
    ).catch((error) => {
      console.error('Error fetching data:', error);
      return [];
    })
  }
}
