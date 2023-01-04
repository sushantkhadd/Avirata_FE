import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "src/app/language.service";
import { FullLayoutService } from "src/app/layouts/full-layout.service";
import { Router } from "@angular/router";
import { LocalstoragedetailsService } from "src/app/services/localstoragedetails.service";
import { ToastsManager } from "ng6-toastr";
import { Module1Service } from "./module1.service";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-module1-14",
  templateUrl: "./module1-14.component.html"
})
export class Module114Component implements OnInit {

  constructor(public Module1Service: Module1Service, public translate: TranslateService, public LanguageService: LanguageService, public FullLayoutService: FullLayoutService, public router: Router, public LocalstoragedetailsService: LocalstoragedetailsService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  answer;
  question;
  public mainFlagModule1;
  subFlagModule1;
  questionid; trimFlag; showLimit; postWordCount; startFlag
  ngOnInit() {
    this.answer = "";
    this.question = "";
    this.postWordCount = 0;
    console.log('count', this.postWordCount)
    this.mainFlagModule1 = parseInt(
      window.localStorage.getItem("mainFlagModule1")
    );
    this.subFlagModule1 = parseInt(
      window.localStorage.getItem("subFlagModule1")
    );

    if (this.mainFlagModule1 == 14) {
      this.startFlag = false;
      // this.startEvent();
    }
  }

  ngDoCheck() {

    if (this.answer) {
      this.postWordCount = this.answer.trim().split(/\s+/).length;
      if(this.postWordCount == 0 || this.postWordCount > 150){
        this.showLimit=false
      }
      else if(this.postWordCount >=5){
        this.showLimit=true
      }

    }

    if (this.answer != null && this.answer != "" && this.answer != undefined) {
      if (this.answer.trim().length == 0) {
        this.trimFlag = true;
      } else if (this.postWordCount > 150 || this.postWordCount < 5) {
        this.trimFlag = true;
      } else {
        this.trimFlag = false;
      }
    }
    else{
      if (this.answer == "" || this.answer == null || this.answer == undefined){
        this.postWordCount = 0;
      }
    }
  }

  startEvent() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["useranswer"] = "";
    jsonBody["event"] = "start";
    var apiUrl = "l4module1freetext/";
    this.apiCall(jsonBody, apiUrl, "start");
  }

  finish() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    var ansJson = {};
    ansJson[this.questionid] = (this.answer).trim();
    jsonBody["useranswer"] = ansJson;
    jsonBody["event"] = "answer";
    var apiUrl = "l4module1freetext/";
    this.apiCall(jsonBody, apiUrl, "finish");
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module1Service.apiCall(jsonBody, apiUrl)
      .subscribe(
      data => {
        if (data['status'] == true) {
          if (fun == 'start') {
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 1.14', window.localStorage.getItem('username'), 10);
            this.startFlag = true;
            this.question = data["data"]["questionlist"][0].question;
            this.questionid = data["data"]["questionlist"][0].questionid;
          }
          else if (fun == "finish") {
            this.mainFlagModule1 = 15;
            window.localStorage.setItem(
              "uuid",
              data["data"].nextuuid
            );
            window.localStorage.setItem("mainFlagModule1", "15");
            window.localStorage.setItem("subFlagModule1", "1");
            window.localStorage.setItem("source", "module 1.15");
            this.Module1Service.setLocalStorage1(15);
            var obj = {
              type: "submodule",
              route: true,
              current: this.translate.instant(
                "L2Module1.subMenu1-14"
              ),
              next: this.translate.instant(
                "L2Module1Finish.subMenu1-15"
              ),
              nextRoute: "/modules/module1/Module1.15"
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
