import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../../services/productService/product.service';
import { ProductDTO } from '../../../../../dtos/productDTO';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ConfirmDialogueComponent } from '../../../../../components/confirm-dialogue/confirm-dialogue.component';
import { SessionManagementService } from '../../../../../services/sessionManagementService/session-management.service';
import { SuccessNotificationComponent } from "../../../../../components/success-notification/success-notification.component";

@Component({
  selector: 'app-products',
  imports: [CommonModule, ConfirmDialogueComponent, SuccessNotificationComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  public showConfirmDialogue: boolean = false;
  private productToDelete: string | null = null;

  public displaySuccess: boolean = false;

  public products: ProductDTO[] = [];
  constructor(private productService: ProductService, private router: Router, private session: SessionManagementService) { }

  ngOnInit() {

    this.productService.GetUserProducts().subscribe((response: HttpResponse<any>) => {
      this.products = response.body;
    })

  }

  navigateToCreateProducts() {
    this.router.navigate(['/business/products/create']);
  }

  navigateToProductDetails(productId: string) {
    this.router.navigate(["/business/products", productId]);
  }

  navigateToEditProduct(productId: string) {
    this.router.navigate(["/business/products/edit", productId]);
  }

  openConfirmDialogue(productId: string) {
    this.showConfirmDialogue = true;
    this.productToDelete = productId;
  }

  handleDialogResponse(response: boolean) {
    this.showConfirmDialogue = false;

    if (response && this.productToDelete) {
      this.DeleteProduct(this.productToDelete);
    }
  }

  DeleteProduct(id: string) {
    this.productService.DeleteProduct(id).subscribe((response) => {
      if(response.status == 200 ||  response.status == 204){
      this.products = this.products.filter(product => product.id != id)}
    }, (error) => {
      console.error("An error occured while deleting the product: ", error)
      //display error-notificatiom component
    });
  }
}

