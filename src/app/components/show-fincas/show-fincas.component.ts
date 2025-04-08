import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Finca } from '../../models/Finca';
import { FincaService } from '../../services/finca.service';

@Component({
  selector: 'app-show-fincas',
  imports: [CommonModule],
  templateUrl: './show-fincas.component.html',
  styleUrl: './show-fincas.component.css'
})
export class ShowFincasComponent {

  datosFincas: Finca[] = []

  constructor(
    private fincaService: FincaService
  ){}

  ngOnInit() {
    this.cargarFincas()
  }

  cargarFincas() {
    this.fincaService.getFincas().then((data: Finca[]) => {
      this.datosFincas = data
    }).catch((error) => {
      console.error('Error fetching data:', error);
    })
  }

}
