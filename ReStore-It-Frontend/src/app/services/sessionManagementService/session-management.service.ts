import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionManagementService {

  constructor() { }

  setSession(token: string): void{
    sessionStorage.setItem("token", token)
  }

  getSession(): any | null {
    return sessionStorage.getItem("token");
  }

  endSession(): void {
    sessionStorage.removeItem("token");
  }

  isAuthenticated(): boolean {
    return !!this.getSession();
  }

  handleSessionExpiry(): void {
    // research how to implement session expiry for extra security
  }

}
