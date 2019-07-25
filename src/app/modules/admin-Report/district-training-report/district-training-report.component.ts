import { Component, OnInit, ViewContainerRef, Output, EventEmitter, Input } from '@angular/core';
import { CsvService } from "angular2-json2csv";
import { Router } from "@angular/router";

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'
import { AdminReportService } from '../admin-report.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng6-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-district-training-report',
  templateUrl: './district-training-report.component.html',
  styleUrls: ['./district-training-report.component.scss']
})
export class DistrictTrainingReportComponent implements OnInit {
  @Output() public finishCall = new EventEmitter<any>();
  @Input() allDistricts;
  public exportData; searchTxt = '';
  public data = [];
  public rowsOnPage = 10;
  public apiUrl;
  public loader;
  public detailsData = []; nextLink; previousLink; total; showDetails; selectedDist; showDist;
  public button1; button2; button3; button4; totalPage; currentPage;
  public showCount = false

  public time1; tmSec1; countDown; tick = 1000; selectedLevel; storedLevel;
  constructor(private csvService: CsvService, public _service: AdminReportService, public translate: TranslateService, public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  getRole() {
    console.log("dasdasd ", this.searchTxt)
    this.selectedLevel = ""
    // this.getCount()
  }

  getLevel() {
    if (this.selectedLevel == "L1") {
      this.getCount(this.selectedLevel);
    } else if (this.selectedLevel == "L2") {
      this.getCount(this.selectedLevel);
    } else if (this.selectedLevel == "L3")
    {
      this.getCount(this.selectedLevel);
    }
  }
  ngOnInit() {
    this.button1 = true;
    this.button2 = true;
    this.button3 = true;
    this.button4 = true;
    this.showDetails = false
    this.exportData = this.data;
    this.loader = true;
    this.selectedLevel = "";
  }
  ngOnDestroy() {
    localStorage.removeItem("selectedLevel");
  }

  getCount(level: any) {
    this.loader = false;
    this.apiUrl = 'report/'
    var jsonBody = {};
    jsonBody['activity'] = 'notstartedcount';
    jsonBody['role'] = this.searchTxt;
    let apiService;
    if (level == "L1") {
      apiService = this._service.postCalllvl1(jsonBody, this.apiUrl)
    } else if (level == "L2") {
      apiService = this._service.postCall(jsonBody, this.apiUrl)
    } else if (level == "L3")
    {
      apiService = this._service.postCalllvl3(jsonBody, this.apiUrl)
    }
    apiService
      .subscribe(
      data => {
          if (data['message'] == "ok")
          {
          localStorage.setItem("selectedLevel",level)
          this.showCount = true;
          this.data = data['data'].result;
          // if (this.data) {
          //   this.loader = false;
          // } else {
            this.loader = true;
          // }
          this.data.sort(function (a, b) {
            var A = a.distict_name.toLowerCase();
            var B = b.distict_name.toLowerCase();
            if (A < B) //sort string ascending
              return -1
            if (A > B)
              return 1
            return 0 //default return value (no sorting)
          });
          this.exportData = this.data;
          console.log('data', this.data)

          this.timeCounter(data['data'].cachetime)
        }
        else {
          console.log('something went wrong')
        }
      },
      error => {
        if (error.error.message == 'source required') {
          this.toastr.error('source required');
        } else if (error.error.message == 'unknown source') {
          this.toastr.error('unknown source');
        } else if (error.error.message == 'token not found' || error.error.message == 'token not matches please re-login') {
          this.toastr.error(this.translate.instant('Errors.tokenNotFound'));
        } else if (error.error.message == 'token not matches') {
          this.toastr.error(this.translate.instant('Errors.tokenNotMatch'));
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 4000)
        } else if (error.error.message == 'activity key required') {
          this.toastr.error('activity key required');
        } else if (error.error.message == 'Wrong activity') {
          this.toastr.error('Wrong activity');
        } else if (error.error.message == 'access denied') {
          this.toastr.error(this.translate.instant('Errors.accessDenied'));
        } else if (error.error.message == 'record not exists') {
          this.toastr.error('No Records Found.')
          this.data = []
          this.exportData = []
          this.total = 0;
          this.loader = true;
        } else {
          this.toastr.error(this.translate.instant('Errors.cannotProceed'))
        }
      });
  }

  viewdetails(district) {
    this.showDetails = true
    this.showDist = district
    this.allDistricts.forEach(element => {
      if (element['name'] == district) {
        this.selectedDist = element['districtid']
      }
    });
    this.loader = false;
    var jsonBody = {};
    jsonBody['activity'] = "notstarteduser";
    jsonBody['district'] = this.selectedDist;
    jsonBody['role'] = this.searchTxt;
    this.apiUrl = "report/";
    let apiService;
    this.storedLevel = localStorage.getItem("selectedLevel");
    if (this.storedLevel == "L1")
    {
      apiService = this._service.postCalllvl1(jsonBody, this.apiUrl);
    } else if (this.storedLevel == "L2")
    {
      apiService = this._service.postCall(jsonBody, this.apiUrl);
    } else if (this.storedLevel == "L3")
    {
      apiService = this._service.postCalllvl3(jsonBody, this.apiUrl);
    }
    apiService
      .subscribe(
      data => {
          if (data['message'] == "ok")
          {
          this.loader = true;
          if (data['count'] == 0) {
            this.toastr.error("No Records Found.")
            this.total=0
            this.exportData = data['data'].results
          } else {
            this.detailsData = data['data'].results
            this.detailsData.sort(function (a, b) {
              var A = a.name.toLowerCase();
              var B = b.name.toLowerCase();
              if (A < B) //sort string ascending
                return -1
              if (A > B)
                return 1
              return 0 //default return value (no sorting)
            });
            this.nextLink = data['next']
            this.previousLink = data['previous']
            this.total = data['count'];
            this.button2 = false
            this.button1 = false
            if (this.nextLink != "" && this.nextLink != null && this.nextLink != undefined) {
              this.button4 = true
              this.button3 = true
            } else {
              this.button4 = false
              this.button3 = false
            }
            // var distictName = this.detailsData.districtName;
            console.log(this.detailsData, typeof (this.detailsData))
            console.log(this.data, typeof (this.detailsData))
            this.exportData = this.detailsData;
            this.currentPage = 1;

            var myTotal = this.total;
            var pageCount;
            pageCount = this.total % 10
            if (pageCount != 0) {
              var pg = 10 - pageCount;
              myTotal = this.total + pg
              var lastPage = myTotal / 10;
            } else {
              var lastPage = myTotal / 10;
            }
            this.totalPage = lastPage

            this.timeCounter(data['data'].cachetime)
          }
        }
      },
      error => {
        if (error.error.message == 'source required' || error.error.message == 'unknown source') {
          console.log("seatnumber key wrong or required")
        } else if (error.error.message == 'token not found' || error.error.message == 'token not matches' || error.error.message == 'token not matches please re-login') {
          this.toastr.error(this.translate.instant('Errors.tokenNotFound'));
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 4000)
        } else if (error.error.message == 'activity key required' || error.error.message == 'Wrong activity' || error.error.message == 'required district key') {
        } else if (error.error.message == 'access denied') {
        } else if (error.error.message == 'district not found' || error.error.message == 'invalid district' || error.error.message == 'required district field' || error.error.message == 'wrong district') {
        } else if (error.error.message == 'record not exists') {
          this.toastr.error('No Records Found.')
          this.total=0
          this.detailsData = []
          this.exportData = [];
          this.button1 = false;
          this.button2 = false;
          this.button3 = false;
          this.button4 = false;
          this.loader = true;
        } else {
        }
      });
  }

  first() {
    this.viewdetails(this.selectedDist)
  }
  prev() {
    // this.apiUrl = this.previousLink.replace(environment.l3apiUrl, "");
    var jsonBody = {};
    jsonBody['activity'] = "notstarteduser";
    jsonBody['district'] = this.selectedDist;
    jsonBody['role'] = this.searchTxt;
    this.storedLevel = localStorage.getItem("selectedLevel");
    let apiService;
    if (this.storedLevel == "L1")
    {
      this.apiUrl = this.previousLink.replace(environment.apiUrl, "");
      apiService = this._service.postCalllvl1(jsonBody, this.apiUrl)
    } else if (this.storedLevel == "L2")
    {
      this.apiUrl = this.previousLink.replace(environment.l2apiUrl, "");
      apiService = this._service.postCall(jsonBody, this.apiUrl)
    } else if (this.storedLevel == "L3")
    {
      this.apiUrl = this.previousLink.replace(environment.l3apiUrl, "");
      apiService = this._service.postCalllvl3(jsonBody, this.apiUrl)
    }
    apiService
      .subscribe(
      data => {
        if (data['message'] == "ok") {
          this.detailsData = data['data'].results
          this.detailsData.sort(function (a, b) {
            var A = a.name.toLowerCase();
            var B = b.name.toLowerCase();
            if (A < B) //sort string ascending
              return -1
            if (A > B)
              return 1
            return 0 //default return value (no sorting)
          });
          this.nextLink = data['next']
          this.previousLink = data['previous']
          this.total = data['count'];
          this.exportData = this.detailsData;
          this.button1 = true;
          this.button2 = true;
          this.button3 = true;
          this.button4 = true;
          if (this.previousLink == null || this.previousLink == undefined || this.previousLink == "") {
            this.button1 = false;
            this.button2 = false;
            this.currentPage = parseInt(this.nextLink.substr(this.nextLink.length - 1)) - 1
          } else {
            if (isNaN(this.previousLink.substr(this.previousLink.length - 1))) {
              this.currentPage = 2
            } else {
              this.currentPage = parseInt(this.previousLink.substr(this.previousLink.length - 1)) + 1
            }
          }

          this.timeCounter(data['data'].cachetime)
        }
      },
      error => {
        if (error.error.message == 'source required' || error.error.message == 'unknown source') {
          console.log("seatnumber key wrong or required")
        } else if (error.error.message == 'token not found' || error.error.message == 'token not matches' || error.error.message == 'token not matches please re-login' ) {
          this.toastr.error(this.translate.instant('Errors.tokenNotFound'));
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 4000)
        } else if (error.error.message == 'activity key required' || error.error.message == 'Wrong activity' || error.error.message == 'required district key') {
        } else if (error.error.message == 'access denied') {
        } else if (error.error.message == 'district not found' || error.error.message == 'invalid district' || error.error.message == 'required district field' || error.error.message == 'wrong district') {
        } else if (error.error.message == 'record not exists') {
          this.toastr.error('No Records Found.')
          this.total=0
          this.detailsData = []
          this.exportData = []
        } else {
        }
      });
  }

  next() {
    // var apiUrl = this.nextLink.replace(environment.l3apiUrl, "");
    var jsonBody = {};
    jsonBody['activity'] = "notstarteduser";
    jsonBody['district'] = this.selectedDist;
    jsonBody['role'] = this.searchTxt;
    this.storedLevel = localStorage.getItem("selectedLevel");
    let apiService;
    if (this.storedLevel == "L1") {
      this.apiUrl = this.previousLink.replace(environment.apiUrl, "");
      apiService = this._service.postCalllvl1(jsonBody, this.apiUrl);
    } else if (this.storedLevel == "L2") {
      this.apiUrl = this.previousLink.replace(environment.l2apiUrl, "");
      apiService = this._service.postCall(jsonBody, this.apiUrl);
    } else if (this.storedLevel == "L3") {
      this.apiUrl = this.previousLink.replace(environment.l3apiUrl, "");
      apiService = this._service.postCalllvl3(jsonBody, this.apiUrl);
    }
    apiService
      .subscribe(
      data => {
        if (data['message'] == "ok") {
          this.detailsData = data['data'].results
          this.detailsData.sort(function (a, b) {
            var A = a.name.toLowerCase();
            var B = b.name.toLowerCase();
            if (A < B) //sort string ascending
              return -1
            if (A > B)
              return 1
            return 0 //default return value (no sorting)
          });
          this.nextLink = data['next']
          this.previousLink = data['previous']
          this.total = data['count'];
          this.exportData = this.detailsData;
          this.button1 = true;
          this.button2 = true;
          this.button3 = true;
          this.button4 = true;
          if (this.nextLink == null || this.nextLink == undefined || this.nextLink == "") {
            this.button3 = false;
            this.button4 = false;
            this.currentPage = parseInt(this.previousLink.substr(this.previousLink.length - 1)) + 1
          } else {
            this.currentPage = parseInt(this.nextLink.substr(this.nextLink.length - 1)) - 1
          }

          this.timeCounter(data['data'].cachetime)
        }
      },
      error => {
        if (error.error.message == 'source required' || error.error.message == 'unknown source') {
          console.log("seatnumber key wrong or required")
        } else if (error.error.message == 'token not found' || error.error.message == 'token not matches' || error.error.message == 'token not matches please re-login') {
          this.toastr.error(this.translate.instant('Errors.tokenNotFound'));
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 4000)
        } else if (error.error.message == 'activity key required' || error.error.message == 'Wrong activity' || error.error.message == 'required district key') {
        } else if (error.error.message == 'access denied') {
        } else if (error.error.message == 'district not found' || error.error.message == 'invalid district' || error.error.message == 'required district field' || error.error.message == 'wrong district') {
        } else if (error.error.message == 'record not exists') {
          this.toastr.error('No Records Found.')
          this.total=0
          this.detailsData = []
          this.exportData = []
        } else {
        }
      });
  }

  last() {
    var myTotal = this.total;
    var pageCount;
    pageCount = this.total % 10
    if (pageCount != 0) {
      var pg = 10 - pageCount;
      myTotal = this.total + pg
      var lastPage = myTotal / 10;
    } else {
      var lastPage = myTotal / 10;
    }
    this.apiUrl = 'report/?page=' + lastPage;
    var jsonBody = {};
    jsonBody['activity'] = "notstarteduser";
    jsonBody['district'] = this.selectedDist;
    jsonBody['role'] = this.searchTxt;
    this.storedLevel = localStorage.getItem("selectedLevel");
    let apiService;
    if (this.storedLevel == "L1") {
      this.apiUrl = this.previousLink.replace(environment.apiUrl, "");
      apiService = this._service.postCalllvl1(jsonBody, this.apiUrl);
    } else if (this.storedLevel == "L2") {
      this.apiUrl = this.previousLink.replace(environment.l2apiUrl, "");
      apiService = this._service.postCall(jsonBody, this.apiUrl);
    } else if (this.storedLevel == "L3") {
      this.apiUrl = this.previousLink.replace(environment.l3apiUrl, "");
      apiService = this._service.postCalllvl3(jsonBody, this.apiUrl);
    }
    apiService
      .subscribe(
      data => {
        if (data['message'] == "ok") {
          this.detailsData = data['data'].results
          this.detailsData.sort(function (a, b) {
            var A = a.name.toLowerCase();
            var B = b.name.toLowerCase();
            if (A < B) //sort string ascending
              return -1
            if (A > B)
              return 1
            return 0 //default return value (no sorting)
          });
          this.nextLink = data['next']
          this.previousLink = data['previous']
          this.total = data['count'];
          this.exportData = this.detailsData;
          this.currentPage = lastPage
          if (this.previousLink != "" || this.previousLink != null || this.previousLink != undefined) {
            this.button1 = true
            this.button2 = true
          }
          this.button4 = false
          this.button3 = false

          this.timeCounter(data['data'].cachetime)
        }
      },
      error => {
        if (error.error.message == 'source required' || error.error.message == 'unknown source') {
          console.log("seatnumber key wrong or required")
        } else if (error.error.message == 'token not found' || error.error.message == 'token not matches' || error.error.message == 'token not matches please re-login') {
          this.toastr.error(this.translate.instant('Errors.tokenNotFound'));
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 4000)
        } else if (error.error.message == 'activity key required' || error.error.message == 'Wrong activity' || error.error.message == 'required district key') {
        } else if (error.error.message == 'access denied') {
        } else if (error.error.message == 'district not found' || error.error.message == 'invalid district' || error.error.message == 'required district field' || error.error.message == 'wrong district') {
        } else if (error.error.message == 'record not exists') {
          this.toastr.error('No Records Found.')
          this.detailsData = []
          this.exportData = []
          this.total=0
        } else {
        }
      });
  }

  export() {
    console.log("do")
    var date = new Date().toString()
    if (this.showDetails == true) {
      var fileName = "Users_Training_NotStarted_pageof_" + this.currentPage + "/" + this.totalPage + " (" + date + ")";
    } else {
      var fileName = "Training not Started (" + date + ")"
    }
    this.csvService.download(this.exportData, fileName);
  }

  back() {
    this.getCount(localStorage.getItem("selectedLevel"));
    this.showDetails = false
    this.exportData = this.data;
  }

  goToAdminPanel() {
    this.finishCall.emit(true);
  }
  ngDoCheck() {
    if (this.tmSec1 == 0) {
      this.tmSec1 = -1;
      this.searchTxt = ''
      this.showCount = false
      this.showDetails = false
    }
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
}
