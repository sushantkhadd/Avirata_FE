import { Component, OnInit, ViewContainerRef} from '@angular/core';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {Module5Service} from './module5.service'
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'app-module5-18',
  templateUrl: './module5-18.component.html'
})
export class Module518Component implements OnInit {

  public mainFlagModule5 = parseInt(
    window.localStorage.getItem("mainFlagModule5")
  );
  public subFlagModule5 = parseInt(
    window.localStorage.getItem("subFlagModule5")
  );
  constructor(
    public LanguageService: LanguageService,
    public LocalstoragedetailsService: LocalstoragedetailsService,
    public Module5Service: Module5Service,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public router: Router,
    public translate: TranslateService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  public data;
  questionType;
  passFlags = {};
  showAnswer;count;userAnswer=[];
  saveData;
  answer;passData={};apiEndStart; apiEndSendAns; apiEndFinish;
  sumbitButton;
  startFlag;
  public inst =
    "(भाग १ ) - तुमच्या मते मानसिक आरोग्य म्हणजे काय?";
  ngOnInit() {
    
    this.startFlag = false;
    this.showAnswer = true;
    this.saveData = true;
    this.passFlags["saveData"] = this.saveData;
    this.passFlags["showAnswer"] = this.showAnswer;
    this.questionType = "mcqInBunch";
    this.passFlags["questionType"] = this.questionType;

    if (this.mainFlagModule5 == 18)
    {
      this.startFlag = false;
      // if (this.subFlagModule5 == 1) {
      //   this.startFlag = false;
      //   //this.start1()
      // } else if (this.subFlagModule5 == 2) {
      //   this.start2()
      // } else if (this.subFlagModule5 == 3) {
      //   this.startFlag = false;
      // } else if (this.subFlagModule5 == 4) {
      //   this.start2()
      // }
    }
  }

  start1() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["useranswer"] = "";
    jsonBody["event"] = "start";
    this.apiCall(jsonBody, 'modulefivecmcq/', 'start1')
  }

  saveAnswer(e) {
    if(e){
      console.log("ff ", e);
      this.sumbitButton = true;
     
      if(this.subFlagModule5==3){
        this.userAnswer.push(e)
        this.finish3();
      }
      else{
        this.answer = e;
        this.finish1();
      }
    }
  }

  saveAnswer1(e) {
    if(e=="finish"){
      // this.startFlag = false;
      this.start3();
      this.subFlagModule5=3;
    }
  }

  finish1() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["useranswer"] = this.answer;
    jsonBody["event"] = "answer";
    this.apiCall(jsonBody, 'modulefivecmcq/', 'finish1')
  }

  start3(){
    this.questionType = "mcqWithTwoStatements";
    this.passFlags["questionType"] = this.questionType;
    var jsonData = {}
    jsonData['submoduleid'] = window.localStorage.getItem('uuid')
    jsonData['event'] = "start"
    jsonData["useranswer"] = "";
    this.apiCall(jsonData, 'modulefivecmcqselection/', 'start3')
  }

  start2(){
    var jsonData = {}
    jsonData['submoduleid'] = window.localStorage.getItem('uuid')
    jsonData['event'] = "start"
    jsonData["useranswer"] = "";

    this.startFlag = true;
    this.apiEndStart = 'modulefive_return_answer/';
      this.apiEndSendAns = 'modulefive_return_answer/';
      this.apiEndFinish = 'modulefive_return_answer/';
      // this.startJson['examtype'] = window.localStorage.getItem('uuid');

      this.passData['start'] = this.apiEndStart;
      this.passData['answer'] = this.apiEndSendAns;
      this.passData['finish'] = this.apiEndFinish;
      this.passData['jsonData'] = jsonData;

      console.log("passdata",this.passData)
  }

  finish3() {
    var jsonBody = {};

    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["useranswer"] = this.userAnswer;
    jsonBody["event"] = "answer";
    this.apiCall(jsonBody, 'modulefivecmcqselection/', 'finish3')
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module5Service.apiCall(jsonBody, apiUrl)
      .subscribe(
        data => {
          if(fun == "start1"){
            console.log("data ", data["data"].questionlist);
          this.data = data["data"];
          // console.log('mcq data', this.data);
          this.startFlag = true;
          }
          if(fun == "finish1"){
            if (
              data["message"] == "submodule finish"
            ){
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            this.mainFlagModule5 = 18;
            window.localStorage.setItem("mainFlagModule5", "18");
            window.localStorage.setItem("subFlagModule5", "2");
            this.subFlagModule5 = 2;
            this.start2();
          }
         }
         if(fun == "start3"){
          console.log("data ", data["data"].questionlist);
        this.data = data["data"];
        // console.log('mcq data', this.data);
        this.startFlag = true;
        }
        if(fun == "finish3"){
          if (
            data["message"] == "submodule finish"
          ){
          window.localStorage.setItem("uuid", data["data"].nextuuid);
          this.mainFlagModule5 = 18;
          window.localStorage.setItem("mainFlagModule5", "18");
          window.localStorage.setItem("subFlagModule5", "4");
          this.subFlagModule5 = 4;
          this.start2();
        }
       }
        },
        error => {
          this.LanguageService.handleError(error.error.message);
        }
      );
  }
}
