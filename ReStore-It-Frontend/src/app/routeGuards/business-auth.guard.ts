import { CanMatchFn, Router } from '@angular/router';
import { SessionManagementService } from '../services/sessionManagementService/session-management.service';
import { inject } from '@angular/core';

export const businessAuthGuard: CanMatchFn = (route, segments) => {
 if( inject(SessionManagementService).isAuthenticated()){
  return true;
 }
  else{
    inject(Router).navigate(['/business/login']);
    return false;
  }
};
