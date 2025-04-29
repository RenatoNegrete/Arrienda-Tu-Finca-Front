import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { Finca } from '../../models/Finca';
import { Foto } from '../../models/Foto';
import { SolicitudCreateDTO } from '../../models/SolicitudCreateDTO';

type FincaConFotos = Finca & { fotos: Foto[] };

@Component({
  selector: 'app-create-solicitud',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-solicitud.component.html',
  styleUrl: './create-solicitud.component.css'
})
export class CreateSolicitudComponent {

  usuario: any
  fincaSeleccionada!: FincaConFotos;

  llegada!: string;
  salida!: string
  personas!: number

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: object,
    private solicitudService: SolicitudService,
    private authService: AuthServiceService,
    private router: Router
  ){}

  ngOnInit() {
    this.usuario = this.authService.obtenerUsuario()
    if (isPlatformBrowser(this.platformId)) {
      const fincaGuardada = localStorage.getItem('fincaSeleccionada');
      if (fincaGuardada) {
        this.fincaSeleccionada = JSON.parse(fincaGuardada);
      }
    }
  }

  onSubmit() {
    const solicitud: SolicitudCreateDTO = {
      fechallegada: new Date(this.llegada),
      fechasalida: new Date(this.salida),
      cantpersonas: this.personas,
      idArrendador: this.usuario.id,
      idFinca: this.fincaSeleccionada.id
    }
    this.solicitudService.saveSolicitud(solicitud)
      .then(savedSolicitud => {
        console.log('Solicitud guardada con exito', savedSolicitud)
        this.router.navigate(['/solicitudes'])
      }).catch(error => {
        console.error('Error al guardar la solicitud', error)
      })
  }

}
