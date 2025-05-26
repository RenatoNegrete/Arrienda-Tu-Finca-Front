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
      const id = usuario.id;       // <- el ID del usuario (viene de setId)
      const email = usuario.sub;    // <- el email (viene de setSubject)
     const nombre = usuario.nombre; // <- el nombre (viene de setClaims)

      console.log('ID:', id);
      console.log('Email:', email);
      console.log('Nombre:', nombre);
    }

}
verSolicitudes(){
    this.router.navigate(['/solicitudes']);
}
}
