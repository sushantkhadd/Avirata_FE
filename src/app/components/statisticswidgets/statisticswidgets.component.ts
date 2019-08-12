import { Component, OnInit, Pipe, ChangeDetectionStrategy, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from "@angular/router";
import { DataFilterPipe } from './data-filter.pipe';
import { LanguageService } from 'src/app/language.service';
import { ExportService } from './export.service';
import { LocalstoragedetailsService } from 'src/app/services/localstoragedetails.service';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ModalDirective } from 'ngx-bootstrap';
import { SortPipe } from 'src/app/shared/pipes/sort.pipe';
import { CsvService } from 'angular2-json2csv';


@Component({
  selector: 'app-statisticswidgets',
  templateUrl: './statisticswidgets.component.html',
  providers:[DataFilterPipe]
})

export class StatisticswidgetsComponent implements OnInit {
  public filterQuery = "";
  public rowsOnPage = 10;
  public sortBy = "email";
  public sortOrder = "asc";
  public sort = new SortPipe();
  constructor(private DataFilterPipe: DataFilterPipe,private router: Router, public lang: LanguageService, public ExportService: ExportService, public LocalstoragedetailsService: LocalstoragedetailsService, private csvService: CsvService,public toastr: ToastsManager, vcr: ViewContainerRef, public translate: TranslateService) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  public districtId; talukaId; data = []; districtArray1 = []; district = "Select"; talukaJson; taluka = "Select";
  public talukaName; schoolModel = []; schoolName; districtname; talukaname;
  public districtArray = []; talukaArray = [];
  public districtSelection; talukaSelection; allSelection;item;
  public talukaTotal;totalMember: number;talukaOriginalData=[]; originalData = []; distirctSummeryData = []; schoolNameFlag; mySchoolJson;
  public exportEvent;
  public apiUrlforCoordinator;
  @Input()
    set activity(activity : string){

      if(activity=='present'){
        this.apiUrlforCoordinator='coordinatorwiseregistertrainees/'
      }else{
        this.apiUrlforCoordinator='coordinatorwisenotregistertrainees/'
      }
  }

  @ViewChild('actionModal') public actionModal: ModalDirective; //To Open/Close Modal from Typescript


  ngOnInit() {
    this.totalMember = 0;
    this.talukaTotal=0;
    this.districtSelection = false;
    this.talukaSelection = false;
    this.allSelection = false;
    this.districtId = "";
    this.schoolNameFlag = false;
    if (window.localStorage.getItem('token') == null) {
      this.router.navigate(['/']);
    }

    if (this.LocalstoragedetailsService.userType == 'admin'||this.LocalstoragedetailsService.userType == 'superadmin') {
      this.enableDistrictSummaryTable();
      this.getDistrictwiseCountForAdmin();
      this.exportEvent="DistrictSummary";

    }else if (this.LocalstoragedetailsService.userType == 'master_trainer') {
      this.ExportService.getUserDetails(this.LocalstoragedetailsService.token)
        .subscribe(
        data => {
            this.districtId = data['Response'][0].districtid;
            this.districtname = data['Response'][0].districtname;
            this.talukaname = data['Response'][0].talukaname;
            for (var i = 0; i < data['Response'].length; i++) {
              this.districtArray.push(data['Response'][i])
            }
            this.talukaArray = this.districtArray;
            this.enableAllSummaryTable();
            this.getSchoolList();
            this.getTalukawiseCountForMT();
          this.ExportService.exportData = this.data;
                this.exportEvent="SchoolSummary";
        },
        err =>
          this.toastr.error(this.translate.instant('Errors.cannotProceed'))
        );
    }else if (this.LocalstoragedetailsService.userType == 'co_ordinator') {
      this.districtId=window.localStorage.getItem('districtid');
      this.districtname=window.localStorage.getItem('districtname');
      this.exportEvent="TalukaSummary";
      this.getDistrictwiseCountForCoordinator();
      this.ExportService.exportData = this.data;
    }
  }
  public export() {
    var date=new Date().toLocaleString();
    var fileName=this.exportEvent+"_"+date;
    this.csvService.download(this.ExportService.exportData, fileName);
    }
  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.city.length;
  }

  getSchoolList() {
    if (this.talukaId == '') {
      this.schoolModel = [];
    } else {
      var token=window.localStorage.getItem('token')
      this.ExportService.getSchoolnameList(this.talukaId,token)
        .subscribe(
        data => {
          this.schoolModel = data['results'];
          this.schoolNameFlag = true;
        },
        err =>
        this.toastr.error(this.translate.instant('Errors.cannotProceed'))
      );
    }
  }

  //Function To get Total count by District for Admin Role
  getDistrictwiseCountForAdmin() {
    this.ExportService.districtwiseCount(this.LocalstoragedetailsService.token)
      .subscribe(
      data => {
        if (data['Response'] == "session not matches please re-login") {
          this.toastr.error(this.translate.instant('Errors.sessionNotMatches'));
            setTimeout(()=>{
              this.router.navigate(['/']);
            },6000)
        } else if (data['Response'] == "token not found" || data['Response'] == "token not matches please re-login" ||
        data['Response'] == "token not match") {
          this.toastr.error(this.translate.instant('Errors.tokenNotFound'));
            setTimeout(()=>{
              this.router.navigate(['/']);
            },6000)
        } else if (data['Response'] == "access denied") {
          this.toastr.error(this.translate.instant('Errors.accessDenied'));
        } else {
          this.data = data['results'].alldistrict;
          this.originalData = this.data;
          this.distirctSummeryData = this.data;
          this.ExportService.exportData = this.data;
          for (var i = 0; i < data['results'].alldistrict.length; i++) {
            this.districtArray.push(data['results'].alldistrict[i])
            this.totalMember += data['results'].alldistrict[i].districttrainee + data['results'].alldistrict[i].districtmaster;
          }
          this.talukaTotal=this.totalMember;
          this.talukaOriginalData=this.data;
        }
      },
      err =>
      this.toastr.error(this.translate.instant('Errors.cannotProceed'))
      );
  } //End of Function To get Total count by District for Admin Role

  //Function To get Total count by District for Co-ordinator Role
  getDistrictwiseCountForCoordinator() {
    this.exportEvent="DistrictSummary";
    this.schoolNameFlag = false
    this.talukaArray = [];
    this.schoolModel = [];
    this.schoolName = "";
    this.talukaId = "";
    this.totalMember = 0;

    if (this.districtId == "") {
      this.schoolNameFlag = false;
      this.talukaId = "";
      this.data = this.distirctSummeryData;
                this.ExportService.exportData = this.data;

      this.enableDistrictSummaryTable();
      for (var i = 0; i < this.data.length; i++) {
        this.totalMember += this.data[i].districtmaster + this.data[i].districttrainee;
      }

    } else {
      this.schoolNameFlag = false;
      this.ExportService.districtwiseCountforCoordinator(this.districtId)
        .subscribe(
        data => {
          if (data['Response'] == "session not matches please re-login") {
            this.toastr.error(this.translate.instant('Errors.sessionNotMatches'));
            setTimeout(()=>{
              this.router.navigate(['/']);
            },6000)
          } else if (data['Response'] == "token not found" || data['Response'] == "token not matches please re-login" ||
          data['Response'] == "token not match") {
            this.toastr.error(this.translate.instant('Errors.tokenNotFound'));
            setTimeout(()=>{
              this.router.navigate(['/']);
            },6000)
          } else if (data['Response'] == "access denied") {
            this.toastr.error(this.translate.instant('Errors.accessDenied'));
          } else {
            this.enableTalukaSummaryTable();
            this.data = data['results'].talukas;
            this.originalData = this.data;
            this.ExportService.exportData = this.data;
            for (var i = 0; i < data['results'].talukas.length; i++) {
              this.talukaArray.push(data['results'].talukas[i])
              this.totalMember += data['results'].talukas[i].totalmaster + data['results'].talukas[i].totaltrainee;
            }
          }
        },
        err =>
        this.toastr.error(this.translate.instant('Errors.cannotProceed'))
        );
    }

  } //End of Function To get Total count by District for Co-ordinator Role

  //Function To get Total count by Taluka for MT Role
  getTalukawiseCountForMT() {
          this.exportEvent="TalukaSummary";

    if((window.localStorage.getItem('group_name')) == "co_ordinator"){
      if(this.talukaId != ""){
      this.getSchoolList();
            this.enableAllSummaryTable();
            if(this.apiUrlforCoordinator == "coordinatorwiseregistertrainees/"){
              this.filterItemAsPeresent();

            }else if(this.apiUrlforCoordinator == "coordinatorwisenotregistertrainees/"){

              this.filterItemAsNotPeresent()
            }
      }else{
      this.getDistrictwiseCountForCoordinator();
            this.ExportService.exportData = this.data;
      }
    }else{

    this.schoolModel = [];
    this.filterQuery = ''
    this.schoolName = '';
    this.totalMember = 0;
    if (this.talukaId == '' && this.districtId != '') {
      this.schoolNameFlag = false;
      this.enableTalukaSummaryTable();
      this.data = this.originalData;
                this.ExportService.exportData = this.data;

      for (var i = 0; i < this.data.length; i++) {
        this.totalMember += this.data[i].totalmaster + this.data[i].totaltrainee;
      }
      this.talukaTotal=this.totalMember;
      this.talukaOriginalData=this.data;
    } else {
      this.schoolNameFlag = false;
      this.ExportService.talukawiseCountForMT(this.LocalstoragedetailsService.token, this.talukaId)
        .subscribe(
        data => {
          if (data['Response'] == "session not matches please re-login") {
            this.toastr.error(this.translate.instant('Errors.sessionNotMatches'));
            setTimeout(()=>{
              this.router.navigate(['/']);
            },6000)
          } else if (data['Response'] == "token not found" || data['Response'] == "token not matches please re-login" ||
          data['Response'] == "token not match") {
            this.toastr.error(this.translate.instant('Errors.tokenNotFound'));
            setTimeout(()=>{
              this.router.navigate(['/']);
            },6000)
          } else if (data['Response'] == "access denied") {
            this.toastr.error(this.translate.instant('Errors.accessDenied'));
          } else {
            this.enableAllSummaryTable();
            this.data = data['results'];
            this.ExportService.exportData = this.data;
            this.ExportService.exportData = this.data;
            this.totalMember = data['results'].length;
            this.enableAllSummaryTable();
            this.talukaTotal=this.totalMember;
            this.talukaOriginalData=this.data;
          }
        },
        err =>
        this.toastr.error(this.translate.instant('Errors.cannotProceed')));
    }
    }
    this.ExportService.exportData = this.data;

  } //End of Function To get Total count by Taluka for MT Role
  enableDistrictSummaryTable() {
    this.districtSelection = true;
    this.talukaSelection = false;
    this.allSelection = false;
  }
  enableTalukaSummaryTable() {
    this.districtSelection = false;
    this.talukaSelection = true;
    this.allSelection = false;
  }
  enableAllSummaryTable() {
    this.districtSelection = false;
    this.talukaSelection = false;
    this.allSelection = true;
  }

  disrictSummery(id) {
    this.districtId = id;
    this.getDistrictwiseCountForCoordinator();
  }
  talukaSummery(id) {
    this.talukaId = id;
    this.getTalukawiseCountForMT();
  }
  schooNameSetUpperCase() {
    this.filterQuery = this.filterQuery.toLocaleUpperCase().trim();
  }

  getCount() {
    this.exportEvent="SchoolSummary";
    if(this.schoolName!=""){
      this.totalMember=this.DataFilterPipe.transform(this.data,this.schoolName).length;}
   else{
    this.totalMember = this.talukaTotal;
    this.ExportService.exportData = this.talukaOriginalData;
   }
  }

  getCountasTextBox() {
    this.exportEvent="SchoolSummary";

    if(this.filterQuery!=""){
    this.totalMember=this.DataFilterPipe.transform(this.data,this.filterQuery).length;}
   else{
    this.totalMember = this.talukaTotal;
    this.ExportService.exportData = this.talukaOriginalData;
   }
  }
  transform(value: string): string {
    let message = value;
    return message;
  }

  setItem(item){
    this.item=item;
  }

  userApprove(){
    var mobileNo=this.item.mobile;
     var approveUserJson = '{"districtid":"'+this.districtId+'","mobileno":"'+this.item.mobile+'","event":"present"}';
        this.ExportService.approveUserbyCoordinator(approveUserJson,this.LocalstoragedetailsService.token)
          .subscribe(
          data => {
             if (data['message'] == "token not found" || data['message'] == "token not matches please re-login" || data['message'] == "token not match") {
              this.toastr.error(this.translate.instant('Errors.tokenNotFound'));
              setTimeout(()=>{
                this.router.navigate(['/']);
              },6000)
          } else if (data['message'] == "session not matches please re-login") {
              this.toastr.error(this.translate.instant('Errors.sessionNotMatches'));
              setTimeout(()=>{
                this.router.navigate(['/']);
              },6000)
            }
            else if(data['message']=="district id is required") {
              this.toastr.error(this.translate.instant('Errors.recheckInfo'));
            }else if(data['message']=="mobile no is required"){
              this.toastr.error(this.translate.instant('Errors.recheckInfo'));
            }else if(data['message']=="event is required"){
              this.toastr.error(this.translate.instant('Errors.recheckInfo'));
            }else if(data['message']=="district id is incorrect"){
              this.toastr.error(this.translate.instant('Errors.recheckInfo'));
            }else if(data['message']=="mobile number is not exist"){
              this.toastr.error(this.translate.instant('Errors.recheckInfo'));
            }else if(data['message']=="event is incorrect"){
              this.toastr.error(this.translate.instant('Errors.recheckInfo'));
            }else if(data['message']=="trainee approved"){
             this.actionModal.hide();
             this.filterItemAsNotPeresent();
            }else if(data['message']=="access denied"){
              this.toastr.error(this.translate.instant('Errors.accessDenied'));
            }
            else if(data['message']=="json key error"){
              this.toastr.error(this.translate.instant('Errors.wrongInfo'));
            }else{
              this.toastr.error(this.translate.instant('Errors.recheckInfo'));
            }
          },
          error => {
            this.toastr.error(this.translate.instant('Errors.cannotProceed'))
          }//Catch Error if server is not Found
          );
  }

  filterItemAsPeresent(){
   this.ExportService.filterData(this.LocalstoragedetailsService.token, this.talukaId)
        .subscribe(
        data => {
          if (data['message'] == "session not matches please re-login") {
            this.toastr.error(this.translate.instant('Errors.sessionNotMatches'));
              setTimeout(()=>{
                this.router.navigate(['/']);
              },6000)
          } else if (data['message'] == "token not found" || data['message'] == "token not matches please re-login" || data['message'] == "token not match") {
            this.toastr.error(this.translate.instant('Errors.tokenNotFound'));
              setTimeout(()=>{
                this.router.navigate(['/']);
              },6000)
          } else if (data['message'] == "access denied") {
            this.toastr.error(this.translate.instant('Errors.accessDenied'));
          }else if (data['message'] == "unauthorized") {
            this.toastr.error(this.translate.instant('Errors.accessDenied'));
          }else if (data['message'] == "invalid taluka id") {
              this.toastr.error(this.translate.instant('Errors.recheckInfo'));
          }
          else if (data['message'] == "ok") {
            this.data=data['data'];
            this.ExportService.exportData = this.data;
            this.totalMember=data['data'].length;
          }
        },
        err =>
        this.toastr.error(this.translate.instant('Errors.cannotProceed'))
        );
  }

   filterItemAsNotPeresent(){

   this.ExportService.filterDataforNotPreset(this.LocalstoragedetailsService.token, this.talukaId)
        .subscribe(
        data => {
          if (data['message'] == "session not matches please re-login") {
            this.toastr.error(this.translate.instant('Errors.sessionNotMatches'));
              setTimeout(()=>{
                this.router.navigate(['/']);
              },6000)
          } else if (data['message'] == "token not found" || data['message'] == "token not matches please re-login" || data['message'] == "token not match") {
            this.toastr.error(this.translate.instant('Errors.tokenNotFound'));
              setTimeout(()=>{
                this.router.navigate(['/']);
              },6000)
          } else if (data['message'] == "access denied") {
            this.toastr.error(this.translate.instant('Errors.accessDenied'));
          }else if (data['message'] == "unauthorized") {
            this.toastr.error(this.translate.instant('Errors.accessDenied'));
          }else if (data['message'] == "invalid taluka id") {
            this.toastr.error(this.translate.instant('Errors.recheckInfo'));
          }
          else if (data['message'] == "ok") {
            this.data=data['data'];
            this.ExportService.exportData = this.data;
                        this.totalMember=data['data'].length;
          }
        },
        err =>
        this.toastr.error(this.translate.instant('Errors.cannotProceed'))
        );
  }
}
