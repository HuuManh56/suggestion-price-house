import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../../../../shared/components/base-component/base-component.component";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DepartmentService } from "../../../../core/services/department.service";
import { CommonUtils } from "../../../../shared/service/common-utils.service";
import { DialogModule } from "primeng/dialog";
import { PhongBanService } from '../../../../core/services/phong-ban.service';

@Component({
  selector: "app-department-search",
  templateUrl: "./department-search.component.html",
  styleUrls: ["./department-search.component.css"]
})
export class DepartmentSearchComponent extends BaseComponent implements OnInit {
  formConfig = {
    code: ["", [Validators.maxLength(50)]],
    name: ["", [Validators.maxLength(50)]],
    created_by: ["", [Validators.maxLength(50)]],
    edited_by: ["", [Validators.maxLength(50)]]
  };

  constructor(
    public acrt: ActivatedRoute,
    public router: Router,
    private departmentService: PhongBanService
  ) {
    super(null);
    this.setMainService(departmentService);
    this.formSearch = this.buildForm({}, this.formConfig);
  }

  ngOnInit() {
    console.log("department-search: ngOnInit");
    this.processSearch();
  }

  public get f() {
    return this.formSearch.controls;
  }

  private prepareSaveOrUpdate(item?: any) {
    if (item == null) {
      this.router.navigateByUrl("employee-manager/departments/add");
    } else {
      this.router.navigate(["employee-manager/departments/edit", item]);
    }
  }
  public goToListEmployeeOfDepartment(idDepartment: number) {
    this.router.navigateByUrl(
      `employee-manager/departments/${idDepartment}/employees`
    );
  }
}
