import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng6-toastr';


@Injectable()
export class LoginService {
  private apiUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    public translate: TranslateService,
    public toastr: ToastsManager,
  ) { }
  //POST method for login
  // postLogin(loginJson: any) {
  //   console.log("In Post DATA  ::", loginJson);
  //   const body = JSON.parse(loginJson);
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Source': 'WEB'
  //   });
  //   // return this.http.post('http://192.168.1.223:8081/api/log', { body: body }, { headers: headers })
  //   return this.httpClient.post(this.apiUrl + 'login/', { body: body }, { headers: headers })
  //     .map(
  //     res => {
  //       return res;
  //     }
  //     )
  //     .catch((error: Response) => {
  //       return Observable.throw(error);
  //     })
  // }//End of PostLogin

  postCall(apiUrl, jsonBody) {
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
     // "Source": "WEB"
    });
    if (/Android/i.test(navigator.userAgent)) 
    { 
      headers= headers.append("Source",'MWEB')
     }else
     { 
      headers= headers.append("Source",'WEB') 
     }
    let options = { headers: headers };
    return this.httpClient.post(this.apiUrl + apiUrl, { body: jsonBody }, { headers: headers })
  }
  //POST method for forget Password
  // sendOTPToEmail(forgetPasswordJson: any) {
  //   const body = JSON.parse(forgetPasswordJson);
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   });
  //   return this.httpClient.post(this.apiUrl + 'forgetpassword/', { body: body }, { headers: headers })
  //     .map(
  //     res => {
  //       return res.json();
  //     }
  //     )
  //     .catch((error: Response) => {
  //       return Observable.throw(error);
  //     })
  // }//End of postForgetPassword


  //Get Request
  // getCall(api) {
  //   let headers = new HttpHeaders();
  //   headers.append("Authorization", window.localStorage.getItem('token'));
  //   headers.append("Source", "WEB");

  //   // let options = new RequestOptions({ headers: headers });
  //   return this.httpClient.get(this.apiUrl + api, { headers: headers }).map(
  //     data => {
  //       data.json();
  //       return data.json();
  //     },
  //     error => this.toastr.error(this.translate.instant("Errors.cannotProceed"))
  //   );
  // }

  //Post Request
  // postCall(jsonBody, apiUrl) {
  //   const headers = new HttpHeaders({
  //     "Content-Type": "application/json"
  //     // Source: "WEB"
  //   });
  //   if (/Android/i.test(navigator.userAgent)) {
  //     headers.append("Source",'MWEB')
  //   }else{
  //     headers.append("Source",'WEB')
  //   }
  //   // if ((window.localStorage.getItem('token') != null) && (window.localStorage.getItem('token') != "")) {
  //   headers.append("Authorization", window.localStorage.getItem("token"));
  //   // }
  //   return this.httpClient
  //     .post(this.apiUrl + apiUrl, { body: jsonBody }, { headers: headers })
  //     .map(
  //       data => {
  //         return data.json();
  //       },
  //       error =>
  //         this.toastr.error(this.translate.instant("Errors.cannotProceed"))
  //     );
  // }

  // postCallRegister(jsonBody, apiUrl) {
  //   const headers = new HttpHeaders({
  //     "Content-Type": "application/json",
  //     // Source: "WEB"
  //   });
  //   if (/Android/i.test(navigator.userAgent)) {
  //     headers.append("Source",'MWEB')
  //   }else{
  //     headers.append("Source",'WEB')
  //   }
  //   return this.httpClient
  //     .post(this.apiUrl + apiUrl, { body: jsonBody }, { headers: headers })
  //     .map(
  //     data => {
  //       return data.json();
  //     },
  //     error =>
  //       this.toastr.error(this.translate.instant("Errors.cannotProceed"))
  //     );
  // }
}
