import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { HashLocationStrategy } from '@angular/common';

export const appConfig: ApplicationConfig = {
 
  providers: [provideRouter(routes, withHashLocation())]
};
