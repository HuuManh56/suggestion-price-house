import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BasicService } from './basic.service';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '../../shared/service/storage.service';
import { UserToken } from '../models/user-token.model';
import { HelperService } from '../../shared/service/helper.service';
export class ILoginContext {
  username: string;
  password: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BasicService {
  accessToken: string;
  expiresAt: number;
  userProfile: any;
  authenticated: boolean;

  constructor(public httpClient: HttpClient,
              public helperService: HelperService) {
    super('ess', 'restUtt', httpClient, helperService);
  }

  // actionRequestToken(formValue) {
  //   return this.httpClient.post(this.serviceUrl + '/login', formValue, {responseType: 'text'});
  // }

  // getCurrentUserInfo() {
  //   const headers = {
  //     'Authorization':  window.sessionStorage.getItem("token"),
  //     'Content-Type': 'application/json'
  //   };
  //   return this.httpClient.get(this.serviceUrl + '/currentUserInfo', {headers});
  // }


  extractTokenData(token: any): any {
    // const helper = new JwtHelperService();
    // const decodedToken = helper.decodeToken(token.access_token);
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    const loginUser = {
      access_token: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU5MjE0NTc1NX0.mU-EbW6I-Ag965-h5_YbvWLKmmBsJFyahyR_NAVPfbFlLyUr7iSNSHspBW5dW0U-JsI3dJQ_Z52lSXGL-TX8uQ",
      email: token.email,
      userCode: token.userCode,
      expires_in: token.expires_in,
      fullName: token.fullName,
      userName: token.userName,
      mobileNumber: token.mobileNumber,
      className: token.className,
      majorName: token.majorName,
      departmentName: token.departmentName,
      userId: token.userId,
      roleName: token.roleName,
      roleId: 1,
      role: "ROLE_ADMIN",
      lstRoleCode: ["ROLE_GVCN", "ROLE_ADMIN", "ROLE_SV", "ROLE_GVPT"],
      loginTime: new Date().getTime(),
      tokenExpiresIn: expireDate
    };

    return loginUser;
  }

  /**
   * action request token
   */
  // public actionRequestToken(params: any): Observable<any> {
  //   const url = `${this.serviceUrl}oauth/token`;
  //   return this.postRequest(url, params.toString());
  // }
  /**
   * action request authorities
   */
  public actionRequestAuthorities(appCode: string): Observable<any> {
    const url = `${this.serviceUrl}vps-authorities?appCode=${appCode}`;
    return this.getRequest(url);
  }

  public tokenInfos(): Observable<any> {
    const url = `${this.serviceUrl}token-infos`;
    return this.getRequest(url);
  }
  logout(): Observable<boolean> {
    return of(false);
  }

  get isLoggedIn(): boolean {
    // Check if current date is before token
    // expiration and user is signed in locally
    return this.authenticated;
  }

  actionRequestToken(formValue) {
    const headers = {
      "content-type": "application/x-www-form-urlencoded"
    };
    const payload = new HttpParams()
      .set('userName', formValue.userName)
      .set('password', formValue.password);
    return this.httpClient.post(this.serviceUrl + '/login', payload, {responseType: 'text', headers: headers});
  }

  getCurrentUserInfo() {
    const headers = {
      'Authorization': window.sessionStorage.getItem('token'),
      'Content-Type': 'application/json'
    };
    return this.httpClient.get(this.serviceUrl + '/currentUserInfo', {headers: headers});
  }

}
