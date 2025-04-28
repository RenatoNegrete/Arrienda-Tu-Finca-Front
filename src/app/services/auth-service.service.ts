import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private usuarioKey = 'usuario';

  constructor() { }

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  guardarUsuario(usuario: any) {
    if (this.isBrowser()) {
      localStorage.setItem(this.usuarioKey, JSON.stringify(usuario));
    }
  }

  obtenerUsuario(): any {
    if (this.isBrowser()) {
      const usuario = localStorage.getItem(this.usuarioKey);
      return usuario ? JSON.parse(usuario) : null;
    }
    return null;
  }

  estaAutenticado(): boolean {
    return this.obtenerUsuario() !== null;
  }

  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem(this.usuarioKey);
    }
  }
}