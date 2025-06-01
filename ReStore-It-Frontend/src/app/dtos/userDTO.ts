import { ProductDTO } from "./productDTO"

export class UserDTO{
  id: string;
  name: string;
  email: string;
  password: string;

  constructor() {
    this.id = '';
    this.name = '';
    this.email = '';
    this.password = '';
  }
}
