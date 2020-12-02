import { Injectable } from '@angular/core';
import { BasicService } from './basic.service';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../../shared/service/helper.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService extends BasicService {

  constructor(public httpClient: HttpClient, public helperService: HelperService) {
    super('ess', 'bill', httpClient, helperService);
  }
  public findType(): Observable<any> {
    const url = `${this.serviceUrl}/unit`;
    return this.getRequest(url);
  }
}
