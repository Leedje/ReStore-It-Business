import { Component, OnInit, Optional } from '@angular/core';
import { ProductDTO } from '../../../../../dtos/productDTO';
import { ProductService } from '../../../../../services/productService/product.service';
import { producerAccessed } from '@angular/core/primitives/signals';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SessionManagementService } from '../../../../../services/sessionManagementService/session-management.service';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  constructor(private productService: ProductService, private urlRoute: ActivatedRoute, private session: SessionManagementService) {
  }

  public product: Partial<ProductDTO> = {};

  ngOnInit() {
    const productId = this.urlRoute.snapshot.paramMap.get('id');
    if (productId) {
      const userId = this.session.getSession().id as String
      this.productService.GetProductByUserID(productId, userId).subscribe((response: Partial<ProductDTO>) => {
        this.product = response;
      },
        (error) => {
          console.error(error)
        });
    }
    else {
      console.error("No product ID found in route.")
    }
  }
}
