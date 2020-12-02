import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Routes, RouterModule } from '@angular/router';
import { ManagerHouseComponent } from './manager-house/manager-house.component';

const routes: Routes = [  
  {
    path: '',
    component: ManagerHouseComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseRoutingModule { }
