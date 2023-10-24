import { TestBed } from '@angular/core/testing';

import { TableExtendedActionsService } from './table-extended-actions.service';

describe('TableExtendedActionsService', () => {
  let service: TableExtendedActionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableExtendedActionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
