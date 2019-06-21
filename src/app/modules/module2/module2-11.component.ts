import { Component, OnInit, ViewContainerRef} from '@angular/core';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {Module2Service} from './module2.service'
import { FullLayoutService } from '../../layouts/full-layout.service';
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'app-module2-11',
  templateUrl: './module2-11.component.html'
})
export class Module211Component implements OnInit {
  public mainFlagModule2 = parseInt(window.localStorage.getItem('mainFlagModule2'));
  public subFlagModule2 = parseInt(window.localStorage.getItem('subFlagModule2'));
  constructor(public LanguageService: LanguageService, public LocalstoragedetailsService: LocalstoragedetailsService, public Module2Service: Module2Service, public toastr: ToastsManager, vcr: ViewContainerRef, public router: Router, public translate: TranslateService) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  public data; questionType; passFlags = {}; showAnswer; saveData; answer=[]; sumbitButton; startFlag;
  public inst = "खालीलपैकी कोणती वाक्ये / कृती ह्या विद्यार्थ्यांच्या सामाजिक स्वीकाराच्या दृष्टीने उपयुक्त आहेत?"
  ngOnInit() {
    this.startFlag = false;
    console.log(this.startFlag)
    this.showAnswer = false;
    this.saveData = true;
    this.passFlags['saveData'] = this.saveData;
    this.passFlags['showAnswer'] = this.showAnswer;
    this.questionType = "mcqWithTwoStatements";
    this.passFlags['questionType'] = this.questionType;

    if (this.mainFlagModule2 == 11)
    {
      // this.start()
    }
  }

  start() {
    var jsonBody = {};
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['useranswer'] = ""
    jsonBody['event'] = 'start';
    var apiUrl = "mcqwithoption/";

    this.Module2Service.apiCall(jsonBody, apiUrl)
      .subscribe(
        data => {
          if (data['status'] == true)
          {
            // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 1.3', window.localStorage.getItem('username'), 10);
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
    this.answer=[];
    console.log("ff ", e)
    this.sumbitButton = true;
    this.answer.push(e);
    this.submit();
  }
  submit() {

    var jsonBody = {}

    jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['useranswer'] = this.answer
    jsonBody['event'] = 'answer';
    var apiUrl = "mcqwithoption/";
    console.log("dasd ", jsonBody)

    this.Module2Service.apiCall(jsonBody, apiUrl)
      .subscribe(
        data => {
          if (data['status'] == true && data['message'] == "your answer stored next question and uuid is")
          {
            window.localStorage.setItem('uuid', data['data'].nextuuid);
            this.subFlagModule2 = this.subFlagModule2 + 1
            window.localStorage.setItem('subFlagModule2', this.subFlagModule2.toString())
            console.log("data ", data['data'])
            this.data = data['data']
            this.sumbitButton = false;
          } else if (data['status'] == true && data['message'] == "submodule finish")
          {
            this.startFlag = false;
            this.mainFlagModule2 = 12;
            window.localStorage.setItem('uuid', data['data'].nextuuid);
            window.localStorage.setItem('mainFlagModule2', '12');
            window.localStorage.setItem('source', 'module 2.12.1');
            var obj = {
              "type": "submodule",
              "route": true,
              "current": this.translate.instant('L2Module2.subMenu2-11'),
              "next": this.translate.instant('L2Module2Finish.subMenu2-12'),
              "nextRoute": "/modules/module2/Module2.12"
            }
            this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
            this.Module2Service.setLocalStorage2(12);
          }
        },
        error => {
          this.LanguageService.handleError(error.error.message);
        });

  }

}
