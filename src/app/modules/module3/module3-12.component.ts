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
  constructor(
    public LanguageService: LanguageService,
    public Module3Service: Module3Service,
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
  ngOnInit() {
    this.queCount = 0;

    if (this.mainFlagModule3 == 12)
    {
      this.showInst = true;
      // this.start1()
    }
  }
  start1() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["event"] = "start";
    this.apiCall(jsonBody, "l3module3mcqdragdrop/", "start1");
  }
  getAnswer6(e) {
    console.log("get ans ", e);
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["event"] = "finish";
    this.apiCall(jsonBody, "l3module3mcqdragdrop/", "finish1");
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module3Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (fun == "start1")
        {
          this.passData6 = data["data"];
          this.passData6["type"] = "single";
          this.showInst = false;
          console.log(data)
          // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 4.12', window.localStorage.getItem('username'), 10);
        } else if (fun == "finish1")
        {
          if (data["message"] == "submodule finish next uuid is")
          {
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            this.subFlagModule3++;
            window.localStorage.setItem(
              "subFlagModule3",
              JSON.stringify(this.subFlagModule3)
            );
            this.start1();
          } else if (data["message"] == "submodule finish")
          {
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            this.mainFlagModule3 = 13;
            this.subFlagModule3 = 1;
            window.localStorage.setItem("mainFlagModule3", "13");
            window.localStorage.setItem("subFlagModule3", "1");
            this.Module3Service.setLocalStorage3(13);
            var obj = {
              type: "submodule",
              route: true,
              current: this.translate.instant("L2Module3.subMenu3-12"),
              next: this.translate.instant("L2Module3.subMenu3-13"),
              nextRoute: "/modules/module3/Module3.13"
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
