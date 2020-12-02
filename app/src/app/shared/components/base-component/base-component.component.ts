import { OnInit, ViewChild, Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormGroup } from "@angular/forms";
import { CommonUtils } from "../../service/common-utils.service";
import { DEFAULT_MODAL_OPTIONS, ACTION_FORM } from "../../../core/app-config";
import { SysPropertyDetailBean } from "../../../core/models/sys-property-details.model";
import { debug } from "util";
import { Storage } from '../../service/storage.service';
@Injectable()
export class BaseComponent {
  public propertyConfigs = new Array<SysPropertyDetailBean>();
  public actionForm: ACTION_FORM;
  public resource;
  /**
   * Bien ho tro tim kiem chung
   */
  resultList: any = {};
  formSearch: FormGroup;
  @ViewChild("ptable") dataTable: any;
  private mainService: any;

  constructor(
    public actr?: ActivatedRoute,
    resource?,
    actionForm?: ACTION_FORM
  ) {
    if (actionForm) {
      this.actionForm = actionForm;
    }
    if (resource) {
      this.resource = resource;
    }
    this.findPropertyDetails();
  }
  /**
   * Build FormGroup
   * @param formData value of controls (Ex: data)
   * @param formConfig object formConfig (Ex: formConfig)
   * @param actionForm action of this Form (Ex: ACTION_FORM.INSERT)
   * @param validateForm validate of FormGroup
   */
  public buildForm(
    formData: any,
    formConfig: any,
    actionForm?: ACTION_FORM,
    validateForm?: any
  ): FormGroup {
    if (actionForm) {
      this.actionForm = actionForm;
      // console.log('ActionForm is being built ->', this.actionForm);
    }
    return CommonUtils.createFormNew(
      this.resource,
      this.actionForm,
      formData,
      formConfig,
      this.propertyConfigs,
      validateForm
    );
  }
  /**
   * Lay cau hinh cac thuoc tinh
   */
  private findPropertyDetails() {
    if (!this.actr) {
      return;
    }
    this.actr.data.subscribe(res => {
      if (res && res.props && res.props.data && res.props.data.length > 0) {
        this.propertyConfigs = CommonUtils.toPropertyDetails(res.props.data);
      }
    });
  }
  /**
   * findPropertyConfigByCode
   * @param code : propertyCode
   */
  public findPropertyConfigByCode(code: string): SysPropertyDetailBean {
    const data = this.propertyConfigs.filter(
      item => item.propertyCode === code && item.actionForm === this.actionForm
    );
    return data[0];
  }
  /**
   * findAllPropertyConfigs
   */
  public findAllPropertyConfigs() {
    return this.propertyConfigs;
  }

  /**
   * Xu ly tim kiem chung
   */
  public setMainService(serviceSearch) {
    this.mainService = serviceSearch;
  }

  public setDataTable(
    param = {
      resultList: null,
      formSearch: null
    }
  ) {
    this.resultList = param.resultList;
    this.formSearch = param.formSearch;
  }

  public processSearch(event?): void {
    if (!CommonUtils.isValidForm(this.formSearch)) {
      return;
    }
    const params = this.formSearch ? this.formSearch.value : null;
    this.mainService.search(params, event).subscribe(res => {
      this.resultList = res;
      
    });

    if (!event) {
      if (this.dataTable) {
        this.dataTable.first = 0;
      }
    }
  }

  /**
   * Xu ly xoa
   */
  public processDelete(id): void {
    if (id && id > 0) {
      this.mainService.confirmDelete({
        messageCode: null,
        accept: () => {
          this.mainService.deleteById(id).subscribe(res => {
            if (this.mainService.requestIsSuccess(res)) {
              this.processSearch();
            }
          });
        }
      });
    }
  }

  /**
   * Xu ly show popup
   */
  public activeFormModal(service, component, data) {
    const modalRef = service.open(component, DEFAULT_MODAL_OPTIONS);
    modalRef.componentInstance.setFormValue(this.propertyConfigs, data);
    modalRef.result.then(result => {
      if (!result) {
        return;
      }
      if (this.mainService.requestIsSuccess(result)) {
        this.processSearch();
      }
    });
  }

  /**
   * Xu ly show popup
   */
  public havePermission(roleCode) {
    const lstRole = Storage.getUserToken().lstRoleCode;
    if(lstRole == null) {
      return false;
    }
    if(lstRole.indexOf(roleCode)>=0 || lstRole.indexOf("ROLE_ADMIN")>=0) {
      return true;
    }
     return false;
  }
}
