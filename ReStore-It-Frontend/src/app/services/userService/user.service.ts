import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from '../../dtos/userDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  CreateUser(user: UserDTO): Observable<HttpResponse<any>>{
    return this.http.post<HttpResponse<any>>('/business/register', user, { observe: 'response' });
  }
}
