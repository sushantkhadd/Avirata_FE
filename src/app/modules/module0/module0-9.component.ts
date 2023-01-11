import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Module0Service } from './module0.service'

@Component({
  selector: 'app-module0-9',
  templateUrl: './module0-9.component.html'
})
export class Module09Component implements OnInit {
  public mainFlagModule0 = parseInt(
    window.localStorage.getItem("mainFlagModule0")
  );
  public subFlagModule0 = parseInt(
    window.localStorage.getItem("subFlagModule0")
  )
  passUrl: any;
  passValues={};
  startPdf: boolean;
  constructor(
    public LanguageService: LanguageService,
    private LocalstoragedetailsService: LocalstoragedetailsService,
    private router: Router,
    public Module0Service: Module0Service,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public translate: TranslateService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  public passData = {};
  ngOnInit() {
    this.startPdf=false
    if (this.mainFlagModule0 == 9) {
    }
    else if (this.mainFlagModule0 > 9) {
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson0"));
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 0.9"
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
    this.apiCall(jsonBody, 'modulezerosingleurl/', 'start');
  }  

  apiCall(jsonBody, apiUrl, fun) {
    this.Module0Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "start") {
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 0.9', window.localStorage.getItem('username'), 10);

            this.passValues["url"] = data["data"].url;
            this.startPdf = true;
            this.passUrl = data['data'].url;
            var current0 = [];
            current0 = JSON.parse(window.localStorage.getItem("currentJson0"));
            var index = current0["children"].findIndex(
              item => item.source == "module 0.9");
            current0["children"][index].url = this.passUrl;

            window.localStorage.setItem("currentJson0", JSON.stringify(current0));
          } else if (fun == "finish1") {
            this.LanguageService.toHide();
            window.localStorage.setItem('uuid', data['data'].nextuuid)
            window.localStorage.setItem('mainFlagModule0', '10');
            window.localStorage.setItem('subFlagModule0', '1');
            window.localStorage.setItem('source', 'module 0.10');
            this.Module0Service.setLocalStorage0(10);
            var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module0.subMenu0-10'), "next": this.translate.instant('L2Module0Finish.subMenu0-10'), "nextRoute": "/modules/module0/Module0.10" }
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
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'finish'
    this.apiCall(jsonBody, 'modulezerosingleurl/', 'finish1')
  }
}


