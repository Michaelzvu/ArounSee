import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { AboutComponent } from './about';
import { LoginComponent } from './login';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';
import { AuthGuard } from './_guards/auth.guard';
import { RegisterComponent } from './register/register.component';

export const ROUTES: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home',  component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**',    redirectTo: '' },
];
