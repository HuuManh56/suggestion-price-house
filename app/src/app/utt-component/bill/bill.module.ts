import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http';
import { BillRoutingModule } from './bill-routing.module';
import { BillServiceTypeSeachComponent } from './bill-service-type/bill-service-type-seach/bill-service-type-seach.component';
import { BillServiceTypeFormComponent } from './bill-service-type/bill-service-type-form/bill-service-type-form.component';
import { SharedModule } from '../../shared/shared.module';


import { BillElectricWarterSearchComponent } from './bill-electric-water/bill-electric-warter-search/bill-electric-warter-search.component';
import { BillElectricWaterFormComponent } from './bill-electric-water/bill-electric-water-form/bill-electric-water-form.component';
import { BillOrtherSearchComponent } from './bill-orther/bill-orther-search/bill-orther-search.component';
import { BillOrtherFormComponent } from './bill-orther/bill-orther-form/bill-orther-form.component';

@NgModule({
  declarations: [BillServiceTypeSeachComponent, BillServiceTypeFormComponent, BillElectricWarterSearchComponent, BillElectricWaterFormComponent, BillOrtherSearchComponent, BillOrtherFormComponent],
  imports: [
    SharedModule,
    HttpClientModule,
    CommonModule,
    BillRoutingModule,
  ]
})
export class BillModule { }
