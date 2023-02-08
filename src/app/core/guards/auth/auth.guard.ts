import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import localStorageVar from '../../constants/local-storage-var';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  constructor(private _router: Router){}
  canActivate(){
    if(localStorage.getItem(localStorageVar.token)){
      return true;
    }else{
      this._router.navigate(['provaide your desired route e.g auth/login']);
      return false;
    }
  }
}
