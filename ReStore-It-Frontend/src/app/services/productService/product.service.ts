import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductDTO} from '../../dtos/productDTO';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  GetUserProducts(): Observable<HttpResponse<any>>{
    return this.http.get(`/products/business`, { observe: 'response' });
  }

  GetProductByUserID(productId: string): Observable<HttpResponse<any>>{
    return this.http.get<HttpResponse<any>>(`/products/business/${productId}`, { observe: 'response' });
  }

  CreateProduct(product: ProductDTO): Observable<HttpResponse<any>>{
    return this.http.post<HttpResponse<any>>(`/products/business/create`, product, { observe: 'response' });
  }

  DeleteProduct(id: string): Observable<HttpResponse<any>>{
    return this.http.delete<HttpResponse<any>>(`/products/business/delete/${id}`, { observe: 'response' });
  }

  EditProduct(product: ProductDTO): Observable<HttpResponse<any>>{
    return this.http.put<HttpResponse<any>>(`/products/business/edit`, product, { observe: 'response' });
  }

}
