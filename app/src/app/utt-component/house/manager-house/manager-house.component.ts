import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormGroup } from '@angular/forms';
import { RESOURCE, DEFAULT_MODAL_OPTIONS, ACTION_FORM } from '../../../core/app-config';
import { HouseService } from '../../../core/services/house.service';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';
import { CommonUtils } from '../../../shared/service/common-utils.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageHouseFormComponent } from '../manage-house-form/manage-house-form.component';

@Component({
  selector: 'app-manager-house',
  templateUrl: './manager-house.component.html',
  styleUrls: ['./manager-house.component.css']
})
export class ManagerHouseComponent extends BaseComponent implements OnInit {

  formconfig = {
    numberBedroom:  ['',[Validators.max(10),Validators.min(1)]],
    numberBathroom: ['',[Validators.max(10),Validators.min(1)]],
    totalFloor:     ['',[Validators.max(8),Validators.min(2)]],
    area:           ['',[Validators.max(500),Validators.min(20)]],
    frontWidthFrom:     ['',[Validators.max(20),Validators.min(3)]],
    frontWidthTo:     ['',[Validators.max(20),Validators.min(3)]],
    inletWidthFrom:     ['',[Validators.max(10),Validators.min(1)]],
    inletWidthTo:     ['',[Validators.max(10),Validators.min(1)]],
    distanceCenterFrom: ['',[Validators.max(30000),Validators.min(10)]],
    distanceCenterTo: ['',[Validators.max(30000),Validators.min(10)]],
    priceFrom: ['',[Validators.max(50000000000),Validators.min(100000000)]],
    priceTo: ['',[Validators.max(50000000000),Validators.min(100000000)]],
  };

  constructor(
    public actr: ActivatedRoute,
    public router: Router,
    public houseService: HouseService,
    private modalService: NgbModal
  ) {
    super(actr, RESOURCE.HOUSE, ACTION_FORM.SEARCH);
    this.setMainService(houseService);
    this.formSearch = this.buildForm({}, this.formconfig);
  };

  ngOnInit() {
    this.processSearch();
  }

  public processDelete(item){
    const id = item.houseId;
    debugger
    this.houseService.confirmDelete({
      messageCode: null,
      accept: () => {
        this.houseService.deleteData(id).subscribe(res => {
          if (this.houseService.requestIsSuccess(res)) {
            this.processSearch();
          }
        });
      }
    });
  }
  
  public prepareSaveOrUpdate(data?) {
    const modalRef = this.modalService.open(ManageHouseFormComponent, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.setFormValue(this.propertyConfigs, data);
    modalRef.result.then(result => {
      this.processSearch();
    });
  }
  // public processSearch(event?): void {
  //   if (!CommonUtils.isValidForm(this.formSearch)) {
  //     return;
  //   }
  //   const params = this.formSearch ? this.formSearch.value : null;
  //   this.houseService.searchData(params, event).subscribe(res => {
  //     this.resultList = res;
  //   });

  //   if (!event) {
  //     if (this.dataTable) {
  //       this.dataTable.first = 0;
  //     }
  //   }
  // }
  public get f() {
    return this.formSearch.controls;
  }

}
