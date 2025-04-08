import { Component } from '@angular/core';
import { Administrador } from '../../models/Administrador';
import { AdminServiceService } from '../../services/admin-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  

  title = 'login'
  datosAdministradores: Administrador[] = []

  constructor(
    private adminService: AdminServiceService
  ){}

}
