import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHouseFormComponent } from './manage-house-form.component';

describe('ManageHouseFormComponent', () => {
  let component: ManageHouseFormComponent;
  let fixture: ComponentFixture<ManageHouseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageHouseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHouseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
