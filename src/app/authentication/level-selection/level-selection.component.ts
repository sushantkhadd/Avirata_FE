import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Router } from "@angular/router";
import { LanguageService } from "src/app/language.service";
import { LocalstoragedetailsService } from "src/app/services/localstoragedetails.service";
import { environment } from "src/environments/environment";
import { TranslateService } from "@ngx-translate/core";
import { ToastsManager } from "ng6-toastr";
import { CommonService } from "src/app/services/common.service";
import { SharedDataService } from "src/app/services/shared-data.service";

@Component({
  selector: 'app-level-selection',
  templateUrl: './level-selection.component.html',
  styleUrls: ['./level-selection.component.scss']
})
export class LevelSelectionComponent implements OnInit {

  constructor(public LocalstoragedetailsService: LocalstoragedetailsService, public LanguageService: LanguageService, public router: Router, public toastr: ToastsManager, vcr: ViewContainerRef, public translate: TranslateService, public CommonServive:CommonService,private sharedService: SharedDataService,) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  public completedLevelJson; lvl1Current; lvl1Complete; lvl2Current; lvl2Complete;
  lvl3Current; lvl3Complete;
  superAdminFlag; currentLevel; userType;
  complete = "पूर्ण";
  start1 = "पहिला टप्पा सुरू करण्यासाठी येथे क्लिक करा.";
  start2 = "दुसरा टप्पा सुरू करण्यासाठी येथे क्लिक करा.";
  noAccessFlag = false; startDate; endDate; group_name;certificate;userID;pdfUrl;district;cLink;

  public setUrl1; setUrl2;userName;

  ngOnInit() {
    var encrypted = this.LanguageService.set('aesEncryptionKey', window.localStorage.getItem('setData'))

    var a = encrypted.replace(new RegExp('/', 'g'), '~');
    // this.setUrl='http://192.168.1.110:4200/#/l1/'+a
    this.setUrl1 = environment.redirectUrl1 + a
    this.setUrl2 = environment.redirectUrl2 + a

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
    this.lvl3Current = false;
    this.lvl3Complete = false;
    this.completedLevelJson = JSON.parse(window.localStorage.getItem('levelStatus'));
    this.currentLevel = this.completedLevelJson['currentlevel']
    // this.currentLevel='completed'
    if (this.completedLevelJson['level1'] == true && this.completedLevelJson['level2'] == false && this.completedLevelJson['level3'] == false && this.userType != 'superadmin' && this.userType != 'admin') {
      this.lvl1Current = true;
    } else if (this.completedLevelJson['level2'] == true && this.completedLevelJson['level1'] == false && this.completedLevelJson['level3'] == false && this.userType != 'superadmin' && this.userType != 'admin') {
      this.lvl2Current = true;
      this.lvl1Complete = true
    } else if (this.completedLevelJson['level3'] == true && this.completedLevelJson['level1'] == false && this.completedLevelJson['level2'] == false && this.userType != 'superadmin' && this.userType != 'admin') {
      this.lvl1Complete = true
      this.lvl2Complete = true;
      this.lvl3Current = true
    }
    else if (this.completedLevelJson['level1'] == true && this.completedLevelJson['level2'] == true && this.completedLevelJson['level3'] == false && this.userType != 'superadmin' && this.userType != 'admin')
    {
      this.lvl1Complete = true
      this.lvl2Current = true
    }
    else if (this.completedLevelJson['level2'] == true && this.completedLevelJson['level1'] == true && this.completedLevelJson['level3'] == true && this.userType != 'superadmin' && this.userType != 'admin')
    {
      this.lvl1Complete = true
      this.lvl2Complete = true
      this.lvl3Current = true
    } else if (this.completedLevelJson['level2'] == false && this.completedLevelJson['level1'] == false && this.completedLevelJson['level3'] == false && this.userType != 'superadmin' && this.userType != 'admin')
    {
      this.noAccessFlag = true
      window.localStorage.setItem("hidemenu","true");
      if (
        window.localStorage.getItem("firstname") != null &&
        window.localStorage.getItem("firstname") != null &&
        window.localStorage.getItem("firstname") != null
      ) {
        this.userName = window.localStorage.getItem("firstname");
        console.log('username',this.userName)
      }
      // this.toastr.error("क्षमस्व. आपण ‘योजलेल्या प्रशिक्षण कालावधीमध्ये’ नसल्यामुळे आपला प्रवेश नाकारण्यात आला आहे.")
    } else if (this.userType == 'superadmin' || this.userType == 'admin') {
      this.lvl1Complete = true
      this.lvl2Complete = true;
      this.lvl3Current = true;
      this.noAccessFlag = false

    }

    // this.userType = window.localStorage.getItem('group_name');

    if (this.userType == 'superadmin') {
      this.superAdminFlag = true;
      this.lvl2Complete = false;
      this.lvl1Complete = false;
      this.lvl2Current = true
      this.lvl1Current = true
      console.log("aSAAD",this.lvl1Current,this.lvl1Complete,this.lvl2Current,this.lvl2Complete,this.lvl3Current,this.lvl3Complete)
    } else {
      this.superAdminFlag = false;
    }

    this.userID=window.localStorage.getItem('user_id')
    if(window.localStorage.getItem('certificate')!=undefined){
      this.certificate=JSON.parse((window.localStorage.getItem('certificate')).replace(/'/g, '"'))
    }else{
      this.certificate=''
    }
    // }
    console.log("USEr ",Math.ceil((this.userID/1000)))

    this.cLink=Math.ceil((this.userID/1000))

  }

  hideMenu() {
    this.router.navigate(["/modules/admin_panel"]);
    let obJ = {};
    obJ["isAdmin"] = true;
    this.sharedService.sendData(obJ);
    window.localStorage.setItem("hidemenu", "true");
  }

  hideMenu1() {
    if(this.userType =='superadmin'|| this.userType=='admin'){
      this.router.navigate(["/modules/masterstat"]);
    }
   else if(this.userType =='master_trainer'|| this.userType=='co_ordinator'){
      this.router.navigate(["/modules/user_list"]);
    }
    window.localStorage.setItem("hidemenuAdmin", "true");
  }

  levelStatus(level) {

    var jsonBody = {}
    jsonBody['level'] = level

    this.CommonServive.postCall('levelstatus/', jsonBody)
      .subscribe(
      data => {
        if (level == 3) {
          window.localStorage.setItem("hidemenuAdmin", "false");
          window.localStorage.setItem('startDate', data['data'].modulestatus.daterange.startDate)
          window.localStorage.setItem('endDate', data['data'].modulestatus.daterange.endDate)
          window.localStorage.setItem('assignmentDate', data['data'].modulestatus.daterange.assignmentDate)

          window.localStorage.setItem('levelData', JSON.stringify(data['data'].modulestatus.level3));

          if (data['data'].modulestatus["level3"].module0 == false) {
            window.localStorage.setItem('currentstatus', '-1');
          }
          if (
            data["data"].modulestatus.level3[0]["module"] == "0" &&
            data["data"].modulestatus.level3[0]["status"] == true
          ) {
            window.localStorage.setItem("currentstatus", "0");
          } if (
            data['data'].modulestatus.level3[1]["module"] == "1" &&
            data["data"].modulestatus.level3[1]["status"] == true
          )
          {
            window.localStorage.setItem('currentstatus', '1');
          } if (
            data['data'].modulestatus.level3[2]["module"] == "2" &&
            data["data"].modulestatus.level3[2]["status"] == true
          )
          {
            window.localStorage.setItem('currentstatus', '2');
          } if (
            data['data'].modulestatus.level3[3]["module"] == "3" &&
            data["data"].modulestatus.level3[3]["status"] == true
          )
          {
            window.localStorage.setItem('currentstatus', '3');
          } if (
            data['data'].modulestatus.level3[4]["module"] == "4" &&
            data["data"].modulestatus.level3[4]["status"] == true
          )
          {
            window.localStorage.setItem('currentstatus', '4');
          } if (
            data['data'].modulestatus.level3[5]["module"] == "5" &&
            data["data"].modulestatus.level3[5]["status"] == true
          )
          {
            window.localStorage.setItem('currentstatus', '5');
          }

          var completeModule = {};
          completeModule['module0'] = false;
          completeModule['module1'] = false;
          completeModule['module2'] = false;
          completeModule['module3'] = false;
          completeModule['module4'] = false;
          completeModule['module5'] = false;
          completeModule['module6'] = false;
          completeModule['module7'] = false;

          if (data['data'].modulestatus.last_completed_ids.includes(0)) {
            completeModule['module0'] = true;
          } if (data['data'].modulestatus.last_completed_ids.includes(1)) {
            completeModule['module1'] = true;
          } if (data['data'].modulestatus.last_completed_ids.includes(2)) {
            completeModule['module2'] = true;
          } if (data['data'].modulestatus.last_completed_ids.includes(3)) {
            completeModule['module3'] = true;
          } if (data['data'].modulestatus.last_completed_ids.includes(4)) {
            completeModule['module4'] = true;
          } if (data['data'].modulestatus.last_completed_ids.includes(5)) {
            completeModule['module5'] = true;
          }
          window.localStorage.setItem('completeModule', JSON.stringify(completeModule));
          this.router.navigate(["/dashboard"]);
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }//Catch Error if server is not Found
      );

  }

  logout(){
    this.LanguageService.googleEventTrack('L3OUT', 'currentuser', 'UserLogout', 10);
    this.CommonServive.getCall("logout/").subscribe(
      data => {
        if (data['Response'] == "User Logged Out") {
          window.localStorage.clear();
          this.router.navigate(["/"]);
        } else if (
          data['Response'] == "session not matches please re-login" ||
          data['Response'] == "session not matches" ||
          data['Response'] == "Token Not Matches"
        ) {
          this.router.navigate(["/"]);
        } else {
          this.router.navigate(["/"]);
        }
      },
      error =>
        this.toastr.error(
          "०४०: आपली विनंती आत्ता पूर्ण करू शकत नाही, कृपया पुन्हा प्रयत्न करा."
        )
    );
  }
}
