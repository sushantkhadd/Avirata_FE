import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ToastsManager } from "ng6-toastr";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class CommonService {
  private apiUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    public translate: TranslateService,
    public toastr: ToastsManager
  ) {}

  // Post Request without token
  postCallWT(apiUrl, jsonBody) {
    var headers = new HttpHeaders({
      "Content-Type": "application/json"
      // "Source": "WEB"
    });
    if (/Android/i.test(navigator.userAgent)) {
      headers = headers.append("Source", "MWEB");
    } else {
      headers = headers.append("Source", "WEB");
    }
    let options = { headers: headers };
    return this.httpClient
      .post(this.apiUrl + apiUrl, { body: jsonBody }, options)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  // Post Request with token
  postCall(apiUrl, jsonBody) {
    var headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: window.localStorage.getItem("token"),
      Source: "WEB"
    });
    let options = { headers: headers };
    return this.httpClient
      .post(this.apiUrl + apiUrl, { body: jsonBody }, options)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  // Get Request
  getCall(apiUrl) {
    let headers = new HttpHeaders();
    headers.append("Authorization", window.localStorage.getItem("token"));
    headers.append("Source", "WEB");
    return this.httpClient.get(this.apiUrl + apiUrl, { headers: headers }).pipe(
      map(response => {
        return response;
      })
    );
  }

  handleError(error) {
    if (error == "json key error") {
      console.log("json key error");
    } else if (error == "user not active") {
      this.toastr.error(this.translate.instant("Errors.userNotActive"));
    } else if (error == "email not verify") {
      this.toastr.error(this.translate.instant("Errors.emailNotVerified"));
    } else if (error == "Mobile Number is not Verified") {
      this.toastr.error(this.translate.instant("Errors.mobNotVerified"));
    } else if (error == "user group not found") {
      console.log("user group not found");
    } else if (error == "user profile not complete") {
      console.log("user profile not complete");
    } else {
      this.toastr.error(this.translate.instant("Errors.cannotProceed"));
    }
  }
}
