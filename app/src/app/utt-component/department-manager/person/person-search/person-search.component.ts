import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../../../core/services/person.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { BaseComponent } from '../../../../shared/components/base-component/base-component.component';
import { DepartmentService } from '../../../../core/services/department.service';

@Component({
  selector: 'app-person-search',
  templateUrl: './person-search.component.html',
  styleUrls: ['./person-search.component.css']
})
export class PersonSearchComponent extends BaseComponent implements OnInit {

  apartmentList: any;

   formconfig = {
    code: ['', [Validators.maxLength(50)]],
    name: ['', [Validators.maxLength(200)]],
    lstApartmentId:['']
  }
  
  constructor(
    public actr: ActivatedRoute,
    public router: Router,
    private personService: PersonService,
    private apartService: DepartmentService,
  ) {
    super(null);
    this.setMainService(personService);
    this.formSearch = this.buildForm({}, this.formconfig);
    this.apartService.getAllApartment().subscribe( res =>
      this.apartmentList = res.data
      // console.log(res)
    );
   }

  ngOnInit() {
    this.processSearch();
  }

  private prepareSaveOrUpdate(item?) {
    if(item == null) {
      this.router.navigateByUrl("department-manager/person/add");
    } else {
      this.router.navigate(['department-manager/person/edit', item]);
    }
  }

  public get f () {
    return this.formSearch.controls;
  }
}
