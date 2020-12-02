import { UserToken } from '../../core/models/user-token.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
class StorageData {
  userToken: UserToken;
  navState: boolean;
  navFlipState: boolean;
  searchState: any;
  listLang: any;
  listMarket: any;
  currentUrl: any;
}
export class Storage {
  public static data: StorageData;
  private static expriteIn = '_expriteIn';
  private static instanceName = '_HrStorage';

  private static storage = localStorage;

  /**
   * init
   */
  public static init(): void {

  }
  /**
   * isExprited
   */
  public static isExprited(): boolean {
    return false;
  }
  /**
   * clear
   */
  public static clear(): void {
    this.storage.removeItem(this.instanceName);
  }
  /**
   * storedData
   */
  public static storedData(): StorageData {
    const storedData = this.storage.getItem(this.instanceName);
    if (this.isNullOrEmpty(storedData)) {
      return null;
    }
    return JSON.parse(storedData);
  }
  /*
  * Thay cho CommonUtils
  */
  public static isNullOrEmpty(str: any): boolean {
    return !str || (str + '').trim() === '';
  }

  /**
   * get
   */
  public static get(key: string): any {
    if (this.isExprited()) {
      return null;
    }
    const storedData = this.storedData();
    if (storedData == null) {
      return null;
    }
    return storedData[key];
  }
  /**
   * get
   */
  public static set(key: string, val: any): any {
    let storedData = this.storedData();
    if (storedData == null) {
      storedData = new StorageData();
    }
    storedData[key] = val;

    this.storage.setItem(this.instanceName, JSON.stringify(storedData));
  }
  /**
   * getUserToken
   */
  public static getUserToken(): UserToken {
    return this.get('userToken');
  }
  /**
   * setUserToken
   */
  public static setUserToken(userToken) {
    return this.set('userToken', userToken);
  }
  /**
   * getNavState
   */
  public static getNavState(): boolean {
    const navState = this.get('navState');
    return navState === null ? false : navState;
  }
  /**
   * setNavState
   */
  public static setNavState(navState: boolean): void {
    this.set('navState', navState);
  }
  /**
   * getNavFlipState
   */
  public static getNavFlipState(): boolean {
    const navFlipState = this.get('navFlipState');
    return navFlipState === null ? false : navFlipState;
  }
  /**
   * setNavFlipState
   */
  public static setNavFlipState(navFlipState: boolean): void {
    this.set('navFlipState', navFlipState);
  }
  /**
   * getSearchState
   */
  public static getSearchState(): any {
    return this.get('searchState');
  }
  /**
   * setNavFlipState
   */
  public static setSearchState(searchState: any): void {
    this.set('searchState', searchState);
  }

  /**
   * setListMarket
   */
  public static setListMarket(listMarket: any): void {
    this.set('listMarket', listMarket);
  }

  /**
   * getCurrentUrl
   */
  public static getCurrentUrl(): any {
    return this.get('currentUrl');
  }
  /**
   * setCurrentUrl
   */
  public static setCurrentUrl(currentUrl: any): void {
    this.set('currentUrl', currentUrl);
  }

}
