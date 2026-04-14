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
  {
    path: 'landing-pages/kazaplan',
    loadComponent: () =>
      import('./landing-pages/kazaplan/kazaplan.component').then(m => m.KazaPlanComponent),
  },
  {
    path: 'landing-pages/vantage-legal',
    loadComponent: () =>
      import('./landing-pages/vantage-legal/vantage-legal.component').then(m => m.VantageLegalComponent),
  },
  {
    path: 'landing-pages/apex-law',
    loadComponent: () =>
      import('./landing-pages/apex-law/apex-law.component').then(m => m.ApexLawComponent),
  },
];
