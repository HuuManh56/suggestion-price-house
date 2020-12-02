import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { AppComponent } from '../../../app.component';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';
import { RESOURCE, ACTION_FORM } from '../../../core/app-config';
import { UserToken } from '../../../core/models/user-token.model';
import { Storage } from '../../../shared/service/storage.service';
import { CommonUtils } from '../../../shared/service/common-utils.service';

@Component({
  selector: 'app-user-info-form',
  templateUrl: './user-info-form.component.html',
  styleUrls: ['./user-info-form.component.css']
})
export class UserInfoFormComponent extends BaseComponent implements OnInit {

  userInfo: UserToken;
  positionList: any;

  formSave: FormGroup;
  formConfig = {
    userId: [''],
    userName: [''],
    password: [''],
    fullName: ['', [Validators.required, Validators.maxLength(200)]],
    dateOfBirth: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    email: ['', [Validators.maxLength(50)]],
    mobileNumber: ['', [Validators.maxLength(50)]],
    positionId: ['', [Validators.required]],
    userCode: ['', [Validators.required]],
    lstRoleId: ['', [Validators.required]]
  };
  constructor(public actr: ActivatedRoute,
    private formBuilder: FormBuilder,
    public userService: UserService,
    private app: AppComponent) {
      super(actr, RESOURCE.USER_INFO, ACTION_FORM.UPDATE);
      this.formSave = this.buildForm({}, this.formConfig);
      this.userInfo = Storage.getUserToken();
     }

  ngOnInit() {
    this.userService.getListClasses().subscribe(res => {
      this.positionList = res;
    });

    this.userService.findOne(this.userInfo.userId).subscribe(res => {
      this.formSave = this.buildForm(res.data, this.formConfig);
    });
  }

    /****************** CAC HAM COMMON DUNG CHUNG ****/
    get f () {
      return this.formSave.controls;
    }

     /**
   * processSaveOrUpdate
   */
  processSaveOrUpdate() {
    this.app.confirmMessage(null, () => {// on accepted
      this.userService.saveOrUpdate(this.formSave.value)
      .subscribe(res => {
        this.formSave = this.buildForm(res.data, this.formConfig);
      });
     }, () => {// on rejected
   });
  }
}
