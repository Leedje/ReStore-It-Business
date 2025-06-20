import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessLayoutComponent } from './business-layout.component';
import { provideHttpClient } from '@angular/common/http';

describe('BusinessLayoutComponent', () => {
  let component: BusinessLayoutComponent;
  let fixture: ComponentFixture<BusinessLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessLayoutComponent],
      providers: [
        provideHttpClient()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BusinessLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
