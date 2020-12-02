import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../shared/components/base-component/base-component.component';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BillOrtherService } from '../../../../core/services/bill-orther.service';
import { RESOURCE, ACTION_FORM } from '../../../../core/app-config';
import { DepartmentService } from '../../../../core/services/department.service';

@Component({
  selector: 'app-bill-orther-search',
  templateUrl: './bill-orther-search.component.html',
  styleUrls: ['./bill-orther-search.component.css']
})
export class BillOrtherSearchComponent extends BaseComponent implements OnInit {
  formSearch:FormGroup;
  formconfig = {
    code: [''],
    idApartment: [''],
    fromDate:[''],
    toDate:[''],
  };
  private apartmentList: any = [];
  constructor(
    public actr: ActivatedRoute,
    public router: Router,
    public billOrtherService : BillOrtherService,
    private departmentService: DepartmentService
  ) {
    super(actr,RESOURCE.BILL, ACTION_FORM.SEARCH);
    this.setMainService(billOrtherService);
    this.formSearch = this.buildForm({}, this.formconfig);
    
  };

  ngOnInit() {
    this.processSearch();
    this.departmentService.getAllApartment().subscribe( res =>{
      this.apartmentList = res.data;
    } );
  }
  public get f () {
    return this.formSearch.controls;
  }
  prepareSaveOrUpdate(id?){
    if(id){
      this.router.navigate(['/bill/bill-orther/edit',id]);
    }
    else{
      this.router.navigate(['/bill/bill-orther/add']);
    }
  }

}
