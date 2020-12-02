import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RESOURCE, ACTION_FORM } from '../../../core/app-config';
import { HouseService } from '../../../core/services/house.service';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';


@Component({
  selector: 'app-manager-house',
  templateUrl: './manager-house.component.html',
  styleUrls: ['./manager-house.component.css']
})
export class ManagerHouseComponent extends BaseComponent implements OnInit  {

  formconfig = {

  };
  
  constructor(
    public actr: ActivatedRoute,
    public router: Router,
    public houseService : HouseService,
  ) {
    super(actr,RESOURCE.HOUSE, ACTION_FORM.SEARCH);
    this.setMainService(houseService);
    this.formSearch = this.buildForm({}, this.formconfig);
  };

  ngOnInit() {
    this.processSearch();
  }
  
  public get f () {
    return this.formSearch.controls;
  }

}
