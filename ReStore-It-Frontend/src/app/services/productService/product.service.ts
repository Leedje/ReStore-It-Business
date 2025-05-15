import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductDTO} from '../../dtos/productDTO';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  //Guest Mapping ->  remove eventually
  GetAllProducts(): Observable<any>{
    return this.http.get<HttpResponse<any>>(`/products`);
  }

 GetProductByID(id: String){
   return this.http.get(`/products/${id}`);
  }

  //Business Mapping

  GetProductsByUserID(userId: String): Observable<any>{
    return this.http.get<HttpResponse<any>>(`/products/business/${userId}`);
  }

  GetProductByUserID(productId: String, userId: String): Observable<any>{
    return this.http.get<HttpResponse<any>>(`/products/business/${productId}/${userId}`);
  }

  CreateProduct(product: ProductDTO): Observable<HttpResponse<any>>{
    return this.http.post<HttpResponse<any>>(`/products/business/create`, product, { observe: 'response' });
  }

  DeleteProduct(id: String): Observable<HttpResponse<any>>{
    return this.http.delete<HttpResponse<any>>(`/products/business/delete/${id}`, { observe: 'response' });
  }

  EditProduct(product: ProductDTO): Observable<HttpResponse<any>>{
    return this.http.post<HttpResponse<any>>(`/products/business/edit`, product, { observe: 'response' });
  }

}
