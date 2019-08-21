import { Component, OnInit, Output, EventEmitter, ViewContainerRef, Input, ViewChild } from "@angular/core";
import { AdminReportService } from "../admin-report.service";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ToastsManager } from "ng6-toastr";
import { CsvService } from "angular2-json2csv";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-send-notification",
  templateUrl: "./send-notification.component.html",
  styleUrls: ["./send-notification.component.scss"]
})
export class SendNotificationComponent implements OnInit {
  @Output() public finishCall = new EventEmitter<any>();
  @Input() allDistricts;
  @ViewChild('myInput') myInputVariable: any;
  public formData = new FormData();
  private apiUrl = environment.apiUrl;
  constructor(private csvService: CsvService, public _service: AdminReportService, public translate: TranslateService, public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router,public httpClient: HttpClient) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  public showDetails; districtList; talukaList; showUser; selectedCategory; selectedDistrict; selectedTaluka; Not_title; message; districtName; notificationData; select_ctg; sendDisable;resetButton;selectedEvent;select_eve;disableCtg;Mob_No;mul_Mob;disableMob;disableMob1;mul_arr:any;

  selectedLevel;
  public categories = [
    {
      "label": "General",
      "value": "general"
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
      "label": "General_level_One",
      "value": "generallevelone"
    },
    {
      "label": "General_level_two",
      "value": "generalleveltwo"
    },
    {
      "label": "General_level_three",
      "value": "generallevelthree"
    },
    {
      "label": "Superadmin",
      "value": "superadmin"
    },
    {
      "label": "Master Trainer",
      "value": "master_trainer"
    },
    {
      "label": "Trainee",
      "value": "trainee"
    },
    {
      "label": "General_localmsgtest",
      "value": "generallocalmsgtest"
    },
  ]

  public events = [
    {
      "label": "Single",
      "value": "single"
    },
    {
      "label": "Multiple",
      "value": "multiple"
    },
    {
      "label": "Group",
      "value": "group"
    }
  ]

  public allTalukas;

  ngOnInit() {
    this.disableMob1 = false;
    this.disableMob = false;
    this.disableCtg = false;
    this.resetButton = false
    this.selectedCategory = "";
    this.selectedEvent="";
    this.selectedDistrict = "";
    this.selectedTaluka = "";
    this.districtList = false;
    this.talukaList = false;
    this.showUser = false;
    this.showDetails = false;
    this.select_ctg = "Select Category";
    this.select_eve = "Select Event"
    this.Not_title = "";
    this.message = "";
    this.selectedLevel = "";
    this.Mob_No = "";
    this.mul_Mob ="";
    this.mul_arr=[];
    // this.getAllDistricts();
  }

  fileChange(event) {
    this.formData = new FormData();
    this.resetButton = true;
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      // if (file.type == 'application/pdf' || file.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type == 'application/msword') {
      if (file.size <= 1024000) {
        // this.confirmModal.show();
        const files = event.target.files || event.srcElement.files;
        const file1 = files[0];

        this.formData.append('image', file);

      } else {
        this.myInputVariable.nativeElement.value = "";
        this.toastr.error('File size should be at most 1 MB');
      }
      // }
      // else {
      //   this.myInputVariable.nativeElement.value = "";
      //   this.toastr.error(this.translate.instant('otherMessages.fileFormat'));
      // }
    }
  }
  reset() {
    this.myInputVariable.nativeElement.value = "";
    // this.confirmModal.hide();
  }

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
    console.log(this.selectedCategory)
  }

  getEvent(){
    console.log(this.selectedEvent)
    if(this.selectedEvent == "group"){
      this.disableCtg = true;
    }
    else{
      this.disableCtg = false;
    }

    if(this.selectedEvent == "multiple"){
      this.disableMob = true;
    }
    else{
      this.disableMob = false;
    }

    if(this.selectedEvent == "single"){
      this.disableMob1 = true;
    }
    else{
      this.disableMob1 = false;
    }
  }

  sendNotification() {
    if( this.myInputVariable.nativeElement.value == ""){
      console.log("empty file")
      this.toastr.error("Please select image file")
    }
    else
    {
    var str_array = this.mul_Mob.split(',');
    for(var i = 0; i < str_array.length; i++) {
      str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
      this.mul_arr.push(str_array[i]);
    }
   
    console.log("qwsA",this.mul_arr)
    this.formData.append('msgtitle', this.Not_title.trim())
    this.formData.append('msgbody', this.message.trim())
    this.formData.append('event',  this.selectedEvent)
    this.formData.append('topic',  this.selectedCategory)
    if(this.selectedEvent == "single"){
      this.formData.append('regkey',  this.Mob_No)
    }
    if(this.selectedEvent == "multiple"){
      this.formData.append('regkey', JSON.stringify(this.mul_arr))
    }

    console.log("formData",this.formData)
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
    let headers = new HttpHeaders({ 'Authorization': window.localStorage.getItem('token') });
      if (/Android/i.test(navigator.userAgent))
      {
        headers = headers.append("Source", "MWEB");
      } else
      {
        headers = headers.append("Source", "WEB");
      }
      // let options = new RequestOptions({ headers });
      let options = { headers: headers };
      this.httpClient.post(this.apiUrl + apiUrl, this.formData, options).subscribe(data => {
        let body = data;
        console.log(body);
        if (body['message'] == "notification sent") {
          console.log("data",data)
          this.toastr.success("Notification sent successfully !!")
          this.clear();
          this.resetButton = false
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
}

  goToAdminPanel() {
    this.finishCall.emit(true);
  }

  isNumber(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }

  clear() {
    this.districtList = false;
    this.talukaList = false;
    this.showUser = false;
    this.Not_title = "";
    this.Mob_No="";
    this.mul_Mob ="";
    this.message = "";
    this.select_ctg = "Select Category";
    this.select_eve = "Select Event"
    this.myInputVariable.nativeElement.value = "";
    this.mul_arr=[];
  }
}
