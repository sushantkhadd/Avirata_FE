import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Module1Service } from './module1.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/language.service';
import { FullLayoutService } from 'src/app/layouts/full-layout.service';
import { Router } from '@angular/router';
import { LocalstoragedetailsService } from 'src/app/services/localstoragedetails.service';
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: "app-module1-11",
  templateUrl: "./module1-11.component.html"
})
export class Module111Component implements OnInit {
  mainFlagModule1;
  subFlagModule1;
  startPdf;
  flag;
  audioSrc = {};
  passValues = {};
  thumb_title;
  docData = {};
  urlArray = {};

  constructor(
    public Module1Service: Module1Service,
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
    this.mainFlagModule1 = parseInt(
      window.localStorage.getItem("mainFlagModule1")
    );
    this.subFlagModule1 = parseInt(
      window.localStorage.getItem("subFlagModule1")
    );

    if (this.mainFlagModule1 < 5) {
    } else if (this.mainFlagModule1 == 5) {
      // this.startEvent();
    } else if (this.mainFlagModule1 > 5) {
      this.passValues["unlockView"] = "static";
      var unlockJson = {}
      unlockJson = JSON.parse(window.localStorage.getItem('currentJson1'))
      if (unlockJson['children'].length > 0)
      {
        var index = unlockJson['children'].findIndex(item =>
          item.source == "module 1.11");

        if (unlockJson['children'][index].url != null)
        {
          this.passValues['url'] = unlockJson['children'][index].url
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
    this.docData["apiurl"] = "moduleonecfustart/";
    this.docData["apiurlResult"] = "moduleonecfustart/";
    this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 1.11', window.localStorage.getItem('username'), 10);
  }

  checkAnswer(e) {
    var current5 = [];
    current5 = JSON.parse(window.localStorage.getItem("currentJson1"));
    var index = current5["children"].findIndex(
      item => item.source == "module 1.11"
    );
    this.audioSrc["state"] = "static";
    current5["children"][index].url = e["url"];
    window.localStorage.setItem("currentJson5", JSON.stringify(current5));
    this.mainFlagModule1 = 12;
    window.localStorage.setItem("mainFlagModule5", "12");
    window.localStorage.setItem("subFlagModule5", "1");
    window.localStorage.setItem("source", "module 1.12");
    this.Module1Service.setLocalStorage1(6);
    var obj = {
      type: "submodule",
      route: true,
      current: this.translate.instant("L2Module1.subMenu11-11"),
      next: this.translate.instant("L2Module1Finish.subMenu1-12"),
      nextRoute: "/modules/module1/Module1.12"
    };
    this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
  }
}