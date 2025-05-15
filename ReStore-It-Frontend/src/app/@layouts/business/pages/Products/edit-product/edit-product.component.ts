import { Component, OnInit } from '@angular/core';
import { ProductDTO } from '../../../../../dtos/productDTO';
import { CategoryDTO } from '../../../../../dtos/categoryDTO';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../../services/productService/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {

  product: Partial<ProductDTO> = {};

  constructor(private productService: ProductService, private urlRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    const id = this.urlRoute.snapshot.paramMap.get('id');
    if (id) {
      this.productService.GetProductByID(id).subscribe((response) => {
        this.product = response;
      },
        (error) => {
          this.router.navigate(["/business/products"], error) //send the error and display error notifcation
        });
    }
    else {
      console.error("No id was obtained while initializing Edit Product.")
    }
  }

  EditProduct(newProduct: ProductDTO) {
    this.productService.EditProduct(newProduct);
  }
}
