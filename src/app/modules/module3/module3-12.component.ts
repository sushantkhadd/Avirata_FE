import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { LanguageService } from 'src/app/language.service';
import { Router } from '@angular/router';
import { LocalstoragedetailsService } from 'src/app/services/localstoragedetails.service';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Module3Service } from './module3.service';

@Component({
  selector: 'app-module3-12',
  templateUrl: './module3-12.component.html'
})
export class Module312Component implements OnInit {

  public mainFlagModule3 = parseInt(
    window.localStorage.getItem("mainFlagModule3")
  );
  public subFlagModule3 = parseInt(
    window.localStorage.getItem("subFlagModule3")
  );
  passUrl: any;
  passValues={};
  startPdf: boolean;
  constructor(
    public LanguageService: LanguageService,
    private LocalstoragedetailsService: LocalstoragedetailsService,
    public Module3Service: Module3Service,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public translate: TranslateService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  public passData = {};

  ngOnInit() {
    this.startPdf=false
    this.start();
  }

  start() {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'start'
    this.apiCall(jsonBody, 'modulethreesingleurl/', 'start');
  }  

  apiCall(jsonBody, apiUrl, fun) {
    this.Module3Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "start") {
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 3.12', window.localStorage.getItem('username'), 10);

            this.passValues["url"] = data["data"].url;
            this.startPdf = true;
            this.passUrl = data['data'].url;
            var current3 = [];
            current3 = JSON.parse(window.localStorage.getItem("currentJson3"));
            var index = current3["children"].findIndex(
              item => item.source == "module 3.12");
            current3["children"][index].url = this.passUrl;

            window.localStorage.setItem("currentJson3", JSON.stringify(current3));
          } else if (fun == "finish1") {
            this.LanguageService.toHide();
            window.localStorage.setItem('uuid', data['data'].nextuuid)
            window.localStorage.setItem('mainFlagModule3', '13');
            window.localStorage.setItem('subFlagModule3', '1');
            window.localStorage.setItem('source', 'module 3.13');
            this.Module3Service.setLocalStorage3(13);
            var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module3.subMenu3-12'), "next": this.translate.instant('L2Module3Finish.subMenu3-13'), "nextRoute": "/modules/module3/Module3.13" }
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
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['event'] = 'finish';
    this.apiCall(jsonBody, 'modulethreesingleurl/', 'finish1');
  }
}
