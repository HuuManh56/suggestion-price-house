import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillServiceTypeSeachComponent } from './bill-service-type/bill-service-type-seach/bill-service-type-seach.component';
import { BillServiceTypeFormComponent } from './bill-service-type/bill-service-type-form/bill-service-type-form.component';
import { BillElectricWarterSearchComponent } from './bill-electric-water/bill-electric-warter-search/bill-electric-warter-search.component';
import { BillElectricWaterFormComponent } from './bill-electric-water/bill-electric-water-form/bill-electric-water-form.component';
import { BillOrtherSearchComponent } from './bill-orther/bill-orther-search/bill-orther-search.component';
import { BillOrtherFormComponent } from './bill-orther/bill-orther-form/bill-orther-form.component';


const routes: Routes = [  
  {
    path: 'bill-service-type',
    component: BillServiceTypeSeachComponent
  },
  {
    path:'bill-service-type/add',
    component: BillServiceTypeFormComponent
  },
  {
    path:'bill-service-type/edit/:id',
    component: BillServiceTypeFormComponent
  },
  {
    path:'bill-water-electrict',
    component:BillElectricWarterSearchComponent

  },
  {
    path:'bill-water-electric/add',
    component: BillElectricWaterFormComponent
  },
  {
    path:'bill-water-electric/edit/:id',
    component: BillElectricWaterFormComponent
  },
  {
    path:'bill-orther',
    component: BillOrtherSearchComponent
  },
  {
    path:'bill-orther/add',
    component: BillOrtherFormComponent
  },
  {
    path:'bill-orther/edit/:id',
    component: BillOrtherFormComponent
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillRoutingModule { }
