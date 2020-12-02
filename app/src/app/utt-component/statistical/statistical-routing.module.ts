import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BillMonthComponent } from './bill-month/bill-month.component';
import { PersonMonthComponent } from './person-month/person-month.component';


const routes: Routes = [
  // For employee //////////////////////////
  {
    path: "bill-month",
    component: BillMonthComponent
  },
  {
    path: "person-month",
    component: PersonMonthComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticalRoutingModule {}
