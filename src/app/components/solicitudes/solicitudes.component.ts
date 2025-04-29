import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar para *ngIf, *ngFor, pipes

import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud } from '../../models/Solicitud';
import { AuthServiceService } from '../../services/auth-service.service';
import { PagoService } from '../../services/pago.service';
import { FormsModule } from '@angular/forms';
import { Banco } from '../../models/Banco';
import { BancoService } from '../../services/banco.service';
import { PagoCreateDTO } from '../../models/PagoCreateDTO';
import { CalifFincaCreateDTO } from '../../models/CalifFincaCreateDTO';
import { CalifFincaService } from '../../services/calif-finca.service';
import { CalifAdminService } from '../../services/calif-admin.service';
import { FincaService } from '../../services/finca.service';
import { Finca } from '../../models/Finca';
import { CalifAdminCreateDTO } from '../../models/CalifAdminCreateDTO';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css'],
  standalone: true, // <- Clave para standalone components
  imports: [CommonModule, FormsModule] // <- Para habilitar *ngIf, *ngFor, pipes
})
export class SolicitudesComponent implements OnInit {
  solicitudes: Solicitud[] = [];
  solicitudesFiltradas: Solicitud[] = [];
  estadoActual: string = 'porAceptar';
  usuario: any
  solicitudConFormularioPagoId: number | null = null;
  bancoSeleccionado: number | null = null;

  numCuenta: string = ''
  bancos: Banco[] = []

  puntuacion: number = 0
  puntuacion2: number = 0
  comentario: string = ''
  comentario2: string = ''
  finca!: Finca

  estadoMap: { [key: number]: string } = { 
    0: 'porAceptar',
    1: 'aceptadas',
    2: 'rechazadas',
    3: 'pagadas',
    4: 'porCalificar',
    6: 'finalizadas'
  };

  constructor(
    private solicitudService: SolicitudService, 
    private authService: AuthServiceService, 
    private pagoService: PagoService, 
    private bancoService: BancoService,
    private califFincaService: CalifFincaService,
    private califAdminService: CalifAdminService,
    private fincaService: FincaService
  ) {}

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

  abrirFormularioPago(solicitudId: number): void {
    this.solicitudConFormularioPagoId = solicitudId;
    this.cargarBancos()
  }
  
  cerrarFormularioPago(): void {
    this.solicitudConFormularioPagoId = null;
  }
  
  confirmarPago(solicitud: Solicitud): void {
    const pago: PagoCreateDTO = {
      numCuenta: this.numCuenta,
      valor: solicitud.valor,
      idBanco: this.bancoSeleccionado,
      idSolicitud: solicitud.id
    }
    this.pagoService.savePago(pago)
      .then(savedPago => {
        console.log('Pago creado con exito')
        solicitud.estado = 4
        solicitud.idPago = savedPago.id
        this.solicitudService.actualizarSolicitud(solicitud).then(() => {
          this.solicitudConFormularioPagoId = null;
          this.obtenerSolicitudes();
      }).catch(error => {
        console.error('Error al guardar la claificacion:', error);
        // Aquí podrías mostrar un mensaje de error al usuario
      });
    });
  }

  calificarSolicitud(solicitud: Solicitud): void {
    this.solicitudConFormularioPagoId = solicitud.id;
  }

  confirmarCalificacion(solicitud: Solicitud) {
    this.confirmarCalificacionFinca(solicitud)
    this.confirmarCalificacionAdmin(solicitud)
    solicitud.estado = 5
    this.solicitudService.actualizarSolicitud(solicitud).then(() => {
      this.solicitudConFormularioPagoId = null
      this.obtenerSolicitudes()
    }).catch(error => {
      console.error('Error al guardar la calificacion')
    })
  }

  confirmarCalificacionFinca(solicitud: Solicitud) {
    const calificacion: CalifFincaCreateDTO = {
      puntuacion: this.puntuacion,
      comentario: this.comentario,
      idFinca: solicitud.idFinca
    }
    this.califFincaService.saveCalificacion(calificacion)
      .then(savedCalif => {
        console.log('Calificacion creada con exito')
      })
  }

  async confirmarCalificacionAdmin(solicitud: Solicitud) {
    const idFinca = solicitud.idFinca
    if(idFinca != null) {
      this.finca = await this.fincaService.getFincaPorId(idFinca);
    }
    
    const calificacion: CalifAdminCreateDTO = {
      puntuacion: this.puntuacion2,
      comentario: this.comentario2,
      idAdministrador: this.finca.idAdministrador
    }
    this.califAdminService.saveCalificacion(calificacion)
      .then(savedCalif => {
        console.log('Calificacion creada con exito')
      })
  }

  cargarBancos() {
    this.bancoService.getBancos()
      .then((data: Banco[]) => {
        this.bancos = data;
        console.log('se obtuvieron los bancos', data)
      })
      .catch((error) => {
        console.error('Error cargando bancos', error);
      });
  }
}
