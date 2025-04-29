import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DepartamentoService } from '../../services/departamento.service';
import { MunicipioService } from '../../services/municipio.service';
import { Departamento } from '../../models/Departamento';
import { Municipio } from '../../models/Municipio';
import { FincaCreateDTO } from '../../models/FincaCreateDTO';
import { AuthServiceService } from '../../services/auth-service.service';
import { FincaService } from '../../services/finca.service';

@Component({
  selector: 'app-create-finca',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './create-finca.component.html',
  styleUrl: './create-finca.component.css'
})
export class CreateFincaComponent {

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

  departamentoSeleccionado: number | null = null;
  municipioSeleccionado: number | null = null;

  constructor(
    private departamentoService: DepartamentoService,
    private municipioService: MunicipioService,
    private fincaService: FincaService,
    private authService: AuthServiceService,
    private router: Router
  ){}

  ngOnInit() {
    this.usuario = this.authService.obtenerUsuario()
    this.cargarDepartamentos()
    this.cargarMunicipios()
  }

  onSubmit() {
    const finca: FincaCreateDTO = {
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
  
    this.fincaService.saveFinca(finca)
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

}
