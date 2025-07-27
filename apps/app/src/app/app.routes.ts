import { Route } from '@angular/router';
import { AnimalsComponent } from '@my-favorite-animals/animals';

export const appRoutes: Route[] = [
  // {
  //   path: '',
  //   pathMatch: 'full',
  //   loadChildren: () => import('@my-favorite-animals/dashboard').then((m) => m.routes),
  // },
  {
    path: '',
    pathMatch: 'full',
    component: AnimalsComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
