import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Router } from "@angular/router";
import { AdminReportService } from "../admin-report.service";
import { TranslateService } from "@ngx-translate/core";
import { ToastsManager } from "ng6-toastr";
import { SharedDataService } from "src/app/services/shared-data.service";
import { environment } from "src/environments/environment";

declare var jQuery: any;
@Component({
  selector: "app-admin-panel",
  templateUrl: "./admin-panel.component.html"
})
export class AdminPanelComponent implements OnInit {
  public items;userType;
  alluserstatusreportL1;
  alluserstatusreportL2;
  alluserstatusreportL3;
  public showDistrictData;
  showParticipantData;
  showSearchData;
  distAggregate;
  showBatchDetails;
  showNotification;
  showMailReport;
  public showBankDetails;
  userTransferNReplace;
  allDistricts;
  coordinatorTransfer;
  historyLog;
  notStartedCountL1; totalCountL1; notStartedCountL2; totalCountL2;notStartedCountL3;totalCountL3;
  classFlag; piechartFlag;showProfileData;
  l1TotalUsersCount; l1DesktopCount; l1MobCount; l1TabCount;
  l2TotalUsersCount; l2DesktopCount; l2MobCount; l2TabCount; loader; refreshLoader;
  l3TotalUsersCount; l3DesktopCount; l3MobCount; l3TabCount; inModuleCountL3; 
  inModuleCountL1; inModuleCountL2; L1_status; L2_status; L3_status; mouseOvered1; mouseOvered2; mouseOvered3; reportUrl; isLoaded;
  resultl1;resultl2;resultl3
  constructor(
    public AdminReportService: AdminReportService,
    private router: Router,
    public translate: TranslateService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private _DataService :SharedDataService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.userType=window.localStorage.getItem('group_name')
    console.log("admin");
    document.querySelector("#content").classList.add("ml-0");
    // document.querySelector("a.sidebar-toggler").classList.add("hidden");
    // document.querySelector(".mobile-sidebar-toggler").classList.add("hidden");

    this.loader = false;
    this.showDistrictData = false;
    this.showParticipantData = false;
    this.showBatchDetails = false;
    this.showSearchData = false;
    this.showProfileData = false;
    this.distAggregate = false;
    this.showNotification = false;
    this.showMailReport = false;
    this.showBankDetails = false;
    this.userTransferNReplace = false;
    this.coordinatorTransfer = false;
    this.historyLog = false;
    setTimeout(() => {
      this.piechartFlag = true;
    }, 300);
    // if (window.localStorage.getItem('group_name') == 'superadmin' && window.localStorage.getItem('group_name') == 'admin' && window.localStorage.getItem('token') != null) {
    //   console.log('ok')
    this.getAllDistricts();
    // } else {
    //   this.router.navigate(['/']);
    // }
    this.allUserStatusReportL1();
    this.getAllActiveUsers();
  }


  ngOnDestroy() {
    this.setMenu()
  }

  getAllReport() {
    this.isLoaded = true;
    this.AdminReportService.getCalllvl1("alluserlevelstatusreport/", localStorage.getItem("token")).subscribe(data => {
      this.isLoaded = false;
      this.reportUrl = environment.downloadUrl + data["data"];
      var link = document.createElement("a");
      link.href = this.reportUrl;
      link.download = "alluserlevelstatus.csv";
      link.click();
      console.log(data)
    }, error => {
        this.toastr.error(error.error.message)
    })
  }

  scrollUp(){
    window.scroll(0,0)
  }

  menu1(){
    document.querySelector('#Submenu1').classList.toggle('show');
    document.querySelector('.custom1').classList.toggle('collapsed');
  }

  menu2(){
    document.querySelector('#Submenu2').classList.toggle('show');
    document.querySelector('.custom2').classList.toggle('collapsed');
  }

  refresh(){
    this.getAllActiveUsers();
    this.allUserStatusReportL1();
    this.piechartFlag = false;
    this.refreshLoader = true;
    setTimeout(() => {
      this.piechartFlag = true;
      this.refreshLoader = false;
    }, 1000);
  }

  customizeLabel(arg) {
    return arg.valueText + " (" + arg.percentText + ")";
  }

  toggleSidebar() {
    jQuery("#sidebar").toggleClass("active");
    // jQuery("#sidebarCollapse").toggleClass("active");
    this.classFlag = !this.classFlag;
    setTimeout(() => {
      this.piechartFlag = true;
    }, 300);
    this.scrollUp()
  }

  ShowDistrictData() {
    this.showDistrictData = true;
    this.showParticipantData = false;
    this.userTransferNReplace = false;
    this.coordinatorTransfer = false;
    this.historyLog = false
    this.showNotification = false;
    this.showSearchData = false;
    this.showProfileData = false;
    this.toggleSidebar();
  }

  ShowParticipantData() {
    this.showParticipantData = true;
    this.showDistrictData = false;
    this.userTransferNReplace = false;
    this.coordinatorTransfer = false;
    this.historyLog = false;
    this.showNotification = false;
    this.toggleSidebar();
  }

  backEvent(event) {
    if (event == true) {
      this.showDistrictData = false;
      this.showParticipantData = false;
      this.distAggregate = false;
      this.showBatchDetails = false;
      this.showSearchData = false;
      this.showNotification = false;
      this.showMailReport = false;
      this.showBankDetails = false;
      this.userTransferNReplace = false;
      this.coordinatorTransfer = false;
      this.historyLog = false;
      this.showProfileData = false;
      this.toggleSidebar();
    }
  }

  searchData() {
    this.showSearchData = true;
    this.showNotification = false;
    this.userTransferNReplace = false;
    this.showParticipantData = false;
    this.showDistrictData = false;
    this.coordinatorTransfer = false;
    this.historyLog = false;
    this.showProfileData = false;
    this.toggleSidebar();
  }
 
  setProfile(){
    this.showDistrictData = false;
    this.showParticipantData = false;
    this.userTransferNReplace = false;
    this.coordinatorTransfer = false;
    this.historyLog = false
    this.showNotification = false;
    this.showSearchData = false;
    this.showProfileData = true;
    this.toggleSidebar();
  }

  ShowNotification() {
    this.showNotification = true;
    this.userTransferNReplace = false;
    this.showParticipantData = false;
    this.showDistrictData = false;
    this.coordinatorTransfer = false;
    this.historyLog = false;
    this.showSearchData = false;
    this.showProfileData = false;
    this.toggleSidebar();
  }

  batchDetails() {
    this.showBatchDetails = true;
  }
  bankDetails() {
    this.showBankDetails = true;
  }

  reportDetails() {
    this.showMailReport = true;
  }
  distWiseAggregate() {
    this.distAggregate = true;
  }
  userTransferAndReplace() {
    this.userTransferNReplace = true;
    this.showParticipantData = false;
    this.showDistrictData = false;
    this.coordinatorTransfer = false;
    this.historyLog = false;
    this.showNotification = false;
    this.showSearchData = false;
    this.showProfileData = false;
    this.toggleSidebar();
  }
  coordinatorTransferAndCreate() {
    this.coordinatorTransfer = true;
    this.historyLog = false;
    this.showParticipantData = false;
    this.showDistrictData = false;
    this.userTransferNReplace = false;
    this.showNotification = false;
    this.showSearchData = false;
    this.showProfileData = false;
    this.toggleSidebar();
  }

  showHistory() {
    this.historyLog = true;
    this.coordinatorTransfer = false;
    this.showParticipantData = false;
    this.showDistrictData = false;
    this.userTransferNReplace = false;
    this.showNotification = false;
    this.showSearchData = false;
    this.showProfileData = false;
    this.toggleSidebar();
  }
  setMenu() {
    window.localStorage.setItem("hidemenu", "false");
    this.router.navigate(["/level-selection"]);
    let obJ = {};
    obJ['isAdmin'] = true;
    this._DataService.sendData(obJ);
    // document.querySelector("body").classList.remove("sidebar-hidden");
    // document.querySelector("a.sidebar-toggler").classList.remove("hidden");
    // document
    //   .querySelector(".mobile-sidebar-toggler")
    //   .classList.remove("hidden");
  }

  getAllDistricts() {
    var apiUrl = "alldistrict/";
    this.AdminReportService.getCalllvl1(
      apiUrl,
      window.localStorage.getItem("token")
    ).subscribe(
      data => {
        this.allDistricts = data['results'];
      },
      error => {
        if (error.error.message == "token not found" || error.error.message == 'token not matches please re-login') {
          this.toastr.error(this.translate.instant("Errors.tokenNotFound"));
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 5000);
        } else if (
          error.error.message == "session not matches please re-login"
        ) {
          this.toastr.error(this.translate.instant("Errors.sessionNotMatches"));
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 5000);
        } else if (
          error.error.message == "source is required" ||
          error.error.message == "unknown source"
        ) {
          console.log(error.error.message);
        } else {
          this.toastr.error(this.translate.instant("Errors.cannotProceed"));
        }
      }
      );
  }

  getAllActiveUsers() {
    var apiUrl = "getallactiveusers/";
    this.AdminReportService.getCalllvl1(apiUrl, window.localStorage.getItem('token')).subscribe(data => {
      if (data['message'] == "ok") {
        var activeUserDataL1 = data['data'].level1;
        var activeUserDataL2 = data['data'].level2;
        var activeUserDataL3 = data['data'].level3;
        
        this.l1TotalUsersCount = activeUserDataL1['totalusers'];
        this.l1DesktopCount = activeUserDataL1['desktop'];
        this.l1MobCount = activeUserDataL1['mobile'];
        this.l1TabCount = activeUserDataL1['tablet'];

        this.l2TotalUsersCount = activeUserDataL2['totalusers'];
        this.l2DesktopCount = activeUserDataL2['desktop'];
        this.l2MobCount = activeUserDataL2['mobile'];
        this.l2TabCount = activeUserDataL2['tablet'];

        this.l3TotalUsersCount = activeUserDataL3['totalusers'];
        this.l3DesktopCount = activeUserDataL3['desktop'];
        this.l3MobCount = activeUserDataL3['mobile'];
        this.l3TabCount = activeUserDataL3['tablet'];

        if (activeUserDataL1 && activeUserDataL2 && activeUserDataL3) {
          this.loader = true;
        } else {
          this.loader = false;
        }
      }
    },
      error => {
        if (error.error.message == "token not found" || error.error.message == 'token not matches please re-login') {
          this.toastr.error(this.translate.instant("Errors.tokenNotFound"));
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 5000);
        } else if (
          error.error.message == "session not matches please re-login"
        ) {
          this.toastr.error(this.translate.instant("Errors.sessionNotMatches"));
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 5000);
        } else if (
          error.error.message == "source is required" ||
          error.error.message == "unknown source"
        ) {
          console.log(error.error.message);
        } else {
          this.toastr.error(this.translate.instant("Errors.cannotProceed"));
        }
      })
  }

  allUserStatusReportL1() {
    var jsonBody={};
    jsonBody["level"] = "1"
    var apiUrl = "alluserstatusreport/";
    this.AdminReportService.postCall(
      jsonBody,
      apiUrl
    ).subscribe(
      data => {
        if (data['message'] == "ok") {
          this.resultl1 = data['data'].result[0];
          console.log(this.resultl1)
          var dJson = {};
          var demo = [];
          dJson = this.resultl1;
          for (let i in dJson) {
            var j = {};
            console.log("key : " + i + " - value : " + dJson[i]);
            j["que"] = i;
            j["val"] = dJson[i];

            i == "total" ? j["que"] = "Total" : "";
            i == "not_started" ? j["que"] = "Not Started"+ " ("+dJson[i]+")" : "";
            // i == "in_module0" ? j["que"] = "In Module0"+ " ("+dJson[i]+")" : "";
            i == "com_module0" ? j["que"] = "In Module 1"+ " ("+dJson[i]+")" : "";
            i == "com_module1" ? j["que"] = "In Module 2"+ " ("+dJson[i]+")" : "";
            i == "com_module2" ? j["que"] = "In Module 3"+ " ("+dJson[i]+")" : "";
            i == "com_module3" ? j["que"] = "In Module 4"+ " ("+dJson[i]+")" : "";
            i == "com_module4" ? j["que"] = "In Module 5"+ " ("+dJson[i]+")" : "";
            i == "com_module5" ? j["que"] = "Endline"+ " ("+dJson[i]+")" : "";
            // i == "com_module6" ? j["que"] = "Endline Complete"+ " ("+dJson[i]+")" : "";
            // i == "com_module7" ? j["que"] = "Project Complete"+ " ("+dJson[i]+")" : "";
            i == "completed" ? j["que"] = "completed"+ " ("+dJson[i]+")" : "";

            if (i == "completed") {
              this.totalCountL1 = dJson[i];
            }
            if (i == "not_started") {
              this.notStartedCountL1 = dJson[i];
            }
            if (i == "in_module") {
              this.inModuleCountL1 = dJson[i];
            }

            if (i == "in_module" || i == "com_module6" || i == "com_module7") {
              delete j["que"];
            }
            demo.push(j);
          }
          this.alluserstatusreportL1 = demo;
          console.log('demo', this.alluserstatusreportL1)
          this.allUserStatusReportL2();
        }
      },
      error => {
        if (error.error.message == "token not found" || error.error.message == 'token not matches please re-login') {
          this.toastr.error(this.translate.instant("Errors.tokenNotFound"));
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 5000);
        } else if (
          error.error.message == "session not matches please re-login"
        ) {
          this.toastr.error(this.translate.instant("Errors.sessionNotMatches"));
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 5000);
        } else if (
          error.error.message == "source is required" ||
          error.error.message == "unknown source"
        ) {
          console.log(error.error.message);
        } else {
          this.toastr.error(this.translate.instant("Errors.cannotProceed"));
        }
      }
      );
  }

  allUserStatusReportL2() {
    var jsonBody={};
    jsonBody["level"] = "2"
    var apiUrl = "alluserstatusreport/";
    this.AdminReportService.postCall(
     jsonBody,
      apiUrl
    ).subscribe(
      data => {
        if (data['message'] == "ok") {
          this.resultl2 = data['data'].result[0];
          console.log(this.resultl2)
          var dJson = {};
          var demo = [];
          dJson = this.resultl2;
          for (let i in dJson) {
            var j = {};
            console.log("key : " + i + " - value : " + dJson[i]);
            j["que"] = i;
            j["val"] = dJson[i];

            i == "total" ? j["que"] = "Total" : "";
            i == "not_started" ? j["que"] = "Not Started"+ " ("+dJson[i]+")" : "";
            i == "in_module0" ? j["que"] = "Baseline"+ " ("+dJson[i]+")" : "";
            i == "com_module0" ? j["que"] = "In Module 1"+ " ("+dJson[i]+")" : "";
            i == "com_module1" ? j["que"] = "In Module 2"+ " ("+dJson[i]+")" : "";
            i == "com_module2" ? j["que"] = "In Module 3"+ " ("+dJson[i]+")" : "";
            i == "com_module3" ? j["que"] = "In Module 4"+ " ("+dJson[i]+")" : "";
            i == "com_module4" ? j["que"] = "In Module 5"+ " ("+dJson[i]+")" : "";
            i == "com_module5" ? j["que"] = "Endline"+ " ("+dJson[i]+")" : "";
            i == "completed" ? j["que"] = "completed"+ " ("+dJson[i]+")" : "";
            // i == "com_module7" ? j["que"] = "Project Complete"+ " ("+dJson[i]+")" : "";

            if (i == "completed") {
              this.totalCountL2 = dJson[i];
            }

            if (i == "not_started") {
              this.notStartedCountL2 = dJson[i];
            }

            if (i == "in_module") {
              this.inModuleCountL2 = dJson[i];
            }


            if (i == "in_module" || i == "com_module6" || i == "com_module7") {
              delete j["que"];
            }
            demo.push(j);
          }
          this.alluserstatusreportL2 = demo;
          console.log('demo', this.alluserstatusreportL2)
          this.allUserStatusReportL3();
        }
      },
      error => {
        if (error.error.message == "token not found" || error.error.message == 'token not matches please re-login') {
          this.toastr.error(this.translate.instant("Errors.tokenNotFound"));
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 5000);
        } else if (
          error.error.message == "session not matches please re-login"
        ) {
          this.toastr.error(this.translate.instant("Errors.sessionNotMatches"));
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 5000);
        } else if (
          error.error.message == "source is required" ||
          error.error.message == "unknown source"
        ) {
          console.log(error.error.message);
        } else {
          this.toastr.error(this.translate.instant("Errors.cannotProceed"));
        }
      }
      );
  }
  
  allUserStatusReportL3() {
    var jsonBody={};
    jsonBody["level"] = "3"
    var apiUrl = "alluserstatusreport/";
    this.AdminReportService.postCall(
      jsonBody,
      apiUrl
    ).subscribe(
      data => {
        if (data['message'] == "ok") {
          this.resultl3 = data['data'].result[0];
          console.log(this.resultl3)
          var dJson = {};
          var demo = [];
          dJson = this.resultl3;
          for (let i in dJson) {
            var j = {};
            console.log("key : " + i + " - value : " + dJson[i]);
            j["que"] = i;
            j["val"] = dJson[i];

            i == "total" ? j["que"] = "Total" : "";
            i == "not_started" ? j["que"] = "Not Started" + " ("+dJson[i]+")" : "";
            i == "in_module0" ? j["que"] = "Baseline" + " ("+dJson[i]+")" : "";
            i == "com_module0" ? j["que"] = "In Module 1" + " ("+dJson[i]+")" : "";
            i == "com_module1" ? j["que"] = "In Module 2" + " ("+dJson[i]+")" : "";
            i == "com_module2" ? j["que"] = "In Module 3" + " ("+dJson[i]+")" : "";
            i == "com_module3" ? j["que"] = "In Module 4" + " ("+dJson[i]+")" : "";
            i == "com_module4" ? j["que"] = "In Module 5" + " ("+dJson[i]+")" : "";
            i == "com_module5" ? j["que"] = "Endline" + " ("+dJson[i]+")" : "";
            i == "completed" ? j["que"] = "completed" + " ("+dJson[i]+")" : "";
            // i == "com_module7" ? j["que"] = "Project Complete" + " ("+dJson[i]+")" : "";

            if (i == "completed") {
              this.totalCountL3 = dJson[i];
            }

            if (i == "not_started") {
              this.notStartedCountL3 = dJson[i];
            }

            if (i == "in_module") {
              this.inModuleCountL3 = dJson[i];
            }

            if (i == "in_module") {
              delete j["que"];
            }
            demo.push(j);
          }
          this.alluserstatusreportL3 = demo;
          console.log('demoL33', this.alluserstatusreportL3)
        }
      },
      error => {
        if (error.error.message == "token not found" || error.error.message == 'token not matches please re-login') {
          this.toastr.error(this.translate.instant("Errors.tokenNotFound"));
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 5000);
        } else if (
          error.error.message == "session not matches please re-login"
        ) {
          this.toastr.error(this.translate.instant("Errors.sessionNotMatches"));
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 5000);
        } else if (
          error.error.message == "source is required" ||
          error.error.message == "unknown source"
        ) {
          console.log(error.error.message);
        } else {
          this.toastr.error(this.translate.instant("Errors.cannotProceed"));
        }
      }
      );
  }
}
