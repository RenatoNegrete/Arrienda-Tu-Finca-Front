import { Injectable } from '@angular/core';
import { Pago } from '../models/Pago';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private apiUrl = 'http://10.43.103.211/api/pago';

  constructor() { }

  getPagos(): Promise< Pago[] > {
    return axios.get<Pago[]>(this.apiUrl).then(
      response => response.data
    ).catch((error) => {
      console.error('Error fetching data:', error);
      return [];
    }
    );
  }
}
