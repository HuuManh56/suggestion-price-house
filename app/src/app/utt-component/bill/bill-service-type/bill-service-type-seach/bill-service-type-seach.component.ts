import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../shared/components/base-component/base-component.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ACTION_FORM, RESOURCE } from '../../../../core/app-config';
import { BillService } from '../../../../core/services/bill.service';

@Component({
  selector: 'app-bill-service-type-seach',
  templateUrl: './bill-service-type-seach.component.html',
  styleUrls: ['./bill-service-type-seach.component.css']
})
export class BillServiceTypeSeachComponent extends BaseComponent implements OnInit {
  formSearch:FormGroup;
  formconfig = {
    code: [''],
    name: ['']
  };
  
  constructor(
    public actr: ActivatedRoute,
    public router: Router,
    public billService: BillService
  ) {
    super(actr,RESOURCE.BILL, ACTION_FORM.SEARCH);
    this.setMainService(billService);
    this.formSearch = this.buildForm({}, this.formconfig);
    
  };

  ngOnInit() {
    this.processSearch();
  }
  public get f () {
    return this.formSearch.controls;
  }
  prepareSaveOrUpdate(id?){
    if(id){
      this.router.navigate(['/bill/bill-service-type/edit',id]);
    }
    else{
      this.router.navigate(['/bill/bill-service-type/add']);
    }
  }
}
