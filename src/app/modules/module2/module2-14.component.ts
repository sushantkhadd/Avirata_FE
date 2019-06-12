import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { LanguageService } from 'src/app/language.service';
import { LocalstoragedetailsService } from 'src/app/services/localstoragedetails.service';
import { Module2Service } from './module2.service';
import { ToastsManager } from 'ng6-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {FullLayoutService} from '../../layouts/full-layout.service';

@Component({
  selector: 'app-module2-14',
  templateUrl: './module2-14.component.html'
})
export class Module214Component implements OnInit {
  constructor(public Module2Service: Module2Service, public translate: TranslateService, public LanguageService: LanguageService, public FullLayoutService: FullLayoutService, public router: Router, public LocalstoragedetailsService: LocalstoragedetailsService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  answer;
  question;
  public mainFlagModule2;
  subFlagModule2;
  questionid; trimFlag;
  ngOnInit() {
    this.answer = "";
    this.question = "";

    this.mainFlagModule2 = parseInt(
      window.localStorage.getItem("mainFlagModule2")
    );
    this.subFlagModule2 = parseInt(
      window.localStorage.getItem("subFlagModule2")
    );

    if (this.mainFlagModule2 == 14) {
      this.startEvent();
    }
  }

  ngDoCheck() {
    if (this.answer.trim().length == 0)
    {
      this.trimFlag = true;
    } else
    {
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

  finish() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    var ansJson = {};
    ansJson[this.questionid] = (this.answer).trim();
    jsonBody["useranswer"] = ansJson;
    jsonBody["event"] = "answer";
    var apiUrl = "l3freetext/";
    this.apiCall(jsonBody, apiUrl, "finish");
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module2Service.apiCall(jsonBody, apiUrl)
      .subscribe(
        data => {
          if (data['status'] == true)
          {
            if (fun == 'start')
            {
              this.question = data["data"]["questionlist"][0].question;
              this.questionid = data["data"]["questionlist"][0].questionid;
            }
            else if (fun == "finish")
            {
              this.mainFlagModule2 = 15;
              window.localStorage.setItem("subFlagModule2", "1");
              window.localStorage.setItem(
                "uuid",
                data["data"].nextuuid
              );
              window.localStorage.setItem("mainFlagModule2", "15");
              window.localStorage.setItem("subFlagModule2", "1");
              window.localStorage.setItem("source", "module 2.15.1");
              this.Module2Service.setLocalStorage2(15);
              var obj = {
                type: "submodule",
                route: true,
                current: this.translate.instant(
                  "L2Module2.subMenu2-14"
                ),
                next: this.translate.instant(
                  "L2Module2.subMenu2-15"
                ),
                nextRoute: "/modules/module2/Module2.15"
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
