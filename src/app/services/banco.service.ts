import { Injectable } from '@angular/core';
import { Banco } from '../models/Banco';
import axios from 'axios';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  private apiUrl = 'http://10.43.103.211/api/banco';

  constructor(private authService: AuthServiceService) { }

  getBancos(): Promise< Banco[] > {
    return axios.get<Banco[]>(this.apiUrl, {
      headers: this.authService.getAuthHeaders()
    }).then(
      response => response.data
    ).catch((error) => {
      console.error('Error fetching data:', error);
      return [];
    }
    );
  }
}
