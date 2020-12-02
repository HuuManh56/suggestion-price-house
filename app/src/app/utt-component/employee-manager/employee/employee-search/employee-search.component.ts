import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../../../../shared/components/base-component/base-component.component";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { EmployeeService } from "../../../../core/services/employee.service";

@Component({
  selector: "app-employee-search",
  templateUrl: "./employee-search.component.html",
  styleUrls: ["./employee-search.component.css"]
})
export class EmployeeSearchComponent extends BaseComponent implements OnInit {
  formConfig = {
    code: ["", [Validators.maxLength(50)]],
    name: ["", [Validators.maxLength(50)]],

    gender: ["", [Validators.maxLength(50)]],
    email: ["", [Validators.maxLength(50)]],
    
    phonenumber: ["", [Validators.maxLength(50)]],
    salary: ["", [Validators.maxLength(50)]],

    departmentName: ["", [Validators.maxLength(50)]],
    positionsName: ["", [Validators.maxLength(50)]]
  };
  constructor(
    public acrt: ActivatedRoute,
    public router: Router,
    private employeeService: EmployeeService
  ) {
    super(null);
    this.setMainService(employeeService);
    this.formSearch = this.buildForm({}, this.formConfig);
  }

  ngOnInit() {
    console.log("EmployeeSearchComponent: ngOnInit");
    this.processSearch();
  }

  public get f() {
    return this.formSearch.controls;
  }

  private prepareSaveOrUpdate(item?: any) {
    if (item == null) {
      this.router.navigateByUrl("employee-manager/employees/add");
    } else {
      this.router.navigate(["employee-manager/employees/edit", item]);
    }
  }
}
