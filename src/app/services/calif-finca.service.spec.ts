import { TestBed } from '@angular/core/testing';

import { CalifFincaService } from './calif-finca.service';

describe('CalifFincaService', () => {
  let service: CalifFincaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalifFincaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
