import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../../shared/service/helper.service';
import { BasicService } from './basic.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService extends BasicService {

  constructor(
    public httpClient: HttpClient,
    public helperService: HelperService
  ) {
    super("ess", "report", httpClient, helperService);
  }

  public getPersonAmountByYear(year: any): Observable<any> {
    const url = `${this.serviceUrl}/person/${year}`;
    return this.getRequest(url);
  }

  public getDashBoard(): Observable<any> {
    const url = `${this.serviceUrl}/dash-board`;
    return this.getRequest(url);
  }

  public getEmployeeAmountByYear(year: any): Observable<any> {
    const url = `${this.serviceUrl}/employee/${year}`;
    return this.getRequest(url);
  }

  public getTotalPriceByYear(year: any, type: any): Observable<any> {
    const url = `${this.serviceUrl}/bill/${year}/${type}`;
    return this.getRequest(url);
  }
}
