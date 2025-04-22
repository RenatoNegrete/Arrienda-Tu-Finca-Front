import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postloginarrendador',
  imports: [],
  templateUrl: './postloginarrendador.component.html',
  styleUrl: './postloginarrendador.component.css'
})
export class PostloginarrendadorComponent {
  constructor(private router: Router) {}
  
  verFincas() {
    this.router.navigate(['/fincas']);
  }
}
