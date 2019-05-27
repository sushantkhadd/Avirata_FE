import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { LanguageService } from 'src/app/language.service';
import { LocalstoragedetailsService } from 'src/app/services/localstoragedetails.service';
import { Module3Service } from './module3.service';
import { ToastsManager } from 'ng6-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-module3-5',
  templateUrl: './module3-5.component.html'
})
export class Module35Component implements OnInit {
  public mainFlagModule3 = parseInt(window.localStorage.getItem('mainFlagModule3'));
  public subFlagModule3 = parseInt(window.localStorage.getItem('subFlagModule3'));
  constructor(public LanguageService: LanguageService, public LocalstoragedetailsService: LocalstoragedetailsService, public Module3Service: Module3Service, public toastr: ToastsManager, vcr: ViewContainerRef, public router: Router, public translate: TranslateService) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  public data; questionType; passFlags = {}; showAnswer; saveData; answer; sumbitButton; startFlag;
  public inst = "खालील लक्ष वेधून घेणाऱ्या विद्यार्थ्यांबाबत शिक्षकांनी केलेल्या उपाययोजना योग्य आहेत का ते सांगा: "
  ngOnInit() {
    this.startFlag = false;
    this.showAnswer = true;
    this.saveData = true;
    this.passFlags['saveData'] = this.saveData;
    this.passFlags['showAnswer'] = this.showAnswer;
    this.questionType = "mcqTextOption";
    this.passFlags['questionType'] = this.questionType;

    if (this.mainFlagModule3 == 5)
    {
      // this.start()
    }
  }

  start() {
    var jsonBody = {};
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['useranswer'] = ""
    jsonBody['event'] = 'start';
    var apiUrl = "modulethreemcq/";

    this.Module3Service.apiCall(jsonBody, apiUrl)
      .subscribe(
        data => {
          if (data['status'] == true)
          {
            // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 1.3', window.localStorage.getItem('username'), 10);
            console.log("data ", data['data'])
            this.data = data['data'].questionlist[0]
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
    var apiUrl = "modulethreemcq/";
    console.log("dasd ", jsonBody)

    this.Module3Service.apiCall(jsonBody, apiUrl)
      .subscribe(
        data => {
          if (data['status'] == true && data['message'] == "your answer stored next question and uuid is")
          {
            window.localStorage.setItem('uuid', data['data'].nextuuid);
            this.subFlagModule3 = this.subFlagModule3 + 1
            window.localStorage.setItem('subFlagModule3', this.subFlagModule3.toString())
            console.log("data ", data['data'])
            this.data = data['data'].questionlist[0]
            this.sumbitButton = false;
          } else if (data['status'] == true && data['message'] == "submodule finish")
          {
            this.startFlag = false;
            this.mainFlagModule3 = 6;
            window.localStorage.setItem('uuid', data['data'].nextuuid);
            window.localStorage.setItem('mainFlagModule3', '6');
            window.localStorage.setItem('source', 'module 3.6.1');
            var obj = {
              "type": "submodule",
              "route": true,
              "current": this.translate.instant('L2Module3.subMenu3-5'),
              "next": this.translate.instant('L2Module3.subMenu3-6'),
              "nextRoute": "/modules/module3/Module3.6"
            }
            this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
            this.Module3Service.setLocalStorage3(6);
          }
        },
        error => {
          this.LanguageService.handleError(error.error.message);
        });

  }

}
