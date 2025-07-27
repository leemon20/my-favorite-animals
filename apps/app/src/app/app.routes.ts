import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('@my-favorite-animals/dashboard').then((m) => m.routes),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
