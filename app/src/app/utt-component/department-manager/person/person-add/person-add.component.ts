import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../../../core/services/person.service';
import { BaseComponent } from '../../../../shared/components/base-component/base-component.component';
import { AppComponent } from '../../../../app.component';
import { FormGroup, Validators } from '@angular/forms';
import { CommonUtils } from '../../../../shared/service/common-utils.service';

@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html'
})
export class PersonAddComponent extends BaseComponent implements OnInit {

  private formConfig = {
    id :[''],
    code :['', Validators.required],
    name :['', Validators.required],
    gender : ['', Validators.required],
    address :['', Validators.required],
    identityNumber :[''],
    dateOfBirth :['', Validators.required],
    phoneNumber :[''],
    email: ['']
  }
  private idPerson: any;
  private formSave : FormGroup;
  constructor(
    public actr: ActivatedRoute,
    public router: Router,
    private app: AppComponent,
    private personService: PersonService,
  ) {
    super (null);
    this.setMainService(personService);
    
    this.actr.params.subscribe(params => {
      if (params && params.id != null) {
        this.idPerson = params.id;
        this.setFormValue(this.idPerson);
      } else {
        this.formSave = this.buildForm({}, this.formConfig);
        this.f.gender.setValue(1);
      }
    });
   }
    
  ngOnInit() {
  }

  private setFormValue (id) {
      this.personService.findOne(id).subscribe(res => {
        this.formSave = this.buildForm(res.data, this.formConfig);
      }
    )
  }


  private processSaveOrUpdate() {
    if(CommonUtils.isValidForm(this.formSave)) {
      this.app.confirmMessage(null, () => {// on accepted
        const formInput = this.formSave.value;
        this.personService.saveOrUpdate(formInput)
          .subscribe(res => {
            if (this.personService.requestIsSuccess(res)) {
              this.router.navigate(['/department-manager/person']);
            } 
          });
      }, () => {
        // on rejected
      });
    }
  }
  
  private back() {
    this.router.navigate(['/department-manager/person']);
  }

  get f () {
    return this.formSave.controls;
  }
}
