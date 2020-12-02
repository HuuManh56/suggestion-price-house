import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EmployeeManagerRoutingModule } from "./employee-manager-routing.module";
import { EmployeeSearchComponent } from "./employee/employee-search/employee-search.component";
import { EmployeeAddComponent } from "./employee/employee-add/employee-add.component";
import { DepartmentSearchComponent } from "./department/department-search/department-search.component";
import { DepartmentAddComponent } from "./department/department-add/department-add.component";
import { PositionSearchComponent } from "./position/position-search/position-search.component";
import { PositionAddComponent } from "./position/position-add/position-add.component";
import { SharedModule } from "../../shared/shared.module";
import { HttpClientModule } from "@angular/common/http";
import { DialogModule } from "primeng/dialog";
import { DepartmentEmployeesComponent } from './department/department-employees/department-employees.component';
@NgModule({
  declarations: [
    EmployeeSearchComponent,
    EmployeeAddComponent,
    DepartmentSearchComponent,
    DepartmentAddComponent,
    PositionSearchComponent,
    PositionAddComponent,
    DepartmentEmployeesComponent
  ],
  imports: [
    CommonModule,
    EmployeeManagerRoutingModule,
    DialogModule,
    SharedModule,
    HttpClientModule
  ]
})
export class EmployeeManagerModule {}
