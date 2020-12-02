import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonSearchComponent } from './person/person-search/person-search.component';
import { PersonAddComponent } from './person/person-add/person-add.component';
import { DepartmentSearchComponent } from './deparment/department-search/department-search.component';
import { DepartmentAddComponent } from './deparment/department-add/department-add.component';

const routes: Routes = [
  {
    path:'person',
    component: PersonSearchComponent
  },
  {
    path:'person/add',
    component: PersonAddComponent
  },
  {
    path:'person/edit/:id',
    component: PersonAddComponent
  },
  {
    path:'department',
    component: DepartmentSearchComponent
  },
  {
    path:'department/add',
    component: DepartmentAddComponent
  },
  {
    path:'department/edit/:id',
    component: DepartmentAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentManagerRoutingModule { }
