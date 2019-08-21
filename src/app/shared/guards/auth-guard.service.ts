import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanActivateChild,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(public router: Router) { }
  token; userData;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log("i am checking to see if you are logged in");
    this.userData = JSON.parse(window.localStorage.getItem("setData"));

    if (this.userData == null)
    {
      this.router.navigate(["/"]);
    } else if (this.userData.token)
    {
      return true;
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.userData = JSON.parse(window.localStorage.getItem("setData"));

    if (this.userData == null)
    {
      this.router.navigate(["/"]);
    } else if (this.userData.token)
    {
      return true;
    }
  }
}
