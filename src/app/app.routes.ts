import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ShowFincasComponent } from './components/show-fincas/show-fincas.component';
import { LandingComponent } from './components/landing/landing.component';

export const routes: Routes = [
    { path: '', component: LandingComponent},
    { path: 'fincas', component: ShowFincasComponent},
    { path: 'login', component: LoginComponent}
];
