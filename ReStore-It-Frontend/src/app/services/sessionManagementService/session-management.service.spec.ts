import { TestBed } from '@angular/core/testing';

import { SessionManagementService } from './session-management.service';
import { provideHttpClient } from '@angular/common/http';

describe('SessionManagementService', () => {
  let service: SessionManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionManagementService,
        provideHttpClient()
      ]
    });
    service = TestBed.inject(SessionManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
