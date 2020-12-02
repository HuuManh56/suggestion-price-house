import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonMonthComponent } from './person-month/person-month.component';
import { BillMonthComponent } from './bill-month/bill-month.component';

import { SharedModule } from '../../shared/shared.module';
import { StatisticalRoutingModule } from './statistical-routing.module';


@NgModule({
  declarations: [PersonMonthComponent, BillMonthComponent],
  imports: [
    CommonModule,
    StatisticalRoutingModule,
    SharedModule
  ] 
})
export class StatisticalModule { }
