import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoIndexComponent } from './user-info-index.component';

describe('UserInfoIndexComponent', () => {
  let component: UserInfoIndexComponent;
  let fixture: ComponentFixture<UserInfoIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfoIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
