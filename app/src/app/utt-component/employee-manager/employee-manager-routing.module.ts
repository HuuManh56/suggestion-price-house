import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EmployeeSearchComponent } from "./employee/employee-search/employee-search.component";
import { EmployeeAddComponent } from "./employee/employee-add/employee-add.component";
import { DepartmentSearchComponent } from "./department/department-search/department-search.component";
import { DepartmentAddComponent } from "./department/department-add/department-add.component";
import { PositionSearchComponent } from "./position/position-search/position-search.component";
import { PositionAddComponent } from "./position/position-add/position-add.component";
import { DepartmentEmployeesComponent } from "./department/department-employees/department-employees.component";

const routes: Routes = [
  // For employee //////////////////////////
  {
    path: "employees",
    component: EmployeeSearchComponent
  },
  {
    path: "employees/add",
    component: EmployeeAddComponent
  },
  {
    path: "employees/edit/:id",
    component: EmployeeAddComponent
  },
  // For Department //////////////////////////
  {
    path: "departments",
    component: DepartmentSearchComponent
  },
  {
    path: "departments/add",
    component: DepartmentAddComponent
  },
  {
    path: "departments/edit/:id",
    component: DepartmentAddComponent
  },
  {
    path: "departments/:id/employees",
    component: DepartmentEmployeesComponent
  },
  // For Position //////////////////////////
  {
    path: "positions",
    component: PositionSearchComponent
  },
  {
    path: "positions/add",
    component: PositionAddComponent
  },
  {
    path: "positions/edit/:id",
    component: PositionAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeManagerRoutingModule {}
