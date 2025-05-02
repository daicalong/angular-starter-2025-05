import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
      provideHttpClient(),
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(appRoutes),
    ]
  };
  
  

bootstrapApplication(AppComponent, appConfig);
