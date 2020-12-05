import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseService } from '../../../core/services/house.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';
import { CommonUtils } from '../../../shared/service/common-utils.service';
import { RESOURCE, DEFAULT_MODAL_OPTIONS, ACTION_FORM } from '../../../core/app-config';
import * as _ from "lodash";

@Component({
  selector: 'app-manage-house-form',
  templateUrl: './manage-house-form.component.html',
  styleUrls: ['./manage-house-form.component.css']
})
export class ManageHouseFormComponent extends BaseComponent implements OnInit {
  
  id: any = null;

  formConfig = {
    numberBedroom:  ['',[Validators.max(10),Validators.min(1)]],
    numberBathroom: ['',[Validators.max(10),Validators.min(1)]],
    totalFloor:     ['',[Validators.max(8),Validators.min(1)]],
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
    public activeModal: NgbActiveModal,
  ) { 
    super(actr, RESOURCE.HOUSE, ACTION_FORM.UPDATE);
    this.formSave = this.buildForm({}, this.formConfig);
  }

  formSave: FormGroup;

  ngOnInit() {
  }

  get f() {
    return this.formSave.controls;
  }

  public setFormValue(data?: any) {
    if(data) {
      const id = data.houseId;
      this.id = id;
      this.houseService.findOneData(id)
        .subscribe(res => {
          const data = res.data;
          this.formSave = this.buildForm(data, this.formConfig);
        });
    }
  }

  public processSaveOrUpdate() {
    if (!CommonUtils.isValidForm(this.formSave)) {
      return;
    }
    console.log('processSaveOrUpdate: ', this.formSave.value)
    const data =  _.cloneDeep(this.formSave.value);
    this.houseService.saveOrUpdateData(data, this.id)
      .subscribe(res => {
        if (this.houseService.requestIsSuccess(res)) {
          this.activeModal.close(res);
        }
      });
  }
}
