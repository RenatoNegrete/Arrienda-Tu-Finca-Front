import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthServiceService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [ RouterModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isAuthenticated = false

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ){}

  ngOnInit() {
    this.isAuthenticated = this.authService.estaAutenticado();
  }

  onLoginClick() {
    if (this.isAuthenticated) {
      // Si está autenticado → cerrar sesión
      this.authService.logout();
      this.isAuthenticated = false;
      this.router.navigate(['/']);
    } else {
      // Si no está autenticado → ir a login
      this.router.navigate(['/login']);
    }
  }

}
