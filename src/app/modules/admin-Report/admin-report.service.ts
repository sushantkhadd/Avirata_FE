import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Headers } from "@angular/http";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastsManager } from "ng6-toastr";
import { TranslateService } from "@ngx-translate/core";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable()
export class AdminReportService {
  constructor(
    public httpClient: HttpClient,
    public router: Router,
    public toastr: ToastsManager,
    public translate: TranslateService
  ) {}
  // private apiUrl = environment.l3apiUrl;
  private apiUrl2 = environment.l2apiUrl;
  private apiUrl3 = environment.l3apiUrl;
  private apiUrl1 = environment.apiUrl;
  private apiUrlNot = environment.apiUrlNot;
  //Get Request
  getCall(api, token) {
    let putSource;
    /Android/i.test(navigator.userAgent)
      ? (putSource = "MWEB")
      : (putSource = "WEB");
    let headers = new HttpHeaders({
      Authorization: token,
      Source: putSource
    });
    let options = { headers: headers };
    return this.httpClient.get(this.apiUrl2 + api, options).pipe(
      map(response => {
        return response;
      })
    );
  }

  getCalllvl1(api, token) {
    let putSource;
    /Android/i.test(navigator.userAgent)
      ? (putSource = "MWEB")
      : (putSource = "WEB");
    let headers = new HttpHeaders({
      Authorization: token,
      Source: putSource
    });
    let options = { headers: headers };
    return this.httpClient.get(this.apiUrl1 + api, options).pipe(
      map(response => {
        return response;
      })
    );
  }

  getCalllvl3(api, token) {
    let putSource;
    /Android/i.test(navigator.userAgent)
      ? (putSource = "MWEB")
      : (putSource = "WEB");
    let headers = new HttpHeaders({
      Authorization: token,
      Source: putSource
    });
    let options = { headers: headers };
    return this.httpClient.get(this.apiUrl3 + api, options).pipe(
      map(response => {
        return response;
      })
    );
  }

  //Post Request
  postCall(jsonBody, apiUrl) {
    let putSource;
    /Android/i.test(navigator.userAgent)
      ? (putSource = "MWEB")
      : (putSource = "WEB");
    let headers = new HttpHeaders({
      Authorization: localStorage.getItem("token"),
      Source: putSource
    });
    let options = { headers: headers };
    return this.httpClient
      .post(this.apiUrl2 + apiUrl, { body: jsonBody }, options)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  //Post Request
  postCalllvl1(jsonBody, apiUrl) {
    let putSource;
    /Android/i.test(navigator.userAgent)
      ? (putSource = "MWEB")
      : (putSource = "WEB");
    let headers = new HttpHeaders({
      Authorization: localStorage.getItem("token"),
      Source: putSource
    });
    let options = { headers: headers };
    return this.httpClient
      .post(this.apiUrl1 + apiUrl, { body: jsonBody }, options)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  postCalllvl3(jsonBody, apiUrl) {
    let putSource;
    /Android/i.test(navigator.userAgent)
      ? (putSource = "MWEB")
      : (putSource = "WEB");
    let headers = new HttpHeaders({
      Authorization: localStorage.getItem("token"),
      Source: putSource
    });
    let options = { headers: headers };
    return this.httpClient
      .post(this.apiUrl3 + apiUrl, { body: jsonBody }, options)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  postCallNotification(jsonBody, apiUrl) {
    let putSource;
    /Android/i.test(navigator.userAgent)
      ? (putSource = "MWEB")
      : (putSource = "WEB");
    let headers = new HttpHeaders({
      Authorization: localStorage.getItem("token"),
      Source: putSource
    });
    let options = { headers: headers };
    return this.httpClient
      .post(this.apiUrl1 + apiUrl, { body: jsonBody }, options)
      .pipe(
        map(response => {
          return response;
        })
      );
  }
}
