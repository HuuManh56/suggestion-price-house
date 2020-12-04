import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HelperService } from '../../shared/service/helper.service';
import { BasicService } from './basic.service';
import { Observable } from 'rxjs';
import { CommonUtils } from '../../shared/service/common-utils.service';

@Injectable({
  providedIn: 'root'
})
export class HouseService extends BasicService {

  constructor(public httpClient: HttpClient, public helperService: HelperService) {
    super('ess', 'house', httpClient, helperService);
  }

  public searchData(data?: any, event?: any): Observable<any> {
    if (!event) {
      this.credentials = Object.assign({}, data);
    }

    const searchData = CommonUtils.convertData(this.credentials);
    if (event) {
      searchData._search = event;
    }
    console.log("call api search data", searchData);
    const buildParams = CommonUtils.buildParams(searchData);
    const url = `${this.serviceUrl}/search?`;
    return this.getRequest(url, {params: buildParams});
  }
}
