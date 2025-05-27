import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  ValidateLogin(email: string, password: string): Observable<any>{

    return this.http.post(`/business/login/validate`, { email, password }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }});
  }
}
