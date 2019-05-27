import { Component, OnInit,ViewContainerRef, ViewChild} from '@angular/core';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {Module2Service} from './module2.service'
import { FullLayoutService } from '../../layouts/full-layout.service';
import { ToastsManager } from 'ng6-toastr';
import { ModalDirective } from 'ngx-bootstrap';


@Component({
  selector: 'app-module2-3',
  templateUrl: './module2-3.component.html'
})
export class Module23Component implements OnInit {
  public mainFlagModule2 = parseInt(window.localStorage.getItem('mainFlagModule2'));
  public subFlagModule2 = parseInt(window.localStorage.getItem('subFlagModule2'));
  constructor(public LanguageService: LanguageService, public LocalstoragedetailsService: LocalstoragedetailsService, public Module2Service: Module2Service, public toastr: ToastsManager, vcr: ViewContainerRef, public router: Router, public translate: TranslateService) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  public data; questionType; passFlags = {}; showAnswer; saveData; answer; sumbitButton; startFlag;description;
  public inst = "एखाद्या संकल्पनेबाबत उजव्या मेंदूमध्ये नवीन जोडण्या निर्माण होणे आणि त्या पक्क्या होणे यासाठी पुढे  दिलेले उदाहरणे बघा आणि त्यातील एक पर्याय निवडा."
  ngOnInit() {
    this.startFlag = false;
    this.showAnswer = true;
    this.saveData = true;
    this.passFlags["saveData"] = this.saveData;
    this.passFlags["showAnswer"] = this.showAnswer;
    this.questionType = "mcqTextOption";
    this.passFlags["questionType"] = this.questionType;;

    if (this.mainFlagModule2 == 3)
    {
      // this.start()
    }
  }

  start() {
    var jsonBody = {};
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['useranswer'] = ""
    jsonBody['event'] = 'start';
    var apiUrl = "l3moduletwomcq/";

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
    var apiUrl = "l3moduletwomcq/";
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
            this.description = data['data'].description;
          } else if (data['status'] == true && data['message'] == "submodule finish")
          {
            this.description = data['data'].description;
            this.startFlag = false;
            window.localStorage.setItem('uuid', data['data'].nextuuid);
            this.mainFlagModule2 = 4;
            window.localStorage.setItem('mainFlagModule2', '4');
            window.localStorage.setItem('subFlagModule2', '1');
            window.localStorage.setItem('source', 'module 2.4.1');
            var obj = {
              "type": "submodule",
              "route": true,
              "current": this.translate.instant('L2Module2.subMenu2-3'),
              "next": this.translate.instant('L2Module2.subMenu2-4'),
              "nextRoute": "/modules/module2/Module2.4"
            }
            this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
            this.Module2Service.setLocalStorage2(4);
          }
        },
        error => {
          this.LanguageService.handleError(error.error.message);
        });

  }
}
