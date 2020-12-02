import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../shared/components/base-component/base-component.component';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../../../core/services/person.service';
import { DepartmentService } from '../../../../core/services/department.service';

@Component({
  selector: 'app-department-search',
  templateUrl: './department-search.component.html',
  styleUrls: ['./department-search.component.css']
})
export class DepartmentSearchComponent extends BaseComponent implements OnInit {

  formconfig = {
   code: ['', [Validators.maxLength(50)]],
   name: ['', [Validators.maxLength(200)]],
   haveLive: [''],
   notHaveLive: ['']
 }
 
 constructor(
   public actr: ActivatedRoute,
   public router: Router,
   private departmentService: DepartmentService,
 ) {
   super(null);
   this.setMainService(departmentService);
   this.formSearch = this.buildForm({}, this.formconfig);
   this.f.haveLive.setValue(0);
   this.f.notHaveLive.setValue(0);
  }

 ngOnInit() {
   this.processSearch();
 }

 private prepareSaveOrUpdate(item?) {
   if(item == null) {
     this.router.navigateByUrl("department-manager/department/add");
   } else {
     this.router.navigate(['department-manager/department/edit', item]);
   }
 }

 public get f () {
   return this.formSearch.controls;
 }
}
