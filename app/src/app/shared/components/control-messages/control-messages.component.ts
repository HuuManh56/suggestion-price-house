import { Component, Input } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
@Component({
  selector: 'app-control-messages',
  templateUrl: './control-messages.component.html',
})
export class ControlMessagesComponent {
  @Input()
  public control: FormControl;
  @Input()
  public labelName?: string;
  private replaceKeys = ['max', 'min', 'maxlength', 'minlength', 'dateNotAffter', 'duplicateArray', 'beforeCurrentDate'];
  private actualKeys =  ['max', 'min', 'requiredLength', 'requiredLength', 'dateNotAffter', 'duplicateArray', 'beforeCurrentDate'];
  private translateKeys = ['dateNotAffter', 'duplicateArray', 'beforeCurrentDate'];

  constructor() {}

  get errorMessage(): string {
    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        const messageText = `${propertyName}`;
        const errors = this.control.errors[propertyName];
        return this.buildMessage(messageText, errors);
      }
    }
    return undefined;
  }
  markAsUntouched() {
    this.control.markAsUntouched();
  }
  /**
   * buildMessage
   * @param messageText: string
   * @param errors: ValidationErrors
   */
  buildMessage(messageText: string, errors: ValidationErrors): string {
    for (const i in this.replaceKeys) {
      if (errors && errors.hasOwnProperty(this.actualKeys[i])) {
        const text = errors[this.actualKeys[i]];
        // if (this.translateKeys.indexOf(this.actualKeys[i]) !== -1) {
        //   text = this.translation.translate(text);
        // }
        messageText = messageText.replace(new RegExp('\\$\\{' + this.replaceKeys[i] + '\\}', 'g'), text);
      }
    }
    return messageText;
  }
}
