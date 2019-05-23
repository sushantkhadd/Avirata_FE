import 'rxjs/add/operator/map';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { ToastsManager } from "ng6-toastr";
import { TranslateService } from '@ngx-translate/core';
import { FullLayoutService } from '../../layouts/full-layout.service';

@Injectable()
export class Module4Service {
  private apiUrl = environment.l3apiUrl; data;
  public docurl: EventEmitter<any> = new EventEmitter();
  public localStorageModule1: EventEmitter<any> = new EventEmitter();
  public passDataResponse: EventEmitter<any> = new EventEmitter();
  public resultAfterFirstSumbit: EventEmitter<any> = new EventEmitter();

  public url1_1; url1_2; url1_3; url1_4; url1_5; url1_6; url1_7; url1_8; url1_9; url1_10; url1_11; url1_12;
  constructor(public FullLayoutService: FullLayoutService, public httpClient: HttpClient, public router: Router, public LocalstoragedetailsService: LocalstoragedetailsService, public toastr: ToastsManager, public translate: TranslateService) { }

  setLocalStorage4(data) {
    // console.log("set")
    this.localStorageModule1.emit(data);
  }
  getLocalStorage4() {
    //  console.log("get")
    return this.localStorageModule1;
  }

  setValue(str) {
    this.passDataResponse.emit(str)
  }
  getValue() {
    return this.passDataResponse;
  }
  setValueSectionOne(val) {
    this.resultAfterFirstSumbit.emit(val)
  }
  getValueSectionOne() {
    return this.resultAfterFirstSumbit;
  }
  // getDataforModule1_11() {
  //   return this.httpClient.get('/assets/jsonfile/module1_11.json')
  //     .map(data => {
  //       data.json();
  //       return data.json();
  //     });
  // }


  apiCall(jsonBody, apiUrl) {
    const headers = new HttpHeaders({
      Authorization: window.localStorage.getItem("token"),
      "Content-Type": "application/json",
      Source: "WEB"
    });
    let options = { headers: headers };
    return this.httpClient.post(this.apiUrl + apiUrl, { body: jsonBody }, options)
  }
}
