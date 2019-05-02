import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn : "root"
})
export class RegistrationService {
  private apiUrl = environment.apiUrl;
  constructor(
    private http: Http,
  ) { }

  //POST method for User Registration
  postRegisterUser(regUserJson: any) {
    const body = JSON.parse(regUserJson);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl + 'setpassword/', { body: body }, { headers: headers })
      .map(
      res => {
        return res.json();
      }
      )
      .catch((error: Response) => {
        return Observable.throw(error);
      })
  }//postRegisterUser

  //POST method for User Registration
  postRegisterMT(registerJsonforMT: any) {
    const body = JSON.parse(registerJsonforMT);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl + 'registermastertrainer/', { user: body }, { headers: headers })
      .map(
      res => {
        return res.json();
      }
      )
      .catch((error: Response) => {
        return Observable.throw(error);
      })
  }//postRegisterUser


  //Post method for OTP generation
  sendOTPRequest(otpRequestJson: any) {
    console.log("In Send OTP service", JSON.parse(otpRequestJson))
    const body = JSON.parse(otpRequestJson);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
   return this.http.post(this.apiUrl + 'reg_trainee/', { user: body }, { headers: headers })
      .map(
      res => {
        return res.json();
      }
      )
      .catch((error: Response) => {
        return Observable.throw(error);
      })
  }//End of sendOTPRequest


  //POST method for Email OTP Verification
  verifyEmail(emailOtpJson: any) {
    const body = JSON.parse(emailOtpJson);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl + 'emailverify/', { body: body }, { headers: headers })
      .map(
      res => {
        return res.json();
      }
      )
      .catch((error: Response) => {
        return Observable.throw(error);
      })
  }//postRegisterUser

  //POST method for Email OTP Verification
  verifyMobile(emailOtpJson: any) {
    const body = JSON.parse(emailOtpJson);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl + 'mobileverify/', { body: body }, { headers: headers })
      .map(
      res => {
        return res.json();
      }
      )
      .catch((error: Response) => {
        return Observable.throw(error);
      })
  }//postRegisterUser


  //Generate OTP req for only email or mobile no
  sendOpt(otpRequestEmailJson: any) {
    const body = JSON.parse(otpRequestEmailJson);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl + 'resendotp/', { body: body }, { headers: headers })
      .map(
      res => {
        return res.json();
      }
      )
      .catch((error: Response) => {
        return Observable.throw(error);
      })
  }

  //Generate mobile OTP for Registration
  sendMobileOTP(generateMobileOTP: any) {
    const body = JSON.parse(generateMobileOTP);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl + 'signup/', { user: body }, { headers: headers })
      .map(
      res => {
        return res.json();
      }
      )
      .catch((error: Response) => {
        return Observable.throw(error);
      })
  }

  //Generate Email OTP for Registration
  sendEmailOTP(generateEmailOTP: any) {
    const body = JSON.parse(generateEmailOTP);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl + 'signupemail/', { body: body }, { headers: headers })
      .map(
      res => {
        return res.json();
      }
      )
      .catch((error: Response) => {
        return Observable.throw(error);
      })
  }
}
