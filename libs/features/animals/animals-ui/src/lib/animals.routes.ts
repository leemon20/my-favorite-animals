import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/animals/animals.page').then((m) => m.AnimalsPage),
    pathMatch: 'full',
  },
];
