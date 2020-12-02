import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../../../../shared/components/base-component/base-component.component";
import { ActivatedRoute, Router } from "@angular/router";
import { AppComponent } from "../../../../app.component";
import { PositionService } from "../../../../core/services/position.service";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-position-add",
  templateUrl: "./position-add.component.html",
  styleUrls: ["./position-add.component.css"]
})
export class PositionAddComponent extends BaseComponent implements OnInit {
  private formConfig = {
    id: [""],
    code: [""],
    name: [""],
    salary: [""]
  };
  public idPosition: any;
  public formSave: FormGroup;

  constructor(
    public activateRoute: ActivatedRoute,
    public router: Router,
    private app: AppComponent,
    private positionService: PositionService
  ) {
    super(null);
    this.setMainService(positionService);
    this.formSave = this.buildForm({}, this.formConfig);
  }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      if (params && params.id != null) {
        this.idPosition = params.id;
        this.setFormValue(this.idPosition);
      }
    });
  }
  private setFormValue(id: number) {
    this.positionService.findOne(id).subscribe(response => {
      this.formSave = this.buildForm(response.data, this.formConfig);
    });
  }

  private processSaveOrUpdate() {
    this.app.confirmMessage(
      null,
      () => {
        // on accepted
        const formInput = this.formSave.value;
        this.positionService.saveOrUpdate(formInput).subscribe(res => {
          console.log("Save success");
          if (this.positionService.requestIsSuccess(res)) {
            this.router.navigate(["/employee-manager/positions"]);
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
