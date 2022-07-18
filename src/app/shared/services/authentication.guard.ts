import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let userInfo;
    try {
      userInfo = JSON.parse(localStorage.getItem('userInfo') as string);
    }  catch (e) {
      userInfo = null;
    }

    if (userInfo && userInfo.id) {
      return true;
    } else {
      return false;
    }
  }

}
