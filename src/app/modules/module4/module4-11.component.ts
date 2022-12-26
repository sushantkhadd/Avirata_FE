import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Module4Service } from './module4.service'

@Component({
  selector: 'app-module4-11',
  templateUrl: './module4-11.component.html'
})
export class Module411Component implements OnInit {

  public mainFlagModule4 = parseInt(window.localStorage.getItem('mainFlagModule4'));
  public subFlagModule4 = parseInt(window.localStorage.getItem('subFlagModule4'));
  constructor(public LanguageService: LanguageService, public LocalstoragedetailsService: LocalstoragedetailsService, public Module4Service: Module4Service, public toastr: ToastsManager, vcr: ViewContainerRef, public router: Router, public translate: TranslateService) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  public data; questionType; passFlags = {}; showAnswer; saveData; answer; sumbitButton; startFlag; description;
  public inst = "खालील व्यक्ती समायोजित आहेत की नाही त्याबद्दल योग्य पर्याय निवडा."
  ngOnInit() {
    this.startFlag = false;
    this.showAnswer = true;
    this.saveData = true;
    this.passFlags['saveData'] = this.saveData;
    this.passFlags['showAnswer'] = this.showAnswer;
    this.questionType = "mcqTextOption";
    this.passFlags['questionType'] = this.questionType;

    if (this.mainFlagModule4 == 11) {
      // this.start()
    }
  }

  start() {

    console.log("mcq 4");
    var jsonBody = {};
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['useranswer'] = ""
    jsonBody['event'] = 'start';
    var apiUrl = "modulefourmcq/";

    this.Module4Service.apiCall(jsonBody, apiUrl)
      .subscribe(
        data => {
          if (data['status'] == true) {
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 4.11', window.localStorage.getItem('username'), 10);
            console.log("data ", data['data'])
            this.data = data['data']
            this.startFlag = true;
          }
        },
        error => {
          this.LanguageService.handleError(error.error.message);
        });
  }

  saveAnswer(e) {
    console.log("ff ", e)
    this.sumbitButton = true;
    this.answer = e;
    this.submit();
  }
  submit() {

    var jsonBody = {}

    jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['useranswer'] = this.answer
    jsonBody['event'] = 'answer';
    var apiUrl = "modulefourmcq/";
    console.log("dasd ", jsonBody)

    this.Module4Service.apiCall(jsonBody, apiUrl)
      .subscribe(
        data => {
          if (data['status'] == true && data['message'] == "your answer stored next question and uuid is") {
            window.localStorage.setItem('uuid', data['data'].nextuuid);
            this.subFlagModule4 = this.subFlagModule4 + 1
            window.localStorage.setItem('subFlagModule4', this.subFlagModule4.toString())
            console.log("data ", data['data'])
            this.data = data['data']
            this.sumbitButton = false;
            this.description = data['data'].description;
          } else if (data['status'] == true && data['message'] == "submodule finish") {
            this.description = data['data'].description;
            this.startFlag = false;
            window.localStorage.setItem('uuid', data['data'].nextuuid);
            this.mainFlagModule4 = 12;
            window.localStorage.setItem('mainFlagModule4', '12');
            window.localStorage.setItem('subFlagModule4', '1');
            window.localStorage.setItem('source', 'module 4.12.1');
            var obj = {
              "type": "submodule",
              "route": true,
              "current": this.translate.instant('L2Module4.subMenu4-11'),
              "next": this.translate.instant('L2Module4Finish.subMenu4-12'),
              "nextRoute": "/modules/module4/Module4.12"
            }
            this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
            this.Module4Service.setLocalStorage4(12);
          }
        },
        error => {
          this.LanguageService.handleError(error.error.message);
        });

  }
}
