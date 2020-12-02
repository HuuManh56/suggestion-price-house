import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../shared/components/base-component/base-component.component';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ACTION_FORM, RESOURCE } from '../../../../core/app-config';
import { BillWaterElectrictService } from '../../../../core/services/bill-water-electrict.service';
import { DepartmentService } from '../../../../core/services/department.service';
@Component({
  selector: 'app-bill-electric-warter-search',
  templateUrl: './bill-electric-warter-search.component.html',
  styleUrls: ['./bill-electric-warter-search.component.css']
})
export class BillElectricWarterSearchComponent extends BaseComponent implements OnInit {
  formSearch:FormGroup;
  formconfig = {
    type: [''],
    codeBill: [''],
    idApartment: [''],
    fromDate:[''],
    toDate:[''],
  };
  private apartmentList: any;
  constructor(
    public actr: ActivatedRoute,
    public router: Router,
    public billWaterElectrictService : BillWaterElectrictService,
    private departmentService: DepartmentService
  ) {
    super(actr,RESOURCE.BILL, ACTION_FORM.SEARCH);
    this.setMainService(billWaterElectrictService);
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
      this.router.navigate(['/bill/bill-water-electric/edit',id]);
    }
    else{
      this.router.navigate(['/bill/bill-water-electric/add']);
    }
  }

  processSearchHouse(){
    debugger
    this.billWaterElectrictService.getAllHouse().subscribe( res =>{
      alert("goi thanh cong ")
      this.apartmentList = res.data;
    } )
  }
}
