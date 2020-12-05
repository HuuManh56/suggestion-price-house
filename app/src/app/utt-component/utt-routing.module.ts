import { LOCALE_ID, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/vi';
registerLocaleData(localeFr);

const routes: Routes = [
  {
    path: "user",
    loadChildren: "./user/user.module#UserModule"
  },
  {
    path: "user-info",
    loadChildren: "./user-info/user-info.module#UserInfoModule"
  },
  {
    path: "department-manager",
    loadChildren:
      "./department-manager/department-manager.module#DepartmentManagerModule"
  },
  {
    path: "employee-manager",
    loadChildren:
      "./employee-manager/employee-manager.module#EmployeeManagerModule"
  },
  {
    path: "bill",
    loadChildren: "./bill/bill.module#BillModule"
  },
  {
    path: "statistical",
    loadChildren: "./statistical/statistical.module#StatisticalModule"
  },
  {
    path: "house",
    loadChildren: "./house/house.module#HouseModule"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'vi-VN'
     }
  ],
  exports: [RouterModule]
})
export class UttRoutingModule {}
