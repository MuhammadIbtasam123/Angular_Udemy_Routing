import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './userAuth.service.';

@Injectable({
  providedIn: 'root'
})

// implement cana ctivateMethod
// 
export class AuthGuardService implements CanActivate{

  constructor(private router :Router, private authService:UserService) { }

  // ********3 steps to do to define route guard*****
  // used in angular < 14 versions
  // 1- implement the can activate method
  // 2- import anaAtivate
  // 3- canActiavte returnType true or false  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> 
  {
      // check if user logged in or not
      //if yes retrun true
      // else return false with keep on redirecting to login page

      if (this.authService.isAuthenticated()){
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
}
