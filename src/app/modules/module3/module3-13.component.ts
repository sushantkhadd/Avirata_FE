import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Module3Service } from './module3.service'
import { FullLayoutService } from '../../layouts/full-layout.service'

@Component({
  selector: 'app-module3-13',
  templateUrl: './module3-13.component.html'
})
export class Module313Component implements OnInit {
  @ViewChild('staticImageModal') public staticImageModal: ModalDirective;
  @ViewChild('instructionModal') public instructionModal: ModalDirective;

  public mainFlagModule3 = parseInt(window.localStorage.getItem('mainFlagModule3'));
  public subFlagModule3 = parseInt(window.localStorage.getItem('subFlagModule3'));

  constructor(public Module3Service: Module3Service, public translate: TranslateService, public LanguageService: LanguageService, public FullLayoutService: FullLayoutService, public router: Router, public LocalstoragedetailsService: LocalstoragedetailsService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  answer;
  question;
  questionid; trimFlag; showLimit; postWordCount; startFlag
  ngOnInit() {
    this.answer = "";
    this.question = "";
    this.postWordCount = 0;
    if (this.mainFlagModule3 == 13) {
      this.startFlag = false;
      // this.startEvent();
    }
  }

  ngDoCheck() {

    if (this.answer) {
      this.postWordCount = this.answer.trim().split(/\s+/).length;
      if (this.postWordCount == 0 || this.postWordCount > 150) {
        this.showLimit = false
      }
      else if (this.postWordCount >= 5) {
        this.showLimit = true
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
    else {
      if (this.answer == "" || this.answer == null || this.answer == undefined) {
        this.postWordCount = 0;
      }
    }
  }

  startEvent() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["useranswer"] = "";
    jsonBody["event"] = "start";
    var apiUrl = "l4module3freetext/";
    this.apiCall(jsonBody, apiUrl, "start");
  }

  finish() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    var ansJson = {};
    ansJson[this.questionid] = (this.answer).trim();
    jsonBody["useranswer"] = ansJson;
    jsonBody["event"] = "answer";
    var apiUrl = "l4module3freetext/";
    this.apiCall(jsonBody, apiUrl, "finish");
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module3Service.apiCall(jsonBody, apiUrl)
      .subscribe(
        data => {
          if (data['status'] == true) {
            if (fun == 'start') {
              this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 3.14', window.localStorage.getItem('username'), 10);
              this.startFlag = true;
              this.question = data["data"]["questionlist"][0].question;
              this.questionid = data["data"]["questionlist"][0].questionid;
            }
            else if (fun == "finish") {
              this.mainFlagModule3 = 14;
              window.localStorage.setItem("subFlagModule3", "1");
              window.localStorage.setItem(
                "uuid",
                data["data"].nextuuid
              );
              window.localStorage.setItem("mainFlagModule3", "14");
              window.localStorage.setItem("subFlagModule3", "1");
              window.localStorage.setItem("source", "module 1.14.1");
              this.Module3Service.setLocalStorage3(14);
              var obj = {
                type: "submodule",
                route: true,
                current: this.translate.instant(
                  "L2Module3.subMenu3-13"
                ),
                next: this.translate.instant(
                  "L2Module3Finish.subMenu3-14"
                ),
                nextRoute: "/modules/module3/Module3.14"
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
