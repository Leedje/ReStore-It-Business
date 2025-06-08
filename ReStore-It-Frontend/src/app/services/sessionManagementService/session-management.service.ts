import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionManagementService {

  constructor() { }

  setSession(token: string): void{
    sessionStorage.setItem("token", token);
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

  getUsernameFromSession(): string | null {
    const token = this.getSession();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.sub;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }


  handleSessionExpiry(): void {
    // research how to implement session expiry for extra security
  }

}
