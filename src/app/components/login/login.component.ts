import { Component } from '@angular/core';
import { AdminServiceService } from '../../services/admin-service.service';
import { CommonModule } from '@angular/common';
import { ArrendadorService } from '../../services/arrendador.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  title = 'login'
  type = ''
  email = ''
  contrasena = ''

  constructor(
    private adminService: AdminServiceService,
    private arrendadorService: ArrendadorService,
    private router: Router
  ){}

  onSubmit() {
    if (this.type === 'arrendador') {
      // Si el tipo de cuenta es 'arrendador', ejecutar lógica de arrendador
      this.arrendadorService.login(this.email, this.contrasena)
      .then(response => {
        console.log('Arrendador autenticado:', response);
        this.router.navigate(['/postloginArrendador']); // Redirigir a la página de arrendador
      })
        .catch(error => {
          alert('Error autenticando como arrendador: ' + error.message);
        });
    } else if (this.type === 'administrador') {
      // Si el tipo de cuenta es 'administrador', ejecutar lógica de administrador
      this.adminService.login(this.email, this.contrasena)
        .then(response => {
          console.log('Administrador autenticado:', response);
          this.router.navigate(['/postloginadmin']); // Redirigir a la página de arrendador
        })
        .catch(error => {
          alert('Error autenticando como administrador: ' + error.message);
        });
    } else {
      alert('Por favor seleccione un tipo de cuenta');
    }
  }

}
