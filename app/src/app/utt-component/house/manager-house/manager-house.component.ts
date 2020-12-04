import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormGroup } from '@angular/forms';
import { RESOURCE, ACTION_FORM } from '../../../core/app-config';
import { HouseService } from '../../../core/services/house.service';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';
import { CommonUtils } from '../../../shared/service/common-utils.service';

@Component({
  selector: 'app-manager-house',
  templateUrl: './manager-house.component.html',
  styleUrls: ['./manager-house.component.css']
})
export class ManagerHouseComponent extends BaseComponent implements OnInit {

  formconfig = {
    numberBedroom: [''],
    numberBathroom: [''],
    totalFloor: [''],
    area: [''],
    frontWidth: [''],
    inletWidth: [''],
    distanceCenter: [''],
  };

  constructor(
    public actr: ActivatedRoute,
    public router: Router,
    public houseService: HouseService,
  ) {
    super(actr, RESOURCE.HOUSE, ACTION_FORM.SEARCH);
    this.setMainService(houseService);
    this.formSearch = this.buildForm({}, this.formconfig);
  };

  ngOnInit() {
    this.processSearch();
  }

  public processSearch(event?): void {
    if (!CommonUtils.isValidForm(this.formSearch)) {
      return;
    }
    const params = this.formSearch ? this.formSearch.value : null;
    this.houseService.searchData(params, event).subscribe(res => {
      this.resultList = res;
    });

    if (!event) {
      if (this.dataTable) {
        this.dataTable.first = 0;
      }
    }
  }
  public get f() {
    return this.formSearch.controls;
  }

}
