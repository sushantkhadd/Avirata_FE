import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn : "root"
})
export class RegistrationService {
  private apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient,
  ) { }

  //POST method for User Registration
  postRegisterUser(regUserJson: any) {
    const body = JSON.parse(regUserJson);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl + 'setpassword/', { body: body }, { headers: headers })
     
  }//postRegisterUser

  //POST method for User Registration
  postRegisterMT(registerJsonforMT: any) {
    const body = JSON.parse(registerJsonforMT);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl + 'registermastertrainer/', { user: body }, { headers: headers })
     
  }//postRegisterUser


  //Post method for OTP generation
  sendOTPRequest(otpRequestJson: any) {
    console.log("In Send OTP service", JSON.parse(otpRequestJson))
    const body = JSON.parse(otpRequestJson);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
   return this.http.post(this.apiUrl + 'reg_trainee/', { user: body }, { headers: headers })
     
  }//End of sendOTPRequest


  //POST method for Email OTP Verification
  verifyEmail(emailOtpJson: any) {
    const body = JSON.parse(emailOtpJson);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl + 'emailverify/', { body: body }, { headers: headers })
     
  }//postRegisterUser

  //POST method for Email OTP Verification
  verifyMobile(emailOtpJson: any) {
    const body = JSON.parse(emailOtpJson);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl + 'mobileverify/', { body: body }, { headers: headers })
    
  }//postRegisterUser


  //Generate OTP req for only email or mobile no
  sendOpt(otpRequestEmailJson: any) {
    const body = JSON.parse(otpRequestEmailJson);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl + 'resendotp/', { body: body }, { headers: headers })
     
  }

  //Generate mobile OTP for Registration
  sendMobileOTP(generateMobileOTP: any) {
    const body = JSON.parse(generateMobileOTP);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl + 'signup/', { user: body }, { headers: headers })
      
  }

  //Generate Email OTP for Registration
  sendEmailOTP(generateEmailOTP: any) {
    const body = JSON.parse(generateEmailOTP);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl + 'signupemail/', { body: body }, { headers: headers })
     
  }
}
