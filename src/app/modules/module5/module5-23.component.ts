import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { LanguageService } from 'src/app/language.service';
import { LocalstoragedetailsService } from 'src/app/services/localstoragedetails.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Module5Service } from './module5.service';

@Component({
  selector: "app-module5-23",
  templateUrl: "./module5-23.component.html"
})
export class Module523Component implements OnInit {
  public mainFlagModule5 = parseInt(
    window.localStorage.getItem("mainFlagModule5")
  );
  public subFlagModule5 = parseInt(
    window.localStorage.getItem("subFlagModule5")
  );
  constructor(
    public LanguageService: LanguageService,
    private LocalstoragedetailsService: LocalstoragedetailsService,
    private router: Router,
    public Module5Service: Module5Service,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public translate: TranslateService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  public startTest;
  passData = {};
  showPart1Flag = false;
  public passFlags = {};
  data;
  myjsondata;
  dummy;
  deleteAdd = [];
  questionCount;
  questionlist;
  optionArray;
  counter;
  disableIt;
  questionId;
  mainCounter;
  dummyArray = [];
  jsonObject = {};
  ansJsonLength;
  public apiEndStart;
  apiEndSendAns;
  apiEndFinish;

  ngOnInit() {
    this.questionlist = [];
    this.dummyArray = [];
    this.questionId = "";
    this.disableIt = true;
    this.startTest = false
    this.ansJsonLength = 0;

    if (this.mainFlagModule5 == 23)
    {
      if (this.subFlagModule5 == 1)
      {
        this.start1();
      }
    }
  }
  start1() {
    var jsonData = {}
    jsonData['submoduleid'] = window.localStorage.getItem('uuid')
    jsonData['event'] = "start"
    jsonData["useranswer"] = "";

    this.showPart1Flag = true;
    this.apiEndStart = "modulefivefeedbacksec1/";
    this.apiEndSendAns = "modulefivefeedbacksec1/";
    this.apiEndFinish = "modulefivefeedbacksec1/";
    // this.startJson['examtype'] = window.localStorage.getItem('uuid');
    this.passData['start'] = this.apiEndStart;
    this.passData['answer'] = this.apiEndSendAns;
    this.passData['finish'] = this.apiEndFinish;
    this.passData['jsonData'] = jsonData;
  }
}
