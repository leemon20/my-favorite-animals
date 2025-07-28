import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/animals-list/animals-list.component').then((m) => m.AnimalsListComponent),
    pathMatch: 'full',
  },
];
