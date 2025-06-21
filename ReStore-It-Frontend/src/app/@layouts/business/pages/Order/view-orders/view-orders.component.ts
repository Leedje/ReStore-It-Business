import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderDTO } from '../../../../../dtos/orderDTO';
import { OrderService } from '../../../../../services/orderService/order.service';
import { ConfirmDialogueComponent } from "../../../../../components/confirm-dialogue/confirm-dialogue.component";
import { SuccessNotificationComponent } from "../../../../../components/success-notification/success-notification.component";

@Component({
  selector: 'app-view-orders',
  imports: [CommonModule, ConfirmDialogueComponent, SuccessNotificationComponent],
  templateUrl: './view-orders.component.html',
  styleUrl: './view-orders.component.css'
})
export class ViewOrdersComponent implements OnInit{

  pendingOrders: OrderDTO[] = [];
  showConfirmDialogue = false;
  selectedOrder: OrderDTO = new OrderDTO();

  constructor(private router: Router, private orderService: OrderService) {

  }

  ngOnInit(): void {
    this.orderService.GetPendingOrders().subscribe(response => {
      this.pendingOrders = response.body;
    });
  }

  navigateToCompletedOrders(): void {
    this.router.navigate(['/business/orders/completed']);
  }

  openConfirmDialogue(order: OrderDTO): void {
    this.selectedOrder = order;
    this.showConfirmDialogue = true;
  }

  handleDialogResponse(response: boolean) {
    this.showConfirmDialogue = false;

    if (response && this.selectedOrder) {
      this.completeOrder(this.selectedOrder);
    }
  }

  completeOrder(selectedOrder: OrderDTO) {
    this.orderService.SetOrderAsComplete(selectedOrder).subscribe((response) => {
      if (response.status == 200 || response.status == 204) {
        this.pendingOrders = this.pendingOrders.filter(order => order.id != selectedOrder.id)
      }
    }, (error) => {
      console.error("An error occured while completing order: ", error)
      //display error-notificatiom component
    });
  }

  calculateTotalProfit(order: OrderDTO): number{
    return order.products.reduce((total, product) => total + product.price, 0);
  }
}
