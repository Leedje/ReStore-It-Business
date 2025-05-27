import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionManagementService {

  private token = "";

  constructor() { }

  setSession(token: string): void{
    this.token = token;
    localStorage.setItem("token", token)
  }

  getSession(): any | null {
    const session = localStorage.getItem(this.token);
    return session ? JSON.parse(session) : null;
  }

  endSession(): void {
    localStorage.removeItem(this.token);
  }

  isAuthenticated(): boolean {
    return !!this.getSession();
  }

  handleSessionExpiry(): void {
    // research how to implement session expiry for extra security
  }

}
