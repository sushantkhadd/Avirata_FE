import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Module3Service } from '../module3/module3.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/language.service';
import { FullLayoutService } from 'src/app/layouts/full-layout.service';
import { Router } from '@angular/router';
import { LocalstoragedetailsService } from 'src/app/services/localstoragedetails.service';
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: "app-module3-3",
  templateUrl: "./module3-3.component.html"
})
export class Module33Component implements OnInit {
  constructor(
    public Module3Service: Module3Service,
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
  answer1;
  answer2;
  question1;
  question2;
  public mainFlagModule3;
  subFlagModule3;
  questionid1;
  questionid2;
  trimFlag;
  ngOnInit() {
    this.answer1 = "";
    this.answer2 = "";
    this.question1 = "";
    this.question2 = "";

    this.mainFlagModule3 = parseInt(
      window.localStorage.getItem("mainFlagModule3")
    );
    this.subFlagModule3 = parseInt(
      window.localStorage.getItem("subFlagModule3")
    );

    if (this.mainFlagModule3 == 3)
    {
      if (
        this.subFlagModule3 == 1 ||
        this.subFlagModule3 == 2 ||
        this.subFlagModule3 == 3
      ) {
        this.startEvent();
      }
    }
  }

  ngDoCheck() {
    if (this.answer1.trim().length == 0 || this.answer2.trim().length == 0) {
      this.trimFlag = true;
    } else {
      this.trimFlag = false;
    }
  }

  startEvent() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["useranswer"] = "";
    jsonBody["event"] = "start";
    var apiUrl = "l3module3freetext/";
    this.apiCall(jsonBody, apiUrl, "start");
  }

  reset() {
    this.answer1 = "";
    this.answer2 = "";
  }

  finish(val) {
    if (val == 1) {
      var jsonBody = {};
      jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
      var ansJson = {};
      ansJson[this.questionid1] = (this.answer1).trim();
      ansJson[this.questionid2] = (this.answer2).trim();
      jsonBody["useranswer"] = ansJson;
      jsonBody["event"] = "answer";
      var apiUrl = "l3module3freetext/";
      this.apiCall(jsonBody, apiUrl, "finish1");
    } else if (val == 2) {
      var jsonBody = {};
      jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
      var ansJson = {};
      ansJson[this.questionid1] = (this.answer1).trim();
      ansJson[this.questionid2] = (this.answer2).trim();
      jsonBody["useranswer"] = ansJson;
      jsonBody["event"] = "answer";
      var apiUrl = "l3module3freetext/";
      this.apiCall(jsonBody, apiUrl, "finish2");
    } else if (val == 3) {
      var jsonBody = {};
      jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
      var ansJson = {};
      ansJson[this.questionid1] = (this.answer1).trim();
      ansJson[this.questionid2] = (this.answer2).trim();
      jsonBody["useranswer"] = ansJson;
      jsonBody["event"] = "answer";
      var apiUrl = "l3module3freetext/";
      this.apiCall(jsonBody, apiUrl, "finish3");
    }
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module3Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "start") {
            this.question1 = data["data"]["questionlist"][0].question;
            this.question2 = data["data"]["questionlist"][1].question;
            this.questionid1 = data["data"]["questionlist"][0].questionid;
            this.questionid2 = data["data"]["questionlist"][1].questionid;
            console.log(data);
          } else if (fun == "finish1")
          {
            this.mainFlagModule3 = 3;
            window.localStorage.setItem(
              "uuid",
              data["data"].nextuuid
            );
            console.log(data);
            this.subFlagModule3 = 2;
            window.localStorage.setItem("subFlagModule3", "2");
            this.reset();
            this.question1 = data["data"]["questionlist"][0].question;
            this.question2 = data["data"]["questionlist"][1].question;
            this.questionid1 = data["data"]["questionlist"][0].questionid;
            this.questionid2 = data["data"]["questionlist"][1].questionid;
            // this.startEvent();
          }
          else if (fun == "finish2")
          {
            this.mainFlagModule3 = 3;
            window.localStorage.setItem(
              "uuid",
              data["data"].nextuuid
            );
            console.log(data);
            this.subFlagModule3 = 3;
            window.localStorage.setItem("subFlagModule3", "3");
            this.reset();
            this.question1 = data["data"]["questionlist"][0].question;
            this.question2 = data["data"]["questionlist"][1].question;
            this.questionid1 = data["data"]["questionlist"][0].questionid;
            this.questionid2 = data["data"]["questionlist"][1].questionid;
            // this.startEvent();
          }
          else if (fun == "finish3")
          {
            window.localStorage.setItem(
              "uuid",
              data["data"].nextuuid
            );
            this.mainFlagModule3 = 4;
            window.localStorage.setItem("subFlagModule3", "1");
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            window.localStorage.setItem("mainFlagModule3", "4");
            window.localStorage.setItem("subFlagModule3", "1");
            window.localStorage.setItem("source", "module 3.4.1");
            this.Module3Service.setLocalStorage3(4);
            var obj = {
              type: "submodule",
              route: true,
              current: this.translate.instant("L2Module3.subMenu3-3"),
              next: this.translate.instant("L2Module3.subMenu3-4"),
              nextRoute: "/modules/module3/Module3.4"
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
