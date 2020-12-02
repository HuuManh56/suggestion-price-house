import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { UttRoutingModule } from './utt-routing.module';


@NgModule({
  imports: [
    CommonModule,
    UttRoutingModule,
    SharedModule,
  ],
  providers: [
  ],
  entryComponents: [],
  declarations: [],
  
})
export class UttModule { }
