import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Module5Service } from './module5.service'
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'app-module5-7',
  templateUrl: './module5-7.component.html'
})
export class Module57Component implements OnInit {
  public mainFlagModule5 = parseInt(
    window.localStorage.getItem("mainFlagModule5")
  );
  public subFlagModule5 = parseInt(
    window.localStorage.getItem("subFlagModule5")
  );
  lastAnsKey;
  constructor(
    public LanguageService: LanguageService,
    public LocalstoragedetailsService: LocalstoragedetailsService,
    public Module5Service: Module5Service,
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

    if (this.mainFlagModule5 == 7) {
      // this.start()
    }
  }

  start() {
    this.startFlagmcq = false
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["useranswer"] = "";
    jsonBody["event"] = "start";
    var apiUrl = "modulefivecmcq/";

    this.Module5Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 5.7', window.localStorage.getItem('username'), 10);
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
    var apiUrl = "modulefivecmcq/";
    console.log("dasd ", jsonBody);

    this.Module5Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (
          data["status"] == true &&
          data["message"] == "your answer stored next question and uuid is"
        ) {
          window.localStorage.setItem("uuid", data["data"].nextuuid);
          this.subFlagModule5 = this.subFlagModule5 + 1;
          window.localStorage.setItem(
            "subFlagModule1",
            this.subFlagModule5.toString()
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
          this.mainFlagModule5 = 8;
          window.localStorage.setItem("mainFlagModule5", "8");
          window.localStorage.setItem("subFlagModule5", "1");
          window.localStorage.setItem('source', 'module 5.8');
          var obj = {
            "type": "submodule",
            "route": true,
            "current": this.translate.instant("L2Module5.subMenu5-8"),
            "next": this.translate.instant("L2Module0Finish.subMenu5-8"),
            "nextRoute": "/modules/module5/Module5.8"
          };
          this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
          this.Module5Service.setLocalStorage5(8);
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }

}