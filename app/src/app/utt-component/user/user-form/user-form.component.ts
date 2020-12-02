import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ValidationService } from '../../../shared/service/validation.service';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from '../../../app.component';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';
import { RESOURCE, ACTION_FORM } from '../../../core/app-config';
import { CommonUtils } from '../../../shared/service/common-utils.service';
import { UserToken } from '../../../core/models/user-token.model';
import { Storage } from '../../../shared/service/storage.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent extends BaseComponent implements OnInit {


  formSave: FormGroup;
  userInfo: UserToken;
  positionList: any;
  formConfig = {
    userId: [''],
    userName: ['', [Validators.required, Validators.maxLength(100)]],
    password: ['', [Validators.required, Validators.maxLength(100)]],
    fullName: ['', [Validators.required, Validators.maxLength(200)]],
    dateOfBirth: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    email: ['', [Validators.maxLength(50)]],
    mobileNumber: ['', [Validators.maxLength(50)]],
    userCode: ['', [Validators.required]],
    roleId: [''],
    lstRoleId: ['']
  };
  constructor(public actr: ActivatedRoute,
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    public userService: UserService,
    private app: AppComponent) {
      super(actr, RESOURCE.USER, ACTION_FORM.SEARCH);
      this.userInfo = Storage.getUserToken();
      this.userService.getRoles().subscribe(res => {
        this.initListRole(res);
      });
      this.formSave = this.buildForm({}, this.formConfig);
     }
  ngOnInit() {
  }

  /****************** CAC HAM COMMON DUNG CHUNG ****/
  get f () {
    return this.formSave.controls;
  }

  /**
   * setFormValue
   * param data
   */
  public setFormValue(propertyConfigs: any, data?: any) {
    this.propertyConfigs = propertyConfigs;
    if (data && data.userId > 0) {
      this.formSave = this.buildForm(data, this.formConfig);
    }
  }

  /**
   * processSaveOrUpdate
   */
  processSaveOrUpdate() {
    if (!CommonUtils.isValidForm(this.formSave)) {
      return;
    }
    this.app.confirmMessage(null, () => {// on accepted
      this.userService.saveOrUpdate(this.formSave.value)
      .subscribe(res => {
        if (this.userService.requestIsSuccess(res)) {
          this.activeModal.close(res);
        }
      });
     }, () => {// on rejected
   });
  }

  initListRole(data) {
    this.positionList = [];
    if (data) {
        for (const item of data) {
          this.positionList.push({label: item.roleName, value: item.roleId});
        }
      } 
    }
}
