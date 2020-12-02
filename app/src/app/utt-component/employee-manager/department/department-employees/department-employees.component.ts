import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../../../../shared/components/base-component/base-component.component";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DepartmentService } from "../../../../core/services/department.service";
import { CommonUtils } from "../../../../shared/service/common-utils.service";
import { DialogModule } from "primeng/dialog";
import { FormGroup } from "@angular/forms";
import { AppComponent } from "../../../../app.component";
import { PhongBanService } from "../../../../core/services/phong-ban.service";
@Component({
  selector: "app-department-employees",
  templateUrl: "./department-employees.component.html",
  styleUrls: ["./department-employees.component.css"]
})
export class DepartmentEmployeesComponent extends BaseComponent
  implements OnInit {
  formConfig = {
    code: ["", [Validators.maxLength(50)]],
    name: ["", [Validators.maxLength(50)]],
    email: ["", [Validators.maxLength(50)]],
    positionsName: ["", [Validators.maxLength(50)]]
  };
  public idDepartment: any;
  public formSave: FormGroup;
  public departmentInfo: any;
  constructor(
    public activateRoute: ActivatedRoute,
    public router: Router,
    private app: AppComponent,
    private departmentService: PhongBanService
  ) {
    super(null);
    this.setMainService(departmentService);
    this.formSearch = this.buildForm({}, this.formConfig);
    this.departmentInfo = {
      code: "",
      name: "",
      createdDate: "",
      createdBy: ""
    };
  }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      if (params && params.id != null) {
        this.idDepartment = params.id;
        // this.setFormValue(this.idDepartment);
      }
    });
    this.processSearch();
    this.departmentService.findOne(this.idDepartment).subscribe(result => {
      console.log(result.data);
      this.departmentInfo = result.data;
    });
  }

  private setFormValue(id: number) {
    this.departmentService.findOne(id).subscribe(response => {
      this.formSave = this.buildForm(response.data, this.formConfig);
    });
  }
  public get f() {
    return this.formSearch.controls;
  }

  public processSearch(event?): void {
    if (!CommonUtils.isValidForm(this.formSearch)) {
      return;
    }
    const params = this.formSearch ? this.formSearch.value : null;
    console.log("params", params);
    // this.departmentService
    //   .getEmployeeListOfDepartment(this.idDepartment, params, event)
    //   .subscribe(res => {
    //     this.resultList = res;
    //   });

    if (!event) {
      if (this.dataTable) {
        this.dataTable.first = 0;
      }
    }
  }
  prepareSaveOrUpdate() {}
}
