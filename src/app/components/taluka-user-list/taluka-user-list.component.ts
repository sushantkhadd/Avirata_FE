import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from "@angular/router";
import { CsvService } from "angular2-json2csv";

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'
import { TranslateService } from '@ngx-translate/core';
import { CommonComponentService } from '../common-component.service';
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'app-taluka-user-list',
  templateUrl: './taluka-user-list.component.html',
  styleUrls: ['./taluka-user-list.component.scss']
})
export class TalukaUserListComponent implements OnInit {
  public userType; selectedDistrict; allTalukas; selectedTaluka = 'all'; selectedRole = 'all';
  public loader; showDetailTableFlag; showTaluka;
  public overviewList; userList; exportData; showReset;exportData1={};ex;
  public time1; tmSec1; countDown; tick = 1000;selectedLevel;
  public time2; tmSec2; countDown2; tick2 = 1000; showReset2;

  constructor(public translate: TranslateService, private csvService: CsvService, public CommonComponentService: CommonComponentService, public router: Router, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.loader = true;
    this.showReset = false;
    this.showReset2 = false;
    this.showDetailTableFlag = false
    this.selectedLevel = "";
    this.userType = window.localStorage.getItem('group_name')
    var jsonBody = {}
    if (this.userType == 'master_trainer') {
      this.showTaluka = window.localStorage.getItem('talukaname')
      jsonBody['level'] = '3'
      jsonBody['taluka_name'] = ''
      jsonBody['role'] = 'trainee'
      this.apiCall(jsonBody, 'l2talukawiseuserreport/', 'mtview')
    } else if (this.userType == 'co_ordinator') {
      this.selectedDistrict = window.localStorage.getItem('districtname')
      this.getDistrictWiseTaluka()
    }
  }


  getLevel() {
    console.log("selectedLevel" ,this.selectedLevel)
    var jsonBody = {}
    if (this.selectedLevel == "L1") {
      jsonBody['level'] = "1";
    } else if (this.selectedLevel == "L2") {
      jsonBody['level'] = "2";
    } else if (this.selectedLevel == "L3")
    {
      jsonBody['level'] = "3";
    }
      this.showTaluka = window.localStorage.getItem('talukaname')
      jsonBody['taluka_name'] = ''
      jsonBody['role'] = 'trainee'
      this.apiCall(jsonBody, 'l2talukawiseuserreport/', 'mtview')
  }

  getLevel1() {
    console.log("selectedLevel" ,this.selectedLevel)
    var jsonBody = {}
    if (this.selectedLevel == "L1") {
      jsonBody['level'] = "1";
    } else if (this.selectedLevel == "L2") {
      jsonBody['level'] = "2";
    } else if (this.selectedLevel == "L3")
    {
      jsonBody['level'] = "3";
    }
    jsonBody['taluka_name'] = this.selectedTaluka
    jsonBody['role'] = this.selectedRole

    this.apiCall(jsonBody, 'taluka_allparticipant/', 'talukaOverallReport')
  }

  getTaluka(){

  }
  apiCall(jsonBody, url, fun) {
    this.CommonComponentService.submoduleFinishl2(jsonBody, url)
      .subscribe(
      data => {
        if (fun == 'mtview') {
          this.userList = data['data'].result;
          if (this.userList) {
            this.loader = false;
          } else {
            this.loader = true;
          }
          this.exportData = data['data'].result
          this.timeCounter(data['data'].cachetime)
        } else if (fun == 'talukaOverallReport') {
          this.overviewList = data['data'].result;
          if (this.overviewList) {
            this.loader = false;
          } else {
            this.loader = true;
          }
          this.exportData = data['data'].result
          this.ex=this.exportData
          console.log(this.exportData)

          for(let i of this.ex){
            i['Pending']=i['Total']-i['Completed']
          }
          this.timeCounter2(data['data'].cachetime)
        } else if (fun == 'coview') {
          this.userList = data['data'].result;
          if (this.userList) {
            this.loader = false;
          } else {
            this.loader = true;
          }
          this.exportData = data['data'].result

          this.showDetailTableFlag = true
          this.timeCounter(data['data'].cachetime)
        }
      },
      error => {
         if (error.error.message == 'token not found' || error.error.message == 'token not matches please re-login') {
          this.toastr.error("Session not matches please re-login");
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 5000)
        } else if (error.error.message == 'session not matches please re-login') {
          this.toastr.error("Session not matches please re-login");
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 5000)
        }
      });
  }

  updatedResult() {
    this.showReset = false
    if (this.userType == 'master_trainer') {
      var jsonBody = {}
      this.showTaluka = window.localStorage.getItem('talukaname')
      jsonBody['level'] = '3'
      jsonBody['taluka_name'] = ''
      jsonBody['role'] = 'trainee'
      this.apiCall(jsonBody, 'l2talukawiseuserreport/', 'mtview')
    } else if (this.userType == 'co_ordinator') {
      this.showDetailTableFlag = false
    }
  }

  getDistrictWiseTaluka() {
    this.CommonComponentService.getCall('districtwisetaluka/' + window.localStorage.getItem('districtid'))
      .subscribe(
      data => {
        this.allTalukas = data['results'];
        this.selectedTaluka = "all";
        this.talukaOverallReport(this.selectedTaluka, this.selectedRole);
      },
      error => {
        if (error.error.message == 'token not found' || error.error.message == 'token not matches please re-login') {
          this.toastr.error(this.translate.instant('Errors.tokenNotFound'));
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 5000)
        } else if (error.error.message == 'session not matches please re-login') {
          this.toastr.error(this.translate.instant('Errors.sessionNotMatches'));
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 5000)
        } else if (error.error.message == 'source is required') {
          this.toastr.error(this.translate.instant('otherMessages.noInfoTryAgain'));
        } else if (error.error.message == 'unknown source') {
          this.toastr.error(this.translate.instant('otherMessages.unknownSource'));
        } else {
          this.toastr.error(this.translate.instant('Errors.cannotProceed'))
        }
      });
  }

  talukaOverallReport(selectedTaluka, selectedRole) {
    var jsonBody = {}
    jsonBody['level'] = '3'
    jsonBody['taluka_name'] = selectedTaluka
    jsonBody['role'] = selectedRole

    this.apiCall(jsonBody, 'taluka_allparticipant/', 'talukaOverallReport')
  }

  viewDetailsforCo(viewTaluka) {
    var tempTaluka;

    this.allTalukas.forEach(element => {
      if(element['taluka_name']==viewTaluka){
        // console.log("p ",element['taluka_id'])
        tempTaluka=element['taluka_id']
      }
    });

    var jsonBody = {}
    jsonBody['level'] = '3'
    jsonBody['taluka_name'] = tempTaluka
    jsonBody['role'] = this.selectedRole
    this.apiCall(jsonBody, 'l2talukawiseuserreport/', 'coview')
    this.showTaluka = viewTaluka
  }

  getTime() {
    console.log("asda", this.tmSec1)
    this.exportData=this.ex
  }

  timeCounter(catche) {
    //Timer for catche
    this.time1 = catche
    var a = this.time1.split(':'); // split it at the colons
    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    this.tmSec1 = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    this.countDown = Observable.timer(0, this.tick)
      .take(this.tmSec1)
      .map(() => --this.tmSec1)
  }

  timeCounter2(catche) {
    //Timer for catche
    this.time2 = catche
    var a = this.time2.split(':'); // split it at the colons
    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    this.tmSec2 = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    this.countDown2 = Observable.timer(0, this.tick2)
      .take(this.tmSec2)
      .map(() => --this.tmSec2)
  }

  export(type) {
    var date = new Date().toString()
    if (type == 1) {
      var fileName = "Taluka ("+this.showTaluka+")_Aggrigate_Report (" + date+")"
    } else {
      var fileName = "District ("+ this.selectedDistrict +")_Overview Report (" + date+")"
    }
    this.csvService.download(this.exportData, fileName);
  }

  ngDoCheck() {
    if (this.tmSec1 == 0) {
      this.tmSec1 = -1;
      this.showReset = true
    }
    if (this.tmSec2 == 0) {
      // this.tmSec2 = -1;
      this.showReset2 = true
    }
  }
}
