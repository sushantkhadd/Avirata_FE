import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { EventEmitter } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: "root"
})
export class FullLayoutService {
  public currentCall1: EventEmitter<any> = new EventEmitter();
  public currentJson0 = [];
  currentJson1 = [];
  currentJson2 = [];
  currentJson5 = [];
  currentJson3 = [];
  currentJson4 = [];
  private apiUrl = environment.l3apiUrl;
  currentJson7 = [];
  private apiUrl1 = environment.apiUrl;
  constructor(private http: Http) {}

  updateCurrentStaus(url, source, mainModule) {
    var data;
    if (mainModule == 0) {
      data = JSON.parse(window.localStorage.getItem("currentJson0"));
      this.currentJson0 = data.children;
      var index = this.currentJson0.findIndex(item => item.source == source);
      this.currentJson0[index].url = url;
    } else if (mainModule == 1) {
      data = JSON.parse(window.localStorage.getItem("currentJson1"));
      this.currentJson1 = data.children;
      var index = this.currentJson1.findIndex(item => item.source == source);
      this.currentJson1[index].url = url;
    } else if (mainModule == 2) {
      data = JSON.parse(window.localStorage.getItem("currentJson2"));
      this.currentJson2 = data.children;
      var index = this.currentJson2.findIndex(item => item.source == source);
      this.currentJson2[index].url = url;
    } else if (mainModule == 5) {
      data = JSON.parse(window.localStorage.getItem("currentJson5"));
      this.currentJson5 = data.children;
      var index = this.currentJson5.findIndex(item => item.source == source);
      this.currentJson5[index].url = url;
    } else if (mainModule == 4) {
      data = JSON.parse(window.localStorage.getItem("currentJson4"));
      this.currentJson4 = data.children;
      var index = this.currentJson4.findIndex(item => item.source == source);
      this.currentJson4[index].url = url;
    } else if (mainModule == 3) {
      data = JSON.parse(window.localStorage.getItem("currentJson3"));
      this.currentJson3 = data.children;
      var index = this.currentJson3.findIndex(item => item.source == source);
      this.currentJson3[index].url = url;
    } else if (mainModule == 7) {
      data = JSON.parse(window.localStorage.getItem("currentJson7"));
      this.currentJson7 = data.children;
      var index = this.currentJson7.findIndex(item => item.source == source);
      this.currentJson7[index].url = url;
    }
  }

  setCurrentStatus1(data) {
    var demodata;
    if (data.source == "module 0") {
      // this.currentJson1=data.children;
      demodata = JSON.parse(window.localStorage.getItem("currentJson0"));
      this.currentJson0 = demodata.children;
    } else if (data.source == "module 1") {
      // this.currentJson1=data.children;
      demodata = JSON.parse(window.localStorage.getItem("currentJson1"));
      this.currentJson1 = demodata.children;
    } else if (data.source == "module 2") {
      // this.currentJson2=data.children;
      demodata = JSON.parse(window.localStorage.getItem("currentJson2"));
      this.currentJson2 = demodata.children;
    } else if (data.source == "module 5") {
      // this.currentJson5=data.children;
      demodata = JSON.parse(window.localStorage.getItem("currentJson5"));
      this.currentJson5 = demodata.children;
    } else if (data.source == "module 4") {
      // this.currentJson5=data.children;
      demodata = JSON.parse(window.localStorage.getItem("currentJson4"));
      this.currentJson4 = demodata.children;
    } else if (data.source == "module 3") {
      // this.currentJson5=data.children;
      demodata = JSON.parse(window.localStorage.getItem("currentJson3"));
      this.currentJson3 = demodata.children;
    } else if (data.source == "module 7") {
      // this.currentJson5=data.children;
      demodata = JSON.parse(window.localStorage.getItem("currentJson7"));
      this.currentJson7 = demodata.children;
    }
    this.currentCall1.emit(data);
  }
  getCurrentStatus1() {
    return this.currentCall1;
  }

  logoutService(token: any) {
    const headers = new Headers({
      Authorization: token
    });
    return this.http
      .get(this.apiUrl1 + "logout/", { headers: headers })
      .map(data => {
        data.json();
        return data.json();
      });
  }

  moduleStatus(jsonBody) {
    const headers = new Headers({
      Authorization: window.localStorage.getItem("token"),
      "Content-Type": "application/json",
      Source: "WEB"
    });
    return this.http
      .post(
        this.apiUrl + "l2currentstatus/",
        { body: jsonBody },
        { headers: headers }
      )
      .map(data => {
        return data.json();
      });
  }
}
