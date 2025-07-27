import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./animals/animals.component').then((m) => m.AnimalsComponent),
    pathMatch: 'full',
  },
];
