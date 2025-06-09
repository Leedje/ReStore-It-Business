import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDTO } from '../../dtos/orderDTO';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  GetPendingOrders(): Observable<HttpResponse<any>>{
    return this.http.get<HttpResponse<any>>(`/order/business/pending`, { observe: 'response' });
  }

  SetOrderAsComplete(order: OrderDTO): Observable<HttpResponse<any>>{
    return this.http.post<HttpResponse<any>>(`/order/business/iscomplete`, order, { observe: 'response' });
  }

  GetCompletedOrders(): Observable<HttpResponse<any>> {
    return this.http.get<HttpResponse<any>>(`/order/business/completed`, { observe: 'response' });
  }
}
