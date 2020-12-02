import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../../../../shared/components/base-component/base-component.component";
import { Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { PositionService } from "../../../../core/services/position.service";

@Component({
  selector: "app-position-search",
  templateUrl: "./position-search.component.html",
  styleUrls: ["./position-search.component.css"]
})
export class PositionSearchComponent extends BaseComponent implements OnInit {
  formConfig = {
    code: ["", [Validators.maxLength(50)]],
    name: ["", [Validators.maxLength(50)]],
    salary: ["", [Validators.maxLength(50)]],
    createdDate: ["", [Validators.maxLength(50)]],
    createdBy: ["", [Validators.maxLength(50)]]
  };
  constructor(
    public acrt: ActivatedRoute,
    public router: Router,
    private positionService: PositionService
  ) {
    super(null);
    this.setMainService(positionService);
    this.formSearch = this.buildForm({}, this.formConfig);
  }

  ngOnInit() {
    console.log("PositionSearchComponent: ngOnInit");
    this.processSearch();
  }

  public get f() {
    return this.formSearch.controls;
  }

  private prepareSaveOrUpdate(item?: any) {
    if (item == null) {
      this.router.navigateByUrl("employee-manager/positions/add");
    } else {
      this.router.navigate(["employee-manager/positions/edit", item]);
    }
  }
}
