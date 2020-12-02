import { BaseControl } from '../../../core/models/base.control';
import { CommonUtils } from '../../service/common-utils.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit, Input, OnChanges, ElementRef, ViewChild, Output } from '@angular/core';
import { HelperService } from '../../service/helper.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
})
export class DatePickerComponent implements OnInit, OnChanges {

  @Input()
  public property: FormControl;
  @Input()
  public dateFormat: string;
  @Input()
  public onChange: Function;
  @Input()
  public yearRange: string;
  @Input()
  public showIcon = true;
  @Input()
  public disabled = false;
  @Input()
  public appendTo = '';
  @Input()
  public view = 'date';

  public placeholder: string;

  public dateValue: Date;
  private dateMask: string;
  constructor(
    private helperService: HelperService
  ) {
  }
  private initDefaultYear() {
    const currentYear = new Date().getFullYear();
    this.yearRange = (currentYear - 50) + ':' + (currentYear + 50);
  }

  ngOnInit() {
    if (this.view === 'month') {
      this.placeholder = 'MM/yyyy';
      this.dateFormat = 'mm/yy';
    }
  }
  onBlur(event) {
    if (!this.dateValue && event.currentTarget.value !== '') {
      this.helperService.APP_TOAST_MESSAGE.next({type: 'ERROR', code: 'dateInvalid', message: null});
    }/* else if (this.dateValue && this.dateValue.getTime() < 0) {
      this.helperService.APP_TOAST_MESSAGE.next({type: 'ERROR', code: 'dateInvalid', message: null});
      this.dateValue = null;
      this.onInput(null);
    }*/
  }

  /**
   * set Value
   */
  setValue(value: number) {
    if (CommonUtils.nvl(value) > 0) {
      this.dateValue = new Date(value);
    } else {
      this.dateValue = null;
    }
    this.onInput(null);
  }
  /**
   * ngOnChanges
   */
  ngOnChanges() {
    if (this.property.value) {
      this.dateValue = new Date(this.property.value);
    } else {
      this.dateValue = null;
    }

    if (!this.yearRange) {
      this.initDefaultYear();
    }


  }
  onSelect(event) {
    if (this.dateValue) {
      this.property.setValue(this.dateValue.getTime());
    } else {
      this.property.setValue(null);
    }
    if (this.onChange) {
      this.onChange();
    }
  }
  initDateFormatPosition(dateFormat: string) {
    const maxLength = dateFormat.length;
    const iMask = [];
    for (let i = 0; i < dateFormat.length; i++) {
      const char = dateFormat[i];
      if ('/' === char) {
        iMask.push(i - iMask.length > 0 ? (i - iMask.length - 1) : (i - iMask.length));
      }
    }
    const parse = {
      maxLength: maxLength
      , isBackward: (cursorPosition) => {
        const char = dateFormat.substr(cursorPosition, 1);
        return char === '/';
      }, isForward: (i) => {
        return iMask.indexOf(i) >= 0;
      }
    };
    return parse;
  }
  onInput(event): void {

    if (event) {
      let cursorPosition = event.target.selectionEnd;
      if (event.inputType === 'deleteContentBackward') {
          event.target.value = event.target.value.substring(0, cursorPosition - 1) + event.target.value.substring(cursorPosition);
          cursorPosition --;
      }
      if (event.inputType === 'insertText' && (event.target.value.length)) {
          event.target.value = event.target.value.substring(0, event.target.value.length - 1);
      }

      this.dateMask = event.target.value.toString();
      this.dateMask = this.dateMask.replace(/\D/g, '');

      let mask = '';
      for (let i = 0; i < this.dateMask.length; i++) {
          mask += this.dateMask[i];
          // if (parseFormat.isForward(i)) {
          //     mask += '/';
          //     if (parseFormat.isBackward(cursorPosition)) { cursorPosition++; }
          // }
      }
      event.target.value = mask.toString();
      event.target.selectionStart = cursorPosition;
      event.target.selectionEnd = cursorPosition;
    }
    if (this.dateValue) {
      this.property.setValue(this.dateValue.getTime());
    } else {
      this.property.setValue(null);
    }
    if (this.onChange) {
      this.onChange();
    }
  }

}
