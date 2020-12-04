import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ManagerHouseComponent } from './manager-house/manager-house.component';
import { SuggestionHouseComponent } from './suggestion-house/suggestion-house.component';

const routes: Routes = [  
  {
    path: '',
    component: ManagerHouseComponent
  },
  {
    path: 'suggestion',
    component: SuggestionHouseComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseRoutingModule { }
