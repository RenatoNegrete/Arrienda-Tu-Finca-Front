import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-postloginadmin',
  imports: [],
  templateUrl: './postloginadmin.component.html',
  styleUrl: './postloginadmin.component.css'
})
export class PostloginadminComponent {
  constructor(private router: Router) {}

  vermisFincas() {
    this.router.navigate(['/fincas']);

}
verSolicitudes(){
    this.router.navigate(['/solicitudes']);
}
}
