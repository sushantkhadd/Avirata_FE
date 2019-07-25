import { Component, EventEmitter, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { CsvService } from "angular2-json2csv";
import { Router } from "@angular/router";
import { ModalDirective } from 'ngx-bootstrap';
import { AdminReportService } from '../admin-report.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'app-e-search',
  templateUrl: './e-search.component.html',
  styleUrls: ['./e-search.component.scss']
})
export class ESearchComponent implements OnInit {
  public showDetails;
  public number ;
  public apiUrl;
  public data ;
  public result;
  public tempNum;
  public remark;fname;mobNo;
  public position;endDate;rangeFlag;
  public btnValid;exportData=[];
  InitialPosition : any;
  UpdatedPosition : any;

  @Output() public finishCall = new EventEmitter<any>();
  @ViewChild('positionChangeModal') public positionChangeModal: ModalDirective;
  @ViewChild('dateChangeModal') public dateChangeModal: ModalDirective;

  constructor(private csvService: CsvService, public _service: AdminReportService, public translate: TranslateService, public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.number = '';
    this.endDate="";
    this.showDetails = false;
    this.result = false;
    this.btnValid = false;
    this.InitialPosition = true;
    this.UpdatedPosition=false;
    this.rangeFlag = false;
  }

  onKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
         if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
     return true;
  }

  searchRecord(){
    this.exportData=[]
    this.showDetails = true;
    this.apiUrl = 'esearch/'
    var jsonBody = {};
    jsonBody['query'] = this.number;

    this._service.postCalllvl1(jsonBody, this.apiUrl)
      .subscribe(
         data => {
          if (data['message'] == "ok") {
            this.tempNum = this.number;
            this.btnValid = true;
            this.data = data['data'].hits.hits[0]._source;
            this.fname = this.data.name;
            this.mobNo = this.data.mobile;
            this.result = true;
            this.exportData.push(data['data'].hits.hits[0]._source)
            localStorage.setItem("esearch-id",data['data'].hits.hits[0]._id)
          } else {
            console.log('something went wrong')
          }
        },
        error => {
          if (error.error.message == 'no records found') {
            this.toastr.error('Record not found.');
            this.btnValid = false;
            this.result = false;
            this.tempNum = '';
          } else if(error.error.message == 'json key error'){
            this.toastr.error(this.translate.instant('Errors.cannotProceed'));
          } else if(error.error.message == 'access denied'){
            this.toastr.error(this.translate.instant('Errors.accessDenied'));
          } else if(error.error.message == 'token not match'){
            this.toastr.error(this.translate.instant('Errors.tokenNotFound'));
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 500)
          } else if(error.error.message == 'unknown source'){
            this.toastr.error(this.translate.instant('otherMessages.unknownSource'));
          } else {
            this.toastr.error(this.translate.instant('Errors.cannotProceed'))
          }
        });
  }


  ngDoCheck() {
    if(this.number != ''){
      if(this.tempNum == this.number){
        this.btnValid = true;
      }
      else{
        this.btnValid = false;
      }
    }
  }

  goToAdminPanel() {
    this.finishCall.emit(true);
  }

  reset(){
    this.number = '';
    this.tempNum = '';
    this.result = false;
    this.exportData=[]
  }

  export() {
    var date = new Date().toLocaleString();
    var fileName = this.number+"_Users_Details"
    this.csvService.download(this.exportData, fileName);
  }

  PositionModal(){
    this.position = "";
    this.remark="";
  }

  UpdateDesignation(){
    this.apiUrl = 'changeuserposition/';
    var jsonBody = {};
    jsonBody['position']=this.position;
    jsonBody['remark'] = this.remark;
    jsonBody['userid'] = localStorage.getItem("esearch-id")

    this._service.postCalllvl1(jsonBody, this.apiUrl)
    .subscribe(
       data => {
        if (data['message'] == "updated successfully") {
          this.toastr.success(this.translate.instant('Updated successfully!!'));

         this.UpdatedPosition= true;
         this.InitialPosition = false;

        }
      },
      error => {
        if (error.error.message == 'access denied') {
          console.log(error.error.message);
        } else if(error.error.message == 'please enter userid'){
          console.log(error.error.message);
        } else if(error.error.message == 'please enter position'){
          console.log(error.error.message);
        } else if(error.error.message == 'please enter remark'){
          console.log(error.error.message);
        } else if(error.error.message == 'already position full for headmaster'){
          this.toastr.error(this.translate.instant('निवडलेल्या शाळेतून आधीच मुख्याद्यापक नोंदणीकृत झालेले आहेत. त्यामुळे या शाळेकरीता आणखी मुख्याद्यापक नोंदणी होऊ शकत नाही'));
        }
        else if(error.error.message == 'same as previous position'){
          this.toastr.error(this.translate.instant('Same as previous position'));
        } else {
          this.toastr.error(this.translate.instant('Errors.cannotProceed'))
        }
      }
    );
  }

  addSlash() {

    this.endDate = this.endDate
  
    .replace(/^(\d\d)(\d)$/g, '$1/$2')
  
    .replace(/^(\d\d\/\d\d)(\d+)$/g, '$1/$2').replace(/[^\d\/]/g, '');
  
    }

  getDate(e) {

    if (this.endDate.trim().length == 10)
    {
      var lastFourChars = this.endDate.substr(-4);
    
      console.log('lastFourChars', lastFourChars)
    
      if (lastFourChars != undefined)
      {
        if (lastFourChars > 2018 && lastFourChars <= 2019)
        {
          this.rangeFlag = false;
          console.log('true')
        } else
        {
          this.rangeFlag = true;
          console.log('false')
        }
      }
    }
  }

  numberOnly(event) {
    const charCode = (event.which) ? event.which : event.keyCode;
    console.log(event)
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

  changeDate(){
    this.apiUrl = 'userdatechange/';
    var jsonBody = {};
    jsonBody['mobile']=this.mobNo;
    jsonBody['startdate'] = "";
    jsonBody['enddate'] =this.endDate
    jsonBody['event'] = "enddate";

    this._service.postCalllvl1(jsonBody, this.apiUrl)
    .subscribe(
       data => {
        if (data['message'] == "date change") {
          this.toastr.success(this.translate.instant('Date changed successfully!!'));
          this.dateChangeModal.hide();
          this.endDate="";
        }
      },
      error => {
        if (error.error.message == 'access denied') {
          console.log(error.error.message);
        } else if(error.error.message == 'token not found' || error.error.message == 'token not matches please re-login'){
          this.toastr.error(this.translate.instant("Errors.tokenNotFound"));
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 1000);
          // console.log(error.error.message);
        } else if(error.error.message == 'token not matches'){
          console.log(error.error.message);
        } else if(error.error.message == 'source required'){
          console.log(error.error.message);
        } else {
          this.toastr.error(this.translate.instant('Errors.cannotProceed'))
        }
      }
    );
  }

  clearField(){
    this.endDate="";
    this.rangeFlag=false;
  }
}
