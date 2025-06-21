import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../../services/productService/product.service';
import { ProductDTO } from '../../../../../dtos/productDTO';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../../../../services/categoryService/category.service';
import { CategoryDTO } from '../../../../../dtos/categoryDTO';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { ErrorNotificationComponent } from '../../../../../components/error-notification/error-notification.component';
import { SessionManagementService } from '../../../../../services/sessionManagementService/session-management.service';
import { CategorySelectorComponent } from "../../../../../components/category-selector/category-selector.component";

@Component({
  selector: 'app-create-product',
  //standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ErrorNotificationComponent, CategorySelectorComponent],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit {

  displayError: boolean = false;

  isDropdownOpen: boolean = false;
  selectedCategory: any = null;

  productForm: FormGroup;
  product: ProductDTO = new ProductDTO();
  categories: CategoryDTO[] = [];

  imageFile: File | null = null;


  constructor(private router: Router, private productService: ProductService, private categoryService: CategoryService, private session: SessionManagementService, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      size: ['', Validators.required],
      price: ['', Validators.required],
      categories: [[] as CategoryDTO[], Validators.required],
      })
  }

  ngOnInit() {
    this.categoryService.GetAllCategories().subscribe((response: HttpResponse<any>) => {
      this.categories = response.body
    });
  }

  async CreateProduct(){

    this.productForm.get('categories')?.setValue(this.product.categories);
    if(this.productForm.invalid || this.product.categories.length <= 0 || !this.imageFile) return;

    this.product = this.productForm.value;

    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(this.product)], { type: 'application/json' }));
    formData.append('image', this.imageFile);

    this.productService.CreateProduct(formData).subscribe((response: HttpResponse<any>) => {
      if (response.status == 200 || response.status == 201 || response.status != null) {
        this.router.navigate(["/business"],
          {
            state: { success: 'Product successfully created.' }
          });
      }
    },
      (error) => {
        console.error(error);
        this.displayError = true;
      });

  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen
  }

  required(field: string): boolean {
    const inputField = this.productForm.get(field);
    return inputField?.touched && inputField?.hasError('required') || false;
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
