import { Injectable } from '@angular/core';
import { BasicService } from './basic.service';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../../shared/service/helper.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillWaterElectrictService extends BasicService {

  constructor(public httpClient: HttpClient, public helperService: HelperService) {
    super('ess', 'billWaterElectric', httpClient, helperService);
  }
  // lấy đơn giá 1 số điện, lấy đơn giá nước 1 m3 nước
  public findPriceUnit(): Observable<any> {
    const url = `${this.serviceUrl}/unit`;
    return this.getRequest(url);
  }
  // tìm hóa đơn gần nhất
  public findBill(): Observable<any> {
    const url = `${this.serviceUrl}/unit`;
    return this.getRequest(url);
  }

  public getAllHouse(data?: any): Observable<any> {
    const url = `${this.serviceUrl}/search`;
    return this.getRequest(url);
  }

}
