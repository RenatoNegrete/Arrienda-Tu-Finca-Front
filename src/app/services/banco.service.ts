import { Injectable } from '@angular/core';
import { Banco } from '../models/Banco';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  private apiUrl = 'http://10.43.103.211/api/banco';

  constructor() { }

  getBancos(): Promise< Banco[] > {
    return axios.get<Banco[]>(this.apiUrl).then(
      response => response.data
    ).catch((error) => {
      console.error('Error fetching data:', error);
      return [];
    }
    );
  }
}
