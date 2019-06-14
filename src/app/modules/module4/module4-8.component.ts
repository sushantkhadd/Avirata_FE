import { Component, OnInit, ViewChild } from '@angular/core';
import { FullLayoutService } from 'src/app/layouts/full-layout.service';
import { LanguageService } from 'src/app/language.service';
import { LocalstoragedetailsService } from 'src/app/services/localstoragedetails.service';
import { Router } from '@angular/router';
import { Module4Service } from './module4.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalDirective } from 'ngx-bootstrap';
import { Options } from 'ng5-slider';

@Component({
  selector: "app-module4-8",
  templateUrl: "./module4-8.component.html"
})
export class Module48Component implements OnInit {
  @ViewChild("ratingModal") public ratingModal: ModalDirective;

  public mainFlagModule4 = parseInt(
    window.localStorage.getItem("mainFlagModule4")
  );
  public subFlagModule4 = parseInt(
    window.localStorage.getItem("subFlagModule4")
  );
  public token;
  startVideoEvent;
  public passData = {}; //used when CFU completed
  public videoData = {};
  passUrl;
  trimFlag;
  mainQuestion;
  assignData;
  statementlist;
  answer1;
  answer2;
  answer3;
  answer4;
  answer5;
  question1;
  question2;
  question3;
  question4;
  question5;
  description;
  overallRating;

  options: Options = {
    showTicksValues: true,
    showSelectionBar: true,
    stepsArray: [
      { value: 0 },
      { value: 1 },
      { value: 2 },
      { value: 3 },
      { value: 4 },
      { value: 5 },
      { value: 6 },
      { value: 7 },
      { value: 8 },
      { value: 9 },
      { value: 10 }
    ]
  };

  public currentSource = window.localStorage.getItem("source");

  constructor(
    public FullLayoutService: FullLayoutService,
    public LanguageService: LanguageService,
    public LocalstoragedetailsService: LocalstoragedetailsService,
    private router: Router,
    public Module4Service: Module4Service,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.options.stepsArray.forEach(ele => {
      console.log(ele)
    })
    this.passUrl = "IkzkQ-Xft4c";
    this.currentSource = window.localStorage.getItem("source");
    this.startVideoEvent = false;

    this.answer1 = "";
    this.answer2 = "";
    this.answer3 = "";
    this.answer4 = "";
    this.answer5 = "";

    this.token = this.LocalstoragedetailsService.token;
    if (this.token == null) {
      this.router.navigate(["/"]);
    }

    if (this.mainFlagModule4 == 8) {
      this.startEvent();
    }
    if (this.mainFlagModule4 < 8) {
    } else if (this.mainFlagModule4 == 8) {
      this.startVideoEvent = false;
      this.videoData["apiUrl"] = "modulefourcfustart/";
    } else if (this.mainFlagModule4 > 8) {
      this.passData["apiUrl"] = "";
      this.passData["status"] = false; //first time call

      if (this.FullLayoutService.currentJson4.length > 0) {
        var index = this.FullLayoutService.currentJson4.findIndex(
          item => item.source == "module 4.9"
        );
        if (this.FullLayoutService.currentJson4[index].url != null) {
          this.passData["videoUrl"] = this.FullLayoutService.currentJson4[
            index
          ].url;
        } else {
          this.passData["videoUrl"] = this.passUrl;
        }
      } else {
        this.passData["videoUrl"] = this.passUrl;
      }
    }
  }

  startEvent() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["useranswer"] = "";
    jsonBody["score"] = "";
    jsonBody["event"] = "start";
    var apiUrl = "modulefourmcqrating/";
    this.apiCall(jsonBody, apiUrl, "start");
  }

  submit() {
    this.overallRating =
      this.answer1 + this.answer2 + this.answer3 + this.answer4 + this.answer5;
    this.ratingModal.show();
    this.LanguageService.toShow();
  }

  next() {
    var jsonBody = {};
    var apiUrl = "modulefourmcqrating/";
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    var ansJson = {};
    ansJson[this.statementlist[0].statementid] = this.answer1;
    ansJson[this.statementlist[1].statementid] = this.answer2;
    ansJson[this.statementlist[2].statementid] = this.answer3;
    ansJson[this.statementlist[3].statementid] = this.answer4;
    ansJson[this.statementlist[4].statementid] = this.answer5;
    jsonBody["useranswer"] = ansJson;
    jsonBody["event"] = "answer";
    jsonBody["score"] = this.overallRating.toString();
    console.log(ansJson, jsonBody);
    this.apiCall(jsonBody, apiUrl, "finish");
  }

  ngDoCheck() {
    if (
      this.answer1 == "" ||
      this.answer2 == "" ||
      this.answer3 == "" ||
      this.answer4 == "" ||
      this.answer5 == ""
    ) {
      this.trimFlag = true;
    } else {
      this.trimFlag = false;
    }
  }
  apiCall(jsonBody, apiUrl, fun) {
    this.Module4Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "start") {
            // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 1.1', window.localStorage.getItem('username'), 10);
            this.assignData = data["data"];
            this.mainQuestion = this.assignData.question;
            this.description = this.assignData.description;
            this.statementlist = this.assignData.statementlist;
            this.question1 = this.statementlist[0].statement;
            this.question2 = this.statementlist[1].statement;
            this.question3 = this.statementlist[2].statement;
            this.question4 = this.statementlist[3].statement;
            this.question5 = this.statementlist[4].statement;
            console.log(data);
          } else if (fun == "finish") {
            this.ratingModal.hide();
            this.LanguageService.toHide();
            this.mainFlagModule4 = 12;
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            window.localStorage.setItem("mainFlagModule4", "9");
            window.localStorage.setItem("subFlagModule4", "1");
            window.localStorage.setItem("source", "module 4.9");
            this.Module4Service.setLocalStorage4(12);
            var obj = {
              type: "submodule",
              route: true,
              current: this.translate.instant("L2Module4.subMenu4-8"),
              next: this.translate.instant("L2Module4.subMenu4-9"),
              nextRoute: "/modules/module4/Module4.9"
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
  start() {
    // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 1.2', window.localStorage.getItem('username'), 10);
  }
}
