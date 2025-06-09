import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../../services/productService/product.service';
import { ProductDTO } from '../../../../../dtos/productDTO';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../../../services/categoryService/category.service';
import { CategoryDTO } from '../../../../../dtos/categoryDTO';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { ErrorNotificationComponent } from '../../../../../components/error-notification/error-notification.component';
import { SessionManagementService } from '../../../../../services/sessionManagementService/session-management.service';
import { CategorySelectorComponent } from "../../../../../components/category-selector/category-selector.component";

@Component({
  selector: 'app-create-product',
  imports: [CommonModule, FormsModule, ErrorNotificationComponent, CategorySelectorComponent],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit {

  displayError: boolean = false;

  isDropdownOpen: boolean = false;
  selectedCategory: any = null;

  product: ProductDTO = new ProductDTO();
  categories: CategoryDTO[] = [];

  constructor(private router: Router, private productService: ProductService, private categoryService: CategoryService, private session: SessionManagementService) {
  }

  ngOnInit() {
    this.categoryService.GetAllCategories().subscribe((response: HttpResponse<any>) => {
      this.categories = response.body
    });
  }

  async CreateProduct(product: ProductDTO){

    // I need to have some form control and some control in the backend too -> and empty product cant be valid.
    this.productService.CreateProduct(product).subscribe((response: HttpResponse<any>) => {
      if (response.status == 200 || response.status == 201 || response.status != null) {
        this.router.navigate(["/business"]);
      }
    },
      (error) => {
        console.error(error);
        this.displayError = true;
      });

  }

  ProductValid(product: ProductDTO): boolean{
    if (product.name){
      return true;
    }
    return false;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen
  }

  selectCategory(event: any): void {
    const selectedCategory = this.categories.find(category => category.name === event.target.value);
    if (selectedCategory && !this.product.categories.includes(selectedCategory)) {
      this.product.categories.push(selectedCategory);
    }

  }

  removeCategory(selectCategory: CategoryDTO): void {
    this.product.categories = this.product.categories.filter(category => category !== selectCategory);
  }

}
