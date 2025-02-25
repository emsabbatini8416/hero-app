import { Routes } from '@angular/router';

export const heroesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./hero-list/hero-list.component').then((m) => m.HeroListComponent),
  },
  {
    path: 'create',
    loadComponent: () => import('./hero-form/hero-form.component').then((m) => m.HeroFormComponent),
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./hero-form/hero-form.component').then((m) => m.HeroFormComponent),
  },
];
