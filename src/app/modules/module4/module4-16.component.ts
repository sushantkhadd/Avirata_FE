import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "src/app/language.service";
import { FullLayoutService } from "src/app/layouts/full-layout.service";
import { Router } from "@angular/router";
import { LocalstoragedetailsService } from "src/app/services/localstoragedetails.service";
import { ToastsManager } from "ng6-toastr";
import { Module4Service } from "./module4.service";
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-module4-16',
  templateUrl: './module4-16.component.html'
})
export class Module416Component implements OnInit {

  public mainFlagModule4 = parseInt(window.localStorage.getItem('mainFlagModule4'));
  public subFlagModule4 = parseInt(window.localStorage.getItem('subFlagModule4'));

  public passData = {}; passUrl: any; passValues={}; startPdf: boolean;

  constructor(
    public LanguageService: LanguageService,
    private LocalstoragedetailsService: LocalstoragedetailsService,
    public Module4Service: Module4Service,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public translate: TranslateService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.startPdf=false;
    if (this.mainFlagModule4 == 16) {
    }else if (this.mainFlagModule4 > 16) {
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson4"));
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 4.16"
        );
        if (urlJson["children"][index].url != null) {
          this.passValues["url"] = urlJson["children"][index].url;
        }
      }
    }
  }

  start() {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'start'
    this.apiCall(jsonBody, 'modulefoursingleurl/', 'start');
  }  

  apiCall(jsonBody, apiUrl, fun) {
    this.Module4Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "start") {
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 4.16', window.localStorage.getItem('username'), 10);

            this.passValues["url"] = data["data"].url;
            this.startPdf = true;
            this.passUrl = data['data'].url;
            var current4 = [];
            current4 = JSON.parse(window.localStorage.getItem("currentJson4"));
            var index = current4["children"].findIndex(
              item => item.source == "module 4.16");
            current4["children"][index].url = this.passUrl;
            window.localStorage.setItem("currentJson4", JSON.stringify(current4));
          } else if (fun == "finish1") {
            this.LanguageService.toHide();
            window.localStorage.setItem('uuid', data['data'].nextuuid)
            window.localStorage.setItem('mainFlagModule4', '16');
            window.localStorage.setItem('subFlagModule4', '1');
            window.localStorage.setItem('source', 'module 4.16');
            this.Module4Service.setLocalStorage4(16);
            var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module4.subMenu4-16'), "next": this.translate.instant('L2Module4Finish.subMenu4-16'), "nextRoute": "/modules/module5" }
            this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
          }
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }

  finishPDF(e) {
    var jsonBody = {};
    // jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    // jsonBody['event'] = 'finish';
    // this.apiCall(jsonBody, 'modulefoursingleurl/', 'finish1');
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['event'] = "finish";
    if (e == true)
    {
      this.Module4Service.finishModuleCall(jsonBody, 16, '/modules/module5', '/modules/module5')
    }
  }
}
