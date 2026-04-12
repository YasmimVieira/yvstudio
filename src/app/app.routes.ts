import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'landing-pages',
    loadComponent: () =>
      import('./landing-pages/landing-pages.component').then(m => m.LandingPagesComponent),
  },
  {
    path: 'landing-pages/neapolitan-pilgrimage',
    loadComponent: () =>
      import('./landing-pages/neapolitan/neapolitan.component').then(m => m.NeapolitanComponent),
  },
];
