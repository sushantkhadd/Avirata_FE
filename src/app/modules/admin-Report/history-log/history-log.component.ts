import { Component, OnInit, Output, EventEmitter, ViewContainerRef } from '@angular/core';
import { CsvService } from "angular2-json2csv";
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import { AdminReportService } from '../admin-report.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-history-log',
  templateUrl: './history-log.component.html',
  styleUrls: ['./history-log.component.scss']
})
export class HistoryLogComponent implements OnInit {
  @Output() public finishCall = new EventEmitter<any>();
  public mobnumber;historyDate;showHistoryFlag;searchTxt;

  public show1;show2;show3;show4;show5;show6;show7;show8;show9;show10;show11;show12;show13;show14;show15;show16;show17;show18;show19;show20;show21;show22;
  btnValid;
  constructor(public toastr: ToastsManager, vcr: ViewContainerRef, public translate: TranslateService, public AdminReportService: AdminReportService, private csvService: CsvService,private router: Router) { }

  ngOnInit() {
    this.showHistoryFlag=false;
    this.mobnumber = ''
    this.show1=true
    this.show2=false
  }

  searchHistory() {
    var jsonBody = {}
    jsonBody['mobile_no']=this.mobnumber
    jsonBody['activity']=this.searchTxt

    this.apiCall(jsonBody, 'report/', 'searchHistory')
  }

  onKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.AdminReportService.postCall(jsonBody, apiUrl)
      .subscribe(
      data => {
        if (fun == 'searchHistory') {
          // var data=data['data']
          this.historyDate = (data['data'])
        }
      },
      error => {
        if (error.error.message == 'source required' || error.error.message == 'unknown source') {
          console.log("seatnumber key wrong or required")
        } else if (error.error.message == 'token not found' || error.error.message == 'token not matches' || error.error.message == 'token not matches please re-login') {
          this.toastr.error(this.translate.instant("Errors.tokenNotFound"));
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 1000);
        } else if (error.error.message == 'activity key required' || error.error.message == 'Wrong activity' || error.error.message == 'required district key') {
        } else if (error.error.message == 'access denied') {
        } else if (error.error.message == 'district not found' || error.error.message == 'invalid district' || error.error.message == 'required district field' || error.error.message == 'wrong district') {
        } else if (error.error.message == 'record not exists') {
          this.toastr.error('No Records Found.')
        } else {
          this.toastr.error(this.translate.instant("errors.tryAgain"));
              this.showHistoryFlag=true;
          var demo='{"profile":{"date_of_joining":[{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"1"},{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"2"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"3"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"4"},{"date":"","updated_by":"","value":"","id":"5"},{"date":"","updated_by":"","value":"","id":"6"},{"date":"2018-08-14","updated_by":"Sheetal Bapat","value":"","id":"7"}],"ugspecial":[{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"1"},{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"2"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"3"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"4"},{"date":"","updated_by":"","value":"","id":"5"},{"date":"","updated_by":"","value":"","id":"6"},{"date":"2018-08-14","updated_by":"Sheetal Bapat","value":"","id":"7"}],"profspecial":[{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"1"},{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"2"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"3"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"4"},{"date":"","updated_by":"","value":"","id":"5"},{"date":"","updated_by":"","value":"","id":"6"},{"date":"2018-08-14","updated_by":"Sheetal Bapat","value":"","id":"7"}],"account_no":[{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"1"},{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"2"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"3"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"4"},{"date":"","updated_by":"","value":"","id":"5"},{"date":"","updated_by":"","value":"","id":"6"},{"date":"2018-08-14","updated_by":"Sheetal Bapat","value":"","id":"7"}],"position":[{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"teacher","id":"1"},{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"teacher","id":"2"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"teacher","id":"3"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"teacher","id":"4"},{"date":"","updated_by":"","value":"","id":"5"},{"date":"","updated_by":"","value":"","id":"6"},{"date":"2018-08-14","updated_by":"Sheetal Bapat","value":"teacher","id":"7"}],"district":[{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"2726","id":"1"},{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"2727","id":"2"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"2719","id":"3"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"2719","id":"4"},{"date":"","updated_by":"","value":"","id":"5"},{"date":"","updated_by":"","value":"","id":"6"},{"date":"2018-08-14","updated_by":"Sheetal Bapat","value":"2726","id":"7"}],"bankname":[{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"1"},{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"2"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"3"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"4"},{"date":"","updated_by":"","value":"","id":"5"},{"date":"","updated_by":"","value":"","id":"6"},{"date":"2018-08-14","updated_by":"Sheetal Bapat","value":"","id":"7"}],"ifsccode":[{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"1"},{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"2"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"3"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"4"},{"date":"","updated_by":"","value":"","id":"5"},{"date":"","updated_by":"","value":"","id":"6"},{"date":"2018-08-14","updated_by":"Sheetal Bapat","value":"","id":"7"}],"current":{"date_of_joining":"1992","ugspecial":"ENGLISH","taluka_id":"2703","profspecial":"ENGLISH ,HISTORY","account_no":"60246694808","position":"teacher","bankname":"Bank Of Maharashtra","ifsccode":"MAHB0001641","grade":"8,9,10","aadhar_no":"601505135105","other":"","pgspecial":"","subject":"English","school_index":"27260105103","is_active":true,"under_graduation":"B.A.","post_graduation":"","address":"At:Hivargaon,Post:Dongargaon ,Tal:Akole,Dist:Ahemadnagar","dob":"1965-10-06","gender":"M","district_id":2727,"professional":"B.Ed.","fullname":"GIRI SOMNATH JAHALAM"},"grade":[{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"1"},{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"2"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"3"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"4"},{"date":"","updated_by":"","value":"","id":"5"},{"date":"","updated_by":"","value":"","id":"6"},{"date":"2018-08-14","updated_by":"Sheetal Bapat","value":"","id":"7"}],"other":[{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"1"},{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"2"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"3"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"4"},{"date":"","updated_by":"","value":"","id":"5"},{"date":"","updated_by":"","value":"","id":"6"},{"date":"2018-08-14","updated_by":"Sheetal Bapat","value":"","id":"7"}],"pgspecial":[{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"1"},{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"2"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"3"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"4"},{"date":"","updated_by":"","value":"","id":"5"},{"date":"","updated_by":"","value":"","id":"6"},{"date":"2018-08-14","updated_by":"Sheetal Bapat","value":"","id":"7"}],"subject":[{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"1"},{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"2"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"3"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"4"},{"date":"","updated_by":"","value":"","id":"5"},{"date":"","updated_by":"","value":"","id":"6"},{"date":"2018-08-14","updated_by":"Sheetal Bapat","value":"","id":"7"}],"school_index":[{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"27260105103","id":"1"},{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"27260105103","id":"2"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"27260105103","id":"3"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"27260105103","id":"4"},{"date":"","updated_by":"","value":"","id":"5"},{"date":"","updated_by":"","value":"","id":"6"},{"date":"2018-08-14","updated_by":"Sheetal Bapat","value":"27260105103","id":"7"}],"is_active":[{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"1"},{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"2"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"3"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"4"},{"date":"","updated_by":"","value":"","id":"5"},{"date":"","updated_by":"","value":"","id":"6"},{"date":"2018-08-14","updated_by":"Sheetal Bapat","value":"","id":"7"}],"under_graduation":[{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"1"},{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"2"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"3"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"4"},{"date":"","updated_by":"","value":"","id":"5"},{"date":"","updated_by":"","value":"","id":"6"},{"date":"2018-08-14","updated_by":"Sheetal Bapat","value":"","id":"7"}],"post_graduation":[{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"1"},{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"2"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"3"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"4"},{"date":"","updated_by":"","value":"","id":"5"},{"date":"","updated_by":"","value":"","id":"6"},{"date":"2018-08-14","updated_by":"Sheetal Bapat","value":"","id":"7"}],"address":[{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"1"},{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"2"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"3"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"4"},{"date":"","updated_by":"","value":"","id":"5"},{"date":"","updated_by":"","value":"","id":"6"},{"date":"2018-08-14","updated_by":"Sheetal Bapat","value":"","id":"7"}],"dob":[{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"1"},{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"2"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"3"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"4"},{"date":"","updated_by":"","value":"","id":"5"},{"date":"","updated_by":"","value":"","id":"6"},{"date":"2018-08-14","updated_by":"Sheetal Bapat","value":"","id":"7"}],"gender":[{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"1"},{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"2"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"3"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"4"},{"date":"","updated_by":"","value":"","id":"5"},{"date":"","updated_by":"","value":"","id":"6"},{"date":"2018-08-14","updated_by":"Sheetal Bapat","value":"","id":"7"}],"taluka":[{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"2601","id":"1"},{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"2704","id":"2"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"1909","id":"3"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"1904","id":"4"},{"date":"","updated_by":"","value":"","id":"5"},{"date":"","updated_by":"","value":"","id":"6"},{"date":"2018-08-14","updated_by":"Sheetal Bapat","value":"2603","id":"7"}],"professional":[{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"1"},{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"2"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"3"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"4"},{"date":"","updated_by":"","value":"","id":"5"},{"date":"","updated_by":"","value":"","id":"6"},{"date":"2018-08-14","updated_by":"Sheetal Bapat","value":"","id":"7"}],"fullname":[{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"1"},{"date":"2018-08-11","updated_by":"Sheetal Bapat","value":"","id":"2"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"3"},{"date":"2018-08-13","updated_by":"Sheetal Bapat","value":"","id":"4"},{"date":"","updated_by":"","value":"","id":"5"},{"date":"","updated_by":"","value":"","id":"6"},{"date":"2018-08-14","updated_by":"Sheetal Bapat","value":"","id":"7"}]},"role":{}}'
          this.historyDate=JSON.parse(demo)
          console.log("dd ",this.historyDate)
        }
      });
  }

  goToAdminPanel() {
    this.finishCall.emit(true);
  }

  reset() {
    this.mobnumber = '';
  }

  showDetails(type){
    if(type == 1){
      this.show1=true
      this.show2=false
      this.show3=false
      this.show4=false
      this.show5=false
      this.show6=false
      this.show7=false
      this.show8=false
      this.show9=false
      this.show10=false
      this.show11=false
      this.show12=false
      this.show13=false
      this.show14=false
      this.show15=false
      this.show16=false
      this.show17=false
      this.show18=false
      this.show19=false
      this.show20=false
      this.show21=false
      this.show22=false
    }else if(type == 2){
      this.show1=false
      this.show2=true
      this.show3=false
      this.show4=false
      this.show5=false
      this.show6=false
      this.show7=false
      this.show8=false
      this.show9=false
      this.show10=false
      this.show11=false
      this.show12=false
      this.show13=false
      this.show14=false
      this.show15=false
      this.show16=false
      this.show17=false
      this.show18=false
      this.show19=false
      this.show20=false
      this.show21=false
      this.show22=false
    }else if(type == 3){
      this.show1=false
      this.show2=false
      this.show3=true
      this.show4=false
      this.show5=false
      this.show6=false
      this.show7=false
      this.show8=false
      this.show9=false
      this.show10=false
      this.show11=false
      this.show12=false
      this.show13=false
      this.show14=false
      this.show15=false
      this.show16=false
      this.show17=false
      this.show18=false
      this.show19=false
      this.show20=false
      this.show21=false
      this.show22=false
    }else if(type == 4){
      this.show1=false
      this.show2=false
      this.show3=false
      this.show4=true
      this.show5=false
      this.show6=false
      this.show7=false
      this.show8=false
      this.show9=false
      this.show10=false
      this.show11=false
      this.show12=false
      this.show13=false
      this.show14=false
      this.show15=false
      this.show16=false
      this.show17=false
      this.show18=false
      this.show19=false
      this.show20=false
      this.show21=false
      this.show22=false
    }else if(type == 5){
      this.show1=false
      this.show2=false
      this.show3=false
      this.show4=false
      this.show5=true
      this.show6=false
      this.show7=false
      this.show8=false
      this.show9=false
      this.show10=false
      this.show11=false
      this.show12=false
      this.show13=false
      this.show14=false
      this.show15=false
      this.show16=false
      this.show17=false
      this.show18=false
      this.show19=false
      this.show20=false
      this.show21=false
      this.show22=false
    }else if(type == 6){
      this.show1=false
      this.show2=false
      this.show3=false
      this.show4=false
      this.show5=false
      this.show6=false
      this.show7=true
      this.show8=false
      this.show9=false
      this.show10=false
      this.show11=false
      this.show12=false
      this.show13=false
      this.show14=false
      this.show15=false
      this.show16=false
      this.show17=false
      this.show18=false
      this.show19=false
      this.show20=false
      this.show21=false
      this.show22=false
    }else if(type == 7){
      this.show1=false
      this.show2=false
      this.show3=false
      this.show4=false
      this.show5=false
      this.show6=false
      this.show7=true
      this.show8=false
      this.show9=false
      this.show10=false
      this.show11=false
      this.show12=false
      this.show13=false
      this.show14=false
      this.show15=false
      this.show16=false
      this.show17=false
      this.show18=false
      this.show19=false
      this.show20=false
      this.show21=false
      this.show22=false
    }else if(type == 8){
      this.show1=false
      this.show2=false
      this.show3=false
      this.show4=false
      this.show5=false
      this.show6=false
      this.show7=false
      this.show8=true
      this.show9=false
      this.show10=false
      this.show11=false
      this.show12=false
      this.show13=false
      this.show14=false
      this.show15=false
      this.show16=false
      this.show17=false
      this.show18=false
      this.show19=false
      this.show20=false
      this.show21=false
      this.show22=false
    }else if(type == 9){
      this.show1=false
      this.show2=false
      this.show3=false
      this.show4=false
      this.show5=false
      this.show6=false
      this.show7=false
      this.show8=false
      this.show9=true
      this.show10=false
      this.show11=false
      this.show12=false
      this.show13=false
      this.show14=false
      this.show15=false
      this.show16=false
      this.show17=false
      this.show18=false
      this.show19=false
      this.show20=false
      this.show21=false
      this.show22=false
    }else if(type == 10){
      this.show1=false
      this.show2=false
      this.show3=false
      this.show4=false
      this.show5=false
      this.show6=false
      this.show7=false
      this.show8=false
      this.show9=false
      this.show10=true
      this.show11=false
      this.show12=false
      this.show13=false
      this.show14=false
      this.show15=false
      this.show16=false
      this.show17=false
      this.show18=false
      this.show19=false
      this.show20=false
      this.show21=false
      this.show22=false
    }else if(type == 11){
      this.show1=false
      this.show2=false
      this.show3=false
      this.show4=false
      this.show5=false
      this.show6=false
      this.show7=false
      this.show8=false
      this.show9=false
      this.show10=false
      this.show11=true
      this.show12=false
      this.show13=false
      this.show14=false
      this.show15=false
      this.show16=false
      this.show17=false
      this.show18=false
      this.show19=false
      this.show20=false
      this.show21=false
      this.show22=false
    }else if(type == 12){
      this.show1=false
      this.show2=false
      this.show3=false
      this.show4=false
      this.show5=false
      this.show6=false
      this.show7=false
      this.show8=false
      this.show9=false
      this.show10=false
      this.show11=false
      this.show12=true
      this.show13=false
      this.show14=false
      this.show15=false
      this.show16=false
      this.show17=false
      this.show18=false
      this.show19=false
      this.show20=false
      this.show21=false
      this.show22=false
    }else if(type == 13){
      this.show1=false
      this.show2=false
      this.show3=false
      this.show4=false
      this.show5=false
      this.show6=false
      this.show7=false
      this.show8=false
      this.show9=false
      this.show10=false
      this.show11=false
      this.show12=false
      this.show13=true
      this.show14=false
      this.show15=false
      this.show16=false
      this.show17=false
      this.show18=false
      this.show19=false
      this.show20=false
      this.show21=false
      this.show22=false
    }else if(type == 14){
      this.show1=false
      this.show2=false
      this.show3=false
      this.show4=false
      this.show5=false
      this.show6=false
      this.show7=false
      this.show8=false
      this.show9=false
      this.show10=false
      this.show11=false
      this.show12=false
      this.show13=false
      this.show14=true
      this.show15=false
      this.show16=false
      this.show17=false
      this.show18=false
      this.show19=false
      this.show20=false
      this.show21=false
      this.show22=false
    }else if(type == 15){
      this.show1=false
      this.show2=false
      this.show3=false
      this.show4=false
      this.show5=false
      this.show6=false
      this.show7=false
      this.show8=false
      this.show9=false
      this.show10=false
      this.show11=false
      this.show12=false
      this.show13=false
      this.show14=false
      this.show15=true
      this.show16=false
      this.show17=false
      this.show18=false
      this.show19=false
      this.show20=false
      this.show21=false
      this.show22=false
    }else if(type == 16){
      this.show1=false
      this.show2=false
      this.show3=false
      this.show4=false
      this.show5=false
      this.show6=false
      this.show7=false
      this.show8=false
      this.show9=false
      this.show10=false
      this.show11=false
      this.show12=false
      this.show13=false
      this.show14=false
      this.show15=false
      this.show16=true
      this.show17=false
      this.show18=false
      this.show19=false
      this.show20=false
      this.show21=false
      this.show22=false
    }else if(type == 17){
      this.show1=false
      this.show2=false
      this.show3=false
      this.show4=false
      this.show5=false
      this.show6=false
      this.show7=false
      this.show8=false
      this.show9=false
      this.show10=false
      this.show11=false
      this.show12=false
      this.show13=false
      this.show14=false
      this.show15=false
      this.show16=false
      this.show17=true
      this.show18=false
      this.show19=false
      this.show20=false
      this.show21=false
      this.show22=false
    }else if(type == 18){
      this.show1=false
      this.show2=false
      this.show3=false
      this.show4=false
      this.show5=false
      this.show6=false
      this.show7=false
      this.show8=false
      this.show9=false
      this.show10=false
      this.show11=false
      this.show12=false
      this.show13=false
      this.show14=false
      this.show15=false
      this.show16=false
      this.show17=false
      this.show18=true
      this.show19=false
      this.show20=false
      this.show21=false
      this.show22=false
    }else if(type == 19){
      this.show1=false
      this.show2=false
      this.show3=false
      this.show4=false
      this.show5=false
      this.show6=false
      this.show7=false
      this.show8=false
      this.show9=false
      this.show10=false
      this.show11=false
      this.show12=false
      this.show13=false
      this.show14=false
      this.show15=false
      this.show16=false
      this.show17=false
      this.show18=false
      this.show18=false
      this.show19=true
      this.show20=false
      this.show21=false
      this.show22=false
    }else if(type == 20){
      this.show1=false
      this.show2=false
      this.show3=false
      this.show4=false
      this.show5=false
      this.show6=false
      this.show7=false
      this.show8=false
      this.show9=false
      this.show10=false
      this.show11=false
      this.show12=false
      this.show13=false
      this.show14=false
      this.show15=false
      this.show16=false
      this.show17=false
      this.show18=false
      this.show19=false
      this.show20=true
      this.show21=false
      this.show22=false
    }else if(type == 21){
      this.show1=false
      this.show2=false
      this.show3=false
      this.show4=false
      this.show5=false
      this.show6=false
      this.show7=false
      this.show8=false
      this.show9=false
      this.show10=false
      this.show11=false
      this.show12=false
      this.show13=false
      this.show14=false
      this.show15=false
      this.show16=false
      this.show17=false
      this.show18=false
      this.show19=false
      this.show20=false
      this.show21=true
      this.show22=false
    }else if(type == 22){
      this.show1=false
      this.show2=false
      this.show3=false
      this.show4=false
      this.show5=false
      this.show6=false
      this.show7=false
      this.show8=false
      this.show9=false
      this.show10=false
      this.show11=false
      this.show12=false
      this.show13=false
      this.show14=false
      this.show15=false
      this.show16=false
      this.show17=false
      this.show18=false
      this.show19=false
      this.show20=false
      this.show21=false
      this.show22=true
    }
  }
}
