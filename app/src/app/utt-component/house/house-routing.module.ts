import { NgModule , LOCALE_ID} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ManagerHouseComponent } from './manager-house/manager-house.component';
import { SuggestionHouseComponent } from './suggestion-house/suggestion-house.component';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/vi';
registerLocaleData(localeFr);

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
  
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'vi-VN'
     }
  ],
  exports: [RouterModule]
})
export class HouseRoutingModule { }
