import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrdersComponent } from './view-orders.component';
import { OrderDTO } from '../../../../../dtos/orderDTO';
import { ProductDTO } from '../../../../../dtos/productDTO';
import { provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

describe('ViewOrdersComponent', () => {
  let component: ViewOrdersComponent;
  let fixture: ComponentFixture<ViewOrdersComponent>;

  let order: OrderDTO = new OrderDTO;
  let order2: OrderDTO = new OrderDTO;
  let orderList: OrderDTO[] = [];

  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeAll(async ()=> {
    order = {
      id: "12djh2-aj2e-uuah1",
      firstName: "First Name",
      lastName: "Last Name",
      products: [],
      phone: "+123456789",
      email: "example@gmail.com",
      address: "address, 1628EH, Country",
      paymentMethod: "Credit Card",
      isComplete: false
    }

    order2 = {
      id: "172haf2-0282e-swg61",
      firstName: "First Name",
      lastName: "Last Name",
      products: [],
      phone: "+123456789",
      email: "example@gmail.com",
      address: "address, 1628EH, Country",
      paymentMethod: "Credit Card",
      isComplete: false
    }

    orderList.concat(order, order2);

  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOrdersComponent],
      providers: [
        provideHttpClient(), { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open confirm completion dialogue', () => {
    //arrange
    spyOn(component, 'openConfirmDialogue').and.callThrough();

    //act
    component.openConfirmDialogue(order);

    //assert
    expect(component.openConfirmDialogue).toHaveBeenCalledWith(order);
    expect(component.showConfirmDialogue).toEqual(true);
  })

  it('should navigate to completed orders page', () => {
    //act
    component.navigateToCompletedOrders();

    //assert
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/business/orders/completed']);
  });

  it('should set order to complete', () => {
    //arrange
    spyOn(component, 'completeOrder').and.callThrough();
    component.pendingOrders = orderList;

    //act
    component.completeOrder(order);

    //assert
    expect(component.completeOrder).toHaveBeenCalledWith(order);

    expect(component.selectedOrder).toEqual(jasmine.any(OrderDTO));
    expect(component.pendingOrders).not.toContain(order);
  })

  it('should calculate the order profit', () => {
    // arrange
    order.products = [
      { name: 'Product A', price: 12 } as ProductDTO,
      { name: 'Product B', price: 28 } as ProductDTO
    ];

    //act
    component.calculateTotalProfit(order);

    //assert
    expect(component.calculateTotalProfit(order)).toEqual(40);
  })
});
