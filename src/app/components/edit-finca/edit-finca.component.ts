import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Departamento } from '../../models/Departamento';
import { Municipio } from '../../models/Municipio';
import { DepartamentoService } from '../../services/departamento.service';
import { MunicipioService } from '../../services/municipio.service';
import { FincaService } from '../../services/finca.service';
import { AuthServiceService } from '../../services/auth-service.service';
import { Finca } from '../../models/Finca';
import { Foto } from '../../models/Foto';
import { FotoCreateDTO } from '../../models/FotoCreateDTO';
import { FotoService } from '../../services/foto.service';

type FincaConFotos = Finca & { fotos: Foto[] };

@Component({
  selector: 'app-edit-finca',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-finca.component.html',
  styleUrl: './edit-finca.component.css'
})
export class EditFincaComponent {

    fincaSeleccionada!: FincaConFotos
    departamentos: Departamento[] = []
    municipios: Municipio[] = []
    usuario: any
  
    nombre = ''
    ingreso = ''
    descripcion = ''
    habitaciones = 0
    banos = 0
    mascotas = false
    piscina = false
    asador = false
    valor = 0

    imagen = ''

    departamentoSeleccionado: number | null = null;
    municipioSeleccionado: number | null = null;
  
    constructor(
      @Inject(PLATFORM_ID)
      private platformId: object,
      private departamentoService: DepartamentoService,
      private municipioService: MunicipioService,
      private fincaService: FincaService,
      private fotoService: FotoService,
      private authService: AuthServiceService,
      private router: Router
    ){}
  
    ngOnInit() {
      this.usuario = this.authService.obtenerUsuario()
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
      this.cargarDepartamentos()
      this.cargarMunicipios()
      this.nombre = this.fincaSeleccionada.nombre
      this.ingreso = this.fincaSeleccionada.tipoIngreso
      this.descripcion = this.fincaSeleccionada.descripcion
      this.habitaciones = this.fincaSeleccionada.habitaciones
      this.banos = this.fincaSeleccionada.banos
      this.mascotas = this.fincaSeleccionada.mascotas
      this.piscina = this.fincaSeleccionada.piscina
      this.asador = this.fincaSeleccionada.asador
      this.valor = this.fincaSeleccionada.valorNoche
      this.departamentoSeleccionado = this.fincaSeleccionada.idDepartamento
      this.municipioSeleccionado = this.fincaSeleccionada.idMunicipio
    }

      onSubmit() {
        const finca: Finca = {
          id: this.fincaSeleccionada.id,
          nombre: this.nombre,
          tipoIngreso: this.ingreso,
          descripcion: this.descripcion,
          habitaciones: this.habitaciones,
          banos: this.banos,
          mascotas: this.mascotas,
          piscina: this.piscina,
          asador: this.asador,
          valorNoche: this.valor,
          idAdministrador: this.usuario.id,
          idDepartamento: this.departamentoSeleccionado,
          idMunicipio: this.municipioSeleccionado
        };
      
        this.fincaService.updateFinca(finca)
          .then(savedFinca => {
            console.log('Finca guardada con éxito:', savedFinca);
            this.router.navigate(['/showfincasadmin']); // <-- Opcional, si quieres redirigir
          })
          .catch(error => {
            console.error('Error al guardar la finca:', error);
            // Aquí podrías mostrar un mensaje de error al usuario
          });
      }

    cargarDepartamentos() {
      this.departamentoService.getDepartamentos()
        .then((data: Departamento[]) => {
          this.departamentos = data;
        })
        .catch((error) => {
          console.error('Error cargando departamentos', error);
        });
    }
  
    cargarMunicipios() {
      this.municipioService.getMunicipios()
        .then((data: Municipio[]) => {
          this.municipios = data;
        })
        .catch((error) => {
          console.error('Error cargando municipios', error);
        });
    }

    onImagen() {
      const imagen: FotoCreateDTO = {
        imagenUrl: this.imagen,
        idFinca: this.fincaSeleccionada.id
      }
      this.fotoService.saveFoto(imagen)
        .then(savedFoto => {
          console.log('Foto guardada con exito')
        })
        .catch(error => {
          console.error('Error al guardar la foto')
        })
    }

}
