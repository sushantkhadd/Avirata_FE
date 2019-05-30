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
  public startTest; passData = {}; showPart1Flag = false;
  public passFlags = {}; data; myjsondata; dummy; deleteAdd = []; questionCount;
  questionlist; optionArray; counter; disableIt; questionId; mainCounter;
  dummyArray = []; jsonObject = {}; ansJsonLength;
  public apiEndStart; apiEndSendAns; apiEndFinish;

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
  
}
