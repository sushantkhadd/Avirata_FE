import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "src/app/language.service";
import { LocalstoragedetailsService } from "src/app/services/localstoragedetails.service";
import { ToastsManager } from "ng6-toastr";
import { Module1Service } from "./module1.service";

@Component({
  selector: "app-module1-15",
  templateUrl: "./module1-15.component.html"
})
export class Module115Component implements OnInit {

  public mainFlagModule1 = parseInt(
    window.localStorage.getItem("mainFlagModule1")
  );
  public subFlagModule1 = parseInt(
    window.localStorage.getItem("subFlagModule1")
  )
  passUrl: any;
  passValues={};
  startPdf: boolean;
  finishJSONBody = {};
  constructor(
    public LanguageService: LanguageService,
    private LocalstoragedetailsService: LocalstoragedetailsService,
    public Module1Service: Module1Service,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public translate: TranslateService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  public passData = {};

  ngOnInit() {
    this.startPdf=false
    // this.start();
    if (this.mainFlagModule1 > 15) {
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson1"));
      console.log("vcxxxx", urlJson);
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 1.15"
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
    this.apiCall(jsonBody, 'moduleonesingleurl/', 'start');
  }  

  apiCall(jsonBody, apiUrl, fun) {
    this.Module1Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "start") {
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 1.15', window.localStorage.getItem('username'), 10);

            this.passValues["url"] = data["data"].url;
            this.startPdf = true;
            this.passUrl = data['data'].url;
            var current1 = [];
            current1 = JSON.parse(window.localStorage.getItem("currentJson1"));
            var index = current1["children"].findIndex(
              item => item.source == "module 1.15");
            current1["children"][index].url = this.passUrl;

            window.localStorage.setItem("currentJson1", JSON.stringify(current1));
          } else if (fun == "finish1") {
            this.LanguageService.toHide();
            window.localStorage.setItem('uuid', data['data'].nextuuid)
            window.localStorage.setItem('mainFlagModule1', '16');
            this.Module1Service.finishModuleCall(this.finishJSONBody, 15, '/modules/module2', '/modules/module2')
          }
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }

  finishPDF(e) {
    this.finishJSONBody['submoduleid'] = window.localStorage.getItem('uuid');
    this.finishJSONBody['useroption'] = "";
    this.finishJSONBody['event'] = "finish";
    if (e == true)
    {
      this.Module1Service.finishModuleCall(this.finishJSONBody, 15, '/modules/module2', '/modules/module2')
    }
  }
}
