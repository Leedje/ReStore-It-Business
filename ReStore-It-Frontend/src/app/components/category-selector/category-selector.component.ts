import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CategoryDTO } from '../../dtos/categoryDTO';
import { CategoryService } from '../../services/categoryService/category.service';
import { ProductDTO } from '../../dtos/productDTO';
import { FormsModule } from '@angular/forms';
import { UserDTO } from '../../dtos/userDTO';

@Component({
  selector: 'app-category-selector',
  imports: [CommonModule, FormsModule],
  templateUrl: './category-selector.component.html',
  styleUrl: './category-selector.component.css'
})

export class CategorySelectorComponent {

  @Input() product: ProductDTO = {
    id: '',
    image: '',
    name: '',
    description: '',
    size: '',
    seller: '',
    categories: [],
    price: 1,
    numberOfProducts: 1,
    user: { id: ''}
  }
  
  @Input() isDropdownOpen: Boolean = false;
  @Input() categories: CategoryDTO[] = [];

  selectedCategory: any;

  constructor(private categoryService: CategoryService) {
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
