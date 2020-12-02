import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentManagerRoutingModule } from './department-manager-routing.module';
import { PersonSearchComponent } from './person/person-search/person-search.component';
import { PersonAddComponent } from './person/person-add/person-add.component';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { DepartmentAddComponent } from './deparment/department-add/department-add.component';
import { DepartmentSearchComponent } from './deparment/department-search/department-search.component';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
  declarations: [PersonSearchComponent, PersonAddComponent, DepartmentAddComponent, DepartmentSearchComponent],
  imports: [
    SharedModule,
    HttpClientModule,
    CommonModule,
    DepartmentManagerRoutingModule,
    AutoCompleteModule
  ]
})
export class DepartmentManagerModule { }
