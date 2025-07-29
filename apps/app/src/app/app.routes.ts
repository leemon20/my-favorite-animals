import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    pathMatch: 'prefix',
    loadChildren: () => import('@my-favorite-animals/dashboard').then((m) => m.routes),
  },
  {
    path: 'animals',
    pathMatch: 'prefix',
    loadChildren: () => import('@my-favorite-animals/animals-ui').then((m) => m.routes),
  },
  {
    path: '**',
    loadComponent: () => import('@my-favorite-animals/ui').then((m) => m.ErrorPage),
  },
];
