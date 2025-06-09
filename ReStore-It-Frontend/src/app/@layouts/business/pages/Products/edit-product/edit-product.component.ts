import { Component, OnInit } from '@angular/core';
import { ProductDTO } from '../../../../../dtos/productDTO';
import { CategoryDTO } from '../../../../../dtos/categoryDTO';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../../services/productService/product.service';
import { CategoryService } from '../../../../../services/categoryService/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';
import { CategorySelectorComponent } from "../../../../../components/category-selector/category-selector.component";

@Component({
  selector: 'app-edit-product',
  imports: [CommonModule, FormsModule, CategorySelectorComponent],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {

  product: ProductDTO = new ProductDTO();
  categories: CategoryDTO[] = [];

  constructor(private productService: ProductService, private categoryService: CategoryService, private urlRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.categoryService.GetAllCategories().subscribe((response: HttpResponse<any>) => {
      this.categories = response.body
    });

    const id = this.urlRoute.snapshot.paramMap.get('id');
    if (id) {
      this.productService.GetProductByUserID(id).subscribe((response: HttpResponse<any>) => {
        this.product = response.body;
      },
        (error) => {
          this.router.navigate(["/business/products"], error)
        });
    }
    else {
      console.error("No id was obtained while initializing Edit Product.")
    }
  }

  EditProduct() {

    this.productService.EditProduct(this.product).subscribe((response: HttpResponse<any>) =>{
      if(response.status == 204){
        this.router.navigate(['/business']);
        //display success message on home page
      }
    },
  (error) => {
    //display error
  })
  }

}
