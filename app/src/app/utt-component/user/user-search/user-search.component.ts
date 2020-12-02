import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from '../../../app.component';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';
import { ACTION_FORM, RESOURCE, DEFAULT_MODAL_OPTIONS } from '../../../core/app-config';
import { Validators } from '@angular/forms';
import { CommonUtils } from '../../../shared/service/common-utils.service';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent extends BaseComponent implements OnInit {

  constructor(
    public actr: ActivatedRoute,
    public router: Router,
    private modalService: NgbModal,
    private userService: UserService,
    private app: AppComponent
  ) {
    super(actr, RESOURCE.USER, ACTION_FORM.SEARCH);
    this.setMainService(userService);
    this.formSearch = this.buildForm({}, {
      userCode: ['', [Validators.maxLength(50)]],
      fullName: ['', [Validators.maxLength(200)]],
    });
   }

  ngOnInit() {
    this.processSearch();
  }

  processSearch(event?): void {
    if (!CommonUtils.isValidForm(this.formSearch)) {
      return;
    }
    const params = this.formSearch ? this.formSearch.value : null;
    this.userService.getUserList(params, event).subscribe(res => {
      this.resultList = res;
    });
    if (!event) {
      if (this.dataTable) {
        this.dataTable.first = 0;
      }
    }
  }

  get f () {
    return this.formSearch.controls;
  }

   /**
   * prepare insert/update
   */
  prepareSaveOrUpdate(item): void {
    if (item && item > 0) {
      this.userService.findOne(item)
        .subscribe(res => {
          this.activeFormModal(this.modalService, UserFormComponent, res.data);
        });
    } else {
      this.activeFormModal(this.modalService, UserFormComponent, null);
    }
  }

}
