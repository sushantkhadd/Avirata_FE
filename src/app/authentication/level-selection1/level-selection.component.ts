import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { ModalDirective } from "ngx-bootstrap";
import { LanguageService } from "src/app/language.service";
import { LocalstoragedetailsService } from "src/app/services/localstoragedetails.service";
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'app-level-selection',
  templateUrl: './level-selection.component.html',
  styleUrls: ['./level-selection.component.scss']
})
export class LevelSelectionComponent implements OnInit {

  constructor( public LocalstoragedetailsService: LocalstoragedetailsService,public LanguageService: LanguageService, public router: Router,public toastr: ToastsManager, vcr: ViewContainerRef, public translate: TranslateService) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  public completedLevelJson; lvl1Current; lvl1Complete; lvl2Current; lvl2Complete; superAdminFlag; currentLevel; userType;
  complete = "पूर्ण";
  start1 = "पहिला टप्पा सुरू करण्यासाठी येथे क्लिक करा.";
  start2 = "दुसरा टप्पा सुरू करण्यासाठी येथे क्लिक करा.";
  noAccessFlag = false; startDate; endDate; group_name;certificate;userID;pdfUrl;district;cLink;

 public setUrl;
  ngOnInit() {
    console.log("level-selection")
    var encrypted = this.LanguageService.set('aesEncryptionKey', window.localStorage.getItem('setData'))

    var a = encrypted.replace(new RegExp('/', 'g'), '~');
    // this.setUrl='http://192.168.1.110:4200/#/l1/'+a
    this.setUrl=environment.redirectUrl+a

    this.district=window.localStorage.getItem('districtid')
    this.pdfUrl='https://s3-ap-southeast-1.amazonaws.com/maacpd/e-certificate/'
    if (window.localStorage.getItem('token') == null || window.localStorage.getItem('token') == undefined || window.localStorage.getItem('token') == '') {
      this.router.navigate(['/']);
    }
    this.userType = window.localStorage.getItem('group_name');
    this.startDate = window.localStorage.getItem('startDate');
    this.endDate = window.localStorage.getItem('endDate');
    this.lvl1Current = false;
    this.lvl1Complete = false;
    this.lvl2Current = false;
    this.lvl2Complete = false;
    this.completedLevelJson = JSON.parse(window.localStorage.getItem('levelStatus'));
    this.currentLevel = this.completedLevelJson['currentlevel']
    // this.currentLevel='completed'
    if (this.completedLevelJson['level1'] == true && this.completedLevelJson['level2'] == false && this.userType != 'superadmin' && this.userType != 'admin') {
      this.lvl1Current = true;
    } else if (this.completedLevelJson['level2'] == true && this.completedLevelJson['level1'] == false && this.userType != 'superadmin' && this.userType != 'admin') {
      this.lvl2Current = true;
      this.lvl1Complete = true
    } else if (this.completedLevelJson['level2'] == true && this.completedLevelJson['level1'] == true && this.userType != 'superadmin' && this.userType != 'admin') {
      this.lvl1Complete = true
      this.lvl2Current = true
    } else if (this.completedLevelJson['level2'] == false && this.completedLevelJson['level1'] == false && this.userType != 'superadmin' && this.userType != 'admin') {
      this.noAccessFlag = true
      // this.toastr.error("क्षमस्व. आपण ‘योजलेल्या प्रशिक्षण कालावधीमध्ये’ नसल्यामुळे आपला प्रवेश नाकारण्यात आला आहे.")
    } else if (this.userType == 'superadmin' || this.userType == 'admin') {
      this.lvl1Complete = true
      this.lvl2Current = true
      this.noAccessFlag = false

    }

    // this.userType = window.localStorage.getItem('group_name');

    if (this.userType == 'superadmin') {
      this.superAdminFlag = true;
    } else {
      this.superAdminFlag = false;
    }

    this.userID=window.localStorage.getItem('userid')
    if(window.localStorage.getItem('certificate')!=undefined){
      this.certificate=JSON.parse((window.localStorage.getItem('certificate')).replace(/'/g, '"'))
    }else{
      this.certificate=''
    }
    // }
    console.log("USEr ",Math.ceil((this.userID/1000)))

    this.cLink=Math.ceil((this.userID/1000))

  }

  levelStatus(level) {

    var jsonBody = {}
    jsonBody['level'] = level

    // this.LoginService.postCall(jsonBody, 'levelstatus/')
    //   .subscribe(
    //   data => {

    //     if (level == 2) {
    //       //   if (JSON.stringify(data.data.token) != null || JSON.stringify(data.data.token) != undefined) {

    //       //   window.localStorage.setItem('username',this.loginModel.userName)
    //       //   window.localStorage.setItem('token', data.data.token)
    //       //   window.localStorage.setItem('userid', data.data.user_id)
    //       //   window.localStorage.setItem('name', data.data.firstname)
    //       //   window.localStorage.setItem('flag', data.data.flag);
    //       //   window.localStorage.setItem('districtid', data.data.districtid)
    //       //   window.localStorage.setItem('districtname', data.data.districtname)
    //       //   window.localStorage.setItem('designation', data.data.position)
    //       window.localStorage.setItem('startDate', data.data.modulestatus.daterange.startDate)
    //       window.localStorage.setItem('endDate', data.data.modulestatus.daterange.endDate)
    //       window.localStorage.setItem('assignmentDate', data.data.modulestatus.daterange.assignmentDate)
    //       //               this.LanguageService.googleEventTrack('Entry', this.loginModel.userName,data.districtname, 10);
    //       //   if(data.data.coordinatorstatus  == false){
    //       //     this.LocalstoragedetailsService.coordinatorApproveMessage=true;
    //       //   }
    //       if (data.data.modulestatus.module0 == false) {
    //         window.localStorage.setItem('currentstatus', '-1');
    //       }
    //       if (data.data.modulestatus.module0 == true) {
    //         window.localStorage.setItem('currentstatus', '0');
    //       } if (data.data.modulestatus.module1 == true) {
    //         window.localStorage.setItem('currentstatus', '1');
    //       } if (data.data.modulestatus.module2 == true) {
    //         window.localStorage.setItem('currentstatus', '2');
    //       } if (data.data.modulestatus.module3 == true) {
    //         window.localStorage.setItem('currentstatus', '3');
    //       } if (data.data.modulestatus.module4 == true) {
    //         window.localStorage.setItem('currentstatus', '4');
    //       } if (data.data.modulestatus.module5 == true) {
    //         window.localStorage.setItem('currentstatus', '5');
    //       } if (data.data.modulestatus.module6 == true) {
    //         window.localStorage.setItem('currentstatus', '6');
    //       } if (data.data.modulestatus.module7 == true) {
    //         window.localStorage.setItem('currentstatus', '7');
    //       }

    //       var completeModule = {};
    //       completeModule['module0'] = false;
    //       completeModule['module1'] = false;
    //       completeModule['module2'] = false;
    //       completeModule['module3'] = false;
    //       completeModule['module4'] = false;
    //       completeModule['module5'] = false;
    //       completeModule['module6'] = false;
    //       completeModule['module7'] = false;

    //       if (data.data.modulestatus.last_completed_ids.includes(0)) {
    //         completeModule['module0'] = true;
    //       } if (data.data.modulestatus.last_completed_ids.includes(1)) {
    //         completeModule['module1'] = true;
    //       } if (data.data.modulestatus.last_completed_ids.includes(2)) {
    //         completeModule['module2'] = true;
    //       } if (data.data.modulestatus.last_completed_ids.includes(3)) {
    //         completeModule['module3'] = true;
    //       } if (data.data.modulestatus.last_completed_ids.includes(4)) {
    //         completeModule['module4'] = true;
    //       } if (data.data.modulestatus.last_completed_ids.includes(5)) {
    //         completeModule['module5'] = true;
    //       } if (data.data.modulestatus.last_completed_ids.includes(6)) {
    //         completeModule['module6'] = true;
    //       } if (data.data.modulestatus.last_completed_ids.includes(7)) {
    //         completeModule['module7'] = true;
    //       }
    //       window.localStorage.setItem('completeModule', JSON.stringify(completeModule));
    //       this.router.navigate(["/dashboard"]);
    //     }
    //   },
    //   error => {
    //     if (error.json().message == 'enter correct level number') {
    //       console.log(error.json().message)
    //     } else if (error.json().message == 'source is required' || error.json().message == 'unknown source') {
    //       console.log(error.json().message)
    //     } else if (error.json().message == 'json key error') {
    //       console.log(error.json().message)
    //     } else if (error.json().message == 'token not found' || error.json().message == 'session not matches please re-login') {
    //       this.toastr.error(this.translate.instant("Errors.tokenNotFound"));
    //       setTimeout(() => {
    //         this.router.navigate(["/"]);
    //       }, 1000);
    //     } else {
    //       this.toastr.error(this.translate.instant('Errors.cannotProceed'));
    //     }
    //   }//Catch Error if server is not Found
    //   );

  }

  logout(){
    this.LanguageService.googleEventTrack('OUT', 'currentuser', 'UserLogout', 10);
    // this.LoginService.getCall('logout/')
    //   .subscribe(
    //   data => {
    //     if (data.Response == "User Logged Out") {
    //       window.localStorage.clear();
    //       this.router.navigate(['/']);
    //     } else if (data.Response == "session not matches please re-login" || data.Response == "session not matches") {
    //       // alert("कृपया पुन्हा लॉगइन करा")
    //       this.router.navigate(['/']);
    //     } else {
    //       this.router.navigate(['/']);
    //     }
    //   },
    //   err =>
    //     this.toastr.error('०४०: आपली विनंती आत्ता पूर्ण करू शकत नाही, कृपया पुन्हा प्रयत्न करा.')
    //   // alert("आपली विनंती आत्ता पूर्ण करू शकत नाही, कृपया पुन्हा प्रयत्न करा.")
    //   );
  }
}
