import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminServiceService } from '../../services/admin-service.service';
import { ArrendadorService } from '../../services/arrendador.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ CommonModule, FormsModule, RouterModule ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  title = 'signup'
  nombre = ''
  apellido = ''
  telefono = ''
  type = ''
  email = ''
  contrasena = ''

  constructor(
      private adminService: AdminServiceService,
      private arrendadorService: ArrendadorService
    ){}
  
    onSubmit() {
      if (this.type === 'arrendador') {
        // Si el tipo de cuenta es 'arrendador', ejecutar lógica de arrendador
        this.arrendadorService.login(this.email, this.contrasena)
          .then(response => {
            console.log('Arrendador autenticado:', response);
            // Redirigir o guardar en sesión/localStorage según sea necesario
          })
          .catch(error => {
            alert('Error autenticando como arrendador: ' + error.message);
          });
      } else if (this.type === 'administrador') {
        // Si el tipo de cuenta es 'administrador', ejecutar lógica de administrador
        this.adminService.login(this.email, this.contrasena)
          .then(response => {
            console.log('Administrador autenticado:', response);
            // Redirigir o guardar en sesión/localStorage según sea necesario
          })
          .catch(error => {
            alert('Error autenticando como administrador: ' + error.message);
          });
      } else {
        alert('Por favor seleccione un tipo de cuenta');
      }
    }

}
