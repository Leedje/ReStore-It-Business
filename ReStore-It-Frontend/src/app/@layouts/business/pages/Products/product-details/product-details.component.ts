import { Component, OnInit, Optional } from '@angular/core';
import { ProductDTO } from '../../../../../dtos/productDTO';
import { ProductService } from '../../../../../services/productService/product.service';
import { producerAccessed } from '@angular/core/primitives/signals';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SessionManagementService } from '../../../../../services/sessionManagementService/session-management.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  constructor(private productService: ProductService, private urlRoute: ActivatedRoute, private session: SessionManagementService) {
  }

  public product: ProductDTO = new ProductDTO();

  ngOnInit() {
    const productId = this.urlRoute.snapshot.paramMap.get('id');
    
    if (productId) {
      this.productService.GetProductByUserID(productId).subscribe((response: HttpResponse<any>) => {
        if (response.status == 200) {
          this.product = response.body;
        }
        else {
          // eventually show 404 page
          console.error("No product ID found in route.")
        }
      },
        (error) => {
          console.error(error)
        });
    }
  }
}
