import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserInfoRoutingModule } from './user-info-routing.module';
import { UserInfoIndexComponent } from './user-info-index/user-info-index.component';
import { UserInfoFormComponent } from './user-info-form/user-info-form.component';
import { ChangePasswordFormComponent } from './change-password-form/change-password-form.component';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    UserInfoRoutingModule,
    SharedModule,
    HttpClientModule,
  ],
  entryComponents: [UserInfoFormComponent],
  declarations: [UserInfoIndexComponent, UserInfoFormComponent, ChangePasswordFormComponent]
})
export class UserInfoModule { }
