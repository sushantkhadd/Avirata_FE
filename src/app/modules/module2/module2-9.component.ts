import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import {Module2Service} from './module2.service'
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-module2-9',
  templateUrl: './module2-9.component.html'
})
export class Module29Component implements OnInit {

  public mainFlagModule2 = parseInt(
    window.localStorage.getItem("mainFlagModule2")
  );
  public subFlagModule2 = parseInt(
    window.localStorage.getItem("subFlagModule2")
  );

  constructor(
    public LanguageService: LanguageService,
    public LocalstoragedetailsService: LocalstoragedetailsService,
    public Module2Service: Module2Service,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public router: Router,
    public translate: TranslateService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  
  public data; questionType; passFlags = {}; showAnswer; saveData; answer;
  sumbitButton; startFlag; inst ="दिलेल्या उदाहरणांमध्ये शिक्षक / पालक वागले ते योग्य होते का?";
  ngOnInit() {
    this.startFlag = false;
    this.showAnswer = true;
    this.saveData = true;
    this.passFlags["saveData"] = this.saveData;
    this.passFlags["showAnswer"] = this.showAnswer;
    this.questionType = "mcqTextOption";
    this.passFlags["questionType"] = this.questionType;

    if (this.mainFlagModule2 == 9)
    {
      // this.start()
    }
  }

  start() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["useranswer"] = "";
    jsonBody["event"] = "start";
    var apiUrl = "l4moduletwomcq/";

    this.Module2Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true)
        {
          this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 2.9', window.localStorage.getItem('username'), 10);
          console.log("data ", data["data"]);
          this.data = data["data"];
          this.startFlag = true;
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }

  saveAnswer(e) {
    this.sumbitButton = true;
    this.answer = e;
    this.submit();
  }

  submit() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["useranswer"] = this.answer;
    jsonBody["event"] = "answer";
    var apiUrl = "l4moduletwomcq/";

    this.Module2Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (
          data["status"] == true &&
          data["message"] == "your answer stored next question and uuid is"
        )
        {
          window.localStorage.setItem("uuid", data["data"].nextuuid);
          this.subFlagModule2 = this.subFlagModule2 + 1;
          window.localStorage.setItem(
            "subFlagModule2",
            this.subFlagModule2.toString()
          );
          this.data = data["data"];
          this.sumbitButton = false;
        } else if (
          data["status"] == true &&
          data["message"] == "submodule finish"
        )
        {
          this.startFlag = false;
          window.localStorage.setItem("uuid", data["data"].nextuuid);
          this.mainFlagModule2 = 10;
          window.localStorage.setItem("mainFlagModule2", "10");
          window.localStorage.setItem("subFlagModule2", "1");
          window.localStorage.setItem('source', 'module 2.10');
          var obj = {
            "type": "submodule",
            "route": true,
            "current": this.translate.instant("L2Module2.subMenu2-9"),
            "next": this.translate.instant("L2Module2Finish.subMenu2-10"),
            "nextRoute": "/modules/module2/Module2.10"
          };
          this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
          this.Module2Service.setLocalStorage2(10);
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }

}
