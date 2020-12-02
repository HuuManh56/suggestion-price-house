import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerHouseComponent } from './manager-house/manager-house.component';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { HouseRoutingModule } from './house-routing.module';
import { ManageHouseFormComponent } from './manage-house-form/manage-house-form.component';
@NgModule({
  declarations: [ManagerHouseComponent, ManageHouseFormComponent],
  imports: [
    SharedModule,
    HttpClientModule,
    CommonModule,
    HouseRoutingModule
  ]
})
export class HouseModule { }
