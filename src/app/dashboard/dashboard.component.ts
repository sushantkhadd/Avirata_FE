import { Component, OnInit, ViewContainerRef, EventEmitter, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng6-toastr';
import { DashboardService } from './dashboard.service';
import { LocalstoragedetailsService } from "src/app/services/localstoragedetails.service";
import { LanguageService } from "./../language.service";
import { ModalDirective } from "ngx-bootstrap";
import { Router } from '@angular/router';
import { SharedDataService } from '../services/shared-data.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {
  public missingPost: EventEmitter<any> = new EventEmitter();

  constructor(private DashboardService: DashboardService, public translate: TranslateService, public toastr: ToastsManager, private router: Router, public lang: LanguageService, vcr: ViewContainerRef, public LocalstoragedetailsService: LocalstoragedetailsService, private sharedService: SharedDataService ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  @ViewChild('rankModal') public rankModal: ModalDirective;

  public token; userId; userType; bgImg; remainDays;
  public startDate;
  public assignmentDate;
  public endDate;
  public mtList = []; dietList = []; filterDietList = [];
  public profileStatus; profileFileds = []; emptyCounterForEditable = 0; emptyCounterForNonEditable = 0

  ngOnInit(): void {
    this.bgImg = "./../../img/expressions-bg/Congratulations.png";
    if (window.localStorage.getItem('profileComplete') == 'false') {
      this.profileStatus = true;
      this.profileFileds = JSON.parse(window.localStorage.getItem('profileArray'))
      this.profileFileds.forEach(element => {
        if (element.status == true && element.type == '1') {
          this.emptyCounterForEditable++;
        } else if (element.status == true && element.type == '2') {
          this.emptyCounterForNonEditable++;
        }
      });
    } else {
      this.profileStatus = false;
    }

    this.startDate = window.localStorage.getItem('startDate');
    this.endDate = window.localStorage.getItem('endDate');
    this.assignmentDate = window.localStorage.getItem('assignmentDate');

    var startDate1 = Date.parse(new Date().toISOString().slice(0, 10));
    var endDate1 = Date.parse(this.endDate);
    var timeDiff = endDate1 - startDate1;
    var daysDiff
    this.remainDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    console.log("DATE - ", timeDiff, new Date().toISOString().slice(0, 10))


    this.token = this.LocalstoragedetailsService.token
    if (this.token == null) {
      this.router.navigate(['/']);
    }
    this.userId = this.LocalstoragedetailsService.userId;
    this.userType = this.LocalstoragedetailsService.userType;

    if (this.userType == "trainee" || this.userType == 'master_trainer') {

      if ((window.localStorage.getItem('dietlist') == null) || (window.localStorage.getItem('dietlist') == undefined) || (window.localStorage.getItem('dietlist') == "")) {

        // this.DashboardService.getDietList(this.token)
        //   .subscribe(
        //   data => {
        //     if (data.message == "session not matches please re-login") {
        //       this.toastr.error(this.translate.instant('Errors.sessionNotMatches'));
        //       setTimeout(() => {
        //         this.router.navigate(['/']);
        //       }, 4000)
        //     } else if (data.message == "token not found") {
        //       this.toastr.error(this.translate.instant('Errors.tokenNotFound'));
        //       setTimeout(() => {
        //         this.router.navigate(['/']);
        //       }, 4000)
        //     } else if (data.message == "access denied") {
        //       this.toastr.error(this.translate.instant('Errors.accessDenied'));

        //     } else if (data.message == "unauthorized") {
        //       this.toastr.error(this.translate.instant('Errors.accessDenied'));

        //     } else if (data.message == "json key error") {
        //       this.toastr.error(this.translate.instant('Errors.wrongInfo'));

        //     }
        //     else if (data.message == "ok") {
        //       this.dietList = data.data;
        //       this.mtList = this.dietList[0];
        //       this.filterDietList = this.dietList[1];
        //       window.localStorage.setItem('dietlist', JSON.stringify(data.data))
        //       // if (window.localStorage.getItem('mspost') === null) {

        //       // } else {
        //       //   if (window.localStorage.getItem('mspost') == 'false') {
        //       //     this.toastr.error('तुमच्या मतानुसार सध्याच्या काळानुसार शिक्षकाची काय गुणवैशिष्ट्ये  असायला हवीत?  जास्तीत जास्त १५० शब्दांत  लिहा.');
        //       //     this.DashboardService.setMissingPost();
        //       //   }
        //       // }
        //     }
        //   },
        //   err =>
        //     this.toastr.error(this.translate.instant('Errors.cannotProceed'))
        //   );
      } else if ((window.localStorage.getItem('dietlist') != null) && (window.localStorage.getItem('dietlist') != undefined) && (window.localStorage.getItem('dietlist') != "")) {
        this.dietList = JSON.parse(window.localStorage.getItem('dietlist'))
        this.mtList = this.dietList[0];
        this.filterDietList = this.dietList[1];
      }

      if (this.LocalstoragedetailsService.coordinatorApproveMessage == true) {
        // this.toastr.error('आपली तालुकास्तरीय प्रत्यक्ष प्रशिक्षणाची उपस्थिती नोंदविण्यात आली नाही.कृपया आपल्या तालुकास्तरीय  प्रशिक्षणाच्या उपस्थिती संदर्भात आपल्या जिल्हा सामन्वयकांशी संपर्क साधा.उपस्थिती नोंद केल्या शिवाय अभ्यासक्रम सुरु करता येणार नाही.')
        this.toastr.error(this.translate.instant('Errors.coordinatorApproveMessage'))
      }
    }
    else if (this.userType == "admin") {
    }
  }

  ngOnDestroy() {
    if (localStorage.getItem("hidemenu") == 'false') {
      this.router.navigate(["/modules/admin_panel"]);
      let obJ = {};
      obJ["isAdmin"] = true;
      this.sharedService.sendData(obJ);
      window.localStorage.setItem("hidemenu", "true");
    }
  }
  rankModalHide(){
    this.rankModal.hide();
    this.lang.toHide();
  }
  // showSuccess() {
  //   this.toastr.success(
  //     this.translate.instant("Login.Login")
  //   );
  // }
  rankConfirmNext(){

  }
}
