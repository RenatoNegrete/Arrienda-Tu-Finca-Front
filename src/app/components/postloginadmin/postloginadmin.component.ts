import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';


@Component({
  selector: 'app-postloginadmin',
  imports: [],
  templateUrl: './postloginadmin.component.html',
  styleUrl: './postloginadmin.component.css'
})
export class PostloginadminComponent {
  constructor(private router: Router, private authService: AuthServiceService) {}

  vermisFincas() {
    this.router.navigate(['/fincas']);

    const usuario = this.authService.obtenerUsuario();

    if (usuario) {
      console.log(usuario)
    }

}
verSolicitudes(){
    this.router.navigate(['/solicitudes']);
}
}
