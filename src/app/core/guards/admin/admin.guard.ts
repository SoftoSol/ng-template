import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Roles from '../../enums/roles.enum';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  roles: Roles | undefined
  constructor(private _router:Router){}
  canActivate() {
    if (this.roles == Roles.Admin) {
      return true;
    } else {
      this._router.navigate(["/"]);
      return false;
    }
  }
}
