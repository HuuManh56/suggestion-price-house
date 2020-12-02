import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillMonthComponent } from './bill-month.component';

describe('BillMonthComponent', () => {
  let component: BillMonthComponent;
  let fixture: ComponentFixture<BillMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
