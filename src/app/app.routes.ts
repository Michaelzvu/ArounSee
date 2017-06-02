import { Routes } from '@angular/router';
import { AboutComponent } from './about';
import { LoginComponent } from './login';

import { AuthGuard } from './_guards/auth.guard';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ArounseeNavComponent } from './arounsee-nav/arounsee-nav.component';

export const ROUTES: Routes = [
  { path: '',
    component: ArounseeNavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent }
    ]},
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**',    redirectTo: '' },
];
