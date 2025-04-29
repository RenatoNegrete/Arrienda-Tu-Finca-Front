import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { InfoFincaComponent } from '../info-finca/info-finca.component';
import { Finca } from '../../models/Finca';
import { Foto } from '../../models/Foto';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Solicitud } from '../../models/Solicitud';
import { SolicitudService } from '../../services/solicitud.service';
import { FincaService } from '../../services/finca.service';
import { FormsModule } from '@angular/forms';
import { CalifArrendadorCreateDTO } from '../../models/CalifArrendadorCreateDTO';
import { CalifArrendadorService } from '../../services/calif-arrendador.service';

type FincaConFotos = Finca & { fotos: Foto[] };

@Component({
  selector: 'app-detalle-finca-admin',
  imports: [InfoFincaComponent, CommonModule, FormsModule],
  templateUrl: './detalle-finca-admin.component.html',
  styleUrl: './detalle-finca-admin.component.css'
})
export class DetalleFincaAdminComponent {

  fincaSeleccionada!: FincaConFotos

    solicitudes: Solicitud[] = [];
    solicitudesFiltradas: Solicitud[] = [];
    estadoActual: string = 'porAceptar';

    solicitudConFormularioPagoId: number | null = null;

    puntuacion: number = 0
    comentario: string = ''

    estadoMap: { [key: number]: string } = { 
      0: 'porAceptar',
      1: 'aceptadas',
      2: 'rechazadas',
      3: 'pagadas',
      5: 'porCalificar',
      6: 'finalizadas'
    };

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: object,
    private solicitudService: SolicitudService,
    private fincaService: FincaService,
    private califService: CalifArrendadorService,
    private router: Router
  ){}

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const fincaGuardada = localStorage.getItem('fincaSeleccionada');
      if (fincaGuardada) {
        try {
          this.fincaSeleccionada = JSON.parse(fincaGuardada);
        } catch (error) {
          console.error('Error al parsear fincaSeleccionada:', error);
        }
      } else {
        console.error('No se encontró fincaSeleccionada en localStorage');
      }
    }
    this.obtenerSolicitudes();
  }

  obtenerSolicitudes(): void {
    this.solicitudService.getSolicitudesByFinca(this.fincaSeleccionada.id).then(data => {
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
    this.solicitudConFormularioPagoId = solicitud.id;
  }

  confirmarCalificacion(solicitud: Solicitud) {
      const calificacion: CalifArrendadorCreateDTO = {
        puntuacion: this.puntuacion,
        comentario: this.comentario,
        idArrendador: solicitud.idArrendador
      }
      this.califService.saveCalificacion(calificacion)
        .then(savedCalif => {
          console.log('Calificacion creada con exito')
          solicitud.estado = 6
          this.solicitudService.actualizarSolicitud(solicitud).then(() => {
            this.solicitudConFormularioPagoId = null
            this.obtenerSolicitudes()
          }).catch(error => {
            console.error('Error al guardar la calificacion')
          })
        })
    }

  onDelete() {
    this.fincaService.deleteFinca(this.fincaSeleccionada.id)
    console.log('Finca eliminada con exito')
    this.router.navigate(['showfincasadmin'])
  }

}
