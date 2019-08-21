import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import {Module0Service} from './module0.service'

@Component({
  selector: 'app-module0-4',
  templateUrl: './module0-4.component.html'
})
export class Module04Component implements OnInit {
  public mainFlagModule0 = parseInt(
    window.localStorage.getItem("mainFlagModule0")
  );
  public subFlagModule0 = parseInt(
    window.localStorage.getItem("subFlagModule0")
  )
  constructor(
    public LanguageService: LanguageService,
    private LocalstoragedetailsService: LocalstoragedetailsService,
    private router: Router,     
    public Module0Service: Module0Service,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public translate: TranslateService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  public startTest; passData = {}; showPart1Flag = false;
  public passFlags = {}; data; myjsondata; dummy; deleteAdd = []; questionCount;
  questionlist; optionArray; counter; disableIt; questionId; mainCounter;
  dummyArray = []; jsonObject = {}; ansJsonLength;
  public apiEndStart; apiEndSendAns; apiEndFinish;startFlag;

  ngOnInit() {
    this.questionlist = [];
    this.dummyArray = [];
    this.questionId = "";
    this.disableIt = true;
    this.startTest = false
    this.ansJsonLength = 0;

    if (this.mainFlagModule0 == 4)
    {
      this.showPart1Flag = false
      if (this.subFlagModule0 == 1 || this.subFlagModule0 == 2) {
        // this.start1()
      }
     else if(this.subFlagModule0 == 3) {
        // this.start2()
      }
    }


  }
  start1() {
    console.log("dsshfjds")
    var jsonData = {}
    jsonData['submoduleid'] = window.localStorage.getItem('uuid')
    jsonData['event'] = "start"
    jsonData["useranswer"] = "";

    this.showPart1Flag = true;
    this.apiEndStart = 'baselinetwoseconetwo/';
      this.apiEndSendAns = 'baselinetwoseconetwo/';
      this.apiEndFinish = 'baselinetwoseconetwo/';
      // this.startJson['examtype'] = window.localStorage.getItem('uuid');

      this.passData['start'] = this.apiEndStart;
      this.passData['answer'] = this.apiEndSendAns;
      this.passData['finish'] = this.apiEndFinish;
      this.passData['jsonData'] = jsonData;
      this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 0.4', window.localStorage.getItem('username'), 10);
  }

  saveAnswer(e){
    if(e=="finish"){
      this.showPart1Flag = false;
      this.subFlagModule0=2;
      console.log("dsffffffffffAWQEW",this.showPart1Flag,this.mainFlagModule0)
      this.start1();
    }
    if(e=="finish1"){
      this.showPart1Flag = false;
      this.subFlagModule0=3;
      console.log("dsffffffffffAWQEW",this.showPart1Flag,this.mainFlagModule0)
      this.start2();
    }
  }

  start2() {
    console.log("dsshfjds")
    var jsonData = {}
    jsonData['submoduleid'] = window.localStorage.getItem('uuid')
    jsonData['event'] = "start"
    jsonData["useranswer"] = "";

    this.showPart1Flag = true;
    this.apiEndStart = 'baselinetwosecthree/';
      this.apiEndSendAns = 'baselinetwosecthree/';
      this.apiEndFinish = 'baselinetwosecthree/';
      // this.startJson['examtype'] = window.localStorage.getItem('uuid');

      this.passData['start'] = this.apiEndStart;
      this.passData['answer'] = this.apiEndSendAns;
      this.passData['finish'] = this.apiEndFinish;
      this.passData['jsonData'] = jsonData;
  }
}
