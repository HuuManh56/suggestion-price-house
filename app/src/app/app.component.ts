import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HelperService } from './shared/service/helper.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // Định nghĩa mấy cái service của shared vào đây là đứt
  providers: [ MessageService ]
})
export class AppComponent {
  title = 'ut-web-app';
  public blocked = false;
  constructor(public helperService: HelperService
            , private messageService: MessageService
            , private confirmationService: ConfirmationService
            ) {
    this.helperService.APP_TOAST_MESSAGE.subscribe(data => {
      this.processReturnMessage(data);
    });
    if (!this.helperService.APP_CONFIRM_DELETE.getValue()) {
      this.helperService.APP_CONFIRM_DELETE.subscribe(data => {
        if (data && data['accept']) {
          this.confirmDelete(data['messageCode'], data['accept']);
        }
      });
    }
    this.helperService.APP_SHOW_PROCESSING.subscribe(isProcessing => {
      this.isProcessing(isProcessing);
    });
  }

  public getConfirmationService(): ConfirmationService {
    return this.confirmationService;
  }

   /**
   * confirmMessage
   */
  confirmMessage(messageCode: string, accept: Function, reject?: Function) {
    const message = 'Bạn có muốn lưu thông tin?';
    const header = 'Xác nhận';
    return this.confirmationService.confirm({
        message: message,
        header: header,
        icon: 'pi pi-exclamation-triangle',
        accept: accept,
        reject: reject
    });
  }

  /**
   * confirmMessage
   */
  confirmMessageError(messageCode: string, accept: Function, reject: Function, valueError?: any) {
    const message = valueError + ' ' + 'Bạn có muốn lưu thông tin?';
    const header = 'Xác nhận';
    return this.confirmationService.confirm({
        message: message,
        header: header,
        icon: 'pi pi-exclamation-triangle',
        accept: accept,
        reject: reject
    });
  }
  /**
   * confirmDelete
   */
  confirmDelete(messageCode: string, accept: Function, reject?: Function) {
    if (!accept) {
      return;
    }
    if (!reject) {
      reject = () => {
        return false;
      };
    }
    let message;
    if (messageCode) {
      message = messageCode;
    } else {
      message = 'Bạn có chắc chắn xóa bản ghi?';
    }
    const header = 'Xác nhận xóa';
    return this.confirmationService.confirm({
        message: message,
        header: header,
        icon: 'pi pi-info-circle',
        accept: accept,
        reject: reject
    });
  }
  /**
   * successMessage
   * param errorType
   * param errorCode
   */
  successMessage(code: string, message?: string) {
    this.toastMessage('SUCCESS', code, message);
  }
  /**
   * errorMessage
   * param errorType
   * param errorCode
   */
  errorMessage(code: string, message?: string) {
    this.toastMessage('ERROR', code, message);
  }
  /**
   * warningMessage
   * param errorType
   * param errorCode
   */
  warningMessage(code: string, message?: string) {
    this.toastMessage('WARNING', code, message);
  }

  /**
   * toastMessage
   * param severity
   * param errorType
   * param errorCode
   */
  public toastMessage(severity: string, code: string, message?: string) {
    let detail;
    message = severity === 'CONFIRM' ? null : message;
    severity = severity === 'CONFIRM' ? 'WARNING' : severity;
    if (!code) {
      detail = `${severity}`;
    } else {
      detail = code;
    }
    severity = severity === 'WARNING' ? 'WARN' : severity;
    const summary = 'Thông báo';
    this.messageService.add({severity: severity.toLowerCase(), summary: summary, detail: detail});
  }

  public message(severity: string, text: string) {
    this.messageService.add({severity: severity.toLowerCase(), summary: 'Thông báo', detail: text});
  }

  public messageError(severity: string, text: string, value: any) {
    const message = text;
    const textDetail = message + ' ' + value;
    this.messageService.add({severity: severity.toLowerCase()
                        , summary: 'Thông báo'
                        , detail: textDetail});
  }

  public messError(severity: string, text: string, valueError?: any) {
    const message = text;
    const textDetail = valueError + ' ' + message;
    this.messageService.add({severity: severity.toLowerCase()
                        , summary: 'Thông báo'
                        , detail: textDetail});
  }

  /**
   * process return message
   * param serviceResponse
   */
  public processReturnMessage(serviceResponse: any) {
    if (!serviceResponse) {
      return;
    }
    if (serviceResponse.status === 500 || serviceResponse.status === 0) {
      this.errorMessage('Có lỗi xảy ra');
      return;
    }
    if (serviceResponse.code) {
      this.toastMessage(serviceResponse.type, serviceResponse.code, serviceResponse.message);
      return;
    }
  }
  /**
   * request is success
   */
  public requestIsError(): void {
    this.toastMessage('ERROR', 'Có lỗi xảy ra');
  }
  public isProcessing(isProcessing: boolean) {
    if (this.blocked && !isProcessing ) {
      setTimeout(() => {
        this.blocked = isProcessing;
        this.updateViewChange();
      }, 500);
    } else if (!this.blocked && isProcessing ) {
      this.blocked = isProcessing;
      this.updateViewChange();
    }
  }
  private updateViewChange() {
    const progressSpinnerCheck = document.getElementById('progressSpinnerCheck');
    if (progressSpinnerCheck) {
      document.getElementById('progressSpinnerCheck').className = this.blocked ? 'progressing' : '';
    }
  }
}
