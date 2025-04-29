import { TestBed } from '@angular/core/testing';

import { CalifArrendadorService } from './calif-arrendador.service';

describe('CalifArrendadorService', () => {
  let service: CalifArrendadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalifArrendadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
