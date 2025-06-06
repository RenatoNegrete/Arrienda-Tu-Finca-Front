import { Injectable } from '@angular/core';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private tokenKey = 'auth_token';

  constructor() { }

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  guardarToken(tokenObj: { token: string; refreshToken: string }) {
    if (this.isBrowser()) {
      localStorage.setItem(this.tokenKey, JSON.stringify(tokenObj));
    }
  }

  obtenerUsuario(): any {
    if (this.isBrowser()) {
      const raw = localStorage.getItem(this.tokenKey);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          return jwtDecode(parsed.token);
        } catch (e) {
          console.error('Error al decodificar el token:', e);
          return null;
        }
      }
    }
    return null;
  }

  estaAutenticado(): boolean {
    const usuario = this.obtenerUsuario();
    if (!usuario || !usuario.exp) return false;

    const now = Math.floor(Date.now() / 1000);
    return usuario.exp > now;
  }

  logout(): Promise<void> {
    const headers = this.getAuthHeaders();

    return axios.post('http://10.43.103.211/auth/logout', null, { headers })
      .then(() => {
        if (this.isBrowser()) {
          localStorage.removeItem(this.tokenKey);
        }
      })
      .catch(error => {
        console.error('Error during logout:', error);
      });
  } 

  getAuthHeaders(): any {
    const tokenData = localStorage.getItem(this.tokenKey);
    if (tokenData) {
      const parsed = JSON.parse(tokenData);
      return {
        Authorization: `Bearer ${parsed.token}`
      };
    }
    return {};
  }
}