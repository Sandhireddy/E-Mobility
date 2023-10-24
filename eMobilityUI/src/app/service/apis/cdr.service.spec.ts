import { TestBed } from '@angular/core/testing';

import { CdrService } from './cdr.service';

describe('CdrService', () => {
  let service: CdrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CdrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
