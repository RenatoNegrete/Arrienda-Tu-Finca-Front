import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Finca } from '../../models/Finca';
import { FincaService } from '../../services/finca.service';
@Component({
  selector: 'app-showfincasadmin',
  templateUrl: './showfincasadmin.component.html',
  styleUrls: ['./showfincasadmin.component.css'],
})
export class ShowfincasadminComponent implements OnInit {
  fincas: Finca[] = [];
  cargando: boolean = true;

  constructor(private fincaService: FincaService) {}

  ngOnInit(): void {
    this.cargarFincas();
  }

  cargarFincas(): void {
    this.fincaService.getFincas().then((data) => {
      this.fincas = data;
      this.cargando = false;
    });
  }

  editarFinca(id: number): void {
    // lógica para redireccionar o abrir modal
    console.log('Editar finca con id:', id);
  }

  verDetalle(id: number): void {
    // lógica para redireccionar o abrir modal
    console.log('Ver detalle de finca con id:', id);
  }

  anadirFinca(): void {
    // lógica para crear nueva finca
    console.log('Añadir nueva finca');
  }
}
