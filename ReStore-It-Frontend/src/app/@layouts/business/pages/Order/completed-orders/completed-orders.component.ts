import { Component, OnInit } from '@angular/core';
import { OrderDTO } from '../../../../../dtos/orderDTO';
import { Router } from '@angular/router';
import { OrderService } from '../../../../../services/orderService/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-completed-orders',
  imports: [CommonModule],
  templateUrl: './completed-orders.component.html',
  styleUrl: './completed-orders.component.css'
})
export class CompletedOrdersComponent implements OnInit{

  completedOrders: OrderDTO[] = [];

  constructor(private router: Router, private orderService: OrderService) {

  }

  ngOnInit(): void {
    this.orderService.GetCompletedOrders().subscribe(response => {
      this.completedOrders = response.body;
    });
  }

  navigateToPendingOrders(): void{
    this.router.navigate(['/business/orders/pending']);
  }

  calculateTotalProfit(order: OrderDTO): number {
    return order.products.reduce((total, product) => total + product.price, 0);
  }

}
