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
  {
    path: 'landing-pages/marmoraria',
    loadComponent: () =>
      import('./landing-pages/marmoraria/marmoraria.component').then(m => m.MarmorariaComponent),
  },
  {
    path: 'landing-pages/architect-saas',
    loadComponent: () =>
      import('./landing-pages/architect-saas/architect-saas.component').then(m => m.ArchitectSaasComponent),
  },
  {
    path: 'landing-pages/the-kinetic',
    loadComponent: () =>
      import('./landing-pages/the-kinetic/the-kinetic.component').then(m => m.TheKineticComponent),
  },
  {
    path: 'landing-pages/apex-kinetic',
    loadComponent: () =>
      import('./landing-pages/apex-kinetic/apex-kinetic.component').then(m => m.ApexKineticComponent),
  },
  {
    path: 'landing-pages/serenity-mind',
    loadComponent: () =>
      import('./landing-pages/serenity-mind/serenity-mind.component').then(m => m.SerenityMindComponent),
  },
];
