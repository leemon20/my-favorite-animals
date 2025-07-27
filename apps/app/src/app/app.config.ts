import {
  ApplicationConfig,
  isDevMode,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { AnimalsState } from '@my-favorite-animals/animals';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { withNgxsRouterPlugin } from '@ngxs/router-plugin';
import { provideStore } from '@ngxs/store';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideStore(
      [AnimalsState],
      withNgxsLoggerPlugin({ logger: console, collapsed: false, disabled: !isDevMode() }),
      withNgxsReduxDevtoolsPlugin({ disabled: !isDevMode() }),
      withNgxsRouterPlugin(),
    ),
    provideRouter(appRoutes, withComponentInputBinding()),
  ],
};
