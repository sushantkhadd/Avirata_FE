import { Component, OnInit, Output, EventEmitter, ViewContainerRef, Input, ViewChild } from "@angular/core";
import { AdminReportService } from "../admin-report.service";
import { ModalDirective } from "ngx-bootstrap";
import { environment } from "src/environments/environment";
import { RequestOptions } from "@angular/http";
import { TranslateService } from "@ngx-translate/core";
import { ToastsManager } from "ng6-toastr";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-user-transfer-replace",
  templateUrl: "./user-transfer-replace.component.html",
  styleUrls: ["./user-transfer-replace.component.scss"]
})
export class UserTransferReplaceComponent implements OnInit {
  @Output() public finishCall = new EventEmitter<any>();
  @Input() allDistricts;
  @ViewChild('blockModal') public blockModal: ModalDirective;
  @ViewChild('unblockModal') public unblockModal: ModalDirective;
  @ViewChild('teacherModal') public teacherModal: ModalDirective;
  @ViewChild('headmasterModal') public headmasterModal: ModalDirective;

  public formData = new FormData();
  @ViewChild('myInput') myInputVariable: any;

  private apiUrl = environment.apiUrl;

  public indexNumber; newUserFlag; showDetails; result; userDetails; selectedDistrict; selectedTaluka; allTalukas; talukaEnable; showSchool; blockFormFlag; unblockFormFlag;
  public deactiveUsers; activeUsers; schoolIndex; schoolName; position; fullName; gender; mobNumber; aadharNumber=''; remark;
  public totalTeacherCount; totalHMCount; transferUserFlag; showCreate; showTransfer;
  public transferFullName; transferMobNumber; transferPosition; transferRemark;
  public transferSchoolIndex; transferSchoolName; newUserPopupFlag; unblockReason; blockReason;
  public blockUserTempJson; unblockUserTempJson; oldSearchIndex; disableSearch; unblockDisable; blockDisable; transferDisable; createDisable;
  public tactiveUsers; tdeactiveUsers; resetButton; showAddButton;
  constructor(public httpClient: HttpClient, public AdminReportService: AdminReportService, public translate: TranslateService, public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  public genderJson; positionJson;

  ngOnInit() {
    this.showAddButton = false
    this.resetButton = false;
    this.oldSearchIndex = '';
    this.newUserPopupFlag = false
    this.transferUserFlag = false;
    this.unblockFormFlag = false;
    this.blockFormFlag = false;
    this.showSchool = false;
    this.talukaEnable = false
    this.showDetails = false;
    this.newUserFlag = false;
    this.result = false;
    this.disableSearch = false;
    this.selectedDistrict = "";
    this.selectedTaluka = "";
    // this.transferSelectedDistrict = "";
    // this.transferSelectedTaluka = "";
    this.indexNumber = "";
    this.blockReason = '';
    this.unblockReason = '';
    this.transferRemark = "";
    this.remark = "";
    this.totalHMCount = 0;
    this.totalTeacherCount = 0;
    this.genderJson = { "1": "male", "2": "female" }
    this.positionJson = { "1": "headmaster", "2": "teacher" };
    this.showCreate = false;
    this.showTransfer = false;
    this.unblockDisable = true;
    this.blockDisable = true;
    this.transferDisable = true;
  }

  ngDoCheck() {
    if (this.indexNumber == this.oldSearchIndex) {
      this.disableSearch = true
    } else {
      this.disableSearch = false
    }

    if (this.unblockReason.trim().length == 0) {
      this.unblockDisable = true;
    } else {
      this.unblockDisable = false;
    }

    if (this.blockReason.trim().length == 0) {
      this.blockDisable = true;
    } else {
      this.blockDisable = false;
    }

    if (this.transferRemark.trim().length == 0) {
      this.transferDisable = true;
    } else {
      this.transferDisable = false;
    }

    if (this.remark.trim().length == 0) {
      this.createDisable = true;
    } else {
      this.createDisable = false;
    }
  }

  //if searchType 1 => 1st search for display table
  //if searchType 2 => for check HM & Teachers in school for transfer the user

  searchRecord(searchType) {
    console.log(searchType)
    this.tactiveUsers = {}
    this.tdeactiveUsers = {}
    this.activeUsers = {}
    this.deactiveUsers = {}
    this.schoolName = ''
    var apiUrl = "schoolwiseusers/";
    var jsonBody = {};
    if (searchType == 1) {
      jsonBody['schoolindex'] = this.indexNumber;
    } else if (searchType == 2) {
      jsonBody['schoolindex'] = this.transferSchoolIndex;
    } else if (searchType == 3)
    {
      jsonBody['schoolindex'] = localStorage.getItem('indexNumber');
    }

    this.AdminReportService.postCalllvl1(jsonBody, apiUrl).subscribe(
      data => {
        if (data['message'] == "ok")
        {
          console.log(data)
          if (searchType == 1 || searchType == 3) {
            this.activeUsers = data["data"].activate;
            this.deactiveUsers = data["data"].deactivate;
            this.userDetails = data["data"];
            // this.activeUsers = data['data'].activate;
            // this.deactiveUsers = data['data'].deactivate;
            this.schoolName = data["data"].schoolname;
            this.showDetails = true;
            this.schoolIndex = this.indexNumber;
            this.oldSearchIndex = this.indexNumber;
            localStorage.setItem("indexNumber", this.indexNumber);
            this.selectedDistrict = this.indexNumber.substring(0, 4);
            this.getDistrictWiseTaluka(this.selectedDistrict)
            this.selectedTaluka = this.indexNumber.substring(2, 6);
            console.log("res",this.selectedDistrict,this.selectedTaluka)
            
          } else if (searchType == 2) {
            this.tactiveUsers = data["data"].activate;
            this.tdeactiveUsers = data["data"].deactivate;
            this.transferSchoolName = data["data"].schoolname;
          }
        }
      },
      error => {
        if (error.error.message == "required schoolindex key" || error.error.message == "source required") {
          console.log(error.error.message)
        } else if (error.error.message == "required schoolindex field") {
          this.toastr.error("Please Enter the School Index Number");
        } else if (error.error.message == "invalid schoolindex") {
          if (searchType == 1) {
            this.activeUsers = {}
            this.deactiveUsers = {}
            this.schoolName = ''
            this.oldSearchIndex = this.indexNumber;
            this.userDetails = {}
          }
          this.toastr.error("School Index Number is Invalid");

        } else if (error.error.message == "users not exist") {
          this.showDetails = true;
          this.activeUsers = {}
          this.deactiveUsers = {}
          this.userDetails = {}
          // this.activeUsers = data['data'].activate;
          // this.deactiveUsers = data['data'].deactivate;
          this.schoolName = ''
          this.schoolIndex = this.indexNumber
          this.oldSearchIndex = this.indexNumber;
          // this.showAddButton=true
          // this.toastr.success("Data not Avilable");
        } else if (error.error.message == "token not matches" || error.error.message == "token not found" || error.error.message == 'token not matches please re-login') {
          this.toastr.error(this.translate.instant("Errors.tokenNotFound"));
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 500);
        } else if (error.error.message == "unknown source") {
          this.toastr.error(
            this.translate.instant("otherMessages.unknownSource")
          );
        } else {
          this.toastr.error(this.translate.instant("Errors.cannotProceed"));
        }
      });
  }

  goToAdminPanel() {
    this.finishCall.emit(true);
  }

  getDistrictWiseTaluka(taluka) {
    var apiUrl = "districtwisetaluka/";
    this.AdminReportService.getCalllvl1(apiUrl + taluka, window.localStorage.getItem("token"))
      .subscribe(
      data => {
        // this.selectedTaluka = ""
        this.allTalukas = data['results'];
        this.talukaEnable = true
      },
      error => {
        if (error.error.message == "token not found" || error.error.message == 'token not matches please re-login') {
          this.toastr.error(this.translate.instant("Errors.tokenNotFound"));
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 5000);
        } else if (error.error.message == "session not matches please re-login") {
          this.toastr.error(this.translate.instant("Errors.sessionNotMatches"));
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 5000);
        } else if (error.error.message == "source is required" || error.error.message == "unknown source") {
          console.log(error.error.message)
        } else {
          this.toastr.error(this.translate.instant("Errors.cannotProceed"));
        }
      }
      );
  }

  createNewUser() {
    for (let item of this.activeUsers) {
      if (item.position == 'teacher') {
        this.totalTeacherCount = this.totalTeacherCount + 1
      } else if (item.position == 'headmaster') {
        this.totalHMCount = this.totalHMCount + 1
      }
    }

    if (this.position == 1 && this.totalHMCount >= 1) {
      this.headmasterModal.show()
    } else if (this.position == 2 && this.totalTeacherCount >= 2) {
      this.teacherModal.show();
      this.showCreate = true;
      this.showTransfer = false;
    } else {
      this.addNewUserHit()
    }
  }

  addNewUserHit() {
    var apiUrl = "createnewuser/";
    var jsonBody = {};
    jsonBody['schoolindex'] = this.indexNumber;
    jsonBody['position'] = this.positionJson[this.position];
    jsonBody['mobile'] = this.mobNumber;
    jsonBody['district'] = this.selectedDistrict;
    jsonBody['taluka'] = this.selectedTaluka;
    if(this.aadharNumber==null ||this.aadharNumber==undefined){
      jsonBody['aadharno'] =''
    }else{
    jsonBody['aadharno'] = this.aadharNumber;
    }
    jsonBody['fullname'] = this.fullName.trim();
    jsonBody['gender'] = this.genderJson[this.gender];
    jsonBody['remark'] = this.remark.trim();
  console.log("add ",jsonBody)
    this.AdminReportService.postCalllvl1(jsonBody, apiUrl).subscribe(
      data => {
        if (data['message'] == "user added successfully") {
          this.toastr.success("User Created Successfully");
          setTimeout(() => {
            // var appendJson = {}
            // appendJson['username'] = this.mobNumber;
            // appendJson['name'] = this.fullName.trim();
            // appendJson['position'] = this.positionJson[this.position];
            // this.userDetails.activate.push(appendJson)
            this.searchRecord(3);
            this.showDetails = true;
            this.clearField();
            this.teacherModal.hide();
          }, 500);
        } else if (data['message'] == "user updated successfully") {
          this.toastr.success("User Updated Successfully");
          setTimeout(() => {
            // var appendJson = {}
            // appendJson['username'] = this.mobNumber;
            // appendJson['name'] = this.fullName.trim();
            // appendJson['position'] = this.positionJson[this.position];
            // this.userDetails.activate.push(appendJson)
            this.searchRecord(3);
            this.showDetails = true;
            this.clearField();
            this.teacherModal.hide();
          }, 500);

        }
      },
      error => {
        if (error.error.message == "required schoolindex key" || error.error.message == "required position key" || error.error.message == "required mobile key" ||
          error.error.message == "required district key" || error.error.message == "required taluka key" || error.error.message == "required aadharno key" ||
          error.error.message == "required fullname key" || error.error.message == "required gender key" || error.error.message == "required remark key") {
          console.log(error.error.message)
        } else if (error.error.message == "required schoolindex field" || error.error.message == "required position field" || error.error.message == "required mobile field" || error.error.message == "required district field" || error.error.message == "required taluka field" || error.error.message == "required aadharno field" ||
          error.error.message == "required fullname field" || error.error.message == "required gender field" || error.error.message == "required remark field") {
          this.toastr.error("Please Correct Information");
        } else if (error.error.message == "invalid position") {
          this.toastr.error("invalid position");
        } else if (error.error.message == "invalid schoolindex") {
          this.toastr.error("invalid schoolindex");
        } else if (error.error.message == "already position full for headmaster") {
          // this.toastr.error("already position full for headmaster");
          this.headmasterModal.show()
        } else if (error.error.message == "already position full for teacher") {
          // this.toastr.error("already position full for teacher");
          this.teacherModal.show()
        } else if (error.error.message == "aadhar number already associated with another") {
          this.toastr.error("aadhar number already associated with another");
        } else if (error.error.message == "district must have digit" || error.error.message == "taluka must have digit") {
          console.log(error.error.message)
        } else if (error.error.message == "invalid district" || error.error.message == "invalid taluka") {
          console.log(error.error.message)
        } else if (error.error.message == "mobile already exists") {
          this.toastr.error("mobile already exists");
        } else if (error.error.message == "select right gender") {
          console.log(error.error.message);
        } else if (error.error.message == "something went wrong") {
          this.toastr.error("something went wrong");
        } else if (error.error.message == "token not matches" || error.error.message == "token not found" || error.error.message == 'token not matches please re-login') {
          this.toastr.error(this.translate.instant("Errors.tokenNotFound"));
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 500);
        } else if (error.error.message == "unknown source" || error.error.message == "source required") {
          this.toastr.error(
            this.translate.instant("otherMessages.unknownSource")
          );
        } else {
          this.toastr.error(this.translate.instant("Errors.cannotProceed"));
        }
      });
  }
  clearField() {
    // this.activeUsers = {}
    // this.deactiveUsers = {}
    // this.userDetails = {}
    // this.schoolName = ''
    this.newUserFlag = false
    this.position = ""
    this.selectedDistrict = "";
    this.selectedTaluka = "";
    this.aadharNumber = "";
    this.fullName = "";
    this.gender = "";
    this.remark = "";
    this.mobNumber = "";

    this.transferUserFlag = false
    this.transferPosition = ""
    // this.transferSelectedDistrict = "";
    // this.transferSelectedTaluka = "";
    this.transferFullName = "";
    this.transferRemark = "";
  }

  transferUser(record) {
    this.resetButton = false;
    // this.transferSelectedDistrict = ''
    // this.transferSelectedTaluka = ''
    this.transferSchoolIndex = ''
    this.transferSchoolName = ''
    this.transferRemark = ''
    this.newUserFlag = false
    this.transferUserFlag = true
    this.transferFullName = record.name
    this.transferMobNumber = record.username

    if (record.position == this.positionJson['1']) {
      this.transferPosition = '1'
    } else if (record.position == this.positionJson['2']) {
      this.transferPosition = '2'
    }
  }
  transferUserCheck() {
    this.totalHMCount = 0
    for (let item of this.tactiveUsers) {
      if (item.position == 'teacher') {
        this.totalTeacherCount = this.totalTeacherCount + 1
      } else if (item.position == 'headmaster') {
        this.totalHMCount = this.totalHMCount + 1
      }
    }
    if (this.totalHMCount >= 1 && this.transferPosition == 1) {
      this.headmasterModal.show()
    } else if (this.totalTeacherCount >= 2 && this.transferPosition == 2) {
      this.teacherModal.show();
      this.showTransfer = true;
      this.showCreate = false;
    } else {
      this.transferAPICall()
    }
  }
  transferAPICall() {
    var apiUrl = "trasnsferuser/";
    var jsonBody = {};
    this.formData.append('schoolindex', this.transferSchoolIndex);
    this.formData.append('position', this.positionJson[this.transferPosition]);
    this.formData.append('mobile', this.transferMobNumber);
    // this.formData.append('district', this.transferSelectedDistrict);
    // this.formData.append('taluka', this.transferSelectedTaluka);
    this.formData.append('remark', this.transferRemark.trim());

    let headers = new HttpHeaders({ 'Authorization': window.localStorage.getItem('token') });
    if (/Android/i.test(navigator.userAgent)) {
      headers = headers.append("Source", "MWEB");
    } else {
      headers = headers.append("Source", "WEB");
    }
    // let options = new RequestOptions({ headers });
    let options = { headers: headers };

    this.httpClient.post(this.apiUrl + apiUrl, this.formData, options).subscribe(data => {
      let body = data;
      if (body['message'] == "user transfer successfully") {
        this.toastr.success("User Transfered Successfully");
        setTimeout(() => {
          var index = this.userDetails.activate.findIndex(item => item.username == this.transferMobNumber);
          this.userDetails.activate.splice(index, 1)
          this.showDetails = true;
          this.transferUserFlag = false;
          this.clearField();
          this.teacherModal.hide();
          this.showTransfer = true;
        }, 500);
      } else if (body['message'] == 'select file') {
        this.toastr.error('Please Select file agian.')
      }
    });
  }

  blockUserpopup(item) {
    this.resetButton = false;
    this.blockReason = ''
    this.blockUserTempJson = item
    this.blockModal.show();
  }

  blockUser() {
    var apiUrl = "blockuser/";
    var jsonBody = {};
    // jsonBody['mobile'] = this.blockUserTempJson.username
    // jsonBody['remark'] = this.blockReason
    this.formData.append('mobile', this.blockUserTempJson.username)
    this.formData.append('remark', this.blockReason)

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
      if (body['message'] == "block successfully") {
        this.toastr.success("User Blocked Successfully");
        setTimeout(() => {
          var index = this.userDetails.activate.findIndex(item => item.username == this.blockUserTempJson.username);
          this.userDetails.activate.splice(index, 1)
          this.userDetails.deactivate.push(this.blockUserTempJson)
          this.blockUserTempJson = {}
          this.blockModal.hide();
          this.blockFormFlag = false;
        }, 500);
      }
    },
      error => {
        if (error.error.message == "json key error") {
          console.log(error.error.message)
        } else if (error.error.message == "user already blocked") {
          this.toastr.error("user already blocked");
        } else if (error.error.message == "user does not exist") {
          this.blockModal.hide()
          this.toastr.success("user does not exist");
        } else if (error.error.message == "already postion full for headmaster" || error.error.message == "already position full for headmaster") {
          this.headmasterModal.show()
        } else if (error.error.message == "access denied") {
          this.toastr.error(this.translate.instant("Errors.accessDenied"));
        } else if (error.error.message == "token not matches" || error.error.message == "token not found" || error.error.message == 'token not matches please re-login') {
          this.toastr.error(this.translate.instant("Errors.tokenNotFound"));
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 500);
        } else if (error.error.message == "unknown source" || error.error.message == "source required") {
          this.toastr.error(
            this.translate.instant("otherMessages.unknownSource")
          );
        } else {
          this.toastr.error(this.translate.instant("Errors.cannotProceed"));
        }
      });
  }

  unblockUserpopup(item) {
    this.resetButton = false;
    this.unblockReason = ''
    this.unblockUserTempJson = item
    this.unblockModal.show();
  }

  unblockUser() {
    var apiUrl = "unblockuser/";
    var jsonBody = {};
    // jsonBody['mobile'] = this.unblockUserTempJson.username
    // jsonBody['remark'] = this.unblockReason
    this.formData.append('mobile', this.unblockUserTempJson.username)
    this.formData.append('remark', this.unblockReason)

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
      if (body['message'] == "user unblock successfully") {
        this.toastr.success("User UnBlocked Successfully");
        setTimeout(() => {
          var index = this.userDetails.deactivate.findIndex(item => item.username == this.unblockUserTempJson.username);
          this.userDetails.deactivate.splice(index, 1)
          this.userDetails.activate.push(this.unblockUserTempJson)
          this.unblockUserTempJson = {}
          this.unblockModal.hide();
          this.unblockFormFlag = false;
        }, 500);
      } else {
        console.log(body, "error ")
      }
    },
      error => {
        if (error.error.message == "required mobile key" || error.error.message == "required remark key") {
          console.log(error.error.message)
        } else if (error.error.message == "required mobile field" || error.error.message == "required remark field") {
          console.log(error.error.message)
        } else if (error.error.message == "user already blocked") {
          this.toastr.error("user already blocked");
        } else if (error.error.message == "school not assign") {
          this.toastr.error("school not assign");
        } else if (error.error.message == "position not assign") {
          this.toastr.error("position not assign");
        } else if (error.error.message == "user already unblocked") {
          this.toastr.error("user already unblocked");
        } else if (error.error.message == "user does not exist") {
          this.blockModal.hide()
          this.toastr.error("user does not exist");
        } else if (error.error.message == "already position full for headmaster") {
          this.blockModal.hide()
          this.toastr.error("Already Position full for Headmaster");
        } else if (error.error.message == "access denied") {
          this.toastr.error(this.translate.instant("Errors.accessDenied"));
        } else if (error.error.message == "token not matches" || error.error.message == "token not found" || error.error.message == 'token not matches please re-login') {
          this.toastr.error(this.translate.instant("Errors.tokenNotFound"));
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 500);
        } else if (error.error.message == "unknown source" || error.error.message == "source required") {
          this.toastr.error(
            this.translate.instant("otherMessages.unknownSource")
          );
        } else {
          this.toastr.error(this.translate.instant("Errors.cannotProceed"));
        }
      }
    );
  }
  isNumber(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    return true;
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

        this.formData.append('file', file);
        this.formData.append('submoduleid', window.localStorage.getItem('uuid'));
      } else {
        this.myInputVariable.nativeElement.value = "";
        this.toastr.error('File size should be at most 1 MB');
      }
    }
  }
  reset() {
    this.myInputVariable.nativeElement.value = "";
  }
}
