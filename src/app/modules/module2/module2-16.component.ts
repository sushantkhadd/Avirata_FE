import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import {Module2Service} from './module2.service'
import { FullLayoutService } from '../../layouts/full-layout.service';

@Component({
  selector: 'app-module2-16',
  templateUrl: './module2-16.component.html'
})
export class Module216Component implements OnInit {
  constructor(
    public Module2Service: Module2Service,
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
  answer3;
  answer4;

  question1;
  question2;
  question3;
  question4;

  public mainFlagModule2;
  subFlagModule2;
  questionid1;
  questionid2;
  questionid3;
  questionid4;
  startPdf;
  passValues = {};
  nextFlag;
  trimFlag;
  public download; link; showCFU; apiUrl;finalCount;
  public inst =
    "विद्यार्थ्यांच्या डाव्या मेंदू इतकीच चालना विद्यार्थ्यांच्या उजव्या मेंदूला देखील मिळावी  यासाठी तुम्ही कोणते उपक्रम घ्याल? कोणतीही एक संकल्पना निवडून त्याबाबत उजव्या मेंदूला चालना मिळण्याच्या दृष्टीने काय उपक्रम घ्याल ते लिहा. पुढे दोन उदाहरणे  दिली आहेत. त्या आधारे आपल्या स्वतःच्या विषयासंदर्भात विचार करून लिहा.";
  ngOnInit() {
    this.answer1 = "";
    this.answer2 = "";
    this.answer3 = "";
    this.answer4 = "";

    this.question1 = "";
    this.question2 = "";
    this.question3 = "";
    this.question4 = "";
    this.nextFlag = false;
    this.mainFlagModule2 = parseInt(
      window.localStorage.getItem("mainFlagModule2")
    );
    this.subFlagModule2 = parseInt(
      window.localStorage.getItem("subFlagModule2")
    );
  }

  ngDoCheck() {
    if (
      this.answer1.trim().length == 0 ||
      this.answer2.trim().length == 0 ||
      this.answer3.trim().length == 0 ||
      this.answer4.trim().length == 0
    ) {
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
    var apiUrl = "l3freetext/";
    this.apiCall(jsonBody, apiUrl, "start");
  }

  finishPDF(e) {
    if (e == true) {
      this.nextFlag = true;
    }
  }

  finish() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    var ansJson = {};
    ansJson[this.questionid1] = (this.answer1).trim();
    ansJson[this.questionid2] = (this.answer2).trim();
    ansJson[this.questionid3] = (this.answer3).trim();
    ansJson[this.questionid4] = (this.answer4).trim();

    jsonBody["useranswer"] = ansJson;
    jsonBody["event"] = "answer";
    console.log(jsonBody);
    var apiUrl = "l3freetext/";
    this.apiCall(jsonBody, apiUrl, "finish");
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module2Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "start") {
            this.question1 = data["data"]["questionlist"][0].question;
            this.question2 = data["data"]["questionlist"][1].question;
            this.question3 = data["data"]["questionlist"][2].question;
            this.question4 = data["data"]["questionlist"][3].question;

            this.questionid1 = data["data"]["questionlist"][0].questionid;
            this.questionid2 = data["data"]["questionlist"][1].questionid;
            this.questionid3 = data["data"]["questionlist"][2].questionid;
            this.questionid4 = data["data"]["questionlist"][3].questionid;

            this.passValues["url"] = data["data"].url;
            this.startPdf = true;
            console.log(this.passValues["url"], data);
          
          } else if (fun == "finish") {
            this.mainFlagModule2 = 17;
            window.localStorage.setItem("subFlagModule1", "1");
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            window.localStorage.setItem("mainFlagModule2", "17");
            window.localStorage.setItem("subFlagModule1", "1");
            window.localStorage.setItem("source", "module 1.17.1");
            this.Module2Service.setLocalStorage2(21);
            var obj = {
              type: "submodule",
              route: true,
              current: this.translate.instant("L2Module2.subMenu2-16"),
              next: this.translate.instant("L2Module2.subMenu2-17"),
              nextRoute: "/modules/module2/Module2.17"
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
