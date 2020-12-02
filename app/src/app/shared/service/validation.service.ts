import { BaseControl } from './../../core/models/base.control';
import { SysPropertyDetailBean } from './../../core/models/sys-property-details.model';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn, FormGroup, Validators, FormBuilder, FormArray, FormControl, ValidationErrors } from '@angular/forms';
import { CommonUtils } from './common-utils.service';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  public static passwordValidator(control: AbstractControl): any {
    if (!control.value) { return; }

    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    // (?!.*\s)          - Spaces are not allowed
    return (control.value.match(/^(?=.*\d)(?=.*[a-zA-Z!@#$%^&*])(?!.*\s).{6,100}$/)) ? '' : { invalidPassword: true };
  }

  /**
   * validate onlyLetterNumber
   */
  public static onlyLetterNumber(control: AbstractControl): any {
    if (!control.value) { return; }
    return (control.value.match(/^[0-9a-zA-Z]+$/)) ? '' : { onlyLetterNumber: true };
  }

  /**
   * validate onlyLetterNumberSp
   */
  public static onlyLetterNumberSp(control: AbstractControl): any {
    if (!control.value) { return; }
    return (control.value.match(/^[0-9a-zA-Z\ ]+$/)) ? '' : { onlyLetterNumber: true };
  }

  /**
   * validate personalIdNumber
   */
  public static personalIdNumber(control: AbstractControl): any {
    if (!control.value) { return; }
    return (control.value.match(/^[0-9a-zA-Z]{8,15}$/)) ? '' : { personalIdNumber: true };
  }

  /**
   * validate phone
   */
  public static phone(control: AbstractControl): any {
    if (!control.value) { return; }
    return (control.value.match(/^([\+])?(\d([.\s])?){1,15}$/)) ? '' : { phone: true };
  }

  /**
   * validate mobileNumber
   */
  public static mobileNumber(control: AbstractControl): any {
    if (!control.value) { return; }
    return (control.value.match(/^([+][0-9]{1,3}([ .-])?)?([(][0-9]{1,6}[)])?([0-9 .-]{1,32})(([A-Za-z :]{1,11})?[0-9]{1,4}?)$/))
            ? '' : { mobileNumber: true };
  }

  /**
   * validate integer
   */
  public static integer(control: AbstractControl): any {
    if (!control.value) { return; }
    return (control.value.toString().match(/^[\-\+]?\d+$/)) ? '' : { '* Không phải số nguyên': true };
  }

  /**
   * validate positiveInteger
   */
  public static positiveInteger(control: AbstractControl): any {
    if (!control.value) { return; }
    return (control.value.toString().match(/^\d+$/)) ? '' : { '* Không phải số nguyên dương': true };
  }

  /**
   * validate number
   */
  public static number(control: AbstractControl): any {
    if (!control.value) { return; }
    return (control.value.toString().match(/^[\-\+]?(([0-9]+)([\.]([0-9]+))?|([\.]([0-9]+))?)$/))
            ? '' : { number: true };
  }

  /**
   * validate positiveNumber
   */
  public static positiveNumber(control: AbstractControl): any {
    if (!control.value) { return; }
    return (control.value.toString().match(/^(([0-9]+)([\.]([0-9]+))?|([\.]([0-9]+))?)$/))
            ? '' : { positiveNumber: true };
  }

    /**
   * validate beforeCurrentDate
   */
  public static beforeCurrentDate(control: AbstractControl): any {
    if (!control.value) { return; }
    const x = new Date().getTime();
    return (control.value < x)
            ? '' : { beforeCurrentDate: true };
  }
  public static afterCurrentDate(control: AbstractControl): any {
    if (!control.value) { return; }
    const x = new Date().getTime();
    return (control.value >= x)
            ? '' : { afterCurrentDate: true };
  }

  /**
   * Validate IP
   * @param control : any
   */
  public static isIp(control: AbstractControl): any {
    if (!control.value) { return; }
    const str: string  = '^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.'
                      + '){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$';
    const regExp = new RegExp(str);
    if (!regExp.test(control.value)) {
      return {isIp: true};
    }
    return '';
  }
    /**
   * Validate URL
   * @param control : any
   */
  public static isUrl(control: AbstractControl): any {
    if (!control.value) { return; }
    const str = '(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|' +
    'www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|' +
    'https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})';
    const regExp = new RegExp(str);
    if (!regExp.test(control.value)) {
      return {isUrl: true};
    }
    return '';
  }

  /** Validate email format */
  public static emailFormat(control: AbstractControl): any {
    if (!control.value) { return; }
    // tslint:disable-next-line:max-line-length
    return (control.value.match(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i))
            ? '' : { invalidEmail: true };
  }

  /**
   * Validate date not affter date
   * @param targetKey: any
   * @param toMatchKey: any
   */
  public static notAffter(targetKey: string, toMatchKey: string, labelMatchCode: string): ValidatorFn {
    return (group: FormGroup): {[key: string]: any} => {
      const target = group.controls[targetKey];
      const toMatch = group.controls[toMatchKey];
      if (target.value && toMatch.value) {
        const isCheck = target.value <= toMatch.value;
        // set equal value error on dirty controls
        if (!isCheck && target.valid && toMatch.valid) {
          target.setErrors({dateNotAffter: {dateNotAffter: labelMatchCode}});
          target.markAsTouched();
        }
        if (isCheck && target.hasError('dateNotAffter')) {
          target.setErrors(null);
          target.markAsUntouched();
        }
      }
      return null;
    };
  }
  public static getValidatorArr(oldArr: Array<ValidatorFn>, prop?: SysPropertyDetailBean): Array<ValidatorFn> {
    const validators = new Array<ValidatorFn>();
    if (oldArr && oldArr.length > 0 && (prop === null || prop === undefined)) {
      return oldArr;
    }
    if (prop === null || prop === undefined || prop.isHide === true) {
      return validators;
    }
    if (prop.isRequire) {
      validators.push(Validators.required);
    }
    if (prop.isEmail) {
      validators.push(Validators.email);
    }
    if (prop.isNumber) {
        validators.push(ValidationService.number);
    }
    if (prop.isUrl) {
      validators.push(ValidationService.isUrl);
    }
    if (prop.isIp) {
      validators.push(ValidationService.isIp);
    }
    if (prop.minLength) {
      validators.push(Validators.minLength(prop.minLength));
    }
    if (prop.maxLength) {
      validators.push(Validators.maxLength(prop.maxLength));
    }
    if (prop.numberMin) {
      validators.push(Validators.min(prop.numberMin));
    }
    if (prop.numberMax) {
      validators.push(Validators.max(prop.numberMax));
    }
    if (prop.password) {
      validators.push(ValidationService.passwordValidator);
    }
    if (prop.phone) {
      validators.push(ValidationService.phone);
    }
    if (prop.mobileNumber) {
      validators.push(ValidationService.mobileNumber);
    }
    if (prop.personalIdNumber) {
      validators.push(ValidationService.personalIdNumber);
    }
    if (prop.beforeCurrentDate) {
      validators.push(ValidationService.beforeCurrentDate);
    }
    if (prop.numberType) {
      switch (prop.numberType) {
        case 'isNumber':
          validators.push(ValidationService.number);
          break;
        case 'positiveNumber':
          validators.push(ValidationService.positiveNumber);
          break;
        case 'integer':
          validators.push(ValidationService.integer);
          break;
        case 'positiveInteger':
          validators.push(ValidationService.positiveInteger);
          break;
      }
    }
    if (prop.emailFormat) {
      validators.push(ValidationService.emailFormat);
    }
    return validators;
  }
/**
   * Validate 'Đơn vị, Chức danh công việc không được phép trùng'
   * @param targetKey: any
   * @param toMatchKey: any
   */
  public static duplicateArray(controlKeys: Array<string>, target: string, messageKey?: string): ValidatorFn {
    return (array: FormArray) => {
      // target.setErrors({duplicateArray: {duplicateName: messageKey}});
      // target.markAsTouched();
      const map: object = {};
      for (const group of array.controls) {
        const controlTaget = group.get(target) as FormControl;
        let count = 0;
        const values = [];
        for (const key of controlKeys) {
          const control = group.get(key) as FormControl;
          if (control.value !== null && control.value !== '') {
            values.push(control.value);
            count++;
          }
        }
        const k = '/' + values.join('/') + '/';
        if (controlKeys.length === count) {
          if (map.hasOwnProperty(k)) {
            controlTaget.setErrors({duplicateArray: {duplicateArray: messageKey}});
            controlTaget.markAsTouched();
          } else {
            map[k] = true;
          }
        }
      }
      return null;
    };
  }
  // Hàm xử lý validate bắt buộc nhập các trường còn lại nếu có 1 trường trong danh sách được nhập
  public static requiredIfHaveOne(control: AbstractControl): any {
      let isRequire = false;
      const group = control.parent as FormGroup;
      Object.keys(group.controls).forEach(key => {
        const controlEl = group.get(key) as BaseControl;
        if (controlEl.propertyName !== (control as BaseControl).propertyName) {
          console.log('requiredIfHaveOne: ' + (control as BaseControl).propertyName);
          if (controlEl.listValidation) {
            for (const f of controlEl.listValidation) {
              const fn = f as ValidatorFn;
              if ( fn === ValidationService.requiredIfHaveOne && controlEl.value) {
                isRequire = true;
              }
            }
          }
        }
      });
      if (isRequire && !control.value) {
        return {requiredIfHaveOne: true};
      }
      return null;
  }
}
