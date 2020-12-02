import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserInfoIndexComponent } from './user-info-index/user-info-index.component';
import { ChangePasswordFormComponent } from './change-password-form/change-password-form.component';

const routes: Routes = [
  {
    path: '',
    component: UserInfoIndexComponent,
    pathMatch : 'prefix',
  },
  {
    path: 'change-password',
    component: ChangePasswordFormComponent,
    pathMatch : 'prefix',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserInfoRoutingModule { }
