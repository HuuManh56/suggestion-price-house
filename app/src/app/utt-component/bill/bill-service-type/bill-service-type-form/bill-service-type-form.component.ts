import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../shared/components/base-component/base-component.component';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../../../../app.component';
import { BillService } from '../../../../core/services/bill.service';
import { RESOURCE } from '../../../../core/app-config';
import { CommonUtils } from '../../../../shared/service/common-utils.service';

@Component({
  selector: 'app-bill-service-type-form',
  templateUrl: './bill-service-type-form.component.html',
  styleUrls: ['./bill-service-type-form.component.css']
})
export class BillServiceTypeFormComponent extends BaseComponent implements OnInit {
  
  private formConfig = {
    id :    [''],
    code :  ['',[Validators.required, Validators.maxLength(10)]],
    name :  ['',[Validators.required, Validators.maxLength(50)]],
    price : ['',[Validators.required, Validators.maxLength(10), Validators.min(1)]],
    unit :  ['',[Validators.required, Validators.maxLength(20)]],
     
  }
  private id: any;
  private formSave : FormGroup;
  constructor(
    public actr: ActivatedRoute,
    public router: Router,
    private app: AppComponent,
    private billService: BillService
  ) {
    super (null);
    this.setMainService(billService);
    this.formSave = this.buildForm({}, this.formConfig);
    this.actr.params.subscribe(params => {
      if (params && params.id != null) {
        this.id = params.id;
      } 
    });
   }
    
  ngOnInit() {
    this.setFormValue(this.id);
  }

  private setFormValue (id) {
      this.billService.findOne(id).subscribe(res => {
        console.log(res.data)
        this.formSave = this.buildForm(res.data, this.formConfig);
      }
    )
  }


  private processSaveOrUpdate() {
    if (!CommonUtils.isValidForm(this.formSave)) {
      return;
    }
    this.app.confirmMessage(null, () => {// on accepted
      const formInput = this.formSave.value;
      this.billService.saveOrUpdate(formInput)
        .subscribe(res => {
          if (this.billService.requestIsSuccess(res)) {
            this.router.navigate(['/bill/bill-service-type']);
          } 
        });
    }, () => {
      // on rejected
    });
  }
  
  private back() {
    this.router.navigate(['/bill/bill-service-type']);
  }

  get f () {
    return this.formSave.controls;
  }

}
