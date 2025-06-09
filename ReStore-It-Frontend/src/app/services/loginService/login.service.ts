import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDTO } from '../../dtos/loginDTO';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  ValidateLogin(loginCredentials: LoginDTO): Observable<HttpResponse<any>>{
    return this.http.post<HttpResponse<any>>(`/business/login/validate`, loginCredentials, { observe: 'response' });
  }
}
