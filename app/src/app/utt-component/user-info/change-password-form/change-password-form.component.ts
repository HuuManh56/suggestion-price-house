import { Component, OnInit } from '@angular/core';
import { UserToken } from '../../../core/models/user-token.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { AppComponent } from '../../../app.component';
import { RESOURCE, ACTION_FORM } from '../../../core/app-config';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';
import { Storage } from '../../../shared/service/storage.service';
import { CommonUtils } from '../../../shared/service/common-utils.service';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css']
})
export class ChangePasswordFormComponent extends BaseComponent implements OnInit {

  userInfo: UserToken;

  formSave: FormGroup;
  formConfig = {
    userId: [''],
    userName: ['', [Validators.required, Validators.maxLength(100)]],
    password: ['', [Validators.required, Validators.maxLength(100)]],
    fullName: ['', [Validators.required, Validators.maxLength(200)]],
    dateOfBirth: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    email: ['', [Validators.maxLength(50)]],
    mobileNumber: ['', [Validators.maxLength(50)]],
    positionId: ['', [Validators.required]],
    userCode: ['', [Validators.required]],
    roleId: ['', [Validators.required]],
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
