import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class ProfileService {
  public apiUrl = environment.apiUrl;
  constructor(private http: Http) {}
  getProfileDetails(token) {
    let headers = new Headers();
    headers.append("Authorization", token);
    return this.http
      .get(this.apiUrl + "profile/", { headers: headers })
      .map(data => {
        data.json();
        return data.json();
      });
  } //End of ProfileDetails

  //POST method for forget Password
  sendOTPToNewEmail(newEmailJson: any, token) {
    const body = JSON.parse(newEmailJson);
    const headers = new Headers({
      "Content-Type": "application/json"
    });
    headers.append("Authorization", token);
    return this.http
      .post(this.apiUrl + "changeemail/", { body: body }, { headers: headers })
      .map(res => {
        return res.json();
      })
      .catch((error: Response) => {
        return Observable.throw(error);
      });
  } //End of postForgetPassword

  sendOTPToMobile(newMobileJson: any, token) {
    const body = JSON.parse(newMobileJson);
    const headers = new Headers({
      "Content-Type": "application/json"
    });
    headers.append("Authorization", token);
    return this.http
      .post(this.apiUrl + "mobileupdate/", { body: body }, { headers: headers })
      .map(res => {
        return res.json();
      })
      .catch((error: Response) => {
        return Observable.throw(error);
      });
  }

  verifyOtpEmail(verifyEmailOtpJson: any, token) {
    const body = JSON.parse(verifyEmailOtpJson);
    const headers = new Headers({
      "Content-Type": "application/json"
    });
    headers.append("Authorization", token);
    return this.http
      .post(
        this.apiUrl + "newemailverification/",
        { body: body },
        { headers: headers }
      )
      .map(res => {
        return res.json();
      })
      .catch((error: Response) => {
        return Observable.throw(error);
      });
  }

  verifyOtpMobile(verifyMobileOtpJson: any, token) {
    const body = JSON.parse(verifyMobileOtpJson);
    const headers = new Headers({
      "Content-Type": "application/json"
    });
    headers.append("Authorization", token);
    return this.http
      .post(
        this.apiUrl + "updatedmobileverify/",
        { body: body },
        { headers: headers }
      )
      .map(res => {
        return res.json();
      })
      .catch((error: Response) => {
        return Observable.throw(error);
      });
  }

  changePassword(changePasswordJson: any, token) {
    const body = JSON.parse(changePasswordJson);
    const headers = new Headers({
      "Content-Type": "application/json"
    });
    headers.append("Authorization", token);
    return this.http
      .post(
        this.apiUrl + "changepassword/",
        { body: body },
        { headers: headers }
      )
      .map(res => {
        return res.json();
      })
      .catch((error: Response) => {
        return Observable.throw(error);
      });
  }
}
