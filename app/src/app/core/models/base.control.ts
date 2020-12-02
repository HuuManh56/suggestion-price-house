import { SysPropertyDetailBean } from './sys-property-details.model';
import { FormControl, ValidatorFn, Validators } from '@angular/forms';
import { CommonUtils } from './../../shared/service/common-utils.service';
import { ValidationService } from './../../shared/service/validation.service';

export class BaseControl extends FormControl {
  public propertyName = '';
  public actionForm = '';
  public resource = '';

  public propertyConfig: SysPropertyDetailBean;
  public listValidation: Array<ValidatorFn>;
  public isHide = false;
  public isRequire = false;
  public isMultiLanguage = false;

  public configBaseControl(propertyConfig?: any, oldValidator?: any ) {
    // Xu ly set mac dinh required neu khong co cau hinh trong database
    if (oldValidator) {
      if (typeof oldValidator === 'function') {
        const val = oldValidator as ValidatorFn;
        if ( val === Validators.required) {
          this.isRequire = true;
        }
      } else {
        // tslint:disable-next-line:forin
        for (const index in oldValidator) {
          const val = oldValidator[index] as ValidatorFn;
          if ( val === Validators.required) {
            this.isRequire = true;
          }
        }
      }
    }
    if (propertyConfig) {
      this.propertyConfig = propertyConfig;
      this.isHide = this.propertyConfig.isHide;
      this.isRequire = this.propertyConfig.isRequire;
      this.isMultiLanguage = this.propertyConfig.isTranslation;
    }
    this.listValidation = ValidationService.getValidatorArr(oldValidator, this.propertyConfig);
  }

  public getPropertyConfig(): SysPropertyDetailBean {
    return this.propertyConfig;
  }
  public getListValidation(): Array<ValidatorFn> {
    return this.listValidation;
  }
}
