import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from './login.model';
import { FormBuilder } from '@angular/forms';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/services/common.service';
import { LanguageService } from 'src/app/language.service';
import { NgForm } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { ModalDirective } from "ngx-bootstrap";
import { Observable } from "rxjs";
import { FullLayoutService } from '../../layouts/full-layout.service'
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [FormBuilder]
})

export class LoginComponent implements OnInit {

  loginModel = new Login();
  public username; password; disableLogin;
  public trimFlag; trimFlag1; trimFlag3;patternFlag;

  // forget password
  public activeForgetPassword = true;
  public activeNewPassword = false;
  public emailVerifyClicked = false;
  public mobileVerifyClicked = false;
  public otpEmailEnable = false;
  public otpMobileEnable = false;
  public confirmPaswwordTrue = false;
  public mobile; mobileotp; uuid;token;
  public show; checkAgree: any;
  public timerFlag; time1; tmSec1; tick = 1000; countDown;

  @ViewChild('forgetPasswordForm') public forgetPasswordForm: NgForm;
  @ViewChild('primaryModal') public primaryModal: ModalDirective;

  constructor(public CommonService: CommonService, public router: Router, public fb: FormBuilder, public toastr: ToastsManager, vcr: ViewContainerRef, public translate: TranslateService, public lang: LanguageService,public FullLayoutService : FullLayoutService, public _sharedService : SharedDataService) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit() {
    this.username = "";
    this.password = "";
    this.disableLogin = false;
    this.patternFlag = true;
    // forget password
    this.emailVerifyClicked = false;
    this.mobileVerifyClicked = false;
    this.otpEmailEnable = false;
    this.otpMobileEnable = false;
    this.show = false;
    this.checkAgree = false;
    this.loginModel.newPassword = "";
    this.loginModel.confirmPassword = "";
    this.token = window.localStorage.getItem("token")
    if(this.token =="" || this.token == null || this.token == undefined){
    }else{
    this.FullLayoutService.logoutService().subscribe(
      data => {
        if (data["Response"] == "User Logged Out") {
          window.localStorage.clear();
          this.router.navigate(["/"]);
        } else if (
          data["Response"] == "session not matches please re-login" ||
          data["Response"] == "session not matches"
        ) {
          // alert("कृपया पुन्हा लॉगइन करा")
          this.router.navigate(["/"]);
        } else {
          this.router.navigate(["/"]);
        }
        this._sharedService.sendData(true)
      },
      error =>
        this.toastr.error(
          "०४०: आपली विनंती आत्ता पूर्ण करू शकत नाही, कृपया पुन्हा प्रयत्न करा."
        )
      // alert("आपली विनंती आत्ता पूर्ण करू शकत नाही, कृपया पुन्हा प्रयत्न करा.")
    );
   }
  }

  // ngOnDestroy(){
  //   this._sharedService.clearData()
  // }

  ngDoCheck() {
    if (this.username.trim().length == 0 || this.password.trim().length == 0) {
      this.disableLogin = false;
    }
    else {
      this.disableLogin = true;
    }

    if(this.username !="" && this.username !=null && this.username !=undefined){
      if(isNaN(this.username)){
      //  console.log("is not number")
       this.patternFlag = true;
      }
      else{
        // console.log("is number")
        var patt = new RegExp("^[0-9]{10}$");
        var res = patt.test(this.username);
        // console.log("respatt",res)
        if(res == true){
          this.patternFlag = true;
        }
        else{
          this.patternFlag = false;
        }
      }
    }
  }

  login() {
    var apiUrl = "login/";
    var jsonBody = {};

    jsonBody["username"] = this.username.trim();
    jsonBody["password"] = this.password.trim();
    jsonBody["firebaseid"] = "";

    this.CommonService.postCallWT(apiUrl, jsonBody).subscribe(
      data => {
        if (data['message'] == 'ok') {
          this.lang.googleEventTrack('L3Entry', this.username, data['data'].districtname, 10);
          window.localStorage.setItem('username', this.username)
          window.localStorage.setItem('is_profile_visible', data['data'].is_profile_visible)
          window.localStorage.setItem('setData', JSON.stringify(data['data']))
          window.localStorage.setItem("token", data['data'].token)
          window.localStorage.setItem("coordinatorStatus", data['data'].coordinatorstatus)
          window.localStorage.setItem("startDate", data['data'].daterange.startDate)
          window.localStorage.setItem("endDate", data['data'].daterange.endDate)
          window.localStorage.setItem("districtid", data['data'].districtid)
          window.localStorage.setItem("districtname", data['data'].districtname)
          window.localStorage.setItem("firstname", data['data'].firstname)
          window.localStorage.setItem("group_name", data['data'].group_name)
          window.localStorage.setItem('levelStatus', JSON.stringify(data['data'].level_status));
          window.localStorage.setItem("percentage", data['data'].percentage)
          window.localStorage.setItem("position", data['data'].position)
          window.localStorage.setItem("talukaid", data['data'].talukaid)
          window.localStorage.setItem("talukaname", data['data'].talukaname)
          window.localStorage.setItem("user_id", data['data'].user_id)
          this.router.navigate(['/level-selection']);
          if (data['data'].certificate != null) {
            window.localStorage.setItem('certificate', data['data'].certificate)
          }
        }

      },
      error => {
        if (error.error.message == 'user not exists') {
          this.toastr.error(this.translate.instant('Errors.wrongUsername'));
          document.getElementById('userName').focus();
        }
        else if (error.error.message == 'wrong password') {
          this.toastr.error(this.translate.instant('Errors.wrongPassword'));
          document.getElementById('pass').focus();
        } else {
          this.CommonService.handleError(error.error.message);
        }
      }
    );
  }

  enableEmailOTP() {
    this.otpEmailEnable = true;
  }

  enableMobileOTP() {
    this.otpMobileEnable = true;
  }

  enableNewPassword() {
    this.activeNewPassword = true;
    this.activeForgetPassword = false;
  }

  forgetPassword() {
    this.primaryModal.show();
    this.lang.toShow();
    this.activeNewPassword = false;
    this.activeForgetPassword = true;
    this.otpEmailEnable = false;
    this.otpMobileEnable = false;
    this.loginModel.email = null;
    this.loginModel.emailOTP = null;
    this.loginModel.mobileNo = null;
    this.loginModel.mobileOTP = null;
    this.loginModel.newPassword = null;
    this.loginModel.confirmPassword = null;
  }

  sendEmailOTP(otpTO) {
    var apiUrl = 'forgetpassword/';
    if (otpTO == 1) {
      if (this.loginModel.email == undefined) {
        this.toastr.error(this.translate.instant('Errors.registeredEmail'));
        document.getElementById('emailId').focus();
      } else {
        this.loginModel.email = this.loginModel.email.toLowerCase().trim();
        var forgetPasswordJson = '{"email":"' + this.loginModel.email + '"}';
        this.CommonService.postCallWT(apiUrl, JSON.parse(forgetPasswordJson))
          .subscribe(
          data => {
            if (data['Response'] == "email not register") {
              this.toastr.error(this.translate.instant('Errors.unregisteredEmail'));
            } else if (data['Response'] == "email not verify") {
              this.toastr.error(this.translate.instant('Errors.emailNotVerified'));
            }
            else if (data['Success'] == "otp sent") {
              this.toastr.warning(this.translate.instant('Errors.emailOtpSent'));
              this.emailVerifyClicked = true;
              this.enableEmailOTP();
              // timer for resend otp
              this.timeCounter("00:05:00");
              console.log('timeCounter',this.timeCounter);
              this.timerFlag = true;
              setTimeout(() => {
                this.timerFlag = false;
              }, 300000);
            } else if (data['Response'] == "email otp pending") {
              this.toastr.warning(this.translate.instant('Errors.emailOtpPending'));
              this.emailVerifyClicked = true;
              this.enableEmailOTP()
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
    else if (otpTO == 2) {
      console.log('mob otp');
      if (this.loginModel.mobileNo == undefined) {
        this.toastr.error(this.translate.instant('Errors.registeredMob'));
        console.log('mob otp1');
        document.getElementById('mobile').focus();
      } else {
        console.log('mob otp2');
        var forgetPasswordJson = '{"mobileno":"' + this.loginModel.mobileNo + '"}';
        this.CommonService.postCallWT(apiUrl, JSON.parse(forgetPasswordJson))
          .subscribe(
          data => {
            if (data['Response'] == "mobile not register") {
              this.toastr.error(this.translate.instant('Errors.unregisteredMob'));
              // this.primaryModal.hide()
              // this.registrationModal.show()
              // this.newRegistration()
            } else if (data['Response'] == "please set password") {
              this.toastr.error(this.translate.instant('Errors.notreg'));
              this.primaryModal.hide()
              this.lang.toHide();
              // this.registrationModal.show()
              // this.newRegistration()
            } else if (data['Response'] == "mobile not verify") {
              this.toastr.error(this.translate.instant('Errors.mobNotVerified'));
            }
            else if (data['Success'] == "otp sent") {
              this.toastr.warning(this.translate.instant('Errors.mobOtpSent'));
              this.mobileVerifyClicked = true;
              this.enableMobileOTP();
              // timer for resend otp
              this.timeCounter("00:05:00");
              console.log('timeCounter',this.timeCounter);
              this.timerFlag = true;
              setTimeout(() => {
                this.timerFlag = false;
              }, 300000);
            } else if (data['Response'] == "mobile otp pending") {
              this.toastr.warning(this.translate.instant('Errors.mobOtpPending'));
              this.mobileVerifyClicked = true;
              this.enableMobileOTP();
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
  }

  verifyEmailOtp(verifyBy) {
    this.uuid = '';

    var emailOtpJson;
    if (verifyBy == 1) {
      if (isNaN(this.loginModel.emailOTP)) {
        this.toastr.error(this.translate.instant('Errors.wrongOtp'));
      } else {
        var apiUrl = "emailverify/";
        this.loginModel.email = this.loginModel.email.toLowerCase().trim();
        emailOtpJson = '{"email": "' + this.loginModel.email + '","emailotp":"' + this.loginModel.emailOTP + '"}';
        this.CommonService.postCallWT(apiUrl, JSON.parse(emailOtpJson))
          .subscribe(
          data => {
            console.log('email');
            if (data['Response'] == "Email Verified Thank You") {
              this.uuid = data['uuid'];
              this.toastr.success(this.translate.instant('Errors.validEmailOtp'));
              this.emailVerifyClicked = false;
              this.enableNewPassword();
            } else if (data['Response'] == "Otp Does Not Match") {
              this.toastr.error(this.translate.instant('Errors.invalidEmailOtp'));
              this.emailVerifyClicked = true;
            } else if (data['Response'] == "Email Not Register with us") {
              this.toastr.error(this.translate.instant('Errors.unregisteredEmail'));
              this.emailVerifyClicked = true;
            } else if (data['Response'] == "email otp expired regenerate otp") {
              this.toastr.error(this.translate.instant('Errors.emailOtpExpired'));
              this.emailVerifyClicked = true;
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

    } else if (verifyBy == 2) {
      if (isNaN(this.loginModel.mobileOTP)) {
        this.toastr.error(this.translate.instant('Errors.wrongOtp'));
      } else {
        var apiUrl = "mobileverify/";
        emailOtpJson = '{"mobileno":"' + this.loginModel.mobileNo + '", "mobileotp":"' + this.loginModel.mobileOTP + '"}';
        this.CommonService.postCallWT(apiUrl, JSON.parse(emailOtpJson))
          .subscribe(
          data => {
            console.log('mob');
            console.log('json', emailOtpJson);
            if (data['Response'] == "Mobile Verified Thank You") {
              this.toastr.success(this.translate.instant('Errors.validMobOtp'));
              this.uuid = data['uuid'];
              this.mobileVerifyClicked = false;
              this.enableNewPassword();
            } else if (data['Response'] == "Otp Does Not Match") {
              this.toastr.error(this.translate.instant('Errors.invalidMobOtp'));
              this.mobileVerifyClicked = true;
            } else if (data['Response'] == "Mobile Not Register with us") {
              this.toastr.error(this.translate.instant('Errors.unregisteredMob'));
              this.mobileVerifyClicked = true;
            } else if (data['Response'] == "mobile otp expired regenerate otp") {
              this.toastr.error(this.translate.instant('Errors.mobOtpExpired'));
              this.mobileVerifyClicked = true;
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
  }

  setPassword() {
    var apiUrl = "setpassword/";
    var registerJson;
    if (this.loginModel.mobileNo == null || this.loginModel.mobileNo == undefined || this.loginModel.mobileNo == "") {
      registerJson = '{"uuid":"' + this.uuid + '","email":"' + this.loginModel.email + '","password":"' + this.loginModel.newPassword + '","confirmpassword":"' + this.loginModel.confirmPassword + '"}'
    } else if (this.loginModel.email == null || this.loginModel.email == undefined || this.loginModel.email == "") {
      registerJson = '{"uuid":"' + this.uuid + '","mobile":"' + this.loginModel.mobileNo + '","password":"' + this.loginModel.newPassword + '","confirmpassword":"' + this.loginModel.confirmPassword + '"}'
    }

    this.CommonService.postCallWT(apiUrl, JSON.parse(registerJson))
      .subscribe(
      data => {
        if (data['Response'] == "New Password has been Set") {
          this.toastr.success(this.translate.instant('Errors.newPasswordSet'));
          setTimeout(() => {
            // document.getElementById("btnCloseModal").click();
            this.primaryModal.hide();
            this.lang.toHide();
            this.router.navigate(['/']);
            this.checkAgree = "";
          }, 500)

        } else if (data['Response'] == "Please Verify Register Mobile of Email Id") {
          this.toastr.error(this.translate.instant('Errors.provideEmailOrMob'));
        } else if (data['Response'] == "Provided Username Not Register With us") {
          this.toastr.error(this.translate.instant('Errors.unregisteredUsername'));
        } else {
          this.toastr.error(this.translate.instant('Errors.checkInfo'));
        }
      },
      error => {
        this.toastr.error(this.translate.instant('Errors.cannotProceed'));
      }//Catch Error if server is not Found
      );
  }

  checkPassword() {
    if (this.loginModel.confirmPassword != null && this.loginModel.confirmPassword != "" && this.loginModel.confirmPassword != undefined)
    {
      if (this.loginModel.newPassword == this.loginModel.confirmPassword)
      {
        this.confirmPaswwordTrue = true;
      }
      else
      {
        this.confirmPaswwordTrue = false;
      }
      this.show = false;
    }
    console.log('show pass', this.show);
  }

  resendOTP() {
    var apiUrl = "resendotp/";
    var resendOTPJson;

    resendOTPJson = '{"mobile":"' + this.loginModel.mobileNo + '","email":"' + this.loginModel.email + '"}';

    this.CommonService.postCallWT(apiUrl, JSON.parse(resendOTPJson))
      .subscribe(
      data => {
        if (data['Success'] == "otp sent") {
          this.toastr.success("otp sent");
        } else if (data['Response'] == "mobile not matches") {
          this.toastr.error(this.translate.instant('Errors.provideEmailOrMob'));
        } else if (data['Response'] == "email not matches") {
          this.toastr.error(this.translate.instant('Errors.unregisteredUsername'));
        } else {
          this.toastr.error(this.translate.instant('Errors.checkInfo'));
        }
      },
      error => {
        this.toastr.error(this.translate.instant('Errors.cannotProceed'));
      }//Catch Error if server is not Found
      );
  }

  passwordShow() {
    this.show = !this.show;
  }

  agree(e) {
    if (e.target.checked) {
      this.checkAgree = true;
    }
    else {
      this.checkAgree = false;
    }
  }

  closeMe() {
    this.primaryModal.hide();
    this.lang.toHide();
    // this.forgetPasswordForm.reset();
    this.loginModel.email = '';
    this.loginModel.mobileNo = '';
    this.loginModel.emailOTP = '';
    this.loginModel.newPassword = '';
    this.loginModel.confirmPassword = '';
    this.loginModel.userName = '';
    this.loginModel.email = '';
    this.loginModel.password = '';
    this.checkAgree = "";
  }

  spaceCheck() {
    this.loginModel.email.length === 0 ? this.trimFlag = true : this.trimFlag = false;
    // this.username.trim().length === 0 ? this.trimFlag = true : this.trimFlag = false;
  }

  spaceCheck1() {
    // this.loginModel.mobileNo === '' ? this.trimFlag1 = true : this.trimFlag1 = false;
    if (this.loginModel.mobileNo === '' || this.loginModel.mobileNo.length === 0 || this.loginModel.mobileNo === null) {
      this.trimFlag1 = true;
    } else {
      this.trimFlag1 = false;
    }
  }

  timeCounter(catche) {
   // Timer for catche
    this.time1 = catche
    var a = this.time1.split(':'); // split it at the colons
    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    this.tmSec1 = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
    this.countDown = Observable.timer(0, this.tick)
      .take(this.tmSec1)
      .map(() => --this.tmSec1)
  }


}
