import { Injectable } from "@angular/core";
import { BasicService } from "./basic.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HelperService } from "../../shared/service/helper.service";
import { Observable } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { CommonUtils } from "../../shared/service/common-utils.service";

@Injectable({
  providedIn: "root"
})
export class PhongBanService extends BasicService {
  constructor(
    public httpClient: HttpClient,
    public helperService: HelperService
  ) {
    super("ess", "departmentss", httpClient, helperService);
  }

  public getDepartment(data?: any, event?: any): Observable<any> {
    if (!event) {
      this.credentials = Object.assign({}, data);
    }
    const searchData = CommonUtils.convertData(this.credentials);
    if (event) {
      searchData._search = event;
    }
    const buildParams = CommonUtils.buildParams(searchData);
    const url = `${this.serviceUrl}/search`;
    console.log("url", this.serviceUrl);
    return this.getRequest(url, { params: buildParams });
  }

  public getAllWithoutPagination(): Observable<any> {
    const url = `${this.serviceUrl}/`;
    return this.getRequest(url);
  }

  // public getEmployeeListOfDepartment(idDepartment): Observable<any> {
  //   const url = `${this.serviceUrl}/${idDepartment}/employees`;
  //   return this.httpClient.get(url);
  // }

  public getEmployeeListOfDepartment(
    idDepartment: any,
    data?: any,
    event?: any
  ): Observable<any> {
    if (!event) {
      // this.credentials = Object.assign({}, idDepartment);
      this.credentials = Object.assign({}, data);
    }

    const searchData = CommonUtils.convertData(this.credentials);
    if (event) {
      searchData._search = event;
    }
    const buildParams = CommonUtils.buildParams(searchData);
    const url = `${this.serviceUrl}/employees/${idDepartment}`;
    console.log("department service - getEmployeeListOfDepartment : url ", url);
    // return this.getRequest(url, { params: buildParams });
    return this.getRequest(url, { params: buildParams });
  }
}
