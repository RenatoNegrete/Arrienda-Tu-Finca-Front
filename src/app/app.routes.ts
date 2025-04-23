import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ShowFincasComponent } from './components/show-fincas/show-fincas.component';
import { LandingComponent } from './components/landing/landing.component';
import { SignupComponent } from './components/signup/signup.component';
import { PostloginarrendadorComponent } from './components/postloginarrendador/postloginarrendador.component';
import { SolicitudesComponent } from './components/solicitudes/solicitudes.component';
import { PostloginadminComponent } from './components/postloginadmin/postloginadmin.component'; // Asegúrate de importar el componente correcto para el administrador

export const routes: Routes = [
    { path: '', component: LandingComponent},
    { path: 'fincas', component: ShowFincasComponent},
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'solicitudes', component: SolicitudesComponent },
    {path:'postloginArrendador' ,component: PostloginarrendadorComponent}, // Cambia esto por el nombre correcto de tu componente
    {path:'postloginadmin' ,component: PostloginadminComponent}, // Cambia esto por el nombre correcto de tu componente
];
