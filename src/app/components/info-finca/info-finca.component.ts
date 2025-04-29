import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Finca } from '../../models/Finca';
import { Foto } from '../../models/Foto';
import { Router } from '@angular/router';
import { FotoService } from '../../services/foto.service';
import { DepartamentoService } from '../../services/departamento.service';
import { MunicipioService } from '../../services/municipio.service';
import { isPlatformBrowser } from '@angular/common';
import { Departamento } from '../../models/Departamento';
import { Municipio } from '../../models/Municipio';

type FincaConFotos = Finca & { fotos: Foto[] };

@Component({
  selector: 'app-info-finca',
  imports: [],
  templateUrl: './info-finca.component.html',
  styleUrl: './info-finca.component.css'
})
export class InfoFincaComponent {

  fincaSeleccionada!: FincaConFotos
  departamento!: Departamento
  municipio!: Municipio

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: object,
    private fotoService: FotoService,
    private departamentoService: DepartamentoService,
    private municipioService: MunicipioService,
    private router: Router
  ){}

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const fincaGuardada = localStorage.getItem('fincaSeleccionada');
      if (fincaGuardada) {
        this.fincaSeleccionada = JSON.parse(fincaGuardada);
      }
    }
    if (this.fincaSeleccionada.idDepartamento !== null) {
      this.departamento = await this.departamentoService.getDepartamentoById(this.fincaSeleccionada.idDepartamento);
    } else {
      console.error('idDepartamento es null');
    }
    if (this.fincaSeleccionada.idMunicipio !== null) {
      this.municipio = await this.municipioService.getMunicipioById(this.fincaSeleccionada.idMunicipio);
    } else {
      console.error('idDepartamento es null');
    }
  }

  onSubmit() {
    this.router.navigate(['create-solicitud'])
  }

}
