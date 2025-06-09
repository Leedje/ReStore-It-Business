import { ProductDTO } from "./productDTO";

export class OrderDTO{
  id: string = '';
  products: ProductDTO[] = [];
  isComplete: boolean = false;
  firstName: string = '';
  lastName: string = '';
  phone: string = '';
  email: string = '';
  address: string = '';
  paymentMethod: string = '';
}
