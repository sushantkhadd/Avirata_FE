import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Module3Service } from './module3.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/language.service';
import { FullLayoutService } from 'src/app/layouts/full-layout.service';
import { Router } from '@angular/router';
import { LocalstoragedetailsService } from 'src/app/services/localstoragedetails.service';
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'app-module3-7',
  templateUrl: './module3-7.component.html'
})
export class Module37Component implements OnInit {
  constructor(public Module3Service: Module3Service, public translate: TranslateService, public LanguageService: LanguageService, public FullLayoutService: FullLayoutService, public router: Router, public LocalstoragedetailsService: LocalstoragedetailsService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  public mainFlagModule3 = parseInt(window.localStorage.getItem('mainFlagModule3'));
  public subFlagModule3 = parseInt(window.localStorage.getItem('subFlagModule3'));
  public startTest; passData = {}; ansJson = {}; showPart1Flag = false;
  public passFlags = {}; data; myjsondata; dummy; deleteAdd = []; questionCount;
  questionlist; optionArray; counter; disableIt; questionId; mainCounter;
  dummyArray = []; jsonObject = {}; ansJsonLength;
  public apiEndStart; apiEndSendAns; apiEndFinish;
  activeItem;
  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  ngOnInit() {
    this.questionlist = [];
    this.dummyArray = [];
    this.questionId = "";
    this.disableIt = true;
    this.startTest = false
    this.ansJsonLength = 0;

    if (this.mainFlagModule3 == 7)
    {
      this.start();
    }


  }
  start() {
    var jsonData = {}
    jsonData['submoduleid'] = window.localStorage.getItem('uuid')
    jsonData['event'] = "start"
    jsonData["useranswer"] = "";

    this.showPart1Flag = true;
    this.apiEndStart = 'l3module3_ans_return_mcq/';
      this.apiEndSendAns = 'l3module3_ans_return_mcq/';
      this.apiEndFinish = 'l3module3_ans_return_mcq/';
      // this.startJson['examtype'] = window.localStorage.getItem('uuid');

      this.passData['start'] = this.apiEndStart;
      this.passData['answer'] = this.apiEndSendAns;
      this.passData['finish'] = this.apiEndFinish;
      this.passData['jsonData'] = jsonData;
  }

  onValueChange(e, value, id) {
    this.jsonObject = {};
    this.jsonObject["useranswer"] = value;
    this.jsonObject["questionid"] = id;
    this.ansJson[id] = value;
    this.ansJsonLength = Object.keys(this.ansJson).length;
    console.log(value, id, this.jsonObject, e);
    // if (Object.keys(this.jsonObject).length == 0)
    // {
    //   console.log("no hit", Object.keys(this.jsonObject).length);
    // } else
    // {
      var jsonBody = {};
      jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
      jsonBody["event"] = "answer";
      jsonBody["useranswer"] = this.jsonObject["useranswer"];
      jsonBody["questionid"] = this.jsonObject["questionid"];
      var apiUrl = "l3module3_ans_return_mcq/";
      this.apiCall(jsonBody, apiUrl, "next");
    // }
    if (e.target.checked == true)
    {
      this.disableIt = false;
    } else
    {
      this.disableIt = true;
    }
  }

  previous() {
    this.counter = this.questionlist.indexOf(this.activeItem);
    const newIndex = this.counter === 0 ? this.questionlist.length - 1 : this.counter - 1;
    this.activeItem = this.questionlist[newIndex];
    console.log(this.counter)
    this.counter--;
  }

  next() {
    this.counter = this.questionlist.indexOf(this.activeItem);
    const newIndex = this.counter === this.questionlist.length - 1 ? 0 : this.counter + 1;
    this.activeItem = this.questionlist[newIndex];
    console.log(this.counter, Object.keys(this.jsonObject).length);
    this.counter++;
  }

  finish() {
    if (Object.keys(this.ansJson).length != 5)
    {
      this.toastr.error("You must give all answers");
      console.log("no hit", Object.keys(this.ansJson).length);
    } else
    {
      var jsonBody = {}
      jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
      jsonBody["event"] = "finish";
      jsonBody["useranswer"] = this.jsonObject["useranswer"];
      jsonBody["questionid"] = this.jsonObject["questionid"];
      var apiUrl = "l3module3_ans_return_mcq/";
      this.apiCall(jsonBody, apiUrl, "finish");
    }
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module3Service.apiCall(jsonBody, apiUrl)
      .subscribe(
        data => {
          if (data['status'] == true)
          {
            if (fun == 'start')
            {
              this.questionlist = data["data"].questionlist;
              for (var index = 0; index < this.questionlist.length; index++)
              {
                this.questionlist[index].options.splice(2, 2);
                this.optionArray = this.questionlist[index].options;
                this.questionId = this.questionlist[index].questionid;
                this.dummyArray.push({
                  counter: index,
                  options: this.questionlist[index].options,
                  question: this.questionlist[index].question,
                  questionid: this.questionlist[index].questionid
                });
              }
              this.questionlist = this.dummyArray;
              this.activeItem = this.questionlist[0];
              this.counter = 0;
            }
            else if (fun == 'next')
            {
              // window.localStorage.setItem('uuid', data['data'].nextuuid);
            }
            else if (fun == "finish")
            {
              this.mainFlagModule3 = 7;
              window.localStorage.setItem('uuid', data['data'].nextuuid);
              window.localStorage.setItem('mainFlagModule3', '8');
              window.localStorage.setItem('subFlagModule3', '1');
              window.localStorage.setItem('source', 'module 3.8.1');
              this.Module3Service.setLocalStorage3(8);
              var obj = {
                "type": "submodule",
                "route": true,
                "current": this.translate.instant('L2Module3.subMenu3-7'),
                "next": this.translate.instant('L2Module3.subMenu3-8'),
                "nextRoute": "/modules/module3/Module3.8"
              }
              this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
            }
          }
        },
        error => {
          this.LanguageService.handleError(error.error.message);
        })
  }

}
