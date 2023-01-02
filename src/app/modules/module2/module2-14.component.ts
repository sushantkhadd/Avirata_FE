import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { LanguageService } from 'src/app/language.service';
import { LocalstoragedetailsService } from 'src/app/services/localstoragedetails.service';
import { Module2Service } from './module2.service';
import { ToastsManager } from 'ng6-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FullLayoutService } from '../../layouts/full-layout.service';

@Component({
  selector: 'app-module2-14',
  templateUrl: './module2-14.component.html'
})
export class Module214Component implements OnInit {
  public mainFlagModule2 = parseInt(window.localStorage.getItem('mainFlagModule2'));
  public subFlagModule2 = parseInt(window.localStorage.getItem('subFlagModule2'));

  passUrl: any;
  passValues={};
  startPdf: boolean;
  constructor(
    public LanguageService: LanguageService,
    private LocalstoragedetailsService: LocalstoragedetailsService,
    public Module2Service: Module2Service,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public translate: TranslateService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  public passData = {};

  ngOnInit() {
    this.startPdf=false
    if (this.mainFlagModule2 == 14) {
    } else if (this.mainFlagModule2 > 14) {
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson2"));
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 2.14"
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
    this.apiCall(jsonBody, 'moduletwosingleurl/', 'start');
  }  

  apiCall(jsonBody, apiUrl, fun) {
    this.Module2Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "start") {
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 2.14', window.localStorage.getItem('username'), 10);

            this.passValues["url"] = data["data"].url;
            this.startPdf = true;
            this.passUrl = data['data'].url;
            var current2 = [];
            current2 = JSON.parse(window.localStorage.getItem("currentJson2"));
            var index = current2["children"].findIndex(
              item => item.source == "module 2.14");
            current2["children"][index].url = this.passUrl;

            window.localStorage.setItem("currentJson2", JSON.stringify(current2));
          // } else if (fun == "finish1") {
          //   this.LanguageService.toHide();
          //   window.localStorage.setItem('uuid', data['data'].nextuuid)
          //   window.localStorage.setItem('mainFlagModule2', '9');
          //   window.localStorage.setItem('subFlagModule2', '1');
          //   window.localStorage.setItem('source', 'module 9.1');
          //   this.Module2Service.setLocalStorage2(9);
          //   var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module2.submodule2-8'), "next": this.translate.instant('L2Module2Finish.subMenu2-9'), "nextRoute": "/modules/module2/Module2.9" }
          //   this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
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
    // this.apiCall(jsonBody, 'moduletwosingleurl/', 'finish1');
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['useroption'] = "";
    jsonBody['event'] = "finish";
    if (e == true) {
      this.Module2Service.finishModuleCall(jsonBody, 14, '/modules/module3', '/modules/module3')
    }

  }
}
