import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Module5Service } from "./module5.service";
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "src/app/language.service";
import { FullLayoutService } from "src/app/layouts/full-layout.service";
import { Router } from "@angular/router";
import { LocalstoragedetailsService } from "src/app/services/localstoragedetails.service";
import { ToastsManager } from "ng6-toastr";

@Component({
  selector: "app-module5-2",
  templateUrl: "./module5-2.component.html"
})
export class Module52Component implements OnInit {
  mainFlagModule5;
  subFlagModule5;
  startPdf; flag; audioSrc = {}; passValues = {}; thumb_title;
  docData = {}; urlArray = {};

  constructor(
    public Module5Service: Module5Service,
    public translate: TranslateService,
    public LanguageService: LanguageService,
    public FullLayoutService: FullLayoutService,
    public router: Router,
    public LocalstoragedetailsService: LocalstoragedetailsService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.mainFlagModule5 = parseInt(
      window.localStorage.getItem("mainFlagModule5")
    );
    this.subFlagModule5 = parseInt(
      window.localStorage.getItem("subFlagModule5")
    );

    if (this.mainFlagModule5 < 2) {
    } else if (this.mainFlagModule5 == 2) {
      // this.startEvent();
    } else if (this.mainFlagModule5 > 2)
    {
      this.flag = 0;
      var urlJson = {};
      this.audioSrc["state"] = "static";
      urlJson = JSON.parse(window.localStorage.getItem("currentJson5"));
      console.log("vcxxxx", urlJson)
      if (urlJson["children"].length > 0)
      {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 5.2"
        );
        console.log("qWSS", index)
        var mainJson;
        mainJson = JSON.parse(urlJson["children"][index].url);
        console.log("hjbhjb", mainJson["1"])
        if (mainJson != null)
        {
          this.urlArray["src1"] = mainJson["5.2.1"];
          this.urlArray["src2"] = mainJson["5.2.2"];
        }
      }
    }
  }

  startEvent() {
    this.startPdf = true;
    this.docData["state"] = "dyanamic";
    this.docData["download"] = false;
    this.docData["link"] = "";
    this.docData["finalcount"] = 4;
    this.docData["showcfu"] = true;
    this.docData["apiurl"] = "modulefivecfustart/";
    this.docData["apiurlResult"] = "modulefivecfustart/";
  }

  checkAnswer(e) {
    var current5 = [];
    current5 = JSON.parse(window.localStorage.getItem("currentJson5"));
    var index = current5["children"].findIndex(
      item => item.source == "module 5.2"
    );
    this.audioSrc["state"] = "static";
    let dummyUrl = {};
    let dummyData = JSON.parse(e['url'])
    dummyUrl['5.2.1'] = dummyData["1"];
    dummyUrl["5.2.2"] = dummyData["2"];
    current5["children"][index].url = JSON.stringify(dummyUrl);
    window.localStorage.setItem("currentJson5", JSON.stringify(current5));
    this.mainFlagModule5 = 3;
    window.localStorage.setItem("mainFlagModule5", "3");
    window.localStorage.setItem("subFlagModule5", "1");
    window.localStorage.setItem("source", "module 5.3");
    this.Module5Service.setLocalStorage5(3);
    var obj = {
      type: "submodule",
      route: true,
      current: this.translate.instant("L2Module5.subMenu5-2"),
      next: this.translate.instant("L2Module5.subMenu5-3"),
      nextRoute: "/modules/module5/Module5.3"
    };
    this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
  }

  showVideo(src, title, value) {
   if (value == 1)
    {
      this.passValues["url"] = src;
      this.thumb_title = title;
      this.flag = value;
      this.passValues["unlockView"] = "static";
    }else if (value == 2)
    {
      this.audioSrc['url'] = src;
      this.audioSrc["unlockView"] = "static";
      this.thumb_title = title;
      this.flag = value;
    }
  }
}
