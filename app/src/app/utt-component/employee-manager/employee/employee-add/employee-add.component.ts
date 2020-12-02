import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../../../../shared/components/base-component/base-component.component";
import { ActivatedRoute, Router } from "@angular/router";
import { AppComponent } from "../../../../app.component";
import { FormGroup, Validators } from "@angular/forms";
import { EmployeeService } from "../../../../core/services/employee.service";
import { DepartmentService } from "../../../../core/services/department.service";
import { PositionService } from "../../../../core/services/position.service";
import { DialogModule } from "primeng/dialog";
@Component({
  selector: "app-employee-add",
  templateUrl: "./employee-add.component.html",
  styleUrls: ["./employee-add.component.css"]
})
export class EmployeeAddComponent extends BaseComponent implements OnInit {
  private formConfig = {
    id: [""],
    code: [""],
    name: ["", [Validators.required]],
    dateOfBird: ["", [Validators.required]],
    gender: [1, [Validators.required]],
    email: [
      "",
      [Validators.required, Validators.email, Validators.maxLength(100)]
    ],
    phonenumber: ["", [Validators.required]],

    // For workprocess
    idDepartment: ["", [Validators.required]],
    idPositions: ["", [Validators.required]],
    startDate: ["", [Validators.required]],
    endDate: ["", [Validators.required]]
  };
  public listDepartment: any = [];
  public listPositions: any = [];
  public idEmployee: any;
  public formSave: FormGroup;
  constructor(
    public activateRoute: ActivatedRoute,
    public router: Router,
    private app: AppComponent,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private positionService: PositionService
  ) {
    super(null);
    this.setMainService(employeeService);
    this.formSave = this.buildForm({}, this.formConfig);
  }

  ngOnInit() {
    this.departmentService.getAllWithoutPagination().subscribe(data => {
      data.forEach(item => {
        this.listDepartment.push({ label: item.name, value: item.id });
      });
    });
    this.positionService.getAllWithoutPagination().subscribe(data => {
      data.forEach(item => {
        this.listPositions.push({ label: item.name, value: item.id });
      });
      this.activateRoute.params.subscribe(params => {
        if (params && params.id != null) {
          this.idEmployee = params.id;
          this.setFormValue(this.idEmployee);
        }
      });
    });
  }

  private setFormValue(id: number) {
    this.employeeService.findOne(id).subscribe(response => {
      this.formSave = this.buildForm(response.data, this.formConfig);
      console.log(this.formSave.value);
    });
  }

  private processSaveOrUpdate() {
    console.log("input", this.formSave.value);
    this.app.confirmMessage(
      null,
      () => {
        const formInput = this.formSave.value;
        this.employeeService.saveOrUpdate(formInput).subscribe(res => {
          console.log("Save success");
          if (this.employeeService.requestIsSuccess(res)) {
            this.router.navigate(["/employee-manager/employees"]);
          }
        });
      },
      () => {
        // on rejected
      }
    );
  }

  private back() {
    this.router.navigate(["employee-manager/employees"]);
  }
  get f() {
    return this.formSave.controls;
  }
}
