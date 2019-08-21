import { Component, OnInit, Output, EventEmitter, ViewContainerRef, Input, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { ModalDirective } from "ngx-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { ToastsManager } from "ng6-toastr";
import { AdminReportService } from "../admin-report.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-coordinator-transfer',
  templateUrl: './coordinator-transfer.component.html'
})
export class CoordinatorTransferComponent implements OnInit {
  @Output() public finishCall = new EventEmitter<any>();
  public loader;
  @Input() allDistricts;
  @ViewChild('myInput') myInputVariable: any;
  public formData = new FormData();
  private apiUrl = environment.apiUrl;
  public selectedDistrict = ''; showList; coList; transferReason = '';
  public tName; tMobile; tDistrict; resetButton;

  public fullName; gender; mobNumber; aadharNumber; selectedTaluka; position; dateofJoin;
  public dojSelect = false; bankName; accountNo; ifscCode; underGraduate; otherUgSpecial; ugSpecialisation; postGraduate; otherPgSpecial; pgSpecialisation; professional; professionalSpecialization; othersQualification; allTalukas; talukaEnable; isstaff; newUserFlag; showCordinators; userId;

  @ViewChild('transferModal') public transferModal: ModalDirective;

  constructor(public httpClient: HttpClient, public AdminReportService: AdminReportService, public translate: TranslateService, public toastr: ToastsManager, vcr: ViewContainerRef, private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  public dateSelect; monthSelect; dobyear; dummyDate;
  public numDays = {
    '01': 31, '02': 28, '03': 31, '04': 30, '05': 31, '06': 30,
    '07': 31, '08': 31, '09': 30, '10': 31, '11': 30, '12': 31
  };
  public dayDate = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']
  public monthDate = [{ id: '01', name: "January" },
  { id: '02', name: "February" },
  { id: '03', name: "March" },
  { id: '04', name: "April" },
  { id: '05', name: "May" },
  { id: '06', name: "June" },
  { id: '07', name: "July" },
  { id: '08', name: "August" },
  { id: '09', name: "September" },
  { id: '10', name: "October" },
  { id: '11', name: "November" },
  { id: '12', name: "December" }
  ]
  public dojArray = [1955, 1956, 1957, 1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]

  public dojJson = [1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997,
    1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019];

  ngOnInit() {
    this.resetButton = false
    this.isstaff = "0";
    this.fullName = "";
    this.gender = "";
    this.mobNumber = "";
    this.aadharNumber = "";
    this.selectedDistrict = "";
    this.selectedTaluka = "";
    this.position = "";
    this.dateofJoin = "";
    this.bankName = "";
    this.accountNo = "";
    this.ifscCode = "";
    this.underGraduate = "";
    this.ugSpecialisation = "";
    this.postGraduate = "";
    this.pgSpecialisation = "";
    this.professional = "";
    this.professionalSpecialization = "";
    this.othersQualification = "";
    this.otherPgSpecial = "";
    this.otherUgSpecial = "";
    this.dobyear = "";
    this.monthSelect = "";
    this.dateSelect = "";

    this.newUserFlag = false;
    this.showList = false
    this.loader = false
    this.getCordinatorList()
  }

  getCordinatorList() {
    var apiUrl = "getcoordinator/";
    this.AdminReportService.getCalllvl1(apiUrl, window.localStorage.getItem("token"))
      .subscribe(
      data => {
        this.coList = data['data'].result;
        console.log("ada ", this.coList)
        this.showList = true
        if (this.coList) {
          this.loader = false;
        } else {
          this.loader = true;
        }
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

  transferUser(item) {
    this.resetButton = false
    this.transferReason = ''
    this.selectedDistrict = ''
    this.transferModal.show()
    this.tName = item.name
    this.tMobile = item.mobile
    this.tDistrict = item.district
    console.log("dd ", this.myInputVariable.nativeElement.value)
    this.myInputVariable.nativeElement.value = "";
    console.log("dd: ", this.myInputVariable.nativeElement.value)

  }
  getDistrict(dist) {
    console.log("dist ", dist)
  }

  transfer() {
    if (this.transferReason.trim() == '') {
      this.toastr.error("Please write the remark")
    } else {
      var jsonBody = {}
      // jsonBody['mobile'] = this.tMobile
      // jsonBody['district'] = this.selectedDistrict
      // jsonBody['remark'] = this.transferReason
      // this.apiCall(jsonBody, 'transfercoordinator/', 'transfer')
      this.formData.append('mobile', this.tMobile)
      this.formData.append('district', this.selectedDistrict)
      this.formData.append('remark', this.transferReason)

      var apiUrl = 'transfercoordinator/'
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
        if (body['message'] == "user transfer successfully") {
          setTimeout(() => {
            var index = this.coList.findIndex(item => item.mobile == this.tMobile);
            this.allDistricts.forEach(element => {
              if (element.districtid == this.selectedDistrict) {
                this.coList[index]['district'] = element.name
              }
            });
            this.toastr.success("Co-ordinator Transfer Successfully")
            this.transferModal.hide()
          }, 500);
        }
      },
        error => {
          if (error.error.message == 'source required' || error.error.message == 'unknown source') {
            console.log("seatnumber key wrong or required")
          } else if (error.error.message == 'token not found' || error.error.message == 'token not match' || error.error.message == 'token not matches please re-login') {
            this.toastr.error("Session Expires Please Re-login");
            setTimeout(() => {
              this.router.navigate(["/"]);
            }, 5000);
          } else if (error.error.message == 'you transfer to same district') {
            this.toastr.error("You have selected same district for tranfer")
          } else if (error.error.message == 'user information not found') {
            this.toastr.error("user information not found")
          } else if (error.error.message == "aadhar number already associated with another") {
            this.toastr.error("Aadhar number already associated with another");
          } else if (error.error.message == "required body key") {
            console.log(error.error.message)
          } else if (error.error.message == "required mobile key") {
            this.toastr.error("Mobile number already associated with another");
          } else if (error.error.message == "required mobile value") {
            this.toastr.error("Mobile number already associated with another");
          } else if (error.error.message == "required district key") {
            console.log(error.error.message)
          } else if (error.error.message == "required district value") {
            console.log(error.error.message)
          } else if (error.error.message == "invalid district") {
            console.log(error.error.message)
          } else if (error.error.message == "required taluka key") {
            console.log(error.error.message)
          } else if (error.error.message == "required taluka value") {
            console.log(error.error.message)
          } else if (error.error.message == "invalid taluka") {
            console.log(error.error.message)
          } else if (error.error.message == "required fullname key") {
            console.log(error.error.message)
          } else if (error.error.message == "required fullname value") {
            console.log(error.error.message)
          } else if (error.error.message == "required gender key") {
            console.log(error.error.message)
          } else if (error.error.message == "required gender value") {
            console.log(error.error.message)
          } else if (error.error.message == "select right gender") {
            console.log(error.error.message)
          } else if (error.error.message == "required dob key") {
            console.log(error.error.message)
          } else if (error.error.message == "required dob value") {
            console.log(error.error.message)
          } else if (error.error.message == "required position key") {
            console.log(error.error.message)
          } else if (error.error.message == "required position value") {
            console.log(error.error.message)
          } else if (error.error.message == "required dateofjoining key") {
            console.log(error.error.message)
          } else if (error.error.message == "required dateofjoining value") {
            console.log(error.error.message)
          } else if (error.error.message == "required aadharno key") {
            console.log(error.error.message)
          } else if (error.error.message == "required aadharno value") {
            console.log(error.error.message)
          } else if (error.error.message == "required undergraduation key") {
            console.log(error.error.message)
          } else if (error.error.message == "required ugspecial key") {
            console.log(error.error.message)
          } else if (error.error.message == "required postgraduation key") {
            console.log(error.error.message)
          } else if (error.error.message == "required pgspecial key") {
            console.log(error.error.message)
          } else if (error.error.message == "required professional key") {
            console.log(error.error.message)
          } else if (error.error.message == "required professionalspecil key") {
            console.log(error.error.message)
          } else if (error.error.message == "required other key") {
            console.log(error.error.message)
          } else if (error.error.message == "required accno key") {
            console.log(error.error.message)
          } else if (error.error.message == "required ifsccode key") {
            console.log(error.error.message)
          } else if (error.error.message == "required bankname key") {
            console.log(error.error.message)
          } else if (error.error.message == "access denied") {
            this.toastr.error("access denied");
          } else if (error.error.message == "group not found") {
            console.log(error.error.message)
          } else if (error.error.message == "mobile already exist") {
            this.toastr.error("Mobile number already associated with another");
          } else if (error.error.message == "user is staff") {
            this.toastr.error("User is staff member, you can not tranfer the user.");
          } else {
            this.toastr.error(this.translate.instant("Errors.cannotProceed"));
          }
        });
    }
  }

  goToAdminPanel() {
    this.finishCall.emit(true);
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.AdminReportService.postCalllvl1(jsonBody, apiUrl)
      .subscribe(
      data => {
        if (data['message'] == "user transfer successfully") {
          var index = this.coList.findIndex(item => item.mobile == this.tMobile);

          this.allDistricts.forEach(element => {
            if (element.districtid == this.selectedDistrict) {
              this.coList[index]['district'] = element.name
            }
          });

          this.toastr.success("Co-ordinator Transfer Successfully")
          this.transferModal.hide()
        } else if (data['message'] == "user added successfully") {
          this.userId = data['data'].user_id;
          var tempJson = {};
          this.allDistricts.forEach(element => {
            if (element.districtid == this.selectedDistrict) {
              tempJson['district'] = element.name
            }
          });
          tempJson['mobile'] = this.mobNumber;
          tempJson['name'] = this.fullName;
          tempJson['userid'] = this.userId;
          if (this.isstaff == '0') {
            this.coList.push(tempJson);
          }
          this.toastr.success("Co-ordinator Added Successfully");
          this.clearField();
        } else if (data['message'] == "user updated successfully") {
          this.userId = data['data'].user_id;
          var tempJson = {};
          this.allDistricts.forEach(element => {
            if (element.districtid == this.selectedDistrict) {
              tempJson['district'] = element.name
            }
          });
          tempJson['mobile'] = this.mobNumber;
          tempJson['name'] = this.fullName;
          tempJson['userid'] = this.userId;

          if (this.isstaff == '0') {
            this.coList.push(tempJson);
          }

          this.toastr.success("Co-ordinator Updated Successfully");
          this.clearField();
        }
      },
      error => {
        if (error.error.message == 'source required' || error.error.message == 'unknown source') {
          console.log("seatnumber key wrong or required")
        } else if (error.error.message == 'token not found' || error.error.message == 'token not match' || error.error.message == 'token not matches please re-login') {
          this.toastr.error("Session Expires Please Re-login");
          setTimeout(() => {
            this.router.navigate(["/"]);
          }, 5000);
        } else if (error.error.message == 'you transfer to same district') {
          this.toastr.error("You have selected same district for tranfer")
        } else if (error.error.message == 'user information not found') {
          this.toastr.error("user information not found")
        } else if (error.error.message == "aadhar number already associated with another") {
          this.toastr.error("Aadhar number already associated with another");
        } else if (error.error.message == "required body key") {
          console.log(error.error.message)
        } else if (error.error.message == "required mobile key") {
          this.toastr.error("Mobile number already associated with another");
        } else if (error.error.message == "required mobile value") {
          this.toastr.error("Mobile number already associated with another");
        } else if (error.error.message == "required district key") {
          console.log(error.error.message)
        } else if (error.error.message == "required district value") {
          console.log(error.error.message)
        } else if (error.error.message == "invalid district") {
          console.log(error.error.message)
        } else if (error.error.message == "required taluka key") {
          console.log(error.error.message)
        } else if (error.error.message == "required taluka value") {
          console.log(error.error.message)
        } else if (error.error.message == "invalid taluka") {
          console.log(error.error.message)
        } else if (error.error.message == "required fullname key") {
          console.log(error.error.message)
        } else if (error.error.message == "required fullname value") {
          console.log(error.error.message)
        } else if (error.error.message == "required gender key") {
          console.log(error.error.message)
        } else if (error.error.message == "required gender value") {
          console.log(error.error.message)
        } else if (error.error.message == "select right gender") {
          console.log(error.error.message)
        } else if (error.error.message == "required dob key") {
          console.log(error.error.message)
        } else if (error.error.message == "required dob value") {
          console.log(error.error.message)
        } else if (error.error.message == "required position key") {
          console.log(error.error.message)
        } else if (error.error.message == "required position value") {
          console.log(error.error.message)
        } else if (error.error.message == "required dateofjoining key") {
          console.log(error.error.message)
        } else if (error.error.message == "required dateofjoining value") {
          console.log(error.error.message)
        } else if (error.error.message == "required aadharno key") {
          console.log(error.error.message)
        } else if (error.error.message == "required aadharno value") {
          console.log(error.error.message)
        } else if (error.error.message == "required undergraduation key") {
          console.log(error.error.message)
        } else if (error.error.message == "required ugspecial key") {
          console.log(error.error.message)
        } else if (error.error.message == "required postgraduation key") {
          console.log(error.error.message)
        } else if (error.error.message == "required pgspecial key") {
          console.log(error.error.message)
        } else if (error.error.message == "required professional key") {
          console.log(error.error.message)
        } else if (error.error.message == "required professionalspecil key") {
          console.log(error.error.message)
        } else if (error.error.message == "required other key") {
          console.log(error.error.message)
        } else if (error.error.message == "required accno key") {
          console.log(error.error.message)
        } else if (error.error.message == "required ifsccode key") {
          console.log(error.error.message)
        } else if (error.error.message == "required bankname key") {
          console.log(error.error.message)
        } else if (error.error.message == "access denied") {
          this.toastr.error("access denied");
        } else if (error.error.message == "group not found") {
          console.log(error.error.message)
        } else if (error.error.message == "mobile already exist") {
          this.toastr.error("Mobile number already associated with another");
        } else if (error.error.message == "user is staff") {
          this.toastr.error("User is staff member, you can not tranfer the user.");
        } else {
          this.toastr.error(this.translate.instant("Errors.cannotProceed"));
        }
      });
  }

  getDistrictWiseTaluka(taluka) {
    var apiUrl = "districtwisetaluka/";
    this.AdminReportService.getCalllvl1(apiUrl + taluka, window.localStorage.getItem("token"))
      .subscribe(
      data => {
        this.selectedTaluka = ""
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

  setDays() {
    this.dummyDate = [];
    var nDays, oDaysSelLgth, opt, i = 1;
    if (this.monthSelect != undefined) {
      nDays = this.numDays[this.monthSelect];
      if (nDays == 28 && this.dobyear % 4 == 0)
        ++nDays;
      this.dummyDate = this.dayDate.slice();
      this.dummyDate = this.dummyDate.splice(0, nDays);
    }
  }

  isNumber(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }

  onDojChange() {
   
    if(parseInt(this.dateofJoin) < parseInt(this.dobyear))
    {
      console.log("dob should be small")
      this.dojSelect = true;
    }
    else{
      console.log("dob should be greater")
      this.dojSelect = false;
    }
    
  }


  createNewUser() {
    var DOB = this.dobyear + "-" + this.monthSelect + "-" + this.dateSelect;
    var jsonBody = {}
    jsonBody['mobile'] = this.mobNumber.trim();
    jsonBody['district'] = this.selectedDistrict;
    jsonBody['taluka'] = this.selectedTaluka;
    jsonBody['fullname'] = this.fullName.trim();
    jsonBody['gender'] = this.gender;
    jsonBody['dob'] = DOB;
    jsonBody['position'] = this.position.trim();
    jsonBody['dateofjoining'] = this.dateofJoin;
    if (this.aadharNumber == null || this.aadharNumber == undefined) {
      jsonBody['aadharno'] = ''
    } else {
      jsonBody['aadharno'] = '';
    }
    if (this.underGraduate === 'other') {
      jsonBody['undergraduation'] = '';
    } else {
      jsonBody['undergraduation'] = '';
    }

    if (this.postGraduate === 'pgother') {
      jsonBody['postgraduation'] = '';
    } else {
      jsonBody['postgraduation'] = '';
    }

    jsonBody['ugspecial'] = '';
    jsonBody['pgspecial'] = '';
    jsonBody['professional'] = '';
    jsonBody['professionalspecil'] = '';
    jsonBody['other'] = '';
    jsonBody['accno'] = '';
    jsonBody['ifsccode'] = '';
    jsonBody['bankname'] = '';
    jsonBody['isstaff'] = parseInt(this.isstaff);

    console.log(jsonBody)

    this.apiCall(jsonBody, 'addcoordinator/', 'createNew');
  }

  clearField() {
    this.isstaff = "0";
    this.fullName = "";
    this.gender = "";
    this.mobNumber = "";
    this.aadharNumber = "";
    this.selectedDistrict = "";
    this.selectedTaluka = "";
    this.position = "";
    this.dateofJoin = "";
    this.bankName = "";
    this.accountNo = "";
    this.ifscCode = "";
    this.underGraduate = "";
    this.ugSpecialisation = "";
    this.postGraduate = "";
    this.pgSpecialisation = "";
    this.professional = "";
    this.professionalSpecialization = "";
    this.othersQualification = "";
    this.otherPgSpecial = "";
    this.otherUgSpecial = "";
    this.dobyear = "";
    this.monthSelect = "";
    this.dateSelect = "";

    this.showCordinators = false;
    this.newUserFlag = false;
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
}
