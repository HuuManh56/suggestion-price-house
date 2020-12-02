import { Injectable } from '@angular/core';
import { BasicService } from './basic.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HelperService } from '../../shared/service/helper.service';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { CommonUtils } from '../../shared/service/common-utils.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BasicService {
  constructor(public httpClient: HttpClient, public helperService: HelperService) {
    super('ess', 'restUtt', httpClient, helperService);
  }

  public updateuserInfo(data: any): Observable<any> {
    const url = `${this.serviceUrl}/update-personal-information`;
    return this.httpClient.post(url, CommonUtils.convertData(data))
      .pipe(
        tap( // Log the result or error
          res => this.helperService.APP_TOAST_MESSAGE.next(res),
          error => {
            this.helperService.APP_TOAST_MESSAGE.next(error);
          }
        ),
        catchError(this.handleError)
      );
    }

  public getUserInfo(id: number): Observable<any> {
    const userId = CommonUtils.nvl(id);
    const url = `${this.serviceUrl}/userInfo/${userId}`;
    return this.getRequest(url);
  }

  public getListClasses(): Observable<any> {
    const url = `${this.serviceUrl}/list-classes`;
    return this.getRequest(url);
  }

  public getRoles(): Observable<any> {
    const url = `${this.serviceUrl}/get-roles`;
    return this.getRequest(url);
  }

  public findByPositionId(id: number): Observable<any> {
    const positionId = CommonUtils.nvl(id);
    const url = `${this.serviceUrl}/position/${positionId}`;
    return this.getRequest(url);
  }
  public findByUserCode(userCode: string): Observable<any> {
    const url = `${this.serviceUrl}/user-code/${userCode}`;
    return this.getRequest(url);
  }

  public getUserList(data?: any, event?: any): Observable<any> {
    if (!event) {
      this.credentials = Object.assign({}, data);
    }

    const searchData = CommonUtils.convertData(this.credentials);
    if (event) {
      searchData._search = event;
    }
    const buildParams = CommonUtils.buildParams(searchData);
    const url = `${this.serviceUrl}/search-user`;
    return this.getRequest(url, {params: buildParams});
  }

}
