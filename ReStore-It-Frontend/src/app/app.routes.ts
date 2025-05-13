import { Routes } from '@angular/router';
import { ProductsComponent } from './@layouts/business/pages/Products/products/products.component';
import { ProductDetailsComponent } from './@layouts/business/pages/Products/product-details/product-details.component';
import { CreateProductComponent } from './@layouts/business/pages/Products/create-product/create-product.component';
import { GuestHomeComponent } from './@layouts/guest/pages/guest-home/guest-home.component';
import { BusinessLayoutComponent } from './@layouts/business/business-layout/business-layout.component';
import { EditProductComponent } from './@layouts/business/pages/Products/edit-product/edit-product.component';
import { GuestLayoutComponent } from './@layouts/guest/guest-layout/guest-layout.component';
import { GuestProductPageComponent } from './@layouts/guest/pages/guest-product-page/guest-product-page.component';
import { UserRegistrationComponent } from './@layouts/business/pages/User/user-registration/user-registration.component';
import { UserLoginComponent } from './@layouts/business/pages/User/user-login/user-login.component';

export const routes: Routes = [
  {
    path: 'business', component: BusinessLayoutComponent, children:
      [
        { path: "", component: ProductsComponent, pathMatch: "full" },
        { path: "products/create", component: CreateProductComponent },
        { path: "products/:id", component: ProductDetailsComponent },
        { path: "products/edit/:id", component: EditProductComponent },
        { path: "register", component: UserRegistrationComponent},
        { path: "login", component: UserLoginComponent}]
  },

  //research what authentication tokens i can use in this routes.ts file
  //like that I can easily do if(!businessUser) redirect to everything guest related

];
