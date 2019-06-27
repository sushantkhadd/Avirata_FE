import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { LanguageService } from "src/app/language.service";
import { LocalstoragedetailsService } from "src/app/services/localstoragedetails.service";
import { Module1Service } from "./module1.service";
import { ToastsManager } from "ng6-toastr";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-module1-8",
  templateUrl: "./module1-8.component.html"
})
export class Module18Component implements OnInit {
  public mainFlagModule1 = parseInt(
    window.localStorage.getItem("mainFlagModule1")
  );
  public subFlagModule1 = parseInt(
    window.localStorage.getItem("subFlagModule1")
  );
  constructor(
    public LanguageService: LanguageService,
    public Module43Service: Module1Service,
    public router: Router,
    public LocalstoragedetailsService: LocalstoragedetailsService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public translate: TranslateService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  public mainJson = {};
  passData6 = {};
  showInst;
  queCount;
  startFlag;
  public inst =
    "खाली काही लोकांची स्वगते दिली आहेत. त्यांना योग्य क्रमाने प्रश्न विचारा. पहिला प्रश्न विचारल्यावर आलेल्या उत्तरावर आधारित दुसरा प्रश्न विचारा. (त्या त्या चौकटीत योग्य प्रश्न क्रमाने नेऊन (Drag-drop) ठेवा.)";
  ngOnInit() {
    this.queCount = 0;

    if (this.mainFlagModule1 == 8) {
      this.showInst = true;
      // this.start1()
    }
  }
  start1() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["event"] = "start";
    this.apiCall(jsonBody, "moduleonemcqstartfinish/", "start1");
  }
  getAnswer6(e) {
    console.log("get ans ", e);
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["event"] = "finish";
    this.apiCall(jsonBody, "moduleonemcqstartfinish/", "finish1");
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module43Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (fun == "start1") {
          this.passData6 = data["data"];
          this.passData6["type"] = "single";
          this.showInst = false;
          // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 4.12', window.localStorage.getItem('username'), 10);
        } else if (fun == "finish1") {
          if (data["message"] == "submodule finish next uuid is") {
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            this.subFlagModule1++;
            window.localStorage.setItem(
              "subFlagModule1",
              JSON.stringify(this.subFlagModule1)
            );
            this.start1();
          } else if (data["message"] == "submodule finish") {
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            this.mainFlagModule1 = 9;
            this.subFlagModule1 = 1;
            window.localStorage.setItem("mainFlagModule1", "9");
            window.localStorage.setItem("subFlagModule1", "1");
            this.Module43Service.setLocalStorage1(9);
            var obj = {
              type: "submodule",
              route: true,
              current: this.translate.instant("L2Module1.subMenu1-8"),
              next: this.translate.instant("L2Module1Finish.subMenu1-9"),
              nextRoute: "/modules/module1/Module1.9"
            };
            this.LocalstoragedetailsService.setModuleStatus(
              JSON.stringify(obj)
            );
          }
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }
}
