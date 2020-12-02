import { Component, OnInit } from '@angular/core';
import { StatisticalPersonService } from '../../../core/services/statistical-person.service';

import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';
import { StatisticalService } from '../../../core/services/statistical.service';
import { RESOURCE, ACTION_FORM } from '../../../core/app-config';

@Component({
  selector: 'app-person-month',
  templateUrl: './person-month.component.html',
  styleUrls: ['./person-month.component.css']
})
export class PersonMonthComponent extends BaseComponent  implements OnInit {
  formconfig = {
    formDate:[''],
    endDate:['']
  };
  constructor( 
    public actr: ActivatedRoute,
    public router: Router,
    public statisticalPersonService : StatisticalPersonService
    ) {
    super(actr,RESOURCE.BILL, ACTION_FORM.SEARCH);
    this.setMainService(statisticalPersonService);
    this.formSearch = this.buildForm({}, this.formconfig);
    }
    public get f () {
      return this.formSearch.controls;
    }
  ngOnInit() {
    this.processSearch();
  }

}
