import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserIndexComponent } from './user-index/user-index.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { UserFormComponent } from './user-form/user-form.component';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    HttpClientModule,
  ],
  entryComponents: [UserFormComponent],
  declarations: [UserIndexComponent, UserSearchComponent, UserFormComponent]
})
export class UserModule { }
