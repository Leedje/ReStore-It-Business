import { CategoryDTO } from "./categoryDTO";

export class ProductDTO{
  id: string;
  image: string;
  name: string;
  description?: string;
  size: string;
  price: number;
  categories: CategoryDTO[];
  seller: string;

  constructor() {
    this.id ='';
    this.image = '';
    this.name = '';
    this.description = 'N/A';
    this.size = '';
    this.price = 1.00;
    this.categories = [];
    this.seller = '';
  }
}
