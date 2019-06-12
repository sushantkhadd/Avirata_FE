import 'rxjs/add/operator/map';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { ToastsManager } from "ng6-toastr";
import { TranslateService } from '@ngx-translate/core';
import { FullLayoutService } from 'src/app/layouts/full-layout.service';
import { LanguageService } from 'src/app/language.service';

@Injectable()
export class Module1Service {
  private apiUrl = environment.l3apiUrl; data;
  public docurl: EventEmitter<any> = new EventEmitter();
  public localStorageModule1: EventEmitter<any> = new EventEmitter();
  public passDataResponse: EventEmitter<any> = new EventEmitter();
  public resultAfterFirstSumbit: EventEmitter<any> = new EventEmitter();

  public url1_1; url1_2; url1_3; url1_4; url1_5; url1_6; url1_7; url1_8; url1_9; url1_10; url1_11; url1_12; levelData
  constructor(public FullLayoutService: FullLayoutService, public httpClient: HttpClient, public router: Router, public LocalstoragedetailsService: LocalstoragedetailsService, public toastr: ToastsManager, public translate: TranslateService, public LanguageService: LanguageService) { }

  setLocalStorage1(data) {
    // console.log("set")
    this.localStorageModule1.emit(data);
  }
  getLocalStorage1() {
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

  finishSubmodule(jsonBody) {
    const headers = new HttpHeaders({
      'Authorization': window.localStorage.getItem('token'),
      'Content-Type': 'application/json',
      Source: "WEB"
    });
    // if (/Android/i.test(navigator.userAgent)) {
    //   headers.append("Source", 'MWEB')
    // } else {
    //   headers.append("Source", 'WEB')
    // }
    let options = { headers: headers };
    return this.httpClient.post(this.apiUrl + 'moduleonesingleurl/', { body: jsonBody }, options)
  }

  finishModuleCall(finishJSONBody, submoduleId, routeNavigate, routeNavigateFirst) {

    this.finishSubmodule(finishJSONBody)
      .subscribe(
      data => {
        if (data['message'] == "submodule finish next uuid is") {


        }
         if (data['message'] == "submodule finish") {
          var id = (submoduleId + 1).toString();
          window.localStorage.setItem('mainFlagModule1', id);
          window.localStorage.setItem('uuid', data['data'].nextuuid);

          if (submoduleId == 11) {
            this.setLocalStorage1(id);
            var obj = { "type": "submodule", "route": true, "current": this.translate.instant('otherMessages.1-11Current'), "next": this.translate.instant('otherMessages.1-12Next'), "nextRoute": "/modules/module1/Module1.12" }
            this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
          }

        }
         else if (data['message'] == "module1 finish")
         {
           window.localStorage.setItem('moduleFinishCount', JSON.stringify(data['data']));
           this.levelData =localStorage.getItem("levelData");
           for (let index = 0; index < this.levelData.length; index++)
           {
             if (parseInt(window.localStorage.getItem("currentstatus")) == index)
             {
               let current1 = [];
               current1 = JSON.parse(window.localStorage.getItem("levelData"));
               let index1 = current1.findIndex(
                 item => item.module == index);
               current1[index1].percent = JSON.stringify(data['data'].percentage);
               window.localStorage.setItem("levelData", JSON.stringify(current1));
               console.log(current1, "fifirty")
             }
           }
           window.localStorage.setItem("currentstatus", "2");
           window.localStorage.setItem('mainFlagModule1', '13');
           window.localStorage.setItem('mainFlagModule2', '1');
            this.setLocalStorage1(13);
           var obj1 = {
             "type": "moduleFinish",
             "route": true,
             "current": this.translate.instant('L2Module1.subMenu1-12'),
             "next": this.translate.instant('L2Module2.title'),
             "nextRoute": "/dashboard", "finishHead": this.translate.instant('L2Module1.title')
           }
            this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj1));
        }
      },
      error => {
        if (error.error.message == 'token not found') {
          this.toastr.error(this.translate.instant('otherMessages.ServerError'));
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 4000)
        } else if (error.error.message == 'token not matches please re-login') {
          this.toastr.error(this.translate.instant('otherMessages.sessionLogout'));
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 4000)
        } else if (error.error.message == 'complete previous module first') {
          window.localStorage.setItem('mainFlagModule4', submoduleId);
          this.router.navigate([routeNavigate]);
        }
        else if (error.error.message == 'required currentsubmoduleid key') {
          window.localStorage.setItem('mainFlagModule4', submoduleId);
          this.router.navigate([routeNavigate]);
        } else if (error.error.message == 'required currentsubmoduleid field') {
          window.localStorage.setItem('mainFlagModule4', submoduleId);
          this.router.navigate([routeNavigate]);
        } else if (error.error.message == 'required event key') {
          window.localStorage.setItem('mainFlagModule4', submoduleId);
          this.router.navigate([routeNavigate]);
        } else if (error.error.message == 'invalid event') {
          window.localStorage.setItem('mainFlagModule4', submoduleId);
          this.router.navigate([routeNavigate]);
        } else if (error.error.message == 'access denied') {
          window.localStorage.setItem('mainFlagModule4', submoduleId);
          this.toastr.error(this.translate.instant('otherMessages.accessDenied'));
          setTimeout(() => {
            this.router.navigate([routeNavigate]);
          }, 4000)
        } else if (error.error.message == 'invalid uuid') {
          window.localStorage.setItem('mainFlagModule4', submoduleId);
          this.router.navigate([routeNavigate]);
        }
        else {
          this.LanguageService.handleError(error.error.message);
        }
      });
  }


  //New
  getDataSectionOne(jsonBody, api) {
    this.apiCall(jsonBody, api)
      .subscribe(
        data => {
          if (data['message'] == 'ok')
          {
            this.setValue(data['data'].questions);
            console.log(data['data'].questions)
          } else if (data['message'] == 'answer submited successfully')
          {
            if (data['data'].nextuuid)
            {
              window.localStorage.setItem('uuid', data['data'].nextuuid)
            }
            this.setValueSectionOne(true);
          }
        },
        error => {
          if (error.json().message == 'token not found' || error.json().message == 'token not match')
          {
            this.toastr.error(this.translate.instant('otherMessages.ServerError'));
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 4000)
          } else if (error.json().message == 'json Key Error')
          {
            this.toastr.error(this.translate.instant('otherMessages.wrongInfo2'));
            this.setValueSectionOne(false);//for baseline2

          } else if (error.json().message == 'access denied')
          {
            this.toastr.error(this.translate.instant('otherMessages.accessDenied'));
          } else if (error.json().message == 'should be 10 statement')
          {
            this.setValueSectionOne(false);
          } else if (error.json().message == 'invalid uuid')
          {
            this.toastr.error(this.translate.instant('otherMessages.wrongInfo1'));
            this.setValueSectionOne(false);//for baseline2
          } else if (error.json().message == 'should be 3 statement')
          {
            this.setValueSectionOne(false);//for SectionTwoI
          }
          else
          {
            this.LanguageService.handleError(error.error.message);
          }
        });
  }
}
