import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class ProfileService {
  public apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getProfileDetails() {
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
      'Authorization':window.localStorage.getItem("token"),
     // "Source": "WEB"
    });
    if (/Android/i.test(navigator.userAgent)) 
    { 
      headers= headers.append("Source",'MWEB')
     }else
     { 
      headers= headers.append("Source",'WEB') 
     }
    return this.http
      .get(this.apiUrl + "profile/", { headers: headers })
    // let headers = new HttpHeaders();
    // headers.append("Authorization", token);
    // return this.http
    //   .get(this.apiUrl + "profile/", { headers: headers })
      
  } //End of ProfileDetails

  //POST method for forget Password
  sendOTPToNewEmail(newEmailJson: any) {
    const body = JSON.parse(newEmailJson);
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
      'Authorization': window.localStorage.getItem("token"),
     // "Source": "WEB"
    });
    if (/Android/i.test(navigator.userAgent)) 
    { 
      headers= headers.append("Source",'MWEB')
     }else
     { 
      headers= headers.append("Source",'WEB') 
     }
    return this.http
      .post(this.apiUrl + "changeemail/", { body: body }, { headers: headers })
     
  } //End of postForgetPassword

  sendOTPToMobile(newMobileJson: any) {
    const body = JSON.parse(newMobileJson);
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
      'Authorization': window.localStorage.getItem("token"),
     // "Source": "WEB"
    });
    if (/Android/i.test(navigator.userAgent)) 
    { 
      headers= headers.append("Source",'MWEB')
     }else
     { 
      headers= headers.append("Source",'WEB') 
     }
    return this.http
      .post(this.apiUrl + "mobileupdate/", { body: body }, { headers: headers })
     
  }

  verifyOtpEmail(verifyEmailOtpJson: any) {
    const body = JSON.parse(verifyEmailOtpJson);
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
      'Authorization': window.localStorage.getItem("token"),
     // "Source": "WEB"
    });
    if (/Android/i.test(navigator.userAgent)) 
    { 
      headers= headers.append("Source",'MWEB')
     }else
     { 
      headers= headers.append("Source",'WEB') 
     }
    return this.http
      .post(
        this.apiUrl + "newemailverification/",
        { body: body },
        { headers: headers }
      )
      
  }

  verifyOtpMobile(verifyMobileOtpJson: any) {
    const body = JSON.parse(verifyMobileOtpJson);
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
      'Authorization': window.localStorage.getItem("token"),
     // "Source": "WEB"
    });
    if (/Android/i.test(navigator.userAgent)) 
    { 
      headers= headers.append("Source",'MWEB')
     }else
     { 
      headers= headers.append("Source",'WEB') 
     }
    return this.http
      .post(
        this.apiUrl + "updatedmobileverify/",
        { body: body },
        { headers: headers }
      )
  }

  changePassword(changePasswordJson: any) {
    const body = JSON.parse(changePasswordJson);
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
      'Authorization': window.localStorage.getItem("token")
     // "Source": "WEB"
    });
    if (/Android/i.test(navigator.userAgent)) 
    { 
      headers= headers.append("Source",'MWEB')
     }else
     { 
      headers= headers.append("Source",'WEB') 
     }
    return this.http
      .post(
        this.apiUrl + "changepassword/",
        { body: body },
        { headers: headers }
      )
  }
}
