import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class PermissionModelService implements CanActivate {
  public user_trainee=false;
  public user_mt=true;
  public user_coordinator=false;
  public user_admin=false;

  constructor(private router: Router) {
  }
   canActivate() {
    if(window.localStorage.getItem('group_name')=='master_trainer' || window.localStorage.getItem('group_name')=='co_ordinator' || window.localStorage.getItem('group_name')=='admin'|| window.localStorage.getItem('group_name')=='superadmin' || window.localStorage.getItem('group_name')=='superadmin')
    return true;
    else{
      return false;
    }
  }
}
