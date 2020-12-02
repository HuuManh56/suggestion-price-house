import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HelperService } from '../../shared/service/helper.service';
import { BasicService } from './basic.service';

@Injectable({
  providedIn: 'root'
})
export class HouseService extends BasicService {

  constructor(public httpClient: HttpClient, public helperService: HelperService) {
    super('ess', 'house', httpClient, helperService);
  }
}
