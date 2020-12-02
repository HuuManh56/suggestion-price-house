import { Component, OnInit } from '@angular/core';

import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';
import { StatisticalService } from '../../../core/services/statistical.service';
import { RESOURCE, ACTION_FORM } from '../../../core/app-config';
import { CommonUtils } from '../../../shared/service/common-utils.service';


@Component({
  selector: 'app-bill-month',
  templateUrl: './bill-month.component.html',
  styleUrls: ['./bill-month.component.css']
})
export class BillMonthComponent extends BaseComponent implements OnInit {

  formconfig = {
    year: ['',[Validators.min(0),Validators.max(2020)]],
    month: ['',[Validators.min(1),Validators.max(12)]]
  };
  constructor(   
    public actr: ActivatedRoute,
    public router: Router,
    public statisticalService : StatisticalService
    ) {
    super(actr,RESOURCE.BILL, ACTION_FORM.SEARCH);
    this.setMainService(statisticalService);
    this.formSearch = this.buildForm({}, this.formconfig);
   }

  public get f () {
    return this.formSearch.controls;
  }
  ngOnInit() {
    this.processSearch();
  }
  public processSearch(event?): void {
    if (!CommonUtils.isValidForm(this.formSearch)) {
      return;
    }
    const params = this.formSearch ? this.formSearch.value : null;
    this.statisticalService.search(params, event).subscribe(res => {
      this.resultList = res;
      
    });

    if (!event) {
      if (this.dataTable) {
        this.dataTable.first = 0;
      }
    }
  }
}
