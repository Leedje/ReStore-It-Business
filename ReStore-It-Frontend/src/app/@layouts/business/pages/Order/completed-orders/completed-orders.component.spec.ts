import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedOrdersComponent } from './completed-orders.component';
import { provideHttpClient } from '@angular/common/http';

describe('CompletedOrdersComponent', () => {
  let component: CompletedOrdersComponent;
  let fixture: ComponentFixture<CompletedOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedOrdersComponent],
      providers: [
        provideHttpClient()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
