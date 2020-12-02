import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { BasicService } from './basic.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { HelperService } from '../../shared/service/helper.service';

@Injectable({
  providedIn: 'root'
})
export class FileStorageService extends BasicService {

  constructor(public httpClient: HttpClient, public helperService: HelperService) {
    super('file', 'fileStorage', httpClient, helperService);
  }
  /**
   * deleteFile
   * param id
   */
  public deleteFile(id: string): Observable<any> {
    const url = `${this.serviceUrl}/delete/${id}`;
    return this.deleteRequest(url);
  }
  /**
   * downloadFile
   * param id
   */
  public downloadFile(id: string): Observable<any> {
    const url = `${this.serviceUrl}/download/${id}`;
    return this.getRequest(url, {responseType: 'blob'});
  }
}
