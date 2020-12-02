import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerHouseComponent } from './manager-house.component';

describe('ManagerHouseComponent', () => {
  let component: ManagerHouseComponent;
  let fixture: ComponentFixture<ManagerHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
