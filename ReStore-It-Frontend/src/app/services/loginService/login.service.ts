import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  ValidateLogin(email: string, password: string): Observable<HttpResponse<any>>{
    return this.http.get(`/business/login/validate`, { params: { email, password }, observe: 'response'});
  }
}
