import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonMonthComponent } from './person-month.component';

describe('PersonMonthComponent', () => {
  let component: PersonMonthComponent;
  let fixture: ComponentFixture<PersonMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
