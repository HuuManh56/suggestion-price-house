import { CommonUtils } from "../../shared/service/common-utils.service";
import { Injectable } from "@angular/core";
import { CONFIG } from "../app-config";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { HelperService } from "../../shared/service/helper.service";
import { Storage } from '../../shared/service/storage.service';
@Injectable()
export class BasicService {
  public serviceUrl: string;
  public module: string;
  public systemCode: string;
  credentials: any = {};

  /**
   * init service from system code and module
   * config value of app-config.ts
   * param systemCode
   * param module
   */
  constructor(
    systemCode: string,
    module: string,
    public httpClient: HttpClient,
    public helperService: HelperService
  ) {
    this.systemCode = systemCode;
    this.module = module;
    const API_URL = environment.serverUrl[this.systemCode];
    const API_PATH = CONFIG.API_PATH[this.module];
    if (!API_URL) {
      console.error(
        `Missing config system service config in src/environments/environment.ts => system: ${this.systemCode}`
      );
      return;
    }
    if (!API_PATH) {
      console.error(
        `Missing config system service config in src/app/app-config.ts => module: ${this.module}`
      );
      return;
    }
    this.serviceUrl = API_URL + API_PATH;
    console.log(this.serviceUrl);
  }
  /**
   * set SystemCode
   * param systemCode
   */
  public setSystemCode(systemCode: string) {
    this.systemCode = systemCode;
    const API_URL = environment.serverUrl[this.systemCode];
    const API_PATH = CONFIG.API_PATH[this.module];
    if (!API_URL) {
      console.error(
        `Missing config system service config in src/environments/environment.ts => system: ${this.systemCode}`
      );
      return;
    }
    if (!API_PATH) {
      console.error(
        `Missing config system service config in src/app/app-config.ts => module: ${this.module}`
      );
      return;
    }
    this.serviceUrl = API_URL + API_PATH;
  }

  public search(data?: any, event?: any): Observable<any> {
    if (!event) {
      this.credentials = Object.assign({}, data);
    }

    const searchData = CommonUtils.convertData(this.credentials);
    if (event) {
      searchData._search = event;
    }
    const buildParams = CommonUtils.buildParams(searchData);
    const url = `${this.serviceUrl}/search?`;
    return this.getRequest(url, { params: buildParams });
  }
  /**
   * findAll
   */
  public findAll(): Observable<any> {
    const url = `${this.serviceUrl}`;
    return this.getRequest(url);
  }
  /**
   * findOne
   * param id
   */
  public findOne(id: number): Observable<any> {
    const url = `${this.serviceUrl}/${id}`;
    return this.getRequest(url);
  }
  /**
   * saveOrUpdate
   */
  public saveOrUpdate(item: any): Observable<any> {
    const url = `${this.serviceUrl}`;
    return this.postRequest(url, CommonUtils.convertData(item));
  }
  /**
   * saveOrUpdateFormFile
   */
  public saveOrUpdateFormFile(item: any): Observable<any> {
    const formdata = CommonUtils.convertFormFile(item);
    const url = `${this.serviceUrl}`;
    return this.postRequest(url, formdata);
  }
  /**
   * deleteById
   * param id
   */
  public deleteById(id: number): Observable<any> {
    const url = `${this.serviceUrl}/${id}`;
    this.helperService.isProcessing(true);
    return this.deleteRequest(url);
    // return this.httpClient.delete(url)
    //   .pipe(
    //     tap( // Log the result or error
    //       res => {
    //         this.helperService.APP_TOAST_MESSAGE.next(res);
    //         this.helperService.isProcessing(false);
    //       },
    //       error => {
    //         this.helperService.APP_TOAST_MESSAGE.next(error);
    //         this.helperService.isProcessing(false);
    //       }
    //     ),
    //     catchError(this.handleError)
    //   );
  }
  /*******************************/

  /**
   * handleError
   */
  public handleError(error: any) {
    const errorMsg = error.message
      ? error.message
      : error.status
      ? `${error.status} - ${error.statusText}`
      : "Server error";
    return throwError(errorMsg);
  }
  /**
   * make get request
   */
  public getRequest(url: string, options?: any): Observable<any> {
    this.helperService.isProcessing(true);

    if (!options){
      options = {
        headers: {'Authorization':  Storage.getUserToken().access_token, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      }
    }
    else {
      options.headers = {'Authorization': Storage.getUserToken().access_token, 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    }
 
    return this.httpClient.get(url, options).pipe(
      tap(
        // Log the result or error
        res => {
          this.helperService.APP_TOAST_MESSAGE.next(res);
          this.helperService.isProcessing(false);
        },
        error => {
          this.helperService.APP_TOAST_MESSAGE.next(error);
          this.helperService.isProcessing(false);
        }
      ),
      catchError(this.handleError)
    );
  }

  
  /**
   * make post request
   */
  public postRequest(url: string, data?: any): Observable<any> {
    this.helperService.isProcessing(true);
    const headers = new HttpHeaders ({
      'Authorization': Storage.getUserToken().access_token,
      'Content-Type': 'application/json'
    });
    return this.httpClient.post(url, data,{headers: headers}).pipe(
      tap(
        // Log the result or error
        res => {
          this.helperService.APP_TOAST_MESSAGE.next(res);
          this.helperService.isProcessing(false);
        },
        error => {
          this.helperService.APP_TOAST_MESSAGE.next(error);
          this.helperService.isProcessing(false);
        }
      ),
      catchError(this.handleError)
    );
  }
  /**
   * make get request
   */
  public deleteRequest(url: string): Observable<any> {
    const headers = new HttpHeaders ({
      'Authorization': Storage.getUserToken().access_token,
      'Content-Type': 'application/json'
    });
    this.helperService.isProcessing(true);
    return this.httpClient.delete(url, {headers: headers}).pipe(
      tap(
        // Log the result or error
        res => {
          this.helperService.APP_TOAST_MESSAGE.next(res);
          this.helperService.isProcessing(false);
        },
        error => {
          this.helperService.APP_TOAST_MESSAGE.next(error);
          this.helperService.isProcessing(false);
        }
      ),
      catchError(this.handleError)
    );
  }
  /**
   * processReturnMessage
   * param data
   */
  public processReturnMessage(data): void {
    this.helperService.APP_TOAST_MESSAGE.next(data);
  }
  /**
   * request is success
   */
  public requestIsSuccess(data: any): boolean {
    let isSuccess = false;
    if (!data) {
      isSuccess = false;
    }
    if (data.type === "SUCCESS") {
      isSuccess = true;
    } else {
      isSuccess = false;
    }
    return isSuccess;
  }
  /**
   * request is success
   */
  public requestIsConfirm(data: any): boolean {
    let isConfirm = false;
    if (!data) {
      isConfirm = false;
    }
    if (data.type === "CONFIRM") {
      isConfirm = true;
    } else {
      isConfirm = false;
    }
    return isConfirm;
  }
  /**
   * confirmDelete
   */
  public confirmDelete(data): void {
    this.helperService.confirmDelete(data);
  }
}
