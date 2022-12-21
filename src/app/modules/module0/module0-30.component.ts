import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Module0Service } from './module0.service'
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'app-module0-30',
  templateUrl: './module0-30.component.html'
})
export class Module030Component implements OnInit {
  public mainFlagModule0 = parseInt(
    window.localStorage.getItem("mainFlagModule0")
  );
  public subFlagModule0 = parseInt(
    window.localStorage.getItem("subFlagModule0")
  );
  lastAnsKey;
  constructor(
    public LanguageService: LanguageService,
    public LocalstoragedetailsService: LocalstoragedetailsService,
    public Module0Service: Module0Service,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public router: Router,
    public translate: TranslateService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  public data;
  questionType;
  passFlags = {};
  showAnswer;
  saveData;
  answer;
  sumbitButton;
  startFlag;
  startFlagmcq: boolean
  public inst =
    "पुढे दिलेले विचार अविवेकी आहेत. ते कोणत्या प्रकारात मोडतात ते सांगा.";
  ngOnInit() {
    this.startFlag = false;
    this.showAnswer = true;
    this.saveData = true;
    this.passFlags["saveData"] = this.saveData;
    this.passFlags["showAnswer"] = this.showAnswer;
    this.questionType = "mcqTextOption";
    this.passFlags["questionType"] = this.questionType;

    if (this.mainFlagModule0 == 30) {
      // this.start()
    }
  }

  start() {
    this.startFlagmcq = false
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["useranswer"] = "";
    jsonBody["event"] = "start";
    var apiUrl = "modulezeromcq/";

    this.Module0Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 0.30', window.localStorage.getItem('username'), 10);
          console.log("data ", data["data"]);
          this.data = data["data"];
          this.startFlag = true;
          this.startFlagmcq = true
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }

  saveAnswer(e) {
    this.answer = '';
    this.sumbitButton = true;
    this.answer = e;
    this.submit();
  }
  submit() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["useranswer"] = this.answer;
    jsonBody["event"] = "answer";
    var apiUrl = "modulezeromcq/";
    console.log("dasd ", jsonBody);

    this.Module0Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (
          data["status"] == true &&
          data["message"] == "your answer stored next question and uuid is"
        ) {
          window.localStorage.setItem("uuid", data["data"].nextuuid);
          this.subFlagModule0 = this.subFlagModule0 + 1;
          window.localStorage.setItem(
            "subFlagModule1",
            this.subFlagModule0.toString()
          );
          console.log("data ", data["data"]);
          this.data = data["data"];
          this.sumbitButton = false;
        } else if (
          data["status"] == true &&
          data["message"] == "submodule finish"
        ) {
          this.startFlag = false;
          window.localStorage.setItem("uuid", data["data"].nextuuid);
          this.mainFlagModule0 = 31;
          window.localStorage.setItem("mainFlagModule0", "31");
          window.localStorage.setItem("subFlagModule0", "1");
          window.localStorage.setItem('source', 'module 0.31');
          var obj = {
            "type": "submodule",
            "route": true,
            "current": this.translate.instant("L2Module0.subMenu1-31"),
            "next": this.translate.instant("L2Module0Finish.subMenu0-31"),
            "nextRoute": "/modules/module1/Module0.31"
          };
          this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
          this.Module0Service.setLocalStorage0(5);
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }

}