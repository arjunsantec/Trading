import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private sharedservice: SharedService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (
      sessionStorage.getItem('accessToken') !== '' &&
      sessionStorage.getItem('accessToken') !== null
    ) {
      // check if the company is selected , if not selected then redirect to select the company
      if (
        sessionStorage.getItem('c_id') !== '' &&
        sessionStorage.getItem('c_id') !== null
      ){
      return true;
      }else{
        return this.router.createUrlTree(['/selectCompany']);
      }
    } else {
      return this.router.createUrlTree(['/login']);
    }
    
  }
}
