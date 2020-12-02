import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DepartmentService } from "../../../../core/services/department.service";
import { BaseComponent } from "../../../../shared/components/base-component/base-component.component";
import { AppComponent } from "../../../../app.component";
import { PhongBanService } from "../../../../core/services/phong-ban.service";

@Component({
  selector: "app-department-add",
  templateUrl: "./department-add.component.html",
  styleUrls: ["./department-add.component.css"]
})
export class DepartmentAddComponent extends BaseComponent implements OnInit {
  private formConfig = {
    id: [""],
    code: [""],
    name: [""]
  };
  public idDepartment: any;
  public formSave: FormGroup;

  constructor(
    public activateRoute: ActivatedRoute,
    public router: Router,
    private app: AppComponent,
    private departmentService: PhongBanService
  ) {
    super(null);
    this.setMainService(departmentService);
    this.formSave = this.buildForm({}, this.formConfig);
  }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      if (params && params.id != null) {
        this.idDepartment = params.id;
        this.setFormValue(this.idDepartment);
      }
    });
  }

  private setFormValue(id: number) {
    this.departmentService.findOne(id).subscribe(response => {
      this.formSave = this.buildForm(response.data, this.formConfig);
    });
  }

  private processSaveOrUpdate() {
    this.app.confirmMessage(
      null,
      () => {
        // on accepted
        const formInput = this.formSave.value;
        this.departmentService.saveOrUpdate(formInput).subscribe(res => {
          console.log("Save success");
          if (this.departmentService.requestIsSuccess(res)) {
            this.router.navigate(["/employee-manager/departments"]);
          }
        });
      },
      () => {
        // on rejected
      }
    );
  }

  private back() {
    this.router.navigate(["employee-manager/departments"]);
  }

  get f() {
    return this.formSave.controls;
  }
}
