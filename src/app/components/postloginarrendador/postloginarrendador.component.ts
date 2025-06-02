import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-postloginarrendador',
  imports: [],
  templateUrl: './postloginarrendador.component.html',
  styleUrl: './postloginarrendador.component.css'
})
export class PostloginarrendadorComponent {
  constructor(private router: Router, private authService: AuthServiceService) {}
  
  verFincas() {
    this.router.navigate(['/showfincasadmin']);
    const usuario = this.authService.obtenerUsuario();

    if (usuario) {
      console.log(usuario)
    }

  }
}
