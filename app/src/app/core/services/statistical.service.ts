import { Injectable } from '@angular/core';
import { BasicService } from './basic.service';
import { HttpClient } from '@angular/common/http';
import { HelperService } from '../../shared/service/helper.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticalService extends BasicService {

  constructor(public httpClient: HttpClient, public helperService: HelperService) {
    super('ess', 'statistical', httpClient, helperService);
  }
}
