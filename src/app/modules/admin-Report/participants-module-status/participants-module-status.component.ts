import { Component, OnInit, Output, EventEmitter, ViewContainerRef, Input } from '@angular/core';
import { AdminReportService } from '../admin-report.service';
import { IMyDate, IMyDpOptions } from 'mydatepicker';
import { CsvService } from 'angular2-json2csv';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/take'
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { Router } from "@angular/router";


@Component({
  selector: 'app-participants-module-status',
  templateUrl: './participants-module-status.component.html',
  styleUrls: ['./participants-module-status.component.scss']
})
export class ParticipantsModuleStatusComponent implements OnInit {
  @Output() public finishCall = new EventEmitter<any>();
  @Input() allDistricts;
  public jsonBody; allParticipantsData;
  public exportData; loader; searchTxt = ''

  public data = [];
  public rowsOnPage = 10;
  public apiUrl;

  public detailsData = []; nextLink; previousLink; total; showDetails; selectedDist; selectedModuleNo;showDist;
  public button1; button2; button3; button4; totalPage; currentPage; showCount = false;

  public time1; tmSec1; countDown; tick = 1000;
  selectedLevel; storedLevel;
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, public translate: TranslateService, public _service: AdminReportService, private csvService: CsvService,private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  // getModuleStatus() {
  //   this.getAllParticipantsData();
  // }

  ngOnInit() {
    this.button1 = true;
    this.button2 = true;
    this.button3 = true;
    this.button4 = true;
    this.showDetails = false;
    this.loader = true;
    // this.getAllParticipantsData();
    this.selectedLevel = "L3";
  }
  ngOnDestroy() {
    localStorage.removeItem("selectedLevel");
  }
  getRole() {
    console.log("dasdasd ", this.searchTxt)
    this.selectedLevel = "L3";
    this.getAllParticipantsData(this.selectedLevel);
  }

  getLevel() {
    if (this.selectedLevel == "L1")
    {
      this.getAllParticipantsData(this.selectedLevel);
    } else if (this.selectedLevel == "L2")
    {
      this.getAllParticipantsData(this.selectedLevel);
    } else if (this.selectedLevel == "L3")
    {
      this.getAllParticipantsData(this.selectedLevel);
    }
  }

  getAllParticipantsData(level) {
    // this.total = 0;
    this.loader = false;
    this.jsonBody = {};
    if (level == "L1") {
      this.jsonBody['level'] = "1";
    } else if (level == "L2") {
      this.jsonBody['level'] = "2";
    } else if (level == "L3")
    {
      this.jsonBody['level'] = "3";
    }
    this.jsonBody['activity'] = "allparticipant";
    this.jsonBody['role'] = this.searchTxt;
    this.apiUrl = "report/";
    let apiService;
    this._service.postCall(this.jsonBody, this.apiUrl)
      .subscribe(
      data => {
        if (data['message'] == "ok") {
          this.allParticipantsData = data['data'].result;
          localStorage.setItem("selectedLevel", level)
          this.loader = true;
          this.allParticipantsData.sort(function (a, b) {
            var A = a.district_name.toLowerCase();
            var B = b.district_name.toLowerCase();
            if (A < B) //sort string ascending
              return -1
            if (A > B)
              return 1
            return 0 //default return value (no sorting)
          });
          this.exportData = this.allParticipantsData;
          this.showCount = true

          this.timeCounter(data['data'].cachetime)
        }
      },
      error => {
        if (error.error.message == 'source required') {
          console.log("source required")
        } else if (error.error.message == 'unknown source') {
          // alert(this.translate.instant("errors.feedbackNotFound"));
          console.log("unknown source")
        } else if (error.error.message == 'token not found' || error.error.message == 'token not matches please re-login') {
          // alert(this.translate.instant("errors.feedbackNotFound"));
          // console.log("token not found")
          this.toastr.error(this.translate.instant('Errors.tokenNotFound'));
            setTimeout(()=>{
              this.router.navigate(['/']);
            },5000)
        } else if (error.error.message == 'token not matches') {
          // alert(this.translate.instant("errors.feedbackNotFound"));
          // console.log("token not matches")
          this.toastr.error(this.translate.instant('Errors.tokenNotFound'));
          setTimeout(()=>{
            this.router.navigate(['/']);
          },5000)
        } else if (error.error.message == 'activity key required') {
          // alert(this.translate.instant("errors.feedbackNotFound"));
          console.log("activity key required")
        } else if (error.error.message == 'Wrong activity') {
          // alert(this.translate.instant("errors.feedbackNotFound"));
          console.log("Wrong activity")
        } else if (error.error.message == 'access denied') {
          // alert(this.translate.instant("errors.feedbackNotFound"));
          console.log("access denied")
        } else if (error.error.message == 'district not found') {
          // alert(this.translate.instant("errors.feedbackNotFound"));
          console.log("district not found")
        } else if (error.error.message == 'record not exists') {
          this.toastr.error('No Records Found.')
          this.total=0
           this.allParticipantsData = []
          this.exportData = []
          this.loader = true;
        } else {
          this.toastr.error(this.translate.instant("errors.tryAgain"));
        }
      });
  }

  viewdetails(district, moduleNo) {
    this.showDist=district
    console.log('in view details', district)
       var tempDist;
    this.allDistricts.forEach(element => {
      if(element['name']==district){
        tempDist=element['districtid']
      }
    });
    this.loader = false;
    this.showDetails = true
    this.selectedDist = tempDist
    this.selectedModuleNo = moduleNo
    this.storedLevel = localStorage.getItem("selectedLevel");
    var jsonBody = {};
    if (this.storedLevel == "L1") {
      jsonBody['level'] = "1";
    } else if (this.storedLevel == "L2") {
      jsonBody['level'] = "2";
    } else if (this.storedLevel == "L3")
    {
      jsonBody['level'] = "3";
    }
    jsonBody['activity'] = "dwparticipant";
    jsonBody['district'] = tempDist;
    jsonBody['module'] = moduleNo;
    jsonBody['role'] = this.searchTxt;
    this.apiUrl = "report/";
    let apiService;
    this._service.postCall(jsonBody, this.apiUrl)
      .subscribe(
      data => {
        if (data['message'] == "ok") {
          this.detailsData = data['data'].results
          this.loader = false;
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
          console.log("reportprevlink",this.nextLink,this.previousLink)
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
      },
      error => {
        if (error.error.message == 'source required' || error.error.message == 'unknown source') {
          console.log("seatnumber key wrong or required")
        } else if (error.error.message == 'token not found' || error.error.message == 'token not matches' || error.error.message == 'token not matches please re-login') {
          this.toastr.error(this.translate.instant('Errors.tokenNotFound'));
          setTimeout(()=>{
            this.router.navigate(['/']);
          },5000)
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
          this.toastr.error(this.translate.instant("errors.tryAgain"));
        }
      });
  }

  first() {
    console.log("f",this.showDist,this.selectedModuleNo)
    this.viewdetails(this.showDist, this.selectedModuleNo);
  }
  prev() {
      var tempDist;
    this.allDistricts.forEach(element => {
      if(element['name']==this.showDist){
        tempDist=element['districtid']
      }
    });
    this.storedLevel = localStorage.getItem("selectedLevel");
    // var apiUrl = this.previousLink.replace(environment.l3apiUrl, "");
    var jsonBody = {};
    if (this.storedLevel == "L1") {
      jsonBody['level'] = "1";
    } else if (this.storedLevel == "L2") {
      jsonBody['level'] = "2";
    } else if (this.storedLevel == "L3")
    {
      jsonBody['level'] = "3";
    }
    jsonBody['activity'] = "dwparticipant";
    jsonBody['district'] = tempDist;
    jsonBody['module'] = this.selectedModuleNo;
    jsonBody['role'] = this.searchTxt;
    this.apiUrl = this.previousLink.replace(environment.l2apiUrl, "");
    console.log("apiUrlprev",this.apiUrl)
   this._service.postCall(jsonBody, this.apiUrl)
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
        } else if (error.error.message == 'token not found' || error.error.message == 'token not matches' || error.error.message == 'token not matches please re-login') {
          this.toastr.error(this.translate.instant('Errors.tokenNotFound'));
          setTimeout(()=>{
            this.router.navigate(['/']);
          },5000)
        } else if (error.error.message == 'activity key required' || error.error.message == 'Wrong activity' || error.error.message == 'required district key') {
        } else if (error.error.message == 'access denied') {
        } else if (error.error.message == 'district not found' || error.error.message == 'invalid district' || error.error.message == 'required district field' || error.error.message == 'wrong district') {
        } else if (error.error.message == 'record not exists') {
          this.toastr.error('No Records Found.')
          this.total=0
           this.detailsData = []
          this.exportData = []
        } else {
          this.toastr.error(this.translate.instant("errors.tryAgain"));
        }
      });
  }

  next() {
    // var apiUrl = this.nextLink.replace(environment.l3apiUrl, "");
     var tempDist;
    this.allDistricts.forEach(element => {
      if(element['name']==this.showDist){
        tempDist=element['districtid']
      }
    });
    this.storedLevel = localStorage.getItem("selectedLevel");
    var jsonBody = {};
    if (this.storedLevel == "L1") {
      jsonBody['level'] = "1";
    } else if (this.storedLevel == "L2") {
      jsonBody['level'] = "2";
    } else if (this.storedLevel == "L3")
    {
      jsonBody['level'] = "3";
    }
    jsonBody['activity'] = "dwparticipant";
    jsonBody['district'] = tempDist;
    jsonBody['module'] = this.selectedModuleNo;
    jsonBody['role'] = this.searchTxt;
    
    console.log("prvLink",this.previousLink,environment.apiUrl)
    let apiService;
   
      this.apiUrl = this.nextLink.replace(environment.l2apiUrl, "");
      apiService = this._service.postCall(jsonBody, this.apiUrl);

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
          console.log("nextprev",this.previousLink,this.nextLink)
          this.total = data['count'];
          this.exportData = this.detailsData;
          this.button1 = true;
          this.button2 = true;
          this.button3 = true;
          this.button4 = true;
          console.log("nextprev",this.previousLink,this.nextLink)
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
          setTimeout(()=>{
            this.router.navigate(['/']);
          },5000)
        } else if (error.error.message == 'activity key required' || error.error.message == 'Wrong activity' || error.error.message == 'required district key') {
        } else if (error.error.message == 'access denied') {
        } else if (error.error.message == 'district not found' || error.error.message == 'invalid district' || error.error.message == 'required district field' || error.error.message == 'wrong district') {
        } else if (error.error.message == 'record not exists') {
          this.toastr.error('No Records Found.')
          this.total=0
           this.detailsData = []
          this.exportData = []
        } else {
          this.toastr.error(this.translate.instant("errors.tryAgain"));
        }
      });
  }

  last() {
    var tempDist;
    this.allDistricts.forEach(element => {
      if(element['name']==this.showDist){
        tempDist=element['districtid']
      }
    });
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
    this.storedLevel = localStorage.getItem("selectedLevel");
    var jsonBody = {};
    if (this.storedLevel == "L1") {
      jsonBody['level'] = "1";
    } else if (this.storedLevel == "L2") {
      jsonBody['level'] = "2";
    } else if (this.storedLevel == "L3")
    {
      jsonBody['level'] = "3";
    }
    jsonBody['activity'] = "dwparticipant";
    jsonBody['district'] = tempDist;
    jsonBody['module'] = this.selectedModuleNo;
    jsonBody['role'] = this.searchTxt;
    this.storedLevel = localStorage.getItem("selectedLevel");
    let apiService;
    console.log("prvLink",this.previousLink,environment.apiUrl)
    
      // this.apiUrl = this.nextLink.replace(environment.l2apiUrl, "");
      apiService = this._service.postCall(jsonBody, this.apiUrl);
    
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
          this.exportData = this.data;
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
          setTimeout(()=>{
            this.router.navigate(['/']);
          },5000)
        } else if (error.error.message == 'activity key required' || error.error.message == 'Wrong activity' || error.error.message == 'required district key') {
        } else if (error.error.message == 'access denied') {
        } else if (error.error.message == 'district not found' || error.error.message == 'invalid district' || error.error.message == 'required district field' || error.error.message == 'wrong district') {
        } else if (error.error.message == 'record not exists') {
          this.toastr.error('No Records Found.')
          this.total=0
           this.detailsData = []
          this.exportData = []
        } else {
          this.toastr.error(this.translate.instant("errors.tryAgain"));
        }
      });
  }

  export() {
    var date = new Date().toLocaleString();
    if (this.showDetails == true) {
      var fileName = "ModuleWise_Users_status_" + this.currentPage + "/" + this.totalPage+" ("+date+")";
    } else {
      var fileName = "All_Participant_Module_Status_Count ("+date+")"
    }
    this.csvService.download(this.exportData, fileName);
  }

  back() {
    this.showDetails = false
    this.getAllParticipantsData(localStorage.getItem("selectedLevel"));
    // this.exportData=this.allParticipantsData;
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
