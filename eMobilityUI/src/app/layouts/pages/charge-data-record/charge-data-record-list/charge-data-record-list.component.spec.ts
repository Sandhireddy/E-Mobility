import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeDataRecordListComponent } from './charge-data-record-list.component';

describe('ChargeDataRecordListComponent', () => {
  let component: ChargeDataRecordListComponent;
  let fixture: ComponentFixture<ChargeDataRecordListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChargeDataRecordListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeDataRecordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
