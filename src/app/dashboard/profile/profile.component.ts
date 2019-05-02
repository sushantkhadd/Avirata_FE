import { Component, OnInit, ViewChild, Input, ViewContainerRef } from '@angular/core';
import { LanguageService } from 'src/app/language.service';
import { SignupStepper } from './../../signup-stepper/signup-stepper.model';
import { SignupStepperService } from './../../signup-stepper/signup-stepper.service';
import { LocalstoragedetailsService } from "src/app/services/localstoragedetails.service";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FullLayoutComponent } from "src/app/layouts/full-layout.component";
import { DashboardService } from "src/app/dashboard/dashboard.service";
import { ModalDirective } from 'ngx-bootstrap';
import { ProfileService } from "src/app/dashboard/profile/profile.service";
import { IMyDate, MyDatePicker } from 'mydatepicker';
import { RegistrationService } from "src/app/authentication/registration/registration.service";
import { environment } from 'src/environments/environment';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  cancleSubject: any;
  public selDate: IMyDate;
  public genderError = false;
  public dobError = false;
  public next = false;
  public dob = false;
  public dojJsonArray = [];
  public personal = false;
  public educational = false; flag = 0; emailAccept;
  public emailOtp; password; passwordMobile; mobileOtp; districtJson; oldModel; tt; showErrorMsg;
  public oldName; oldAdharNo; tempAdharNo; tempName;
  constructor(private DashboardService: DashboardService, public datePipe: DatePipe, private FullLayoutComponent: FullLayoutComponent, private translate: TranslateService, private LocalstoragedetailsService: LocalstoragedetailsService, private ProfileService: ProfileService, private SignupStepperService: SignupStepperService, private SignupStepper: SignupStepper, private router: Router, public lang: LanguageService,
    public RegistrationService: RegistrationService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  //type=1----editable for user and type=2--not editable
  public dropdownListSubject = [
    { "id": 1, "itemName": "Civics", "type": "1" },
    { "id": 4, "itemName": "Geography" },
    { "id": 5, "itemName": "Hindi" },
    { "id": 6, "itemName": "History" },
    { "id": 7, "itemName": "ICT" },
    { "id": 8, "itemName": "Kannada" },
    { "id": 9, "itemName": "Marathi" },
    { "id": 10, "itemName": "Mathematics" },
    { "id": 11, "itemName": "Other" },
    { "id": 12, "itemName": "Physical Education" },
    { "id": 13, "itemName": "Sanskrit" },
    { "id": 14, "itemName": "Sindhi" },
    { "id": 15, "itemName": "Science" },
    { "id": 16, "itemName": "Self Defence" },
    { "id": 17, "itemName": "Self Development and Art Appreciation" },
    { "id": 18, "itemName": "Telagu" },
    { "id": 19, "itemName": "Uradu" },
  ];
  public myProfile; myProfileCopy; district; taluka; talukaJson; schoolName; schoolIndex; fullName; lastName; email;
  public mobile; aadharNo; model; modelView; gender; genderView; address; oldAddress; profilePic; designation; designationView; dateofJoin; dateofJoinView; subject; subjectView; grades; gradesView; grade = [];
  public underGraduate; underGraduateView; underGraduateSpec; postGraduate; postGraduateView; postGraduateSpec; proffessional; proffessionalSpec; other;
  public dojJson = [1977, 1978, 1979, 1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997,
    1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017];
  public dropdownSettings = {}; subList = []; subject1; //subject dropdown
  public class1 = ""; firstCheck = false; class2 = ""; secondCheck = false; class3 = ""; thirdCheck = false;
  public classList;
  public profile = false;
  public apiUrlForProfile = environment.apiUrl + 'profilepic/'; token; userId;
  public changeProfile = false;
  public grade8 = false; grade9 = false; grade10 = false; grade8Old = false; grade9Old = false; grade10Old = false;
  // private myDatePickerOptions: IMyDpOptions = {
  //   dateFormat: 'dd.mm.yyyy', editableDateField: false
  // };
  public personalFormSave = false;
  public designationError = false;
  public designationFlag = false;
  public serviceFormSave = false;
  public gradesFlag = false;
  public dojError = false;
  public dojSelect = false;
  public service = false;
  public educationFormSave = false;
  public basic = false;
  public basicFormSave = false;
  public classError = false; genderFlag = false;
  public profileImage;
  public bankName; oldBankName; ifscCode; oldIfscCode; accountNo; oldAccountNo; birthday; otherUgSpecial; OldOtherUgSpecial; ugSpecialisation; oldUgSpecialisation; otherPgSpecial = ""; oldOtherPgSpecial; pgSpecialisation; oldPgSpecialisation; professional; professionalView; professionalSpecialization; oldProfessionalSpecialization; othersQualification = ""; oldOthersQualification;
  @ViewChild('emailChangeProfile') public emailChangeProfile: ModalDirective;
  @ViewChild('mobileChangeProfile') public mobileChangeProfile: ModalDirective;
  @ViewChild('emailVerifyProfile') public emailVerifyProfile: ModalDirective;
  @ViewChild('mydp') mydp: MyDatePicker;
  public newEmail = ""; newMobile = "";
  public sendEmailOtp = true;
  public sendMobileOtp = true;
  public modelTemp;
  public addrCount; //for addr max length count
  public otherUgCount; districtName; talukaName;
  public ugSpecialisationCount; otherPgSpecialCount; pgSpecialisationCount; professionalSpecializationCount; othersQualificationCount;
  public addrFlag = false; otherUgFlag = false; ugSpecialisationFlag = false; otherPgSpecialFlag = false; pgSpecialisationFlag = false; professionalSpecializationFlag = false; othersQualificationFlag = false;
  public tempDesignation; tempDOB; tempGender; tempAddress; tempBankName; tempIfscCode; tempAccno; tempJoinYear; tempSubject; tempClass;
  public tempunderGraduate; temppostGraduate; tempprofessional; pgSpecialFlag = false;
  public dobCheckEmpty; model1;
  public emailVerified; emailnull;
  public click_here_email = false; profileImage1; checkAgree;
  public sendEmail = false; oldEmailVerify; profileFields = [];

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
  ngOnInit() {
    this.profileFields = [
      { "field": "gender", "status": false, "type": "1", "value": "लिंग" },
      { "field": "position", "status": false, "type": "1", "value": "हुद्दा" },
      { "field": "subject", "status": false, "type": "1", "value": "शिकवत असलेले विषय" },
      { "field": "grade", "status": false, "type": "1", "value": "शिकवत असलेले वर्ग" },
      { "field": "dateofjoining", "status": false, "type": "1", "value": "सेवेत दाखल होण्याचे वर्ष" },
      { "field": "undergraduation", "status": false, "type": "1", "value": "पदवी" },
      { "field": "ugspecial", "status": false, "type": "1", "value": "पदवी विषय" },
      { "field": "professional", "status": false, "type": "1", "value": "व्यावसायिक पदवी" },
      { "field": "bankname", "status": false, "type": "1", "value": "बँकेचे नाव" },
      { "field": "ifsccode", "status": false, "type": "1", "value": "IFSC कोड" },
      { "field": "accno", "status": false, "type": "1", "value": "बँक खाते क्रमांक" },
      { "field": "email", "status": false, "type": "1", "value": "ई-मेल आयडी" },
      { "field": "address", "status": false, "type": "1", "value": "कायमचा राहण्याचा पत्ता" },
      { "field": "dateofbirth", "status": false, "type": "1", "value": "जन्म दिनांक" },
      { "field": "profspecial", "status": false, "type": "1", "value": "व्यावसायिक पदवी विषय" },
      { "field": "district", "status": false, "type": "2", "value": "जिल्हा" },
      { "field": "fullname", "status": false, "type": "2", "value": "पूर्ण नाव" },
      { "field": "taluka", "status": false, "type": "2", "value": "तालुका / ब्लॉक" },
      { "field": "aadharno", "status": false, "type": "2", "value": "आधार क्रमांक" },
      { "field": "schoolindex", "status": false, "type": "2", "value": "शाळेचे नाव" },
    ];
    this.flag = 0;
    this.click_here_email = false;
    this.addrCount = 500;
    this.otherUgCount = 50;
    this.ugSpecialisationCount = 50;
    this.otherPgSpecialCount = 50;
    this.pgSpecialisationCount = 50;
    this.professionalSpecializationCount = 80;
    this.othersQualificationCount = 200;
    this.otherPgSpecial = "";
    this.pgSpecialisation = "";
    this.othersQualification = "";
    this.genderError = false;
    this.class1 = "";
    this.firstCheck = false;
    this.class2 = "";
    this.secondCheck = false;
    this.class3 = "";
    this.thirdCheck = false;
    this.personalFormSave = false;
    this.subject1 = [];
    this.dropdownSettings = {
      singleSelection: false,
      text: "Select",
      enableCheckAll: false,
    };

    this.dobError = false;
    this.dob = false;
    this.genderFlag = false;
    this.designationFlag = false;
    this.serviceFormSave = false;
    this.gradesFlag = false;
    this.dojError = false;
    this.dojSelect = false;
    this.service = false;
    this.educational = false;
    this.educationFormSave = false;
    this.profile = false;
    this.profileImage = this.FullLayoutComponent.imgUrl;

    this.token = this.LocalstoragedetailsService.token;
    this.changeProfile = false;
    this.sendEmailOtp = true;
    this.sendMobileOtp = true;
    this.basic = false;
    this.basicFormSave = false;
    this.pgSpecialFlag = false;
    this.showErrorMsg = false;
    this.checkAgree = false;
    this.emailAccept = false;
    if (this.LocalstoragedetailsService.token == null) {
      this.router.navigate(['/']);
    }

    if ((window.localStorage.getItem('profile') == null) || (window.localStorage.getItem('profile') == undefined) || (window.localStorage.getItem('profile') == "")) {

      this.ProfileService.getProfileDetails(this.LocalstoragedetailsService.token)
        .subscribe(
        data => {
          window.localStorage.setItem('profile', JSON.stringify(data.Response))
          this.myProfile = data.Response;
          this.myProfileCopy = data.Response;
          this.district = data.Response.district;
          this.taluka = data.Response.taluka;
          this.districtName = data.Response.districtName;
          this.talukaName = data.Response.talukaName;

          this.schoolName = data.Response.schoolname;
          this.schoolIndex = data.Response.schoolindex;
          this.fullName = data.Response.fullname;
          this.tempName = data.Response.fullname;
          this.email = data.Response.email;
          this.mobile = data.Response.mobileno;
          this.aadharNo = data.Response.aadharno;
          this.tempAdharNo = data.Response.aadharno;

          this.model = data.Response.dateofbirth;

          this.model1 = this.datePipe.transform(this.model, 'dd-MM-yyyy');

          if (data.Response.gender == 'female') {
            this.gender = "female";
            this.genderView = "स्त्री"
          } else if (data.Response.gender == 'male') {
            this.gender = "male"
            this.genderView = "पुरुष"
          }
          this.address = data.Response.address;
          if (data.Response.position == 'headmaster') {
            this.designation = "headmaster";
            this.designationView = "मुख्याध्यापक";
          } else if (data.Response.position == 'teacher') {
            this.designation = "teacher";
            this.designationView = "शिक्षक";
          } else {
            this.designation = "";
            this.designationView = "";
          }
          this.tempDesignation = data.Response.position;
          this.bankName = data.Response.bankname;
          this.ifscCode = data.Response.ifsccode;
          this.accountNo = data.Response.accno;
          this.tempDOB = data.Response.dateofbirth;
          this.tempGender = data.Response.gender;
          this.tempAddress = data.Response.address;
          this.tempBankName = data.Response.bankname;
          this.tempIfscCode = data.Response.ifsccode;
          this.tempAccno = data.Response.accno;
          this.tempJoinYear = data.Response.dateofjoining;
          this.tempSubject = data.Response.subject;
          if (this.tempSubject != null && this.tempSubject != "" && this.tempSubject != undefined) {
            var subjectArray = this.tempSubject.split(',');
            for (var i = 0; i < subjectArray.length; i++) {
              for (var j = 0; j < this.dropdownListSubject.length; j++) {
                if (this.dropdownListSubject[j].itemName == subjectArray[i]) {
                  this.subject1.push({ 'id': this.dropdownListSubject[j].id, 'itemName': this.dropdownListSubject[j].itemName })

                }
              }
            }
          }

          this.tempClass = data.Response.grade;
          this.dateofJoin = data.Response.dateofjoining;
          this.subject = data.Response.subject;

          this.grades = data.Response.grade;
          if (data.Response.undergraduation == "B.A." || data.Response.undergraduation == "B.Com." || data.Response.undergraduation == "B.Sc.") {
            this.underGraduate = data.Response.undergraduation;
            this.underGraduateView = data.Response.undergraduation;
            this.tempunderGraduate = data.Response.undergraduation;
          }
          else {
            this.underGraduate = "other";
            this.underGraduateView = "Others";
            this.otherUgSpecial = data.Response.undergraduation;
            this.tempunderGraduate = "other";
          }

          this.ugSpecialisation = data.Response.ugspecial;
          if (data.Response.postgraduation == 'M.A.' || data.Response.postgraduation == 'M.Com.' || data.Response.postgraduation == 'M.Sc.') {
            this.postGraduate = data.Response.postgraduation;
            this.postGraduateView = data.Response.postgraduation;
            this.temppostGraduate = data.Response.postgraduation;
          }
          else if (data.Response.postgraduation == "") {
            this.postGraduate = "";
            this.postGraduateView = "";
            this.otherPgSpecial = "";
            this.temppostGraduate = "";
          } else {
            this.postGraduate = "pgother";
            this.postGraduateView = "Others"
            this.otherPgSpecial = data.Response.postgraduation;
            this.temppostGraduate = "pgother";
          }
          this.pgSpecialisation = data.Response.pgspecial;
          this.professional = data.Response.professional;
          this.tempprofessional = data.Response.professional;
          this.professionalSpecialization = data.Response.profspecial;
          this.othersQualification = data.Response.other;
          this.modelView = this.model;
          if (this.designation == 'headmaster') {
            this.designationView = "मुख्याध्यापक";
          } else if (this.designation == 'teacher') {
            this.designationView = "शिक्षक";
          } else {
            this.designationView = "";
          }
          this.dateofJoinView = this.dateofJoin;
          this.subjectView = this.subject;
          this.gradesView = this.grades;
          this.professionalView = this.professional;

          if (this.email == "" || this.email == undefined || this.email.length == 0) {
            this.emailVerified = false;
            this.emailnull = true;
          }
          else {
            this.emailVerified = data.Response.verifiedemail;
            if (this.emailVerified == false) {
              this.emailnull = false;
            }
          }
          if (window.localStorage.getItem('profileComplete') == 'false') {
            this.toastr.error(this.translate.instant('Errors.incompleteProfile'));
          }
          if (window.localStorage.getItem('profileComplete') == 'false') {
            for (let key in this.myProfile) {
              if (this.myProfile[key] == '' || this.myProfile[key] == null) {
                var id = this.profileFields.findIndex(x => x.field == key);
                this.profileFields.forEach(element => {
                  if (element.field == key) {
                    element.status = true;
                  }
                });
              }
            }
            window.localStorage.setItem("profileArray", JSON.stringify(this.profileFields));
          }
        },
        err =>
          this.toastr.error(this.translate.instant('Errors.cannotProceed'))
        );
    } else if ((window.localStorage.getItem('profile') != null) && (window.localStorage.getItem('profile') != undefined) && (window.localStorage.getItem('profile') != "")) {
      var tempProfile = JSON.parse(window.localStorage.getItem('profile'));
      this.myProfile = tempProfile;
      this.myProfileCopy = tempProfile;
      this.district = tempProfile.district;
      this.taluka = tempProfile.taluka;
      this.districtName = tempProfile.districtName;
      this.talukaName = tempProfile.talukaName;

      this.schoolName = tempProfile.schoolname;
      this.schoolIndex = tempProfile.schoolindex;
      this.fullName = tempProfile.fullname;
      this.tempName = tempProfile.fullname;

      this.email = tempProfile.email;
      this.mobile = tempProfile.mobileno;
      this.aadharNo = tempProfile.aadharno;
      this.tempAdharNo = tempProfile.aadharno;
      this.model = tempProfile.dateofbirth;

      this.model1 = this.datePipe.transform(this.model, 'dd-MM-yyyy');

      if (tempProfile.gender == 'female') {
        this.gender = "female";
        this.genderView = "स्त्री"
      } else if (tempProfile.gender == 'male') {
        this.gender = "male"
        this.genderView = "पुरुष"
      }
      this.address = tempProfile.address;
      if (tempProfile.position == 'headmaster') {
        this.designation = "headmaster";
        this.designationView = "मुख्याध्यापक";
      } else if (tempProfile.position == 'teacher') {
        this.designation = "teacher";
        this.designationView = "शिक्षक";
      } else {
        this.designation = "";
        this.designationView = "";
      }
      this.tempDesignation = tempProfile.position;
      this.bankName = tempProfile.bankname;
      this.ifscCode = tempProfile.ifsccode;
      this.accountNo = tempProfile.accno;
      this.tempDOB = tempProfile.dateofbirth;
      this.tempGender = tempProfile.gender;
      this.tempAddress = tempProfile.address;
      this.tempBankName = tempProfile.bankname;
      this.tempIfscCode = tempProfile.ifsccode;
      this.tempAccno = tempProfile.accno;
      this.tempJoinYear = tempProfile.dateofjoining;
      this.tempSubject = tempProfile.subject;

      if (this.tempSubject != null && this.tempSubject != "" && this.tempSubject != undefined) {

        var subjectArray = this.tempSubject.split(',');
        for (var i = 0; i < subjectArray.length; i++) {
          for (var j = 0; j < this.dropdownListSubject.length; j++) {
            if (this.dropdownListSubject[j].itemName == subjectArray[i]) {
              this.subject1.push({ 'id': this.dropdownListSubject[j].id, 'itemName': this.dropdownListSubject[j].itemName })

            }
          }
        }
      }

      this.tempClass = tempProfile.grade;
      this.dateofJoin = tempProfile.dateofjoining;
      this.subject = tempProfile.subject;

      this.grades = tempProfile.grade;
      if (tempProfile.undergraduation == "B.A." || tempProfile.undergraduation == "B.Com." || tempProfile.undergraduation == "B.Sc.") {
        this.underGraduate = tempProfile.undergraduation;
        this.underGraduateView = tempProfile.undergraduation;
        this.tempunderGraduate = tempProfile.undergraduation;
      }
      else {
        this.underGraduate = "other";
        this.underGraduateView = "Others";
        this.otherUgSpecial = tempProfile.undergraduation;
        this.tempunderGraduate = "other";
      }

      this.ugSpecialisation = tempProfile.ugspecial;
      if (tempProfile.postgraduation == 'M.A.' || tempProfile.postgraduation == 'M.Com.' || tempProfile.postgraduation == 'M.Sc.') {
        this.postGraduate = tempProfile.postgraduation;
        this.postGraduateView = tempProfile.postgraduation;
        this.temppostGraduate = tempProfile.postgraduation;
      }
      else if (tempProfile.postgraduation == "") {
        this.postGraduate = "";
        this.postGraduateView = "";
        this.otherPgSpecial = "";
        this.temppostGraduate = "";
      } else {
        this.postGraduate = "pgother";
        this.postGraduateView = "Others"
        this.otherPgSpecial = tempProfile.postgraduation;
        this.temppostGraduate = "pgother";
      }
      this.pgSpecialisation = tempProfile.pgspecial;
      this.professional = tempProfile.professional;
      this.tempprofessional = tempProfile.professional;
      this.professionalSpecialization = tempProfile.profspecial;
      this.othersQualification = tempProfile.other;
      this.modelView = this.model;
      if (this.designation == 'headmaster') {
        this.designationView = "मुख्याध्यापक";
      } else if (this.designation == 'teacher') {
        this.designationView = "शिक्षक";
      } else {
        this.designationView = "";
      }
      this.dateofJoinView = this.dateofJoin;
      this.subjectView = this.subject;
      this.gradesView = this.grades;
      this.professionalView = this.professional;

      if (this.email == "" || this.email == undefined || this.email.length == 0) {
        this.emailVerified = false;
        this.emailnull = true;
      }
      else {
        this.emailVerified = tempProfile.verifiedemail;
        if (this.emailVerified == false) {
          this.emailnull = false;
        }
      }
      if (window.localStorage.getItem('profileComplete') == 'false') {
        this.toastr.error(this.translate.instant('Errors.incompleteProfile'));
      }
      if (window.localStorage.getItem('profileComplete') == 'false') {
        for (let key in this.myProfile) {
          if (this.myProfile[key] == '' || this.myProfile[key] == null) {
            var id = this.profileFields.findIndex(x => x.field == key);
            this.profileFields.forEach(element => {
              if (element.field == key) {
                element.status = true;
              }
            });
          }
        }
        window.localStorage.setItem("profileArray", JSON.stringify(this.profileFields));
      }
    }

  }

  dobCheck() {
    var d = new Date();

    // if (this.designation != undefined) {
    //   if (this.designation == 'headmaster') {
    //     if (event.jsdate != undefined) {
    //       if (event.jsdate.getFullYear() > 1956 && event.jsdate.getFullYear() < 1998) {
    //         this.model = event.date.year + "-" + event.date.month + "-" + event.date.day;
    //         this.dobError = false;
    //         this.dob = true;
    //       }
    //       else {
    //         this.dobError = true;
    //         this.dob = false;
    //       }
    //     }
    //   } else if (this.designation == 'teacher') {
    //     if (event.jsdate != undefined) {
    //       if (event.jsdate.getFullYear() >= 1965 && event.jsdate.getFullYear() < 1998) {
    //         this.model = event.date.year + "-" + event.date.month + "-" + event.date.day;
    //         this.dobError = false;
    //         this.dob = true;
    //       }
    //       else {
    //         this.dobError = true;
    //         this.dob = false;
    //       }
    //     }
    //   }
    // }


    if (this.designation != undefined) {
      if (this.designation == 'headmaster') {
        if (this.dobyear != undefined) {
          if (this.dobyear > 1956 && this.dobyear < 1998) {
            // this.model = event.date.year + "-" + event.date.month + "-" + event.date.day;
            this.dobError = false;
            this.dob = true;
          }
          else {
            this.dobError = true;
            this.dob = false;
          }
        }
      } else if (this.designation == 'teacher') {
        if (this.dobyear != undefined) {
          if (this.dobyear > 1956 && this.dobyear < 1998) {
            // this.model = event.date.year + "-" + event.date.month + "-" + event.date.day;
            this.dobError = false;
            this.dob = true;
          }
          else {
            this.dobError = true;
            this.dob = false;
          }
        }
      }
    }

  }

  handleGenderChange(evt) {
    var target = evt.target;
    if (target.checked) {
      this.genderError = false;
      this.genderFlag = true;
    } else {
      this.genderError = true;
      this.genderFlag = false;
    }
  }

  onItemSelect(item: any) {
    // console.log("ONSELECT", JSON.stringify(item));
    if (this.subject1.length > 0) {
      var len = this.subject1.length;
      this.subList.push(this.subject1[len - 1].itemName)
    }
  }
  OnItemDeSelect(item: any) {
    this.subList.splice(this.subList.indexOf(item.itemName), 1);
  }

  classCheck(e) {
    if (e.target.checked) {
      this.class1 = "8";
      this.grade8 = true;
      this.firstCheck = true;
    }
    else {
      this.class1 = "";
      this.grade8 = false;
      this.firstCheck = false;
    }
  }
  classCheck1(e) {
    if (e.target.checked) {
      this.class2 = "9";
      this.grade9 = true;
      this.secondCheck = true;
    }
    else {
      this.class2 = "";
      this.grade9 = false;
      this.secondCheck = false;
    }
  }
  classCheck2(e) {
    if (e.target.checked) {
      this.class3 = "10";
      this.grade10 = true;
      this.thirdCheck = true;
    }
    else {
      this.class3 = "";
      this.grade10 = false;
      this.thirdCheck = false;
    }
  }
  ngDoCheck(firstCheck, secondCheck, thirdCheck) {
    if (this.class1 == '' && this.class2 != '' && this.class3 != '') {
      this.classList = this.class2 + "," + this.class3;
    } else if (this.class2 == '' && this.class1 != '' && this.class3 != '') {
      this.classList = this.class1 + "," + this.class3;
    } else if (this.class3 == '' && this.class1 != '' && this.class2 != '') {
      this.classList = this.class1 + "," + this.class2
    } else if (this.class2 == '' && this.class3 == '') {
      this.classList = this.class1;
    } else if (this.class1 == '' && this.class3 == '') {
      this.classList = this.class2;
    } else if (this.class1 == '' && this.class2 == '') {
      this.classList = this.class3;
    } else {
      this.classList = this.class1 + "," + this.class2 + "," + this.class3;
    }

    if (this.dobyear == undefined || this.monthSelect == undefined || this.dateSelect == undefined) {
      this.dob = false;
    } else {
      this.dob = true;
    }
    this.personalFormSave = this.dob && this.genderFlag;
    // this.personalFormSave =  this.genderFlag;
    if (this.firstCheck == true || this.secondCheck == true || this.thirdCheck == true || this.grade8 == true || this.grade9 == true || this.grade10 == true)
      this.gradesFlag = true;
    else {
      this.gradesFlag = false;
    }
    if (this.subject1.length > 0) {
      this.serviceFormSave = this.gradesFlag;
    }
    else {
      this.serviceFormSave = false;
    }

    if (this.postGraduate == "pgother") {
      if (this.otherPgSpecial == "") {
        this.pgSpecialFlag = false;
        this.pgSpecialisation = "";
      } else if (this.otherPgSpecial != "") {
        this.pgSpecialFlag = true;
      }
    } else if (this.postGraduate == "") {
      this.pgSpecialFlag = false;
      this.pgSpecialisation = "";
    } else {
      this.pgSpecialFlag = true;
    }

    if (this.underGraduate == "other") {
      if (this.otherUgSpecial == "" || this.ugSpecialisation == "" || this.professional == "" || this.professionalSpecialization == "") {
        this.educationFormSave = false;
      } else if (this.professional != "" || this.professionalSpecialization != "") {
        this.educationFormSave = true;
      }
    } else if (this.underGraduate != "other") {
      if (this.underGraduate == "" || this.ugSpecialisation == "" || this.professional == "" || this.professionalSpecialization == "") {
        this.educationFormSave = false;
      } else if (this.professional != "" || this.professionalSpecialization != "") {
        this.educationFormSave = true;
      }
    } else {
      this.educationFormSave = true;
    }

    if (this.postGraduate == "pgother") {
      if (this.otherPgSpecial == "") {
        this.educationFormSave = false;
      } else if (this.otherPgSpecial != "") {
        if (this.pgSpecialisation == "") {
          this.educationFormSave = false;
        } else if (this.pgSpecialisation != "") {
          this.educationFormSave = true;
        }
      }
    }

    else if (this.postGraduate == "M.A." || this.postGraduate == "M.Com." || this.postGraduate == "M.Sc.") {
      if (this.pgSpecialisation == "") {
        this.educationFormSave = false;
      } else if (this.pgSpecialisation != "") {
        this.educationFormSave = true;
      }
    }

    this.profileImage = this.FullLayoutComponent.imgUrl; //after refresh to update image url
    if (this.underGraduate == "other") {
      if (this.otherUgSpecial == "" || this.otherUgSpecial == undefined) {
        this.educationFormSave = false;
      }
    }
    if (this.designationFlag == false) {
      this.basicFormSave = false;
    }
    else {
      this.basicFormSave = true;
    }
    if (this.address == undefined || this.address == null || this.address == "") {
      this.addrCount = 500;
    }
    else
      this.addrCount = 500 - Object.keys(this.address).length;

    if (this.otherUgSpecial == undefined || this.otherUgSpecial == null || this.otherUgSpecial == "") {
      this.otherUgCount = 50;
    }
    else
      this.otherUgCount = 50 - Object.keys(this.otherUgSpecial).length;

    if (this.ugSpecialisation == undefined || this.ugSpecialisation == null || this.ugSpecialisation == "") {
      this.ugSpecialisationCount = 50;
    }
    else
      this.ugSpecialisationCount = 50 - Object.keys(this.ugSpecialisation).length;

    if (this.otherPgSpecial == undefined || this.otherPgSpecial == null || this.otherPgSpecial == "") {
      this.otherPgSpecialCount = 50;
    }
    else
      this.otherPgSpecialCount = 50 - Object.keys(this.otherPgSpecial).length;

    if (this.pgSpecialisation == undefined || this.pgSpecialisation == null || this.pgSpecialisation == "") {
      this.pgSpecialisationCount = 50;
    }
    else
      this.pgSpecialisationCount = 50 - Object.keys(this.pgSpecialisation).length;

    if (this.professionalSpecialization == undefined || this.professionalSpecialization == null || this.professionalSpecialization == "") {
      this.professionalSpecializationCount = 80;
    }
    else
      this.professionalSpecializationCount = 80 - Object.keys(this.professionalSpecialization).length;
    if (this.othersQualification == undefined || this.othersQualification == null || this.othersQualification == "") {
      this.othersQualificationCount = 200;
    }
    else
      this.othersQualificationCount = 200 - Object.keys(this.othersQualification).length;
  }
  stepOne() {
    this.basic = false;
    if (this.designation == this.tempDesignation) {

    } else {
      var stepOneJson = '{"district": "' + this.district + '","taluka" : "' + this.taluka + '","schoolname" : "' + this.schoolName + '","schoolindex": "' + this.schoolIndex + '","position":"' + this.designation + '","event" : "updateprofile"}';
      this.SignupStepperService.submitStepOne(stepOneJson, this.LocalstoragedetailsService.token)
        .subscribe(
        data => {
          if (data.Response == "session not matches please re-login") {
            this.toastr.error(this.translate.instant('Errors.sessionNotMatches'));
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 4000)
          }
          else if (data.Response == "Information added Successfully") {

            if (this.designation == 'headmaster') {
              this.designation = "headmaster"
              this.designationView = "मुख्याध्यापक";
            } else {
              this.designation = "teacher"
              this.designationView = "शिक्षक";
            }
            this.tempDesignation = this.designation;

            var tempProf = JSON.parse(window.localStorage.getItem('profile'))
            tempProf.position = this.designation;
            window.localStorage.setItem('profile', JSON.stringify(tempProf))

          } else if (data.Response == "already postion full for headmaster") {
            this.toastr.error(this.translate.instant('Errors.fullPositionHeadmaster'));
            if (this.designationView == "मुख्याध्यापक") {
              this.designation = 'headmaster'
            } else if (this.designationView == "शिक्षक") {
              this.designation = 'teacher'
            }
          } else if (data.Response == "already postion full for teacher") {
            this.toastr.error(this.translate.instant('Errors.fullPositionTeacher'))
            if (this.designationView == "मुख्याध्यापक") {
              this.designation = 'headmaster'
            } else if (this.designationView == "शिक्षक") {
              this.designation = 'teacher'
            }
          } else if (data.Response == "Select Proper Position") {
            this.toastr.error('हुद्दा निवडा.')
            if (this.designationView == "मुख्याध्यापक") {
              this.designation = 'headmaster'
            } else if (this.designationView == "शिक्षक") {
              this.designation = 'teacher'
            }
          } else if (data.Response == "Something Went Wrong") {
            this.toastr.error(this.translate.instant('Errors.somethingWentWrong'))
          } else {
            this.toastr.error(this.translate.instant('Errors.checkInfo'))
          }
        },
        error => {
          this.toastr.error(this.translate.instant('Errors.cannotProceed'))
        }//Catch Error if server is not Found
        );
    }
  }
  stepOneEdit() {
    if (this.designation == 'headmaster') {
      this.designationView = "मुख्याध्यापक";
      this.designationFlag = true;
    } else if (this.designation == "teacher") {
      this.designationView = "शिक्षक";
      this.designationFlag = true;
    }
  }
  stepThree() {
    this.subList = [];
    for (var i = 0; i < this.subject1.length; i++) {
      this.subList.push(this.subject1[i].itemName)
    }
    if (this.dojSelect = true) {
      this.service = false;
      if (this.tempJoinYear == this.dateofJoin && this.tempClass == this.classList && this.subList.toString() == this.tempSubject) {
      } else {
        var stepThreeJson = '{"subject": "' + this.subList + '","grade" : "' + this.classList + '","dateofjoining" : "' + this.dateofJoin + '","event":"updateprofile"}'

        this.SignupStepperService.submitStepThree(stepThreeJson, this.LocalstoragedetailsService.token)
          .subscribe(
          data => {
            if (data.Response == "session not matches please re-login") {
              this.toastr.error(this.translate.instant('Errors.sessionNotMatches'));
              setTimeout(() => {
                this.router.navigate(['/']);
              }, 4000)
            }
            else if (data.Response == "Information added Successfully") {
              this.subject = this.subList;
              this.grades = this.classList;
              this.designationView = this.designation;
              this.dateofJoinView = this.dateofJoin;
              this.subjectView = this.subject;
              this.gradesView = this.grades;

              this.tempJoinYear = this.dateofJoin;
              this.tempSubject = this.subList.toString();
              this.tempClass = this.classList;
              var temp = ['dateofjoining', 'subject', 'grade'];
              this.updateProfileCompleteStatus(temp);

              var tempProf = JSON.parse(window.localStorage.getItem('profile'))
              tempProf.subject = this.subList.toString();
              tempProf.grade = this.classList;
              tempProf.dateofjoining = this.dateofJoin;

              window.localStorage.setItem('profile', JSON.stringify(tempProf))

            } else if (data.Response == "Something Went Wrong") {
              this.toastr.error(this.translate.instant('Errors.somethingWentWrong'))
            } else {
              this.toastr.error(this.translate.instant('Errors.checkInfo'))
            }
          },
          error => {
            this.toastr.error(this.translate.instant('Errors.cannotProceed'))
          }//Catch Error if server is not Found
          );
      }
    }
    else {
      this.dojError = true;
    }
  }

  stepTwo() {
    this.model = this.dobyear + '-' + this.monthSelect + '-' + this.dateSelect

    if (this.tempAdharNo == this.aadharNo && this.tempName == this.fullName && this.tempAccno == this.accountNo && this.tempAddress == this.address && this.tempBankName == this.bankName && this.tempDOB == this.model && this.tempIfscCode == this.ifscCode && this.tempGender == this.gender) {

    } else {
      this.address = this.address.replace(/"/g, "'");
      this.address = this.address.replace(/(?:\r\n|\r|\n)/g, ' ');
      // this.fullName=

      // this.model=this.dobyear+'-'+this.monthSelect+'-'+this.dateSelect
      console.log('ad ', (this.aadharNo == ''), this.aadharNo)
      if (this.aadharNo == 'null' || this.aadharNo == '' || this.aadharNo == undefined) {
        this.aadharNo = ''
      }
      console.log('ad ', (this.aadharNo == ''), this.aadharNo)

      var stepTwoJson = '{"aadharno" : "' + this.aadharNo + '","fullname":"' + this.fullName.trim() + '","gender":"' + this.gender + '","address" : "' + this.address + '","dateofbirth": "' + this.model + '","accno" : "' + this.accountNo + '","ifsccode" : "' + this.ifscCode + '","bankname" : "' + this.bankName + '","event":"updateprofile"}'
      // var stepTwoJson = '{"aadharno" : "' + this.aadharNo + '","gender":"' + this.gender + '","address" : "' + this.address + '","dateofbirth": "' + this.model + '","accno" : "' + this.accountNo + '","ifsccode" : "' + this.ifscCode + '","bankname" : "' + this.bankName + '","event":"updateprofile"}'
      this.SignupStepperService.submitStepTwo(stepTwoJson, this.LocalstoragedetailsService.token)
        .subscribe(
        data => {
          if (data.Response == "session not matches please re-login") {
            this.toastr.error(this.translate.instant('Errors.sessionNotMatches'));
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 4000)
          }
          else if (data.Response == "Information added Successfully") {
            this.model1 = this.datePipe.transform(this.model, 'dd-MM-yyyy');
            this.modelView = this.model;
            if (this.gender == 'male') {
              this.gender = "male"
              this.genderView = "पुरुष"
            } else if (this.gender == 'female') {
              this.gender = "female"
              this.genderView = "स्त्री"
            }
            this.tempDOB = this.model;
            this.tempGender = this.gender;
            this.tempAddress = this.address;
            this.tempBankName = this.bankName;
            this.tempIfscCode = this.ifscCode;
            this.tempAccno = this.accountNo;
            var temp = ['gender', 'dateofbirth', 'address', 'bankname', 'ifsccode', 'accno'];

            this.updateProfileCompleteStatus(temp);

            var tempProf = JSON.parse(window.localStorage.getItem('profile'))
            tempProf.gender = this.gender;
            tempProf.address = this.address;
            tempProf.dateofbirth = this.model;
            tempProf.bankname = this.bankName;
            tempProf.ifsccode = this.ifscCode;
            tempProf.accno = this.accountNo;
            tempProf.aadharno = this.aadharNo;
            tempProf.fullname = this.fullName;

            window.localStorage.setItem('name', this.fullName.trim())

            window.localStorage.setItem('profile', JSON.stringify(tempProf))

          } else if (data.Response == "aadhar number should unique" || data.Response == 'aadhar number already associated with another') {
            this.toastr.error(this.translate.instant('Errors.aadharAlreadyRegistered'));
            document.getElementById('aadhar').focus();
            this.personal = true;
          } else if (data.Response == "Something Went Wrong") {
            this.toastr.error(this.translate.instant('Errors.checkInfo'));
            this.personal = true;
          } else {
            this.toastr.error(this.translate.instant('Errors.checkInfo'));
            this.personal = true;
          }
        },
        error => {
          this.toastr.error(this.translate.instant('Errors.cannotProceed'));
        }//Catch Error if server is not Found
        );
    }
  }
  stepTwoEdit() {
    // ---code changed from here when updating for PRofile incomplete info
    if (this.selDate == undefined) {
      this.dob = false
    } else {
      if (this.modelView != "" && this.modelView != null && this.modelView != undefined) {
        var tempdate = this.modelView.split('-');
        if (this.modelView == "" || this.modelView == undefined || this.selDate == undefined) {
          this.dob = false;
        }
      }
      else {
        this.dob = true;
        this.selDate = { year: tempdate[0], month: tempdate[1].replace(/^0+/, ''), day: tempdate[2].replace(/^0+/, '') };
      }
    }
    this.oldName = this.fullName;
    this.oldAdharNo = this.aadharNo;
    this.oldModel = this.model;
    this.oldAddress = this.address;
    this.oldAccountNo = this.accountNo;
    this.oldBankName = this.bankName;
    this.oldIfscCode = this.ifscCode;
    if (this.gender == 'male') {
      this.genderView = "पुरुष";
      this.genderFlag = true;
    } else if (this.gender == 'female') {
      this.genderView = "स्त्री";
      this.genderFlag = true;
    }

    if (this.modelView != "" && this.modelView != null && this.modelView != undefined) {
      var tempdate = this.modelView.split('-');
      this.monthSelect = tempdate[1]
      this.dobyear = tempdate[0]
      var nDays = this.numDays[this.monthSelect];
      if (nDays == 28 && this.dobyear % 4 == 0)
        ++nDays;
      this.dummyDate = this.dayDate.slice();

      this.dummyDate = this.dummyDate.splice(0, nDays);
      this.dateSelect = tempdate[2]

    }

  }

  stepFour() {
    var stepFourJson;
    if (this.oldUgSpecialisation == this.ugSpecialisation &&
      this.OldOtherUgSpecial == this.otherUgSpecial &&
      this.oldPgSpecialisation == this.pgSpecialisation &&
      this.oldOtherPgSpecial == this.otherPgSpecial &&
      this.oldProfessionalSpecialization == this.professionalSpecialization &&
      this.oldOthersQualification == this.othersQualification &&
      this.tempunderGraduate == this.underGraduate &&
      this.temppostGraduate == this.postGraduate &&
      this.tempprofessional == this.professional) {

    }
    else {
      if (this.underGraduate == 'other') {
        if (this.postGraduate == 'pgother') {
          stepFourJson = '{"undergraduation":"' + this.otherUgSpecial + '","ugspecial": "' + this.ugSpecialisation + '","postgraduation" : "' + this.otherPgSpecial + '","pgspecial": "' + this.pgSpecialisation + '","professional" : "' + this.professional + '","professionalspecil":"' + this.professionalSpecialization + '","other" : "' + this.othersQualification + '","event":"updateprofile"}'
        } else {
          stepFourJson = '{"undergraduation":"' + this.otherUgSpecial + '","ugspecial": "' + this.ugSpecialisation + '","postgraduation" : "' + this.postGraduate + '","pgspecial": "' + this.pgSpecialisation + '","professional" : "' + this.professional + '","professionalspecil":"' + this.professionalSpecialization + '","other" : "' + this.othersQualification + '","event":"updateprofile"}'
        }
      } else {
        if (this.postGraduate == 'pgother') {
          stepFourJson = '{"undergraduation":"' + this.underGraduate + '","ugspecial": "' + this.ugSpecialisation + '","postgraduation" : "' + this.otherPgSpecial + '","pgspecial": "' + this.pgSpecialisation + '","professional" : "' + this.professional + '","professionalspecil":"' + this.professionalSpecialization + '","other" : "' + this.othersQualification + '","event":"updateprofile"}'

        } else {
          stepFourJson = '{"undergraduation":"' + this.underGraduate + '","ugspecial": "' + this.ugSpecialisation + '","postgraduation" : "' + this.postGraduate + '","pgspecial": "' + this.pgSpecialisation + '","professional" : "' + this.professional + '","professionalspecil":"' + this.professionalSpecialization + '","other" : "' + this.othersQualification + '","event":"updateprofile"}'
        }
      }

      this.SignupStepperService.submitStepFour(stepFourJson, this.LocalstoragedetailsService.token)
        .subscribe(
        data => {
          if (data.Response == "session not matches please re-login") {
            this.toastr.error(this.translate.instant('Errors.sessionNotMatches'));
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 4000)
          }
          else if (data.Response == "Information added Successfully") {
            if (this.underGraduate == 'other') {
              this.underGraduateView = 'Others';
            } else {
              this.underGraduateView = this.underGraduate;
            }
            if (this.postGraduate == 'pgother') {
              this.postGraduateView = 'Others';

            } else {
              this.postGraduateView = this.postGraduate;
            }
            this.professionalView = this.professional;
            var temp = ['undergraduation', 'ugspecial', 'professional', 'profspecial'];
            this.updateProfileCompleteStatus(temp);

            var tempProf = JSON.parse(window.localStorage.getItem('profile'))

            if (this.underGraduate == 'other') {
              if (this.postGraduate == 'pgother') {
                tempProf.undergraduation = this.otherUgSpecial;
                tempProf.ugspecial = this.ugSpecialisation;
                tempProf.postgraduation = this.otherPgSpecial;
                tempProf.pgspecial = this.pgSpecialisation;
                tempProf.professional = this.professional;
                tempProf.profspecial = this.professionalSpecialization;
                tempProf.other = this.othersQualification;
              } else {
                tempProf.undergraduation = this.otherUgSpecial;
                tempProf.ugspecial = this.ugSpecialisation;
                tempProf.postgraduation = this.postGraduate;
                tempProf.pgspecial = this.pgSpecialisation;
                tempProf.professional = this.professional;
                tempProf.profspecial = this.professionalSpecialization;
                tempProf.other = this.othersQualification;
              }
            } else {
              if (this.postGraduate == 'pgother') {
                tempProf.undergraduation = this.underGraduate;
                tempProf.ugspecial = this.ugSpecialisation;
                tempProf.postgraduation = this.otherPgSpecial;
                tempProf.pgspecial = this.pgSpecialisation;
                tempProf.professional = this.professional;
                tempProf.profspecial = this.professionalSpecialization;
                tempProf.other = this.othersQualification;
              } else {
                tempProf.undergraduation = this.underGraduate;
                tempProf.ugspecial = this.ugSpecialisation;
                tempProf.postgraduation = this.postGraduate;
                tempProf.pgspecial = this.pgSpecialisation;
                tempProf.professional = this.professional;
                tempProf.profspecial = this.professionalSpecialization;
                tempProf.other = this.othersQualification;
              }
            }

            window.localStorage.setItem('profile', JSON.stringify(tempProf))

          } else if (data.Response == "Something Went Wrong") {
            this.toastr.error(this.translate.instant('Errors.somethingWentWrong'));
          } else {
            this.toastr.error(this.translate.instant('Errors.checkInfo'));
          }
        },
        error => {
          this.toastr.error(this.translate.instant('Errors.cannotProceed'));
        }//Catch Error if server is not Found
        );
    }
  }
  stepFourEdit() {
    this.oldUgSpecialisation = this.ugSpecialisation;
    this.OldOtherUgSpecial = this.otherUgSpecial;
    this.oldPgSpecialisation = this.pgSpecialisation;
    this.oldOtherPgSpecial = this.otherPgSpecial;
    this.oldProfessionalSpecialization = this.professionalSpecialization;
    this.oldOthersQualification = this.othersQualification;
    this.tempunderGraduate = this.underGraduate;
    this.temppostGraduate = this.postGraduate;
    this.tempprofessional = this.professional;

  }
  designationChange(evt) {
    var target = evt.target;
    if (target.checked) {
      this.designationError = false;
      this.designationFlag = true;
    } else {
      this.designationError = true;
      this.designationFlag = false;
    }
  }
  onDojChange() {
    this.dojSelect = true;
  }

  imageUploaded() {
    this.userId = window.localStorage.getItem('userid')
    this.DashboardService.getProfilePic(this.userId)
      .subscribe(
      data => {
        this.changeProfile = false;
        if (data.results.length != 0) {
          this.profileImage = data.results[0].file;
          this.FullLayoutComponent.imgUrl = this.profileImage;
        }
      },
      err =>
        this.toastr.error(this.translate.instant('Errors.cannotProceed'))
      );
  }

  generateEmailOtp() {
    this.email = this.email.toLowerCase().trim();
    this.newEmail = this.newEmail.toLowerCase().trim();

    var re3 = new RegExp("[_A-Za-z0-9-\+]+(\.[._A-Za-z0-9-]+)*@(gmail|yahoo|hotmail|rediffmail|outlook|live|msn)+(\.(com|in|org|edu|net|co.in|edu.in|org.in)+)$")
    if (re3.test(this.newEmail)) {
      this.showErrorMsg = false;
      this.confirmGenerateEmailOTP()
    } else {
      this.showErrorMsg = true
    }
  }

  generateMobileOtp() {

    var newEmailJson = '{"mobileno": "' + this.newMobile + '","oldmobile":"' + this.mobile + '","username":"' + this.mobile + '","password":"' + this.passwordMobile + '"}';
    this.ProfileService.sendOTPToMobile(newEmailJson, this.token)
      .subscribe(
      data => {
        if (data.Response == "Mobile No Already Exist") {
          this.toastr.error(this.translate.instant('Errors.alreadyRegMobTryNew'))
          this.sendMobileOtp = true;
        }
        else if (data.Response == "Otp Send On Mobile") {
          this.toastr.warning(this.translate.instant('Errors.mobOtpSent'))
          this.sendMobileOtp = false;
        } else if (data.Response == "Not Authenticate") {
          this.toastr.error(this.translate.instant('Errors.mobOrPassWrong'))

          this.sendMobileOtp = true;

        } else if (data.Response == "Old Mobile Not Exists") {
          this.toastr.error(this.translate.instant('Errors.unregisteredOldMob'))

          this.sendMobileOtp = true;

        } else if (data.Response == "Old Mobile Not Exists") {
          this.toastr.error(this.translate.instant('Errors.unregisteredOldMob'))

          this.sendMobileOtp = true;

        } else if (data.Response == "Token not matches please re-login") {
          this.toastr.error(this.translate.instant('Errors.sessionExpired'));
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 4000)

        } else {
          this.toastr.error(this.translate.instant('Errors.checkInfo'));

        }
      },
      error => {
        this.toastr.error(this.translate.instant('Errors.cannotProceed'));

      }//Catch Error if server is not Found
      );
  }

  verifyEmailOtp() {
    if (isNaN(this.emailOtp)) {
      this.toastr.error(this.translate.instant('Errors.wrongOtp'));
    } else {
      var verifyEmailOtpJson = '{"email":"' + this.newEmail + '","emailotp":"' + this.emailOtp + '"}'

      this.ProfileService.verifyOtpEmail(verifyEmailOtpJson, this.token)
        .subscribe(
        data => {
          if (data.Response == "Email otp expired regenerate otp") {
            this.toastr.error(this.translate.instant('Errors.resendOtp'));

          } else if (data.Response == "Email Verified Thank You") {
            this.emailChangeProfile.hide();
            this.email = this.newEmail;
            this.emailVerified = true;
          } else if (data.Response == "Otp Does Not Match") {
            this.toastr.error(this.translate.instant('Errors.wrongOtp'));

          } else if (data.Response == "Invalid Email") {
            this.toastr.error('ई-मेल चुकीचा आहे');

          } else if (data.Response == "Invalid Otp Or Email") {
            this.toastr.error('ई-मेल किंवा ओटीपी चुकीचा आहे');

          } else if (data.Response == "Token not matches please re-login") {
            this.toastr.error(this.translate.instant('Errors.sessionExpired'));
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 4000)

          }
          else {
            this.toastr.error(this.translate.instant('Errors.checkInfo'));

          }
        },
        error => {
          this.toastr.error(this.translate.instant('Errors.cannotProceed'));

        }//Catch Error if server is not Found
        );
    }
  }

  verifyMobileOtp() {
    if (isNaN(this.mobileOtp)) {
      this.toastr.error(this.translate.instant('Errors.wrongOtp'));

    }
    else {
      var verifyMobileOtpJson = '{"mobileno":"' + this.newMobile + '","mobileotp":"' + this.mobileOtp + '"}'

      this.ProfileService.verifyOtpMobile(verifyMobileOtpJson, this.token)
        .subscribe(
        data => {
          if (data.Response == "mobile otp expired regenerate otp") {
            this.toastr.error(this.translate.instant('Errors.resendOtp'));

          } else if (data.Response == "Mobile Verified Thank You") {
            this.mobileChangeProfile.hide();
            this.mobile = this.newMobile;
          } else if (data.Response == "Otp Does Not Match") {
            this.toastr.error(this.translate.instant('Errors.wrongOtp'));

          } else if (data.Response == "Invalid Mobile Number") {
            this.toastr.error('मोबाईल नंबर चुकीचा आहे.');

          } else {
            this.toastr.error(this.translate.instant('Errors.checkInfo'));

          }
        },
        error => {
          this.toastr.error(this.translate.instant('Errors.cannotProceed'))

        }//Catch Error if server is not Found
        );
    }
  }

  clearFields() {
    this.newEmail = "";
    this.password = "";
    this.emailOtp = "";
    this.newMobile = "";
    this.passwordMobile = "";
    this.mobileOtp = "";
    this.showErrorMsg = false;
    this.emailAccept = false;
  }

  singleOTPGenerateRequest(generateOTPfor) {
    if (generateOTPfor == 1) {
      this.generateEmailOtp();
    }
    //for Mobile
    else if (generateOTPfor == 2) {
      this.generateMobileOtp();
    }
  }
  cancelBasicDetails() {
    if (this.designationView == "मुख्याध्यापक") {
      this.designation = 'headmaster'
    } else if (this.designationView == "शिक्षक") {
      this.designation = 'teacher'
    }
  }
  cancelPersonalDetails() {
    this.model = this.modelView;
    if (this.genderView == "पुरुष") {
      this.gender = "male"
    }
    else if (this.genderView == "स्त्री") {
      this.gender = "female"
    }
    this.dobError = false;
    this.tt = this.model;
    this.address = this.oldAddress;
    this.accountNo = this.oldAccountNo;;
    this.bankName = this.oldBankName;
    this.ifscCode = this.oldIfscCode;

    this.aadharNo = this.oldAdharNo;
    this.fullName = this.oldName;
  }
  cancelServiceDetails() {
    this.dateofJoin = this.dateofJoinView;
    this.subject = this.subjectView;
    this.grades = this.gradesView;
    this.grade8 = this.grade8Old;
    this.grade9 = this.grade9Old;
    this.grade10 = this.grade10Old;
    this.subjectView = this.tempSubject;
    this.subject1 = [];

    if (this.tempSubject != null && this.tempSubject != "" && this.tempSubject != undefined) {
      var subjectArray = this.tempSubject.split(',');

      for (var i = 0; i < subjectArray.length; i++) {

        for (var j = 0; j < this.dropdownListSubject.length; j++) {
          if (this.dropdownListSubject[j].itemName == subjectArray[i]) {
            this.subject1.push({ 'id': this.dropdownListSubject[j].id, 'itemName': this.dropdownListSubject[j].itemName })
          }
        }
      }
    }
  }
  cancelEducationDetails() {
    this.ugSpecialisation = this.oldUgSpecialisation;
    this.otherUgSpecial = this.OldOtherUgSpecial;
    this.pgSpecialisation = this.oldPgSpecialisation;
    this.otherPgSpecial = this.oldOtherPgSpecial;
    this.professionalSpecialization = this.oldProfessionalSpecialization;
    this.othersQualification = this.oldOthersQualification;
    this.underGraduate = this.underGraduateView
    this.postGraduate = this.postGraduateView;
    this.professional = this.professionalView;

  }
  serviceEdit() {
    this.dateofJoin = this.dateofJoinView;
    if (this.gradesView != "" && this.gradesView != null && this.gradesView != undefined) {

      var tempClass = this.gradesView.split(',');

      this.grade8Old = this.grade8;
      this.grade9Old = this.grade9;
      this.grade10Old = this.grade10;
      this.cancleSubject = this.subject1;

      if (tempClass.includes("8")) {
        this.grade8 = true;
        this.class1 = "8"
        this.gradesFlag = true;
      }
      else {
        this.grade8 = false;
        this.class1 = ""
      }
      if (tempClass.includes("9")) {
        this.grade9 = true;
        this.class2 = "9";
        this.gradesFlag = true;
      }
      else {
        this.grade9 = false;
        this.class2 = ""
      }
      if (tempClass.includes("10")) {
        this.grade10 = true;
        this.class3 = "10";
        this.gradesFlag = true;
      }
      else {
        this.grade10 = false;
        this.class3 = ""
      }
    } else {

    }

  }

  verifyEmailIfNot() {
    this.oldEmailVerify = this.email;
  }
  sendOTPForVerify() {
    this.emailOtp = "";
    if (this.email == this.oldEmailVerify) {
      this.email = this.email.toLowerCase().trim();
      var generateEmailOTP = '{"mobile":"' + this.mobile + '","email":"' + this.email + '"}'

      this.RegistrationService.sendEmailOTP(generateEmailOTP)
        .subscribe(
        data => {

          if (data.Response == "otp sent to email") {
            this.toastr.warning(this.translate.instant('Errors.emailOtpSent'))
          } else if (data.Response == "email exist with anather user" || data.Response == "email exist with another user") {
            this.toastr.error(this.translate.instant('Errors.emailAlreadyRegistered'))
          } else if (data.Response == "email already verified") {
            this.toastr.error(this.translate.instant('Errors.alreadyRegisteredEmail'))
          } else if (data.Response == "mobile not exists") {
            this.toastr.error(this.translate.instant('Errors.noteMobFirst'))
          } else if (data.Response == "Something went wrong" || data.Response == "Something Went Wrong") {
            this.toastr.error(this.translate.instant('Errors.somethingWentWrong'))
          } else if (data.Response == "email otp pending" || data.Response == "error in  email otp send") {
            this.toastr.warning(this.translate.instant('Errors.emailOtpSent'))
          } else if (data.Response == "invalid email") {
            this.toastr.error(this.translate.instant('Errors.emailFormat'))
          } else {
            this.toastr.error(this.translate.instant('Errors.checkInfo'))
          }
        },
        error => {
          this.toastr.error(this.translate.instant('Errors.cannotProceed'))
        }//Catch Error if server is not Found
        );
    } else {
      this.newEmail = this.email;
      this.email = this.oldEmailVerify;
      // this.generateEmailOtp();
      this.confirmGenerateEmailOTP();
    }
  }
  verifyEmailOtpPending() {
    this.newEmail = this.oldEmailVerify

    if (isNaN(this.emailOtp)) {
      this.toastr.error(this.translate.instant('Errors.wrongOtp'))
    } else {
      this.oldEmailVerify = this.oldEmailVerify.toLowerCase().trim();
      var emailOtpJson = '{"email": "' + this.oldEmailVerify + '","emailotp":"' + this.emailOtp + '"}';
      this.RegistrationService.verifyEmail(emailOtpJson)
        .subscribe(
        data => {
          if (data.Response == "email Verified Thank You" || data.Response == "Email Verified Thank You") {
            this.toastr.success(this.translate.instant('Errors.emailVerifiedThankYou'))
            this.emailVerifyProfile.hide()
            this.emailVerified = true;
          } else if (data.Response == "Otp Does Not Match") {
            this.toastr.error(this.translate.instant('Errors.wrongOtp'))
          } else if (data.Response == "email Not Register with us" || data.Response == "Email Not Register with us") {
            this.toastr.error(this.translate.instant('Errors.unregisteredEmail'))
          }
          else if (data.Response == "email otp expired regenerate otp") {
            this.toastr.error(this.translate.instant('Errors.resendOtp'))
          } else {
            this.toastr.error(this.translate.instant('Errors.checkInfo'))
          }
        },
        error => {
          this.toastr.error(this.translate.instant('Errors.cannotProceed'))
        }//Catch Error if server is not Found
        );
    }
  }

  regenerateOPT() {
    var otpRequestEmailJson = '{ "email": "' + this.oldEmailVerify + '"}'

    this.RegistrationService.sendOpt(otpRequestEmailJson)
      .subscribe(
      data => {

        if (data.Response == "email not matches") {
          this.toastr.error(this.translate.instant('Errors.emailNotMatch'))

        } else if (data.Success == "otp sent") {
          this.toastr.warning(this.translate.instant('Errors.emailOtpSent'))
        } else if (data.Response == "email otp pending") {
          this.toastr.warning(this.translate.instant('Errors.emailOtpSent'))
        } else {
          this.toastr.error(this.translate.instant('Errors.checkInfo'))
        }
      },
      error => {
        this.toastr.error(this.translate.instant('Errors.cannotProceed'))

      }//Catch Error if server is not Found
      );
  }
  saveData(e) {
    var ur = e;
    this.flag = 1;
    this.imageUploaded();
  }
  updateProfileCompleteStatus(arrayOfUpdatedFields) {
    var temp = []
    if (window.localStorage.getItem('profileArray') != null) {
      temp = JSON.parse(window.localStorage.getItem('profileArray'));
      temp.forEach(element => {
        arrayOfUpdatedFields.forEach(element1 => {
          if (element1 == element.field) {
            element.status = false;
          }
        });
      });

      //To check profile commpletion after update
      var checkProfileComplete = true;
      temp.forEach(element => {
        if (element.status == true) {
          checkProfileComplete = false;
        }
      });
    } else {
      checkProfileComplete = false;
    }

    if (checkProfileComplete == true) {
      window.localStorage.setItem('profileComplete', 'true');
      window.localStorage.setItem('profileCompleteCurrent', 'true');
    } else {
      window.localStorage.setItem('profileArray', JSON.stringify(temp));
    }
  }

  agree(e) {
    if (e.target.checked) {
      this.checkAgree = true;
      this.emailAccept = true;
    }
    else {
      this.checkAgree = false;
      this.emailAccept = false;
    }
  }

  confirmGenerateEmailOTP() {
    var newEmailJson = '{"email": "' + this.newEmail + '","oldemail":"' + this.email + '","username":"' + this.mobile + '","password":"' + this.password + '"}';
    this.ProfileService.sendOTPToNewEmail(newEmailJson, this.token)
      .subscribe(
      data => {
        if (data.Response == "Email Already Exist") {
          this.toastr.error(this.translate.instant('Errors.alreadyRegEmailTryNew'));

          this.sendEmailOtp = true;
        }
        else if (data.Response == "Otp Send On Email") {
          this.toastr.warning(this.translate.instant('Errors.emailOtpSent'));
          this.sendEmailOtp = false;
        } else if (data.Response == "Not Authenticate") {
          this.toastr.error(this.translate.instant('Errors.emailOrPassWrong'));
          this.sendEmailOtp = true;
          this.emailAccept = false;
          this.showErrorMsg = false;
          this.checkAgree = false;

        } else if (data.Response == "Old Email Not Exists") {
          this.toastr.error(this.translate.instant('Errors.unregisteredOldEmail'));
          this.sendEmailOtp = true;
          this.emailAccept = false;
          this.showErrorMsg = false;
          this.checkAgree = false;

        } else if (data.Response == "Token not matches please re-login") {
          this.toastr.error(this.translate.instant('Errors.sessionExpired'));
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 4000)
        } else {
          this.toastr.error(this.translate.instant('Errors.checkInfo'))
        }
      },
      error => {
        this.toastr.error(this.translate.instant('Errors.cannotProceed'))
      }//Catch Error if server is not Found
      );
  }
  valuechange(e) {
    this.showErrorMsg = false;
  }

  setDays(oMonthSel, oDaysSel, oYearSel) {
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
}
