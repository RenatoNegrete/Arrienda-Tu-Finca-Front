import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar para *ngIf, *ngFor, pipes

import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud } from '../../models/Solicitud';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css'],
  standalone: true, // <- Clave para standalone components
  imports: [CommonModule] // <- Para habilitar *ngIf, *ngFor, pipes
})
export class SolicitudesComponent implements OnInit {
  solicitudes: Solicitud[] = [];
  solicitudesFiltradas: Solicitud[] = [];
  estadoActual: string = 'porAceptar';
  usuario: any

  estadoMap: { [key: number]: string } = { 
    0: 'porAceptar',
    1: 'aceptadas',
    2: 'rechazadas',
    3: 'pagadas',
    4: 'porCalificar',
    6: 'finalizadas'
  };

  constructor(private solicitudService: SolicitudService, private authService: AuthServiceService) {}

  ngOnInit(): void {
    this.usuario = this.authService.obtenerUsuario()
    this.obtenerSolicitudes();
  }

  obtenerSolicitudes(): void {
    this.solicitudService.getSolicitudesByArrendador(this.usuario.id).then(data => {
      this.solicitudes = data;
      this.filtrarEstado(this.estadoActual);
    });
  }

  filtrarEstado(estado: string): void {
    const estadoNumero = this.getEstadoNumero(estado);
    this.estadoActual = estado;
    this.solicitudesFiltradas = this.solicitudes.filter(s => s.estado === estadoNumero);
  }

  getEstadoNumero(estadoTexto: string): number {
    const estadoInvertido = Object.entries(this.estadoMap).find(([key, value]) => value === estadoTexto);
    return estadoInvertido ? Number(estadoInvertido[0]) : 0;
  }

  aceptarSolicitud(solicitud: Solicitud): void {
    solicitud.estado = 1;
    this.solicitudService.actualizarSolicitud(solicitud).then(() => {
      this.obtenerSolicitudes();
    });
  }

  rechazarSolicitud(solicitud: Solicitud): void {
    solicitud.estado = 2;
    this.solicitudService.actualizarSolicitud(solicitud).then(() => {
      this.obtenerSolicitudes();
    });
  }

  calificarSolicitud(solicitud: Solicitud): void {
    solicitud.estado = 5;
    this.solicitudService.actualizarSolicitud(solicitud).then(() => {
      this.obtenerSolicitudes();
    });
  }
}
