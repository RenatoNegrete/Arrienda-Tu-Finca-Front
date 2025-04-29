import { TestBed } from '@angular/core/testing';

import { CalifAdminService } from './calif-admin.service';

describe('CalifAdminService', () => {
  let service: CalifAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalifAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
