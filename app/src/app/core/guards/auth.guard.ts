import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '../../shared/service/storage.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
          const userToken = Storage.getUserToken();
        // const tokenExpires = Number(CommonUtils.getTokenExpiresIn());
        // console.log('tokenExpires', tokenExpires);
        // if (!tokenExpires || tokenExpires < new Date().getTime()
        if (!userToken) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      }

}
