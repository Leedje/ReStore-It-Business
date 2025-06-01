import { HttpInterceptorFn } from '@angular/common/http';
import { backendApiUrl } from '../app.config';

export const apiInterceptor: HttpInterceptorFn = (request, next) => {
  const token = sessionStorage.getItem("token");

  const backendRequest = request.clone({
    url: request.url.startsWith('http') ? request.url : `${backendApiUrl}${request.url}`,
    setHeaders:  token ? { Authorization: `Bearer ${token}` } : {}
  });

  return next(backendRequest);
};
