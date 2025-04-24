import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Finca } from '../../models/Finca';
import { FincaService } from '../../services/finca.service';

@Component({
  selector: 'app-show-fincas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-fincas.component.html',
  styleUrls: ['./show-fincas.component.css']
})
export class ShowFincasComponent implements OnInit {
  datosFincas: Finca[] = [];

  constructor(private fincaService: FincaService) {}

  ngOnInit() {
    this.cargarFincas();
  }

  cargarFincas() {
    this.fincaService.getFincas().then((data: Finca[]) => {
      this.datosFincas = data;
    }).catch((error) => {
      console.error('Error fetching data:', error);
    });
  }

  getImageUrl(idFoto: number | null): string {
    // Si tienes un servicio real de imágenes, ajusta esta ruta
    return idFoto ? `http://10.43.103.211/api/foto/${idFoto}` : 'https://via.placeholder.com/150';
  }
}
