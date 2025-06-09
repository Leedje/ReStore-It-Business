import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

   GetAllCategories(): Observable<HttpResponse<any>>{
     return this.http.get<HttpResponse<any>>("/categories", { observe: 'response' });
  }
}
