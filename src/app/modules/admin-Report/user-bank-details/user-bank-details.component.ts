import { Component, OnInit, Output, EventEmitter, ViewContainerRef, Input, ViewChild } from '@angular/core';
import { AdminReportService } from '../admin-report.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng6-toastr';
import { Router } from '@angular/router';
import { DataTable } from 'ng2-data-table';
import { CsvService } from 'angular2-json2csv';

@Component({
  selector: 'app-user-bank-details',
  templateUrl: './user-bank-details.component.html',
  styleUrls: ['./user-bank-details.component.scss']
})
export class UserBankDetailsComponent implements OnInit {

  constructor(private csvService: CsvService, public AdminReportService: AdminReportService, public translate: TranslateService, public toastr: ToastsManager, vcr: ViewContainerRef, public router: Router) { }
  @Output() public finishCall = new EventEmitter<any>();
  @Input() distList;
  @ViewChild('mf') mf: DataTable;

  public talukaEnable; district; talukaList; taluka; bankDetails; showTableFlag; dataNotFound;

  ngOnInit() {
    this.dataNotFound = false
    this.talukaEnable = false
    this.showTableFlag = false
    this.district = "select"
    this.taluka = "select"
  }

  goToAdminPanel() {
    this.finishCall.emit(true);
  }

  getDistrictWiseTaluka() {
    var apiUrl = "districtwisetaluka/";
    this.AdminReportService.getCall(apiUrl + this.district, window.localStorage.getItem("token"))
      .subscribe(
      data => {
        this.taluka = "select"
        this.talukaList = data['results'];
        this.talukaEnable = true;
        this.showTableFlag = false;
      },
      error => {
        if (error.error.message == "token not found") {
          this.toastr.error(this.translate.instant("Errors.tokenNotFound"));
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 5000);
        } else if (error.error.message == "session not matches please re-login") {
          this.toastr.error(this.translate.instant("Errors.sessionNotMatches"));
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 5000);
        } else if (error.error.message == "source is required" || error.error.message == "unknown source") {
          console.log(error.error.message)
        } else {
          this.toastr.error(this.translate.instant("Errors.cannotProceed"));
        }
      }
      );
  }

  getBankDetails() {
    var apiUrl = "talukawbankdetails/";
    this.AdminReportService.getCall(apiUrl + this.taluka, window.localStorage.getItem("token"))
      .subscribe(
      data => {
        this.dataNotFound = false
        this.bankDetails = data['data'];
        this.bankDetails.sort(function(a, b){
          var A = a.fullname.toLowerCase();
          var B = b.fullname.toLowerCase();
          if (A < B) //sort string ascending
              return -1
          if (A > B)
              return 1
          return 0 //default return value (no sorting)
        });
        if (this.mf != null && this.mf != undefined) { this.resetPagination(); }
        this.showTableFlag = true;
      },
      error => {
        if (error.error.message == "token not found") {
          this.toastr.error(this.translate.instant("Errors.tokenNotFound"));
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 5000);
        } else if (error.error.message == "session not matches please re-login") {
          this.toastr.error(this.translate.instant("Errors.sessionNotMatches"));
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 5000);
        } else if (error.error.message == "source is required" || error.error.message == "unknown source") {
          console.log(error.error.message)
        } else if (error.error.message == "json key error" || error.error.message == "wrong taluka id") {
          console.log(error.error.message)
        } else if (error.error.message == "taluka users not found") {
          this.dataNotFound = true
        } else if (error.error.message == "access denied") {
          this.toastr.error(this.translate.instant("Errors.accessDenied"));
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 5000);
        } else {
          this.toastr.error(this.translate.instant("Errors.cannotProceed"));
        }
      }
      );
  }

  export() {
    var index = this.talukaList.findIndex(item => item.taluka_id == this.taluka);
    var date = new Date().toLocaleString();
    var fileName = "User_BankDetails_in_" + this.talukaList[index].taluka_name + "_" + date
    this.csvService.download(this.bankDetails, fileName);
  }

  resetPagination() { this.mf.setPage(1, this.mf.rowsOnPage); }
}
