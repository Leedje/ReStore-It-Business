import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionManagementService {

  private sessionKey = "ReStoreIt_UserRole";
  
  constructor() { }

  setSession(userSession: any): void{
    localStorage.setItem(this.sessionKey, JSON.stringify(userSession))
  }

  getSession(): any | null {
    const session = localStorage.getItem(this.sessionKey);
    return session ? JSON.parse(session) : null;
  }

  endSession(): void {
    localStorage.removeItem(this.sessionKey);
  }

  isAuthenticated(): boolean {
    return !!this.getSession();
  }

  handleSessionExpiry(): void {
    // research how to implement session expiry for extra security
  }

}
