import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HouseService } from '../../../core/services/house.service';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';
import { CommonUtils } from '../../../shared/service/common-utils.service';
import { RESOURCE, DEFAULT_MODAL_OPTIONS, ACTION_FORM } from '../../../core/app-config';
import * as _ from "lodash";
import { AppComponent } from '../../../app.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-house-form',
  templateUrl: './manage-house-form.component.html',
  styleUrls: ['./manage-house-form.component.css']
})
export class ManageHouseFormComponent extends BaseComponent implements OnInit {
  
  id: any = null;

  formConfig = {
    numberBedroom:  ['',[Validators.required,Validators.max(10),Validators.min(1)]],
    numberBathroom: ['',[Validators.required,Validators.max(10),Validators.min(1)]],
    totalFloor:     ['',[Validators.required,Validators.max(8),Validators.min(1)]],
    area:           ['',[Validators.required,Validators.max(500),Validators.min(20)]],
    frontWidth:     ['',[Validators.required,Validators.max(20),Validators.min(3)]],
    inletWidth:     ['',[Validators.required,Validators.max(10),Validators.min(1)]],
    distanceCenter: ['',[Validators.required,Validators.max(30000),Validators.min(10)]],
    price: ['',[Validators.max(50000000000),Validators.min(100000000)]]
  };

  constructor(   
    public actr: ActivatedRoute,
    public router: Router,
    private app: AppComponent,
    public houseService: HouseService,
 	public activeModal: NgbActiveModal,  ) { 
    super(actr, RESOURCE.HOUSE, ACTION_FORM.UPDATE);
    this.setMainService(houseService);
    this.formSave = this.buildForm({}, this.formConfig);
  }

  formSave: FormGroup;

  ngOnInit() {
  }

  get f() {
    return this.formSave.controls;
  }

  public setFormValue(propertyConfigs: any, data?: any) {
    if(data && data._id){
      this.id = data._id;
      this.formSave = this.buildForm(data, this.formConfig);
    }else{
      this.formSave = this.buildForm({}, this.formConfig);
    }
  }

  public processSaveOrUpdate() {
    if (!CommonUtils.isValidForm(this.formSave)) {
      return;
    }
    this.app.confirmMessage(null, () => {// on accepted
      const data =  _.cloneDeep(this.formSave.value);
      debugger
      if(this.id){
        this.id = this.id["$oid"]
      }
      this.houseService.saveOrUpdateData(data, this.id)
      .subscribe(res => {
        this.activeModal.close(res);
        this.processSearch();
      });
    }, () => {
      // on rejected
    });
  }
}
