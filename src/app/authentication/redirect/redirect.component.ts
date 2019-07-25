import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from '../login/login.service';
import { LocalstoragedetailsService } from 'src/app/services/localstoragedetails.service';
import { LanguageService } from 'src/app/language.service';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html'
})
export class RedirectComponent implements OnInit {

  public routeParameter;

  constructor(public LoginService: LoginService, public LocalstoragedetailsService: LocalstoragedetailsService, public route: ActivatedRoute, public LanguageService: LanguageService, public router: Router, public toastr: ToastsManager, public vRef: ViewContainerRef, public translate: TranslateService) {
    this.toastr.setRootViewContainerRef(this.vRef);
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.routeParameter = params.id
    });

    var originalRoute = this.routeParameter.replace(new RegExp('~', 'g'), '/');
    var decrypted = originalRoute + '='
    var passData = this.LanguageService.get('aesEncryptionKey', decrypted);
    window.localStorage.setItem('setData', passData)
    var getData = {}
    getData = JSON.parse(window.localStorage.getItem('setData'))
    window.localStorage.setItem('token', getData['token'])
    window.localStorage.setItem('userid', getData['user_id'])
    window.localStorage.setItem('name', getData['firstname'])
    window.localStorage.setItem('districtid', getData['districtid'])
    window.localStorage.setItem('districtname', getData['districtname'])
    window.localStorage.setItem('designation', getData['position'])
    window.localStorage.setItem('group_name', getData['group_name']);
    window.localStorage.setItem('levelStatus', JSON.stringify(getData['level_status']));
    window.localStorage.setItem('talukaname', getData['talukaname'])
    if (getData['coordinatorstatus'] == false) {
      this.LocalstoragedetailsService.coordinatorApproveMessage = true;
    }
    this.LocalstoragedetailsService.userId = getData['user_id'];
    this.LocalstoragedetailsService.token = getData['token'];
    this.LocalstoragedetailsService.userName = getData['firstname'];
    this.LocalstoragedetailsService.userType = getData['group_name'];

    window.localStorage.setItem('startDate', getData['daterange'].startDate)
    window.localStorage.setItem('endDate', getData['daterange'].endDate)
    window.localStorage.setItem('profileflag', getData['profileflag'])
    if (getData['certificate'] != null) {
      window.localStorage.setItem('certificate', getData['certificate'])
    }
    this.levelStatus(2)

  }

  levelStatus(level) {

    var jsonBody = {}
    jsonBody['level'] = level

    this.LoginService.postCall(jsonBody, 'levelstatus/')
      .subscribe(
      data => {

        if (level == 2) {
          window.localStorage.setItem('startDate', data['data'].modulestatus.daterange.startDate)
          window.localStorage.setItem('endDate', data['data'].modulestatus.daterange.endDate)
          window.localStorage.setItem('assignmentDate', data['data'].modulestatus.daterange.assignmentDate)

          if (data['data'].modulestatus.module0 == false) {
            window.localStorage.setItem('currentstatus', '-1');
          }
          if (data['data'].modulestatus.module0 == true) {
            window.localStorage.setItem('currentstatus', '0');
          } if (data['data'].modulestatus.module1 == true) {
            window.localStorage.setItem('currentstatus', '1');
          } if (data['data'].modulestatus.module2 == true) {
            window.localStorage.setItem('currentstatus', '2');
          } if (data['data'].modulestatus.module3 == true) {
            window.localStorage.setItem('currentstatus', '3');
          } if (data['data'].modulestatus.module4 == true) {
            window.localStorage.setItem('currentstatus', '4');
          } if (data['data'].modulestatus.module5 == true) {
            window.localStorage.setItem('currentstatus', '5');
          } if (data['data'].modulestatus.module6 == true) {
            window.localStorage.setItem('currentstatus', '6');
          } if (data['data'].modulestatus.module7 == true) {
            window.localStorage.setItem('currentstatus', '7');
          }

          var completeModule = {};
          completeModule['module0'] = false;
          completeModule['module1'] = false;
          completeModule['module2'] = false;
          completeModule['module3'] = false;
          completeModule['module4'] = false;
          completeModule['module5'] = false;
          completeModule['module6'] = false;
          completeModule['module7'] = false;

          if (data['data'].modulestatus.last_completed_ids.includes(0)) {
            completeModule['module0'] = true;
          } if (data['data'].modulestatus.last_completed_ids.includes(1)) {
            completeModule['module1'] = true;
          } if (data['data'].modulestatus.last_completed_ids.includes(2)) {
            completeModule['module2'] = true;
          } if (data['data'].modulestatus.last_completed_ids.includes(3)) {
            completeModule['module3'] = true;
          } if (data['data'].modulestatus.last_completed_ids.includes(4)) {
            completeModule['module4'] = true;
          } if (data['data'].modulestatus.last_completed_ids.includes(5)) {
            completeModule['module5'] = true;
          } if (data['data'].modulestatus.last_completed_ids.includes(6)) {
            completeModule['module6'] = true;
          } if (data['data'].modulestatus.last_completed_ids.includes(7)) {
            completeModule['module7'] = true;
          }
          window.localStorage.setItem('completeModule', JSON.stringify(completeModule));
          this.router.navigate(["/dashboard"]);
        }
      },
      error => {
        if (error.error.message == 'enter correct level number') {
          console.log(error.error.message)
        } else if (error.error.message == 'source is required' || error.error.message == 'unknown source') {
          console.log(error.error.message)
        } else if (error.error.message == 'json key error') {
          console.log(error.error.message)
        } else if (error.error.message == 'token not found' || error.error.message == 'session not matches please re-login'
        || error.error.message == 'token not matches please re-login') {
          this.toastr.error(this.translate.instant("Errors.tokenNotFound"));
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 1000);
        } else {
          this.toastr.error(this.translate.instant('Errors.cannotProceed'));
        }
      }//Catch Error if server is not Found
      );

  }


}
