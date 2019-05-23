import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn : "root"
})
export class LocalstoragedetailsService {
  public timelineState: number;
  public token;
  public userId;
  public userType; profileImageName;
  public userName; setdistrictId; setDistrictName;
  public mainFlagModule5;
  public subFlagModule5;coordinatorApproveMessage=false;
  public moduleCompleteStatus: EventEmitter<any> = new EventEmitter();

  // public uuid;
  constructor(
  ) {
    this.token = window.localStorage.getItem('token');
    this.userId = window.localStorage.getItem('userid');
    this.userType = window.localStorage.getItem('group_name');
    this.userName = window.localStorage.getItem('name');
    this.setdistrictId = window.localStorage.getItem('districtid');
    this.setDistrictName = window.localStorage.getItem('districtname');
  }

  setModule5Falgs(val1, val2) {
    this.mainFlagModule5 = val1;
    this.subFlagModule5 = val2;
  }

   //To Set module status
  setModuleStatus(val) {
    this.moduleCompleteStatus.emit(val);
  }
   getModuleStatus() {
    return this.moduleCompleteStatus;
  }
}
