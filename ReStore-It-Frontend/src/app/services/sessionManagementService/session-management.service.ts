import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionManagementService {

  private sessionKey = "ReStoreIt_UserRole";
  //I realized that having the same session key for everyone is not secure,
  // everyone needs a unique session key to have their private sessions
  //Put this discovery in my research report :)

  constructor() { }

  //my session data is the user itself
  setSession(sessionData: any): void{
    localStorage.setItem(this.sessionKey, JSON.stringify(sessionData))
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
