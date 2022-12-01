import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AdminReportService } from '../admin-report.service';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-set-profile',
  templateUrl: './set-profile.component.html',
  styleUrls: ['./set-profile.component.scss']
})
export class SetProfileComponent implements OnInit {
  @Output() public finishCall = new EventEmitter<any>();
 
  constructor(public _service: AdminReportService,public toastr: ToastsManager,public translate: TranslateService) { }

  public selectedStatus;selectedGroup;

  ngOnInit() {
    this.selectedGroup="";
    this.selectedStatus="";
  }

  getGroup(){

  }

  getStatus(){

  }

  setProfile(){
  
    var apiUrl = 'profileflag/'
    var jsonBody = {};
    jsonBody['role'] = this.selectedGroup;
    jsonBody['flag'] = this.selectedStatus;

    this._service.postCalllvl1(jsonBody, apiUrl)
      .subscribe(
         data => {
          if (data['message'] == "ok") {
            this.toastr.success('profile set successfully !!');
            this.selectedGroup = "";
            this.selectedStatus= "";
          }
        },
        error => {
          if (error.error.message == 'no records found') {
          }
            else {
            this.toastr.error(this.translate.instant('Errors.cannotProceed'))
          }
        });
  }

}
 