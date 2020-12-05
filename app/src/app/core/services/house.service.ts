import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonUtils } from '../../shared/service/common-utils.service';
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

  

  public processSuggestion(data?: any): Observable<any> {
    const url = `${this.serviceUrl}/suggestion?`;
    // return this.getRequest(url);
    const buildParams = CommonUtils.buildParams(data);
    return this.getRequest(url, { params: buildParams });

  }
}
