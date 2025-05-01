import { ApplicationConfig, Component, provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig = {
    providers: [
      provideHttpClient(),
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(appRoutes),
    ]
  };
  
  

bootstrapApplication(AppComponent, appConfig);
