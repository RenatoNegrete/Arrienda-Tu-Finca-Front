import { Injectable } from '@angular/core';
import { Solicitud } from '../models/Solicitud';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private apiUrl = 'http://10.43.103.211/api/solicitud';

  constructor() { }

  getSolicitudes(): Promise< Solicitud[] > {
    return axios.get<Solicitud[]>(this.apiUrl).then(
      response => response.data
    ).catch((error) => {
      console.error('Error fetching data:', error);
      return [];
    }
    );
  }
}
