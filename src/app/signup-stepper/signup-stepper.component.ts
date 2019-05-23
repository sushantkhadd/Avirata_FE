import { Component, OnInit } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { SignupStepperService } from './signup-stepper.service';
import { SignupStepper } from './signup-stepper.model';
import { Router } from '@angular/router';
import { LanguageService } from './../language.service';
import { environment } from './../../environments/environment';
import { LocalstoragedetailsService } from '../services/localstoragedetails.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'app-signup-stepper',
  templateUrl: './signup-stepper.component.html'
})
export class SignupStepperComponent implements OnInit {
  public apiUrlForProfile = environment.apiUrl + 'profilepic/';
  constructor(public SignupStepperService: SignupStepperService, public router: Router, public lang: LanguageService, public LocalstoragedetailsService: LocalstoragedetailsService, public toastr: ToastsManager, vcr: ViewContainerRef,public translate: TranslateService) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  public SignupStepperModule = new SignupStepper();
  public basic = true; token; id; stepperFlag;
  public personal = false;
  public service = false;
  public education = false;
  public counter = 1;
  public first = true;//Stepper STage Color flag
  public second = false;//Stepper STage Color flag
  public three = false;//Stepper STage Color flag
  public four = false;//Stepper STage Color flag
  public finish = false;
  public disableFooter = true;
  public next_button = true;
  public finish_button = false;
  public check;//To set language checkbox check or uncheck
  public stepperIncomplete = false;
  public dobError = false;
  public genderError = false;
  public birtDate; birthday;
  public joinDate; joinday;
  public reviewDistrict; reviewTaluka; reviewTrainerName; reviewGender; reviewDesignation; reviewGrade;
  public reviewUG; reviewPG;
  public designationError = false;
  public dojError = false;
  public classError = false;
  public stepFirst = false;
  public next = false;
  public next3 = false;
  public designation = false;
  public doj = false;
  public classType = false;
  public grades = false;
  public firstCheck = false;
  public secondCheck = false;
  public thirdCheck = false;
  public next2 = false; next4 = false;
  public dob = false;
  public gender = false;
  public addr = false; adhar = false;
  public bankname = false; ifsccode = false; bankaccountno = false;
  public class1 = "";
  public class2 = "";
  public class3 = "";
  public classList: string = "";
  public classListArray: string[]; dojJsonArray = []; subList = []; stepperCount;
  public dropdownSettings = {};  //subject dropdown
  public finishEnable = false; test;
  public aadharNo1; aadharNo2; aadharNo3;
  public modelTemp;
  public addrCount;
  public otherUgCount; pgSpecialFlag = false;
  public ugSpecialisationCount; otherPgSpecialCount; pgSpecialisationCount; professionalSpecializationCount; othersQualificationCount;
  public addrFlag = false; otherUgFlag = false; ugSpecialisationFlag = false; otherPgSpecialFlag = false; pgSpecialisationFlag = false; professionalSpecializationFlag = false; othersQualificationFlag = false;
  public imageUploaded = false;
  public imageUploadeError = false;
  onNext() {
    this.imageUploaded = false;
    this.imageUploadeError = false;
    if (this.counter == 1) {
      try {
        this.enableFirstState();
        if (this.SignupStepperModule.district != "Select" && this.SignupStepperModule.taluka != "Select" && this.SignupStepperModule.schoolName != "Select") {
          var stepOneJson = '{"district": "' + this.SignupStepperModule.district + '","taluka" : "' + this.SignupStepperModule.taluka + '","schoolname" : "' + this.SignupStepperModule.schoolName + '","schoolindex": "' + this.SignupStepperModule.schoolIndexNo + '","position":"' + this.SignupStepperModule.designation + '","event" : "stpper"}';
          this.SignupStepperService.submitStepOne(stepOneJson, this.token)
            .subscribe(
            data => {
              console.log("OK Counter1 " + JSON.stringify(data))
              if (data['Response'] == "session not matches please re-login") {
                this.toastr.error(this.translate.instant('otherMessages.sessionLogout'));
                setTimeout(() => {
                  this.router.navigate(['/']);
                }, 4000)
              }
              else if (data['Response'] == "Information added Successfully") {
                this.counter++;
                window.localStorage.setItem('StepperCount', '1');
                this.enableSecondState();
              } else if (data['Response'] == "already postion full for headmaster") {
                this.counter = 1;
                this.toastr.error(this.translate.instant('otherMessages.contactMasterTrainer1'));
              } else if (data['Response'] == "already postion full for teacher") {
                this.counter = 1;
                this.toastr.error(this.translate.instant('otherMessages.contactMasterTrainer2'))
              } else if (data['Response'] == "Select Proper Position" || data['Response'] == "invalid postion") {
                this.counter = 1;
                this.toastr.error(this.translate.instant('otherMessages.selectionPosition'))
              } else if (data['Response'] == "provided data is incorrect" || data['Response'] == "Something Went Wrong") {
                this.counter = 1;
                this.toastr.error(this.translate.instant('Errors.checkInfo'))
              } else {
                this.counter = 1;
                this.toastr.error(this.translate.instant('Errors.checkInfo'))
                setTimeout(() => {
                  window.location.reload();
                }, 4000)
              }
            },
            error => {
              this.counter = 1;
              this.toastr.error(this.translate.instant('Errors.cannotProceed'))
            }//Catch Error if server is not Found
            );
          // }//End If User is Trainer
        } else {
          this.counter = 1;
        }
      }
      catch (e) {
        this.toastr.error(this.translate.instant('Errors.cannotProceed'))
      }
    }
    else if (this.counter == 2) {
      try {
        this.enableSecondState();
        if (this.SignupStepperModule.gender != undefined && this.SignupStepperModule.model != undefined && this.SignupStepperModule.address != undefined) {

          this.SignupStepperModule.address = this.SignupStepperModule.address.replace(/"/g, "'");
          this.SignupStepperModule.address = this.SignupStepperModule.address.replace(/(?:\r\n|\r|\n)/g, ' ');

          var stepTwoJson = '{"aadharno" : "' + this.SignupStepperModule.aadharNo + '","gender":"' + this.SignupStepperModule.gender + '","address" : "' + this.SignupStepperModule.address + '","dateofbirth": "' + this.SignupStepperModule.model + '","accno" : "' + this.SignupStepperModule.accountNo + '","ifsccode" : "' + this.SignupStepperModule.IFSCCode + '","bankname" : "' + this.SignupStepperModule.bankName + '","event":"stpper"}'
          console.log(stepTwoJson)
          this.SignupStepperService.submitStepTwo(stepTwoJson, this.token)
            .subscribe(
            data => {
              if (data['Response'] == "session not matches please re-login") {
                this.toastr.error(this.translate.instant('otherMessages.sessionLogout'));
                setTimeout(() => {
                  this.router.navigate(['/']);
                }, 4000)
              }
              else if (data['Response'] == "Information added Successfully") {
                this.counter++;
                window.localStorage.setItem('StepperCount', '2');
                this.enableThirdState();
              } else if (data['Response'] == "Select Right Gender") {
                this.counter = 2;
                this.toastr.error(this.translate.instant('Errors.checkInfo'));
              } else if (data['Response'] == "aadhar number should unique") {
                this.counter = 2;
                this.toastr.error(this.translate.instant('otherMessages.AdhaarAlreadyExist'));
              } else if (data['Response'] == "provided data is incorrect" || data['Response'] == "Something Went Wrong") {
                this.counter = 2;
                this.toastr.error(this.translate.instant('Errors.checkInfo'));
              }
              else {
                this.counter = 2;
                this.toastr.error(this.translate.instant('Errors.checkInfo'))
                setTimeout(() => {
                  window.location.reload();
                }, 4000)
              }
            },
            error => {
              this.counter = 2;
              this.toastr.error(this.translate.instant('Errors.cannotProceed'))
            }//Catch Error if server is not Found
            );
        }
        else {
          this.counter = 2;
        }
      }
      catch (e) {
        this.toastr.error(this.translate.instant('Errors.cannotProceed'))
      }
    }
    else if (this.counter == 3) {
      try {
        this.enableThirdState();
        if (this.SignupStepperModule.subject != undefined && this.SignupStepperModule.grade != undefined && this.SignupStepperModule.dateofJoin != undefined) {
          var chekedGrade = Object.keys(this.SignupStepperModule.grade)
          console.log(JSON.stringify(chekedGrade))
          var subject1 = JSON.stringify(this.SignupStepperModule.subject)
          var stepThreeJson = '{"subject": "' + this.subList + '","grade" : "' + this.classListArray + '","dateofjoining" : "' + this.SignupStepperModule.dateofJoin + '","event":"stpper"}'
          console.log(stepThreeJson)
          this.SignupStepperService.submitStepThree(stepThreeJson, this.token)
            .subscribe(
            data => {
              if (data['Response'] == "session not matches please re-login") {
                this.toastr.error(this.translate.instant('otherMessages.sessionLogout'));
                setTimeout(() => {
                  this.router.navigate(['/']);
                }, 4000)
              }
              else if (data['Response'] == "Information added Successfully") {
                this.counter++;
                window.localStorage.setItem('StepperCount', '3');
                this.enableForthState();
              } else if (data['Response'] == "provided data is incorrect" || data['Response'] == "Something Went Wrong") {
                this.counter = 3;
                this.toastr.error(this.translate.instant('Errors.checkInfo'));
              } else {
                this.counter = 3;
                this.toastr.error(this.translate.instant('Errors.checkInfo'));
                setTimeout(() => {
                  window.location.reload();
                }, 4000)
              }
            },
            error => {
              this.counter = 3;
              this.toastr.error(this.translate.instant('Errors.cannotProceed'))
            }//Catch Error if server is not Found
            );
        } else {
          this.counter = 3;
        }
      }
      catch (e) {
        this.toastr.error(this.translate.instant('Errors.cannotProceed'))
      }
    }
    else if (this.counter == 4) {
      try {
        this.enableForthState();
        var stepFourJson;
        if (this.SignupStepperModule.underGraduate == 'other') {
          if (this.SignupStepperModule.postGraduate == 'pgother') {
            stepFourJson = '{"undergraduation":"' + this.SignupStepperModule.otherUgSpecial + '","ugspecial": "' + this.SignupStepperModule.ugSpecialisation + '","postgraduation" : "' + this.SignupStepperModule.otherPgSpecial + '","pgspecial": "' + this.SignupStepperModule.pgSpecialisation + '","professional" : "' + this.SignupStepperModule.professional + '","professionalspecil":"' + this.SignupStepperModule.professionalSpecialization + '","other" : "' + this.SignupStepperModule.othersQualification + '","event":"stpper"}'
          } else {
            stepFourJson = '{"undergraduation":"' + this.SignupStepperModule.otherUgSpecial + '","ugspecial": "' + this.SignupStepperModule.ugSpecialisation + '","postgraduation" : "' + this.SignupStepperModule.postGraduate + '","pgspecial": "' + this.SignupStepperModule.pgSpecialisation + '","professional" : "' + this.SignupStepperModule.professional + '","professionalspecil":"' + this.SignupStepperModule.professionalSpecialization + '","other" : "' + this.SignupStepperModule.othersQualification + '","event":"stpper"}'
          } this.test = stepFourJson;
        } else {
          if (this.SignupStepperModule.postGraduate == 'pgother') {
            stepFourJson = '{"undergraduation":"' + this.SignupStepperModule.underGraduate + '","ugspecial": "' + this.SignupStepperModule.ugSpecialisation + '","postgraduation" : "' + this.SignupStepperModule.otherPgSpecial + '","pgspecial": "' + this.SignupStepperModule.pgSpecialisation + '","professional" : "' + this.SignupStepperModule.professional + '","professionalspecil":"' + this.SignupStepperModule.professionalSpecialization + '","other" : "' + this.SignupStepperModule.othersQualification + '","event":"stpper"}'

          } else {
            stepFourJson = '{"undergraduation":"' + this.SignupStepperModule.underGraduate + '","ugspecial": "' + this.SignupStepperModule.ugSpecialisation + '","postgraduation" : "' + this.SignupStepperModule.postGraduate + '","pgspecial": "' + this.SignupStepperModule.pgSpecialisation + '","professional" : "' + this.SignupStepperModule.professional + '","professionalspecil":"' + this.SignupStepperModule.professionalSpecialization + '","other" : "' + this.SignupStepperModule.othersQualification + '","event":"stpper"}'
          } this.test = stepFourJson;
        }
        this.SignupStepperService.submitStepFour(stepFourJson, this.token)
          .subscribe(
          data => {
            if (data['Response'] == "session not matches please re-login") {
              this.toastr.error(this.translate.instant('otherMessages.sessionLogout'));
              setTimeout(() => {
                this.router.navigate(['/']);
              }, 4000)
            }
            else if (data['Response'] == "Information added Successfully") {
              this.counter++;
              window.localStorage.setItem('StepperCount', '4');
              this.enableFifthState();
            } else if (data['Response'] == "provided data is incorrect" || data['Response'] == "Something Went Wrong") {
              this.counter = 4;
              this.toastr.error(this.translate.instant('Errors.checkInfo'));
            } else {
              this.counter = 4;
              this.toastr.error(this.translate.instant('Errors.checkInfo'));
              setTimeout(() => {
                window.location.reload();
              }, 4000)
            }
          },
          error => {
            this.toastr.error(this.translate.instant('Errors.cannotProceed'))
            this.counter = 4;
          }//Catch Error if server is not Found
          );
      }
      catch (e) {
        this.toastr.error(this.translate.instant('Errors.cannotProceed'))
      }
    }
    else if (this.counter == 5) {
      this.enableFifthState();
    }
  }
  onBack() {
    this.counter--;
    if (this.counter == 1) {
      this.enableFirstState();
      this.second = false;
      this.three = false;
      this.four = false;
    }
    else if (this.counter == 2) {
      this.enableSecondState();
      this.three = false;
      this.four = false;
    }
    else if (this.counter == 3) {
      this.enableThirdState();
      this.four = false;
    }
    else if (this.counter == 4) {
      this.enableForthState();
    }
  }
  // private myDatePickerOptions: IMyDpOptions = {
  //   dateFormat: 'dd.mm.yyyy', editableDateField: false,
  // };
  //Function to retrive Taluka List as per selected District
  getTalukaList(data) {
    console.log("sdsa :", this.SignupStepperModule.district)
    this.service = false;
    this.SignupStepperModule.taluka = 'Select';
    this.SignupStepperModule.trainer = 'Select';
    this.SignupStepperModule.schoolName = '';
    this.SignupStepperModule.schoolIndexNo = '';
    this.SignupStepperModule.schoolModel = [];
    this.SignupStepperService.getTaluka(this.SignupStepperModule.district)
      .subscribe(
      data => {
        this.SignupStepperModule.talukaJson = data['results'];
        console.log("Taluka", JSON.stringify(this.SignupStepperModule.talukaJson))
      },
      err =>
        this.toastr.error(this.translate.instant('Errors.cannotProceed'))
      );

  }//End of getTalukaList

  //Function to retrive Trainer List and School Details as per selected Taluka
  getTrainerList() {
    console.log("sdsa :", this.SignupStepperModule.taluka)
    this.SignupStepperModule.trainer = 'Select';
    this.SignupStepperModule.schoolIndexNo = '';
    this.SignupStepperModule.schoolName = '';
    // Call GET Service method
    this.SignupStepperService.getTrainer(this.SignupStepperModule.taluka)
      .subscribe(
      data => {
        console.log(data)
        this.SignupStepperModule.trainerModel = data['results'];
      },
      err =>
        this.toastr.error(this.translate.instant('Errors.cannotProceed'))
      );
    this.SignupStepperService.getSchool(this.SignupStepperModule.taluka)
      .subscribe(
      data => {
        this.SignupStepperModule.schoolModel = data['results'];
      },
      err =>
        this.toastr.error(this.translate.instant('Errors.cannotProceed'))
      );
  }//End of getTrainerList

  //Function to set School Index as per selected School Name
  getSchoolIndex() {
    this.SignupStepperModule.schoolIndexNo = '';
    console.log(this.SignupStepperModule.schoolModel.length, this.SignupStepperModule.schoolName)
    for (var i = 0; i < this.SignupStepperModule.schoolModel.length; i++) {
      if (this.SignupStepperModule.schoolModel[i].school_name == this.SignupStepperModule.schoolName) {
        this.SignupStepperModule.schoolIndexNo = this.SignupStepperModule.schoolModel[i].index
        this.stepFirst = true;
        break;
      } else {
        this.stepFirst = false;
      }
    }
  }//End of School Index

  //Function to set School Name as per selected School Index
  getSchoolName() {
    this.SignupStepperModule.schoolName = '';
    console.log(this.SignupStepperModule.schoolModel.length, this.SignupStepperModule.schoolIndexNo)
    for (var i = 0; i < this.SignupStepperModule.schoolModel.length; i++) {
      if (this.SignupStepperModule.schoolModel[i].index == this.SignupStepperModule.schoolIndexNo) {
        this.SignupStepperModule.schoolName = this.SignupStepperModule.schoolModel[i].school_name
        this.stepFirst = true;
        break;
      } else {
        this.stepFirst = false;
      }
    }
  }//End of School Name

  ngOnInit() {
    this.addrCount = 500;
    this.otherUgCount = 50;
    this.ugSpecialisationCount = 50;
    this.otherPgSpecialCount = 50;
    this.pgSpecialisationCount = 50;
    this.professionalSpecializationCount = 80;
    this.othersQualificationCount = 200;
    this.SignupStepperModule.subject = [];
    this.dropdownSettings = {
      singleSelection: false,
      text: "Select",
      enableCheckAll: false,
    };
    this.token = window.localStorage.getItem('token');
    this.id = window.localStorage.getItem('userid');
    this.stepperFlag = window.localStorage.getItem('flag');
    this.SignupStepperModule.fullName = window.localStorage.getItem('name');
    this.SignupStepperModule.emailId = window.localStorage.getItem('email');
    this.SignupStepperModule.mobileNo = window.localStorage.getItem('mobileNo');
    this.SignupStepperModule.userType = window.localStorage.getItem('group_name');
    this.stepperCount = window.localStorage.getItem('StepperCount');
    this.SignupStepperService.getDistrict(this.token)
      .subscribe(
      data => {
        this.SignupStepperModule.districtJson = data['results'];
      },
      err =>
        this.toastr.error(this.translate.instant('Errors.cannotProceed'))
      );
     if (this.stepperCount == '1') {
      this.stepperFlag = 1;
    } else if (this.stepperCount == '2') {
      this.stepperFlag = 2;
    } else if (this.stepperCount == '3') {
      this.stepperFlag = 3;
    } else if (this.stepperCount == '4') {
      this.stepperFlag = 4;
    }

    this.SignupStepperModule.fullName = this.SignupStepperModule.fullName + " " + window.localStorage.getItem('lastname');
    this.dobError = false;
    this.dojError = false;
    this.designationError = false;
    this.classError = false;
    this.stepFirst = false;
    this.next = false;
    this.designation = false;
    this.doj = false;
    this.classType = false;
    this.grades = false;
    this.next3 = false;
    this.firstCheck = false;
    this.secondCheck = false;
    this.thirdCheck = false;
    this.next2 = false;
    this.next4 = false;
    this.dob = false;
    this.gender = false;
    this.addr = false;
    this.adhar = false;
    this.class1 = "";
    this.class2 = "";
    this.class3 = "";
    this.classList = "";
    this.classListArray = [];
    this.finishEnable = false;
    this.addrFlag = false;
    this.otherUgFlag = false;
    this.pgSpecialFlag = false;
    /* ---To set status of checkbox as per language defined-- */
    if (this.lang.checkBoxStatus == true) {
      this.check = true;
    }
    else {
      this.check = false;
    }
    /*---END */
    if (window.localStorage.getItem('token') == null || window.localStorage.getItem('name') == null) {
      this.router.navigate(['/']);
    }

    if (this.stepperFlag != undefined) {

      if (this.stepperFlag == 0) {
        this.counter = 1;
        this.enableFirstState();
        this.stepperIncomplete = true;
      } else if (this.stepperFlag == 1) {
        this.counter = 2;
        this.enableSecondState();
        this.stepperIncomplete = true;
      } else if (this.stepperFlag == 2) {
        this.enableThirdState();
        this.stepperIncomplete = true;
        this.counter = 3;
      } else if (this.stepperFlag == 3) {
        this.enableForthState();
        this.stepperIncomplete = true;
        this.counter = 4;
      } else {
        this.router.navigate(['/dashboard']);
      }
    }
    else {
      this.stepperIncomplete = false;
    }
    this.SignupStepperModule.district = 'Select';
    this.SignupStepperModule.taluka = 'Select';
    this.SignupStepperModule.trainer = 'Select';
    this.SignupStepperModule.schoolName = 'Select';
    this.SignupStepperModule.schoolIndexNo = 'Select';
    this.SignupStepperModule.model = '';
    this.SignupStepperModule.grade = {};
  }
  langChange(e) {
    if (e.target.checked) {
      this.lang.changeLanguage("mr");
    }
    else {
      this.lang.changeLanguage("en");
    }
  }
  enableFirstState() {
    this.basic = true;
    this.personal = false;
    this.service = false;
    this.education = false;
    this.first = true;
    this.next_button = true;
    this.finish_button = false;
  }
  enableSecondState() {
    this.basic = false;
    this.personal = true;
    this.service = false;
    this.education = false;
    this.first = true;
    this.second = true;
    this.next_button = true;
    this.finish_button = false;
  }
  enableThirdState() {
    this.basic = false;
    this.personal = false;
    this.service = true;
    this.education = false;
    this.first = true;
    this.second = true;
    this.three = true;
    this.next_button = true;
    this.finish_button = false;
  }
  enableForthState() {
    this.basic = false;
    this.personal = false;
    this.service = false;
    this.education = true;
    this.first = true;
    this.second = true;
    this.three = true;
    this.four = true;
    this.next_button = false;
    this.finish_button = true;
  }
  enableFifthState() {
    this.basic = false;
    this.personal = false;
    this.service = false;
    this.education = false;
    this.first = true;
    this.second = true;
    this.three = true;
    this.four = true;
    this.next_button = false;
    this.finish_button = true;
    this.disableFooter = false;
    this.finish = true;
  }

  // dobCheck(event: IMyDateModel) {
  //   var d = new Date();
  //   console.log(event.epoc.toString());
  //   if (this.SignupStepperModule.designation != undefined) {
  //     if (this.SignupStepperModule.designation == 'headmaster') {
  //       if (event.jsdate != undefined) {
  //         if (event.jsdate.getFullYear() > 1956 && event.jsdate.getFullYear() < 1998) {
  //           this.SignupStepperModule.model = event.date.year + "-" + event.date.month + "-" + event.date.day;

  //           this.dobError = false;
  //           this.dob = true;
  //         }
  //         else {
  //           this.dobError = true;
  //           this.dob = false;
  //         }
  //       }
  //     } else if (this.SignupStepperModule.designation == 'teacher') {
  //       if (event.jsdate != undefined) {
  //         if (event.jsdate.getFullYear() > 1956 && event.jsdate.getFullYear() < 1998) {
  //           this.SignupStepperModule.model = event.date.year + "-" + event.date.month + "-" + event.date.day;

  //           this.dobError = false;
  //           this.dob = true;
  //         }
  //         else {
  //           this.dobError = true;
  //           this.dob = false;
  //         }
  //       }
  //     }
  //   } else {
  //     if (window.localStorage.getItem('designation') == 'headmaster') {
  //       if (event.jsdate != undefined) {
  //         if (event.jsdate.getFullYear() > 1956 && event.jsdate.getFullYear() < 1998) {
  //           this.SignupStepperModule.model = event.date.year + "-" + event.date.month + "-" + event.date.day;

  //           this.dobError = false;
  //           this.dob = true;
  //         }
  //         else {
  //           this.dobError = true;
  //           this.dob = false;
  //         }
  //       }
  //     } else if (window.localStorage.getItem('designation') == 'teacher') {
  //       if (event.jsdate != undefined) {
  //         if (event.jsdate.getFullYear() > 1956 && event.jsdate.getFullYear() < 1998) {
  //           this.SignupStepperModule.model = event.date.year + "-" + event.date.month + "-" + event.date.day;

  //           this.dobError = false;
  //           this.dob = true;
  //         }
  //         else {
  //           this.dobError = true;
  //           this.dob = false;
  //         }
  //       }
  //     }
  //   }
  // }

  handleGenderChange(evt) {
    var target = evt.target;
    if (target.checked) {
      this.genderError = false;
      this.gender = true;
    } else {
      this.genderError = true;
      this.gender = false;
    }
  }

  setReviewData() {
    if (this.counter == 1) {
      for (var i = 0; i < this.SignupStepperModule.districtJson.length; i++) {
        if (this.SignupStepperModule.districtJson[i].districtid == this.SignupStepperModule.district) {
          this.reviewDistrict = this.SignupStepperModule.districtJson[i].name;
        }
      }
      for (var i = 0; i < this.SignupStepperModule.talukaJson.length; i++) {
        if (this.SignupStepperModule.talukaJson[i].taluka_id == this.SignupStepperModule.taluka) {
          this.reviewTaluka = this.SignupStepperModule.talukaJson[i].taluka_name;
        }
      }

      if (this.SignupStepperModule.userType == 'trainee') {
        for (var i = 0; i < this.SignupStepperModule.trainerModel.length; i++) {
          if (this.SignupStepperModule.trainerModel[i].master_id == this.SignupStepperModule.trainer) {
            this.reviewTrainerName = this.SignupStepperModule.trainerModel[i].master_name;
          }
        }
      }//End of If User is Trainer
    }

    else if (this.counter == 2) {
      if (this.SignupStepperModule.gender == 'male') {

        this.reviewGender = "Male"
      } if (this.SignupStepperModule.gender == 'female') {
        this.reviewGender = "Female"
      }
    }
    else if (this.counter == 3) {
      this.reviewGrade = Object.keys(this.SignupStepperModule.grade);
      if (this.SignupStepperModule.designation == 'headmaster') {
        this.reviewDesignation = "Head Master"
      } if (this.SignupStepperModule.designation == 'teacher') {
        this.reviewDesignation = "Teacher"
      }
    }
    else if (this.counter == 4) {
      if (this.SignupStepperModule.underGraduate == 'other') {
        this.reviewUG = this.SignupStepperModule.otherUgSpecial

      } else {
        this.reviewUG = this.SignupStepperModule.underGraduate
      }
      if (this.SignupStepperModule.postGraduate == 'pgother') {
        this.reviewPG = this.SignupStepperModule.otherPgSpecial

      } else {
        this.reviewPG = this.SignupStepperModule.postGraduate
      }
    }
  }

  designationChange(evt) {
    var target = evt.target;
    if (target.checked) {
      this.designationError = false;
      this.designation = true;
    } else {
      this.designationError = true;
      this.designation = false;
    }
  }

  classCheck(e) {
    if (e.target.checked) {
      this.class1 = "8";
      this.firstCheck = true;
    }
    else {
      this.class1 = "";
      this.firstCheck = false;
    }
  }
  classCheck1(e) {
    if (e.target.checked) {
      this.class2 = "9";
      this.secondCheck = true;
    }
    else {
      this.class2 = "";
      this.secondCheck = false;
    }
  }
  classCheck2(e) {
    if (e.target.checked) {
      this.class3 = "10";
      this.thirdCheck = true;
    }
    else {
      this.class3 = "";
      this.thirdCheck = false;
    }
  }

  ngDoCheck(birtDate, joinDate, next3, firstCheck, secondCheck, thirdCheck) {
    if (this.SignupStepperModule.model != undefined) {
      this.birtDate = this.SignupStepperModule.model;
    }

    if (this.SignupStepperModule.dateofJoin != undefined) {
      this.joinday = this.SignupStepperModule.dateofJoin;
    }
    if (this.firstCheck == true || this.secondCheck == true || this.thirdCheck == true)
      this.grades = true;
    else
      this.grades = false;
    if (this.subList.length > 0) {
      if (this.SignupStepperModule.dateofJoin)
        this.next3 = this.grades;
    }
    else
      this.next3 = false;
    if (this.aadharNo1 == "" || this.aadharNo1 == undefined || this.aadharNo2 == "" || this.aadharNo2 == undefined || this.aadharNo3 == "" || this.aadharNo3 == undefined) {
      this.adhar = false;
    } else {
      this.SignupStepperModule.aadharNo = this.aadharNo1 + this.aadharNo2 + this.aadharNo3;
      this.adhar = true;
    }
    if (this.SignupStepperModule.address == "" || this.SignupStepperModule.address == undefined)
      this.addr = false;
    else
      this.addr = true;

    if (this.SignupStepperModule.bankName == "" || this.SignupStepperModule.bankName == undefined) {
      this.bankname = false;
    } else {
      this.bankname = true;
    }
    if (this.SignupStepperModule.IFSCCode == "" || this.SignupStepperModule.IFSCCode == undefined) {
      this.ifsccode = false;
    } else {
      this.ifsccode = true;
    }
    if (this.SignupStepperModule.accountNo == null || this.SignupStepperModule.accountNo == undefined) {
      this.bankaccountno = false;
    } else {
      this.bankaccountno = true;
    }
    this.SignupStepperModule.aadharNo = this.aadharNo1 + this.aadharNo2 + this.aadharNo3;
    this.next2 = this.dob && this.gender && this.addr && this.adhar && this.bankname && this.ifsccode && this.bankaccountno;

    if (this.class1 == '' && this.class2 != '' && this.class3 != '') {
      var str = this.class2 + "," + this.class3;
    } else if (this.class2 == '' && this.class1 != '' && this.class3 != '') {
      var str = this.class1 + "," + this.class3;
    } else if (this.class3 == '' && this.class1 != '' && this.class2 != '') {
      var str = this.class1 + "," + this.class2
    } else if (this.class2 == '' && this.class3 == '') {
      var str = this.class1;
    } else if (this.class1 == '' && this.class3 == '') {
      var str = this.class2;
    } else if (this.class1 == '' && this.class2 == '') {
      var str = this.class3;
    } else {
      var str = this.class1 + "," + this.class2 + "," + this.class3;
    }
    this.classList = str;
    this.classListArray = this.classList.split(",");

    if (this.SignupStepperModule.underGraduate == "other") {
      if (this.SignupStepperModule.otherUgSpecial == "" || this.SignupStepperModule.ugSpecialisation == "" || this.SignupStepperModule.professional == "" || this.SignupStepperModule.professionalSpecialization == "") {
        this.finishEnable = false;
      } else {
        this.finishEnable = true;
      }
    } else if (this.SignupStepperModule.underGraduate != "other") {
      if (this.SignupStepperModule.underGraduate == "" || this.SignupStepperModule.ugSpecialisation == "" || this.SignupStepperModule.professional == "" || this.SignupStepperModule.professionalSpecialization == "") {
        this.finishEnable = false;
      } else {
        this.finishEnable = true;
      }
    } else {
      this.finishEnable = true;
    }

    if (this.SignupStepperModule.postGraduate == "pgother") {
      if (this.SignupStepperModule.otherPgSpecial == "") {
        this.pgSpecialFlag = false;
      } else if (this.SignupStepperModule.otherPgSpecial != "") {
        this.pgSpecialFlag = true;
      }
    } else if (this.SignupStepperModule.postGraduate == "") {
      this.pgSpecialFlag = false;
      this.SignupStepperModule.pgSpecialisation = "";
    } else {
      this.pgSpecialFlag = true;
    }


    if (this.SignupStepperModule.postGraduate == "pgother") {
      if (this.SignupStepperModule.otherPgSpecial == "") {
        this.finishEnable = false;
      } else if (this.SignupStepperModule.otherPgSpecial != "") {
        if (this.SignupStepperModule.pgSpecialisation == "") {
          this.finishEnable = false;
        } else if (this.SignupStepperModule.pgSpecialisation != "") {
          this.finishEnable = true;
        }
      }
    }

    else if (this.SignupStepperModule.postGraduate == "M.A." || this.SignupStepperModule.postGraduate == "M.Com." || this.SignupStepperModule.postGraduate == "M.Sc.") {
      if (this.SignupStepperModule.pgSpecialisation == "") {
        this.finishEnable = false;
      } else if (this.SignupStepperModule.pgSpecialisation != "") {
        this.finishEnable = true;
      }
    }

    if (this.SignupStepperModule.address == undefined || this.SignupStepperModule.address == null || this.SignupStepperModule.address == "") {
      this.addrCount = 500;
    }
    else
      this.addrCount = 500 - Object.keys(this.SignupStepperModule.address).length;
    if (this.SignupStepperModule.otherUgSpecial == undefined || this.SignupStepperModule.otherUgSpecial == null || this.SignupStepperModule.otherUgSpecial == "") {
      this.otherUgCount = 50;
    }
    else
      this.otherUgCount = 50 - Object.keys(this.SignupStepperModule.otherUgSpecial).length;

    if (this.SignupStepperModule.ugSpecialisation == undefined || this.SignupStepperModule.ugSpecialisation == null || this.SignupStepperModule.ugSpecialisation == "") {
      this.ugSpecialisationCount = 50;
    }
    else
      this.ugSpecialisationCount = 50 - Object.keys(this.SignupStepperModule.ugSpecialisation).length;

    if (this.SignupStepperModule.otherPgSpecial == undefined || this.SignupStepperModule.otherPgSpecial == null || this.SignupStepperModule.otherPgSpecial == "") {
      this.otherPgSpecialCount = 50;
    }
    else
      this.otherPgSpecialCount = 50 - Object.keys(this.SignupStepperModule.otherPgSpecial).length;

    if (this.SignupStepperModule.pgSpecialisation == undefined || this.SignupStepperModule.pgSpecialisation == null || this.SignupStepperModule.pgSpecialisation == "") {
      this.pgSpecialisationCount = 50;
    }
    else
      this.pgSpecialisationCount = 50 - Object.keys(this.SignupStepperModule.pgSpecialisation).length;

    if (this.SignupStepperModule.professionalSpecialization == undefined || this.SignupStepperModule.professionalSpecialization == null || this.SignupStepperModule.professionalSpecialization == "") {
      this.professionalSpecializationCount = 80;
    }
    else
      this.professionalSpecializationCount = 80 - Object.keys(this.SignupStepperModule.professionalSpecialization).length;
    if (this.SignupStepperModule.othersQualification == undefined || this.SignupStepperModule.othersQualification == null || this.SignupStepperModule.othersQualification == "") {
      this.othersQualificationCount = 200;
    }
    else
      this.othersQualificationCount = 200 - Object.keys(this.SignupStepperModule.othersQualification).length;

  }

  classChange() {
    this.classType = true;
  }

  onItemSelect(item: any) {
    console.log("ONSELECT", JSON.stringify(item));
    if (this.SignupStepperModule.subject.length > 0) {
      var len = this.SignupStepperModule.subject.length;
      console.log(this.SignupStepperModule.subject[0].itemName)
      this.subList.push(this.SignupStepperModule.subject[len - 1].itemName)
    }
    console.log("wwww", this.subList)
  }
  OnItemDeSelect(item: any) {
    console.log(this.subList.indexOf(item.itemName));
    this.subList.splice(this.subList.indexOf(item.itemName), 1);
    console.log("wwww", this.subList)
  }
  onSelectAll(items: any) {
    console.log(JSON.stringify(items));
  }
  onDeSelectAll(items: any) {
    console.log(items);
  }

  aadharChange(e) {
    console.log("length=" + Object.keys(this.SignupStepperModule.aadharNo).length)
    if (Object.keys(this.SignupStepperModule.aadharNo).length == 4 || Object.keys(this.SignupStepperModule.aadharNo).length == 9) {
      this.SignupStepperModule.aadharNo = this.SignupStepperModule.aadharNo + " ";
    }
  }
  imageUploadStatus(e) {
    if (e == true) {
      this.imageUploaded = true;
    }
    else {
      this.imageUploadeError = true;
    }
  }
}
