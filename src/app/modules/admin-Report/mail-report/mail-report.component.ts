import { Component, EventEmitter, OnInit, Output, ViewContainerRef, Input } from '@angular/core';
import { CsvService } from "angular2-json2csv";
import { Router } from "@angular/router";
import { AdminReportService } from '../admin-report.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'app-mail-report',
  templateUrl: './mail-report.component.html',
  styleUrls: ['./mail-report.component.scss']
})
export class MailReportComponent implements OnInit {
  @Input() allDistricts;
  public showDetails;
  public apiUrl;
  public selectedDistrict;
  public token;
  public allTalukas;
  public allReports;
  public selectedTaluka;
  public selectedReport;
  public resetForm;

  @Output() public finishCall = new EventEmitter<any>();

  constructor(private csvService: CsvService, public _service: AdminReportService, public translate: TranslateService, public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.showDetails = false;
    this.resetForm = true;
    this.selectedDistrict = "";
    this.selectedReport = "";
    this.selectedTaluka = "";
    // this.getAllDistrict(); //all district
  }

  getTaluka(){
    this.getDistrictWiseTaluka();
  }

  getDistrictWiseTaluka() {
    this.apiUrl = 'districtwisetaluka/' + this.selectedDistrict;
    this.token = window.localStorage.getItem("token");

    this._service.getCall(this.apiUrl,this.token)
      .subscribe(
        data => {
          this.allTalukas = data['results'];
          console.log("talukas", this.allTalukas);
          this.selectedTaluka = "";
          this.selectedReport = "";
        },
        error => {
          if(error.error.message == 'token not found' || error.error.message == 'token not matches please re-login') {
            this.toastr.error(this.translate.instant('Errors.tokenNotFound'));
            setTimeout(()=>{
              this.router.navigate(['/']);
            },5000)
          } else if(error.error.message == 'session not matches please re-login') {
            this.toastr.error(this.translate.instant('Errors.sessionNotMatches'));
            setTimeout(()=>{
              this.router.navigate(['/']);
            },5000)
          } else if(error.error.message == 'source is required') {
            this.toastr.error(this.translate.instant('otherMessages.noInfoTryAgain'));
          } else if(error.error.message == 'unknown source') {
            this.toastr.error(this.translate.instant('otherMessages.unknownSource'));
          } else {
            this.toastr.error(this.translate.instant('Errors.cannotProceed'))
          }
      });
  }

  getReport(){
    this.getAllReport();
  }

  getAllReport(){
    this.apiUrl = 'reportinfo/';
    this.token = window.localStorage.getItem("token");

    this._service.getCall(this.apiUrl,this.token)
      .subscribe(
        data=>{
          this.allReports = data['data'];
          console.log('reports',this.allReports);
          this.selectedReport="";
        },
        error => {
          if(error.error.message == 'token not found' || error.error.message == 'token not matches please re-login') {
            this.toastr.error(this.translate.instant('Errors.tokenNotFound'));
            setTimeout(()=>{
              this.router.navigate(['/']);
            },5000)
          } else if(error.error.message == 'source required') {
            this.toastr.error(this.translate.instant('otherMessages.noInfoTryAgain'));
          } else if(error.error.message == 'unknown source') {
            this.toastr.error(this.translate.instant('otherMessages.unknownSource'));
          } else if (error.error.message == 'token not matches') {
            this.toastr.error(this.translate.instant('Errors.tokenNotMatch'));
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 4000)
          } else if (error.error.message == 'access denied') {
            this.toastr.error(this.translate.instant('Errors.accessDenied'));
          } else if (error.error.message == 'data not found') {
            this.toastr.error(this.translate.instant('Errors.incompleteInfo'));
          } else if (error.error.message == 'wrong method') {
            this.toastr.error(this.translate.instant('Errors.wrongInfo'));
          } else {
            this.toastr.error(this.translate.instant('Errors.cannotProceed'))
          }
      })
  }

  sendRequest(){
    this.apiUrl = 'reportrequest/';

    var jsonBody = {};
    jsonBody['district'] = this.selectedDistrict;
    jsonBody['taluka'] = this.selectedTaluka;
    jsonBody['reportid'] = this.selectedReport;

    this._service.postCall(jsonBody,this.apiUrl)
      .subscribe(
        data=>{
          if(data['message'] == 'success'){
            this.toastr.success('Your request submitted successfully.Report will be sent on your Email ID within 24 Hours.')
            this.selectedDistrict = '';
            this.selectedTaluka = '';
            this.selectedReport = '';
            this.selectedDistrict = '';
          }
          console.log('dataaaaaa',data);
        },
        error => {
          if(error.error.message == 'token not found' || error.error.message == 'token not matches please re-login') {
            this.toastr.error(this.translate.instant('Errors.tokenNotFound'));
            setTimeout(()=>{
              this.router.navigate(['/']);
            },5000)
          } else if(error.error.message == 'source required') {
            this.toastr.error(this.translate.instant('otherMessages.noInfoTryAgain'));
          } else if(error.error.message == 'unknown source') {
            this.toastr.error(this.translate.instant('otherMessages.unknownSource'));
          } else if (error.error.message == 'token not matches') {
            this.toastr.error(this.translate.instant('Errors.tokenNotMatch'));
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 4000)
          } else if (error.error.message == 'access denied') {
            this.toastr.error(this.translate.instant('Errors.accessDenied'));
          } else if(error.error.message == 'wrong body key'){
            this.toastr.error('please try again');
          } else if(error.error.message == 'required district key'){
            this.toastr.error('please try again');
          } else if(error.error.message == 'required district field'){
            this.toastr.error('please try again');
          } else if(error.error.message == 'wrong district'){
            this.toastr.error('Wrong district selection,Please try again');
          } else if(error.error.message == 'required taluka key'){
            this.toastr.error('please try again');
          } else if(error.error.message == 'required taluka field'){
            this.toastr.error('please try again');
          } else if(error.error.message == 'wrong taluka'){
            this.toastr.error('Wrong taluka selection,Please try again');
          } else if(error.error.message == 'required reportid key'){
            this.toastr.error('please try again');
          } else if(error.error.message == 'required reportid field'){
            this.toastr.error('please try again');
          } else if(error.error.message == 'wrong reportid'){
            this.toastr.error('Wrong report type selection,Please try again');
          } else if(error.error.message == 'request already exist'){
            this.toastr.error('Your request for selected Report Type is already submitted. Report will be sent on your Email ID within 24 Hours.');
          } else {
            this.toastr.error(this.translate.instant('Errors.cannotProceed'))
          }
        })

  }
  goToAdminPanel() {
    this.finishCall.emit(true);
  }

}
