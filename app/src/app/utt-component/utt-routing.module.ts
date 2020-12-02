import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UttRoutingModule {}
