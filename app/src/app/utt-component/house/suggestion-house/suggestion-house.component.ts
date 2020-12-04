import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormGroup } from '@angular/forms';
import { RESOURCE, ACTION_FORM } from '../../../core/app-config';
import { HouseService } from '../../../core/services/house.service';
import { BaseComponent } from '../../../shared/components/base-component/base-component.component';

@Component({
  selector: 'app-suggestion-house',
  templateUrl: './suggestion-house.component.html',
  styleUrls: ['./suggestion-house.component.css']
})
export class SuggestionHouseComponent  extends BaseComponent implements OnInit {

 
  formconfig = {
    numberBedroom:  ['',[Validators.required,Validators.max(10),Validators.min(2)]],
    numberBathroom: ['',[Validators.required,Validators.max(10),Validators.min(2)]],
    totalFloor:     ['',[Validators.required,Validators.max(8),Validators.min(2)]],
    area:           ['',[Validators.required,Validators.max(1000),Validators.min(30)]],
    frontWidth:     ['',[Validators.required,Validators.max(20),Validators.min(5)]],
    inletWidth:     ['',[Validators.required,Validators.max(10),Validators.min(1)]],
    distanceCenter: ['',[Validators.required,Validators.max(30000),Validators.min(10)]]
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
    this.processSuggestion();
  }

  public processSuggestion(){
    
  }

  public get f () {
    return this.formSearch.controls;
  }


}
