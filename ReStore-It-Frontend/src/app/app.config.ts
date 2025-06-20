import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideHttpClient, withInterceptors} from '@angular/common/http';

import { routes } from './app.routes';

const lazyInterceptor = () => import('./api/api.interceptor').then(m => m.apiInterceptor);

export const backendApiUrl = "http://localhost:8080";
export const webSocketUrl = "ws://localhost:8080/chat";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(withInterceptors([lazyInterceptor as any]))],
};
