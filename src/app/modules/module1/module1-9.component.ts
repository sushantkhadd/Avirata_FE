import { Component, OnInit, ViewContainerRef} from '@angular/core';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {Module1Service} from './module1.service'
import { FullLayoutService } from '../../layouts/full-layout.service';
import { environment } from 'src/environments/environment';
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: "app-module1-9",
  templateUrl: "./module1-9.component.html"
})
export class Module19Component implements OnInit {
  constructor(
    public FullLayoutService: FullLayoutService,
    public LanguageService: LanguageService,
    public Module1Service: Module1Service,
    public toastr: ToastsManager,
    public translate: TranslateService,
    public router: Router,
    public LocalstoragedetailsService: LocalstoragedetailsService,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  public finalCount;
  public imgUrl;
  passValues = {};
  public download;
  link;
  showCFU;
  apiUrl;
  public cfuQuestion = {};
  public startPdf;
  mainFlagModule1;
  subFlagModule1;
  finishJSONBody = {};
  private pdfUrl = environment.pdfUrl;
  pdf1;
  urlArray = {};thumb_title;flag;
  ngOnInit() {
    this.pdf1 =
      "https://s3-ap-southeast-1.amazonaws.com/maacpd/english/level1/module4/4.8_our+progress+card.pdf";
    this.startPdf = false;
    this.mainFlagModule1 = parseInt(
      window.localStorage.getItem("mainFlagModule1")
    );
    this.subFlagModule1 = parseInt(
      window.localStorage.getItem("subFlagModule1")
    );

    if (this.mainFlagModule1 > 9) {
      this.flag = 0;
      this.showCFU = false;
      this.download = false;
      this.link = "";
      this.apiUrl = "/assets/jsonfile/module4_6.json";
      this.finalCount = 22;
      this.passValues["download"] = this.download;
      this.passValues["link"] = this.link;
      this.passValues["finalcount"] = this.finalCount;
      this.passValues["showcfu"] = this.showCFU;
      this.passValues["apiurl"] = this.apiUrl;
      this.passValues["unlockView"] = "static";
      var unlockJson = {};
      unlockJson = JSON.parse(window.localStorage.getItem("currentJson1"));
      if (unlockJson["children"].length > 0) {
        var index = unlockJson["children"].findIndex(
          item => item.source == "module 1.9"
        );
        if (unlockJson["children"][index].url != null)
        {
          var mainJson = JSON.parse(unlockJson["children"][index].url);
          this.urlArray["src1"] = mainJson["1"];
          this.urlArray["src2"] = mainJson["2"];
        }
      }
    }
  }
  finishPDF(e) {
    this.finishJSONBody["submoduleid"] = window.localStorage.getItem("uuid");
    this.finishJSONBody["useroption"] = "";
    this.finishJSONBody["event"] = "finish";
    if (e == true) {
      this.finishModuleCall(
        this.finishJSONBody,
        9,
        "/modules/module1/Module1.10",
        "/modules/module1/Module1.10"
      );
    }
  }

  start() {
    this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 1.9', window.localStorage.getItem('username'), 10);
    this.finishJSONBody["submoduleid"] = window.localStorage.getItem("uuid");
    this.finishJSONBody["useroption"] = "";
    this.finishJSONBody["event"] = "start";

    this.Module1Service.apiCall(
      this.finishJSONBody,
      "moduleonesingleurl/"
    ).subscribe(
      data => {
        if (data["message"] == "ok" || data["message"] == "submodule started") {
          this.passValues["url"] = data["data"].url;
          this.startPdf = true;
          console.log("dtrgdgfdd")
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }

  finishModuleCall(
    finishJSONBody,
    submoduleId,
    routeNavigate,
    routeNavigateFirst
  ) {
    this.Module1Service.finishSubmodule(finishJSONBody).subscribe(
      data => {
        if (data["message"] == "submodule finish next uuid is") {
          window.localStorage.setItem("uuid", data["data"].nextuuid);
          this.startPdf = false;
          // setTimeout(() => {
            this.start();
          // }, 300);
        } else if (data["message"] == "submodule finish") {
          var id = (submoduleId + 1).toString();
          window.localStorage.setItem("mainFlagModule1", id);
          window.localStorage.setItem("uuid", data["data"].nextuuid);

          var url = (data["data"].parenturl);
          var current1 = [];
          current1 = JSON.parse(window.localStorage.getItem("currentJson1"));
          var child = {};
          var index = current1["children"].findIndex(
            item => item.source == "module 1.9"
          );
          current1["children"][index].url = url;
          window.localStorage.setItem("currentJson1", JSON.stringify(current1));

          if (submoduleId == 9) {
            this.Module1Service.setLocalStorage1(id);
            window.localStorage.setItem('source', 'module 1.10.1');

            var obj = {
              type: "submodule",
              route: true,
              current: this.translate.instant("L2Module1.subMenu1-9"),
              next: this.translate.instant("L2Module1Finish.subMenu1-10"),
              nextRoute: "/modules/module1/Module1.10"
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


  showVideo(src, title,value) {
    if (value == 1)
    {
      this.passValues['url'] = src;
      this.thumb_title = title;
      this.flag = value;
    } else if (value == 2)
    {
      this.passValues['url'] = src;
      this.thumb_title = title;
      this.flag = value;
    }

  }
}
