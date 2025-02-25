import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'heroes', pathMatch: 'full' },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes-routing.module').then((m) => m.heroesRoutes),
  },
];
