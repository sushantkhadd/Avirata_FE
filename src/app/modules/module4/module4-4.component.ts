import { Component, OnInit,ViewContainerRef} from '@angular/core';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { TranslateService } from '@ngx-translate/core';
import { Module4Service } from './module4.service'
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'app-module4-4',
  templateUrl: './module4-4.component.html'
})
export class Module44Component implements OnInit {

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
    if (this.mainFlagModule4 == 4) {
    }else if (this.mainFlagModule4 > 4) {
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson4"));
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 4.4"
        );
        if (urlJson["children"][index].url != null) {
          this.passValues["url"] = urlJson["children"][index].url;
        }
      }
    }
  }

  start() {
    var jsonBody = {};
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['event'] = 'start';
    this.apiCall(jsonBody, 'modulefoursingleurl/', 'start');
  }  

  apiCall(jsonBody, apiUrl, fun) {
    this.Module4Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "start") {
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 4.4', window.localStorage.getItem('username'), 10);
            this.passValues["url"] = data["data"].url;
            this.startPdf = true;
            this.passUrl = data['data'].url;
            var current4 = [];
            current4 = JSON.parse(window.localStorage.getItem("currentJson4"));
            var index = current4["children"].findIndex(
              item => item.source == "module 4.4");
            current4["children"][index].url = this.passUrl;
            window.localStorage.setItem("currentJson4", JSON.stringify(current4));
          } else if (fun == "finish1") {
            this.LanguageService.toHide();
            window.localStorage.setItem('uuid', data['data'].nextuuid);
            window.localStorage.setItem('mainFlagModule4', '5');
            window.localStorage.setItem('subFlagModule4', '1');
            window.localStorage.setItem('source', 'module 4.5');
            this.Module4Service.setLocalStorage4(5);
            var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module4.subMenu4-4'), "next": this.translate.instant('L2Module4Finish.subMenu4-5'), "nextRoute": "/modules/module4/Module4.5" }
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
    this.apiCall(jsonBody, 'modulefoursingleurl/', 'finish1');
  }

}
