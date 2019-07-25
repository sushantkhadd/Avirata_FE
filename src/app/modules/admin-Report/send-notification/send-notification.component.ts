import { Component, OnInit, Output, EventEmitter, ViewContainerRef, Input } from "@angular/core";
import { AdminReportService } from "../admin-report.service";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ToastsManager } from "ng6-toastr";
import { CsvService } from "angular2-json2csv";

@Component({
  selector: "app-send-notification",
  templateUrl: "./send-notification.component.html",
  styleUrls: ["./send-notification.component.scss"]
})
export class SendNotificationComponent implements OnInit {
  @Output() public finishCall = new EventEmitter<any>();
  @Input() allDistricts;
  constructor(private csvService: CsvService, public _service: AdminReportService, public translate: TranslateService, public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  public showDetails; districtList; talukaList; showUser; selectedCategory; selectedDistrict; selectedTaluka; Not_title; message; districtName; notificationData; select_ctg; sendDisable;

  selectedLevel;
  public categories = [
    {
      "label": "Send notification to All",
      "value": "generalleveltwo"
    },
    {
      "label": "Admin",
      "value": "admin"
    },
    {
      "label": "Co-ordinator",
      "value": "co_ordinator"
    },
    {
      "label": "Master Trainer",
      "value": "master_trainer"
    },
    {
      "label": "Trainee",
      "value": "trainee"
    },
  ]

  public allTalukas;

  ngOnInit() {
    this.selectedCategory = "";
    this.selectedDistrict = "";
    this.selectedTaluka = "";
    this.districtList = false;
    this.talukaList = false;
    this.showUser = false;
    this.showDetails = false;
    this.select_ctg = "Select Category";
    this.Not_title = "";
    this.message = "";
    this.selectedLevel = ""
    // this.getAllDistricts();
  }

  // getLevel() {
  //   if (this.selectedLevel == "L1")
  //   {
  //     this.getAllParticipantsData(this.selectedLevel);
  //   } else if (this.selectedLevel == "L2")
  //   {
  //     this.getAllParticipantsData(this.selectedLevel);
  //   } else if (this.selectedLevel == "L3")
  //   {
  //     this.getAllParticipantsData(this.selectedLevel);
  //   }
  // }

  ngDoCheck() {
    if(this.Not_title.trim().length == 0 ){
      this.sendDisable = true;
    }else {
      this.sendDisable = false;
    }

    if(this.message.trim().length == 0 ){
      this.sendDisable = true;
    }else {
      this.sendDisable = false;
    }
  }

  getCategory() {
    // if (this.selectedCategory == "Send notification to Specific district") {
    //   this.districtList = true;
    //   this.talukaList = false;
    //   this.showUser = false;
    //   this.selectedDistrict = "";
    // } else if (
    //   this.selectedCategory == "Send notification to Specific taluka"
    // ) {
    //   this.talukaList = true;
    //   this.districtList = true;
    //   this.showUser = false;
    //   this.selectedTaluka = "";
    // } else if (
    //   this.selectedCategory == "Send notification to individual user"
    // ) {
    //   this.showUser = true;
    //   this.talukaList = false;
    //   this.districtList = false;
    // } else {
    //   this.districtList = false;
    //   this.talukaList = false;
    //   this.showUser = false;
    //   this.selectedCategory = "";
    //   this.selectedDistrict = "";
    //   this.selectedTaluka = "";
    // }

    console.log(this.selectedCategory)
  }

  getDistrict(e) {
    this.districtName = document.getElementById("districtName").innerText;
    this.getDistrictWiseTaluka();
  }

  getDistrictWiseTaluka() {
    var apiUrl = "districtwisetaluka/";
    this._service.getCall(
      apiUrl + this.selectedDistrict,
      window.localStorage.getItem("token")
    ).subscribe(
      data => {
        this.allTalukas = data['results'];
        this.selectedTaluka = "";
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
        } else if (error.error.message == "source is required") {
          this.toastr.error(
            this.translate.instant("otherMessages.noInfoTryAgain")
          );
        } else if (error.error.message == "unknown source") {
          this.toastr.error(
            this.translate.instant("otherMessages.unknownSource")
          );
        } else {
          this.toastr.error(this.translate.instant("Errors.cannotProceed"));
        }
      }
      );
  }

  sendNotification() {
    var jsonBody = {};
    jsonBody["msgtitle"] = this.Not_title.trim();
    jsonBody["msgbody"] = this.message.trim();
    jsonBody["event"] = "group";
    // jsonBody["regkey"] = "";
    jsonBody["topic"] = this.selectedCategory;

    /* Check as per selection */

    // if (this.selectedCategory == 'Send notification to Specific district') {
    //   jsonBody["topic"] = this.districtName;
    // }else if (this.selectedCategory == 'Send notification to Specific taluka') {
    //   jsonBody["topic"] = this.selectedTaluka;
    // }else if (this.selectedCategory == 'Send notification to individual user') {
    //   jsonBody["topic"] = this.individualUser;
    // }else{
    //   jsonBody["topic"] = this.selectedCategory;
    // }

    var apiUrl = "notification/";
    this._service.postCallNotification(jsonBody, apiUrl, this.selectedLevel).subscribe(
      data => {
        if (data['message'] == "notification sent") {
          this.notificationData = data['data'];
          console.log(this.notificationData);
          this.toastr.success(this.translate.instant("यशस्वीरीत्या पूर्ण."));
          this.clear();
        }
      },
      error => {
        if (error.error.message == "token not found" || error.error.message == 'token not matches please re-login') {
          // console.log("token not found");
          this.toastr.error(this.translate.instant("otherMessages.sessionLogout"));
      setTimeout(() => {
        this.router.navigate(["/"]);
      }, 500);
        } else if (error.error.message == "token not matches please re-login") {
          // console.log("token not matches please re-login");
          this.toastr.error(this.translate.instant("otherMessages.sessionLogout"));
      setTimeout(() => {
        this.router.navigate(["/"]);
      }, 500);
        } else if (error.error.message == "source is required") {
          console.log("source is required");
        } else if (error.error.message == "wrong source") {
          console.log("wrong source");
        } else if (error.error.message == "required msgtitle key") {
          console.log("required msgtitle key");
        } else if (error.error.message == "required msgbody key") {
          console.log("required msgbody key");
        } else if (error.error.message == "required msgbody value") {
          console.log("required msgbody value");
        } else if (error.error.message == "required event key") {
          console.log("required event key");
        } else if (error.error.message == "required regkey key") {
          console.log("required regkey key");
        } else if (error.error.message == "required regkey value") {
          console.log("required regkey value");
        } else if (error.error.message == "required topic key") {
          console.log("required topic key");
        } else if (error.error.message == "required topic value") {
          console.log("required topic value");
        } else if (error.error.message == "wrong event") {
          console.log("wrong event");
        } else if (error.error.message == "access denied") {
          console.log("access denied");
        } else if (error.error.message == "firebase id not found") {
          console.log("firebase id not found");
        } else if (error.error.message == "required regkeys key") {
          console.log("required regkeys key");
        } else if (error.error.message == "required regkeys value") {
          console.log("required regkeys value");
        } else {
          this.toastr.error(this.translate.instant("Errors.cannotProceed"));
        }
      }
    );
  }
  goToAdminPanel() {
    this.finishCall.emit(true);
  }

  clear() {
    this.districtList = false;
    this.talukaList = false;
    this.showUser = false;
    this.Not_title = "";
    this.message = "";
    this.select_ctg = "Select Category";
  }
}
