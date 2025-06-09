import { Routes } from '@angular/router';
import { ProductsComponent } from './@layouts/business/pages/Products/products/products.component';
import { ProductDetailsComponent } from './@layouts/business/pages/Products/product-details/product-details.component';
import { CreateProductComponent } from './@layouts/business/pages/Products/create-product/create-product.component';
import { BusinessLayoutComponent } from './@layouts/business/business-layout/business-layout.component';
import { EditProductComponent } from './@layouts/business/pages/Products/edit-product/edit-product.component';
import { UserRegistrationComponent } from './@layouts/business/pages/User/user-registration/user-registration.component';
import { UserLoginComponent } from './@layouts/business/pages/User/user-login/user-login.component';
import { businessAuthGuard } from './routeGuards/business-auth.guard';
import { ViewOrdersComponent } from './@layouts/business/pages/Order/view-orders/view-orders.component';
import { CompletedOrdersComponent } from './@layouts/business/pages/Order/completed-orders/completed-orders.component';
import { ChatListComponent } from './@layouts/business/pages/Chat/chat-list/chat-list.component';
import { ChatComponent } from './@layouts/business/pages/Chat/chat/chat.component';

export const routes: Routes = [
  { path: '', redirectTo: 'business', pathMatch: 'full', canMatch: [businessAuthGuard] },
  {
    path: 'business', component: BusinessLayoutComponent, children:
      [
        { path: "register", component: UserRegistrationComponent },
        { path: "login", component: UserLoginComponent },
        { path: "", component: ProductsComponent, canMatch: [businessAuthGuard]}, //if it start to act up, add pathMatch: prefix
        { path: "products/create", component: CreateProductComponent, canMatch: [businessAuthGuard] },
        { path: "products/:id", component: ProductDetailsComponent, canMatch: [businessAuthGuard] },
        { path: "products/edit/:id", component: EditProductComponent, canMatch: [businessAuthGuard] },
        { path: "orders/pending", component: ViewOrdersComponent, canMatch: [businessAuthGuard] },
        { path: "orders/completed", component: CompletedOrdersComponent, canMatch: [businessAuthGuard] },
        { path: "chats", component: ChatListComponent, canMatch: [businessAuthGuard] },
        { path: "chats/:chatRoomId", component: ChatComponent, canMatch: [businessAuthGuard] }
      ]
  },

];
