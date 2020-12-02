import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../shared/components/base-component/base-component.component';
import { Validators, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../../../../app.component';
import { BillOrtherService } from '../../../../core/services/bill-orther.service';
import { BillService } from '../../../../core/services/bill.service';
import { CommonUtils } from '../../../../shared/service/common-utils.service';
import { DepartmentService } from '../../../../core/services/department.service';
import { min } from 'rxjs/operators';

@Component({
  selector: 'app-bill-orther-form',
  templateUrl: './bill-orther-form.component.html',
  styleUrls: ['./bill-orther-form.component.css']
})
export class BillOrtherFormComponent extends BaseComponent implements OnInit {

  private formConfig = {
    id :    [''],
    code :  [''],
    fromDate :  ['',[Validators.required]],
    toDate :  ['',[Validators.required]],
    idApartment :  ['',[Validators.required]],
    amount:[''],
    totalPrice: [''],
    idDepartment:[''],
  };
  private formConfigOrther = {
    id :[''],
    idType :['',[Validators.required]],
    price :[''],
    amount:['',[Validators.required,Validators.min(1)]],
    unit:['']
  }
  private apartmentList: any;
  private id: any;
  public listType: any = [];
  private formSave : FormGroup;
  private  formOrther  : FormArray;
  constructor(
    public actr: ActivatedRoute,
    public router: Router,
    private app: AppComponent,
    private billOrtherService: BillOrtherService,
    private billServiceType: BillService,
    private departmentService: DepartmentService
  ) {
    super (null);
    this.setMainService(billOrtherService);
    this.formSave = this.buildForm({}, this.formConfig);
    this.actr.params.subscribe(params => {
      if (params && params.id != null) {
        this.id = params.id;
        this.setFormValue(this.id);
      }else{
        this.buildFormOrther();
        this.formSave = this.buildForm({}, this.formConfig);
      }
    });
   }
    
  ngOnInit() {

    this.billServiceType.findType().subscribe(data => {
      data.forEach(item => {
        this.listType.push({ label: item.name, value: item.id, unit:item.unit, price:item.price });
      });
    });

    this.departmentService.getAllApartment().subscribe( res =>{
      this.apartmentList = res.data;
    } );
  }

  private setFormValue (id) {
      this.billOrtherService.findOne(id).subscribe(res => {
        this.formSave = this.buildForm(res.data['billOrtherBo'], this.formConfig);
        this.buildFormOrther(res.data['listBillOrther'])
      }
    )
  }

  private makeDefaultPersonForm(): FormGroup {
    const formGroup = this.buildForm({}, this.formConfigOrther);
    return formGroup;
  }

  private buildFormOrther(listEmp?: any) {
    let controls = new FormArray([]);
    
    if(listEmp && listEmp.length > 0) {
      for (const emp of listEmp) {
        const group = this.makeDefaultPersonForm();
        group.patchValue(emp);
        controls.push(group);
      }
    } else {
      const group = this.makeDefaultPersonForm();
      controls.push(group);
    }
    this.formOrther = controls;
  }
   /**
   * addEmp
   * param index
   * param item
   */
  public addPerson(index: number, item: FormGroup) {
    const controls = this.formOrther as FormArray;
    controls.insert(index + 1, this.makeDefaultPersonForm());
    
  }
  /**
   * removeEmp
   * param index
   * param item
   */
  public removePerson(index: number, item: FormGroup) {
    const controls = this.formOrther as FormArray;
    if (controls.length === 1) {
      this.buildFormOrther(null);
    }
    controls.removeAt(index);
  }
  private back() {
    this.router.navigate(['/bill/bill-orther']);
  }

  get f () {
    return this.formSave.controls;
  }
  get fOrther(){
    return this.formOrther.controls
  }
  public setInfoType(item, event){
    for(var i =0; i< this.listType.length; i++){
      if(event.value == this.listType[i]['value'] ){
        item.controls['unit'].setValue(this.listType[i].unit)
        item.controls['price'].setValue(this.listType[i].price)
      } 
    }
  }
  public processSaveOrUpdate(){
    if (!CommonUtils.isValidForm(this.formSave) || !CommonUtils.isValidForm(this.formOrther)) {
      return;
    }
    if( this.formSave.controls['fromDate'].value >= this.formSave.controls['toDate'].value ){
      alert("Ngày bắt đầu phải nhỏ hơn ngày kết thúc")
      return;
    }
    const formInput= {};
    formInput['listBillOrther']= this.formOrther.value;
     var total = 0;
    for ( var i =0; i< formInput['listBillOrther'].length; i++ ){
      total = total+ this.formOrther.value[i].price * this.formOrther.value[i].amount
    }
    this.formSave.controls['totalPrice'].setValue(total)
    formInput['billOrtherBo']= this.formSave.value;
  this.app.confirmMessage(null, () => {// on accepted
   
    this.billOrtherService.saveOrUpdate(formInput)
      .subscribe(res => {
        if (this.billOrtherService.requestIsSuccess(res)) {
          this.back();
        } 
      });
  }, () => {
    // on rejected
  });


  }

}
