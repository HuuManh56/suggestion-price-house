import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormGroup } from '@angular/forms';
import { RESOURCE, ACTION_FORM } from '../../../core/app-config';
import { HouseService } from '../../../core/services/house.service';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';
import { CommonUtils } from '../../../shared/service/common-utils.service';

@Component({
  selector: 'app-suggestion-house',
  templateUrl: './suggestion-house.component.html',
  styleUrls: ['./suggestion-house.component.css']
})
export class SuggestionHouseComponent  extends BaseComponent implements OnInit {

 
  formconfig = {
    numberBedroom:  ['',[Validators.required,Validators.max(10),Validators.min(1)]],
    numberBathroom: ['',[Validators.required,Validators.max(10),Validators.min(1)]],
    totalFloor:     ['',[Validators.required,Validators.max(8),Validators.min(1)]],
    area:           ['',[Validators.required,Validators.max(500),Validators.min(20)]],
    frontWidth:     ['',[Validators.required,Validators.max(20),Validators.min(3)]],
    inletWidth:     ['',[Validators.required,Validators.max(10),Validators.min(1)]],
    distanceCenter: ['',[Validators.required,Validators.max(30000),Validators.min(10)]],
    price: [''],
    priceFrom: [''],
    priceTo: [''],
    frontWidthFrom:[''],
    frontWidthTo:[''],
    inletWidthFrom:[''],
    inletWidthTo:[''],
    distanceCenterFrom: [''],
    distanceCenterTo: [''],
  };
  
  constructor(
    public actr: ActivatedRoute,    
    public router: Router,
    public houseService : HouseService,
  ) {
    super(actr,RESOURCE.HOUSE, ACTION_FORM.SEARCH);
    this.setMainService(houseService);
    this.formSearch = this.buildForm({}, this.formconfig);
  };

  ngOnInit() {
    
  }

  public processSuggestion(){
    
    if (!CommonUtils.isValidForm(this.formSearch) ) {
      return;
    }
    this.houseService.processSuggestion(this.formSearch.value).subscribe( res =>{
      console.log("res",res)
      this.formSearch.controls['price'].setValue(res.price);
      this.resultList = res;
    });
    // this.formSearch.controls['price'].setValue(1000);
  }

 


  public get f () {
    return this.formSearch.controls;
  }


}
