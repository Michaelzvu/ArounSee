import { Routes } from '@angular/router';
import { AboutComponent } from './about';
import { LoginComponent } from './login';

import { AuthGuard } from './_guards/auth.guard';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ArounseeNavComponent } from './arounsee-nav/arounsee-nav.component';
import { TrainingComponent } from './training/training.component';
import { FeedListComponent } from './feed-list/feed-list.component';

import { FeedDetailsComponent } from './feed-details/feed-details.component';

export const ROUTES: Routes = [
  { path: '',
    component: ArounseeNavComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: FeedListComponent },
      { path: 'training', component: TrainingComponent },
      { path: 'about', component: AboutComponent },
      { path: 'details', component: FeedDetailsComponent },
    ]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**',    redirectTo: '' },
];
