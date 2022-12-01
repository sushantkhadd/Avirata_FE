import { Component, OnInit, ViewContainerRef, Output, EventEmitter } from '@angular/core';

import { Router } from "@angular/router";
import { AdminReportService } from '../admin-report.service';
import { CsvService } from 'angular2-json2csv';
import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng6-toastr';


@Component({
  selector: 'app-dist-aggregate-report',
  templateUrl: './dist-aggregate-report.component.html',
  styleUrls: ['./dist-aggregate-report.component.scss']
})
export class DistAggregateReportComponent implements OnInit {
  @Output() public back = new EventEmitter<any>();
  public showDetails; selectedDist;loader;
  public apiUrl; exportData; data; talukaDetailsData;
  constructor(public AdminReportService: AdminReportService, private csvService: CsvService, public translate: TranslateService, public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.showDetails = false;
    this.loader = true;
    this.viewAggregate();
  }

  viewAggregate() {
    this.apiUrl = 'adirep_nts/'
    var jsonBody = {};
    jsonBody['district'] = 'all';

    this.AdminReportService.postCall(jsonBody, this.apiUrl)
      .subscribe(
      data => {
        if (data['message'] == "ok") {
          this.data = data['data'].result;
          if(this.data){
            this.loader = false;
          }else {
            this.loader = true;
          }
          this.data.sort(function(a, b){
            var A = a.district_name.toLowerCase();
            var B = b.district_name.toLowerCase();
            if (A < B) //sort string ascending
                return -1
            if (A > B)
                return 1
            return 0 //default return value (no sorting)
          });
          for (let item of this.data) {
            item['percent_endline'] = (parseInt(item['endline']) / parseInt(item['total']) * 100).toFixed(2);
            item['percent_not_started'] = (parseInt(item['not_started']) / parseInt(item['total']) * 100).toFixed(2);
            item['percent_completed'] = (parseInt(item['completed']) / parseInt(item['total']) * 100).toFixed(2);
            item['percent_not_approve'] = (parseInt(item['not_approve']) / parseInt(item['total']) * 100).toFixed(2);
            item['percent_com_module1'] = (parseInt(item['com_module1']) / parseInt(item['total']) * 100).toFixed(2);
            item['percent_com_module2'] = (parseInt(item['com_module2']) / parseInt(item['total']) * 100).toFixed(2);
            item['percent_com_module3'] = (parseInt(item['com_module3']) / parseInt(item['total']) * 100).toFixed(2);
            item['percent_com_module4'] = (parseInt(item['com_module4']) / parseInt(item['total']) * 100).toFixed(2);
            item['percent_com_module5'] = (parseInt(item['com_module5']) / parseInt(item['total']) * 100).toFixed(2);
          }
          this.exportData = this.data;
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
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 4000)
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
        } else if (error.error.message == 'json key error' || error.error.message == 'invalid district') {
          console.log('json key error or invalid district');
        } else {
          this.toastr.error(this.translate.instant('Errors.cannotProceed'))
        }
      });
  }

  export() {
    var date = new Date().toString()
    if (this.showDetails == false) {
      var fileName = "Distric_Aggrigate_Report_" + date
    } else {
      var fileName = "Taluka_Aggrigate_Report_of_" + this.selectedDist + "_District" + date
    }
    this.csvService.download(this.exportData, fileName);
  }

  goToAdminPanel() {
    this.back.emit(true);
  }

  viewTalukaDetails(district) {
    this.selectedDist = district
    this.apiUrl = 'atarep_nts/'
    var jsonBody = {};
    jsonBody['district'] = district;
    jsonBody['taluka'] = 'all';

    this.AdminReportService.postCall(jsonBody, this.apiUrl)
      .subscribe(
      data => {
        if (data['message'] == "ok") {
          this.showDetails = true;
          this.talukaDetailsData = data['data'].result;
          for (let item of this.talukaDetailsData) {
            item['percent_endline'] = (parseInt(item['endline']) / parseInt(item['total']) * 100).toFixed(2);
            item['percent_not_started'] = (parseInt(item['not_started']) / parseInt(item['total']) * 100).toFixed(2);
            item['percent_completed'] = (parseInt(item['completed']) / parseInt(item['total']) * 100).toFixed(2);
            item['percent_not_approve'] = (parseInt(item['not_approve']) / parseInt(item['total']) * 100).toFixed(2);
            item['percent_com_module1'] = (parseInt(item['com_module1']) / parseInt(item['total']) * 100).toFixed(2);
            item['percent_com_module2'] = (parseInt(item['com_module2']) / parseInt(item['total']) * 100).toFixed(2);
            item['percent_com_module3'] = (parseInt(item['com_module3']) / parseInt(item['total']) * 100).toFixed(2);
            item['percent_com_module4'] = (parseInt(item['com_module4']) / parseInt(item['total']) * 100).toFixed(2);
            item['percent_com_module5'] = (parseInt(item['com_module5']) / parseInt(item['total']) * 100).toFixed(2);
          }
          this.exportData = this.talukaDetailsData;
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
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 4000)
        } else if (error.error.message == 'token not matches') {
          this.toastr.error(this.translate.instant('Errors.tokenNotMatch'));
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 4000)
        } else if (error.error.message == 'invalid taluka') {
          this.toastr.error('Invalid Taluka');
        } else if (error.error.message == 'Wrong activity') {
          this.toastr.error('Wrong activity');
        } else if (error.error.message == 'access denied') {
          this.toastr.error(this.translate.instant('Errors.accessDenied'));
        } else if (error.error.message == 'json key error' || error.error.message == 'invalid district') {
          console.log('json key error or invalid district');
        } else {
          this.toastr.error(this.translate.instant('Errors.cannotProceed'))
        }
      });
  }

}
