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
  public mainFlagModule3 = parseInt(window.localStorage.getItem('mainFlagModule3'));
  public subFlagModule3 = parseInt(window.localStorage.getItem('subFlagModule3'));
  constructor(public LanguageService: LanguageService, public LocalstoragedetailsService: LocalstoragedetailsService, public Module3Service: Module3Service, public toastr: ToastsManager, vcr: ViewContainerRef, public router: Router, public translate: TranslateService) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  public data=[]; questionType; passFlags = {}; showAnswer; saveData; useranswer={}; sumbitButton; startFlag;description;answer;queId;loader;questionlist=[];
  public inst = "शिक्षकांनी सांगितलेल्या सूचनेच्या बरोबर उलट कृती मनीष करतो. मनीषबाबत (सत्ता मिळवणाऱ्या विद्यार्थ्याबाबत) शिक्षकांनी केलेल्या खालील कृतींमुळे काय होईल असे तुम्हांला वाटते?"
  ngOnInit() {
    this.startFlag = false;
    this.showAnswer = true;
    this.saveData = true;
    this.passFlags['saveData'] = this.saveData;
    this.passFlags['showAnswer'] = this.showAnswer;
    this.questionType = "mcqTextOption";
    this.passFlags['questionType'] = this.questionType;

    if (this.mainFlagModule3 == 7)
    {
      // this.start()
    }
  }

  start() {
    var jsonBody = {};
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['useranswer'] = "";
    jsonBody['event'] = 'start';
    var apiUrl = "l3module3_ans_return_mcq/";

    this.Module3Service.apiCall(jsonBody, apiUrl)
      .subscribe(
        data => {
          if (data['status'] == true)
          {
            // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 1.3', window.localStorage.getItem('username'), 10);
            console.log("data ", data['data'])
            this.questionlist =data["data"].questionlist
            for(let i=0; i< this.questionlist.length; i++){
              if(this.questionlist[i].answer == ""){
                this.data.push(this.questionlist[i])
              }
            }
            // this.data = data['data'].questionlist
            this.startFlag = true;
            console.log("datttaaaa",this.data)
            var baselineCounter = 5-(this.data.length-1);
            window.localStorage.setItem("baselineCounter",JSON.stringify(baselineCounter))
          }
        },
        error => {
          this.LanguageService.handleError(error.error.message);
        });
  }

  saveAnswer(e) {
    if(e){
    this.loader = true;
    console.log("ff ", e)
    this.sumbitButton = true;
    this.useranswer = e;
    this.queId = Object.keys(this.useranswer)
    this.answer = this.useranswer[this.queId]
    console.log("dataevent",this.data)
    if(this.data == [] || this.data.length == 0){
      this.submit("finish")
    }
    else{
      this.submit("answer");
    }
  }
  }
  submit(val) {

    if(val == "answer"){
      var jsonBody = {};
  
      jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
      jsonBody["questionid"] = this.queId[0];
      jsonBody["useranswer"] = this.answer;
      jsonBody["event"] = "answer";
      var apiUrl = "l3module3_ans_return_mcq/";
      console.log("dasd ", jsonBody);
      }
      else if(val == "finish"){
        var jsonBody = {};
  
        jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
        jsonBody["questionid"] = this.queId[0];
        jsonBody["useranswer"] = this.answer;
        jsonBody["event"] = "finish";
        var apiUrl = "l3module3_ans_return_mcq/";
        console.log("dasdqddddddddddddd ", jsonBody);
      }
      this.Module3Service.apiCall(jsonBody, apiUrl).subscribe(
        data => {
          this.loader = false;
          if(data["message"] == "your answer stored"){
            console.log("data",this.data)
          }
         else if (
            data["message"] == "submodule finish"
          )
          {
            this.startFlag = false;
            this.data=[];
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            this.mainFlagModule3 = 8;
            window.localStorage.setItem("mainFlagModule3", "8");
            window.localStorage.setItem("subFlagModule3", "1");
            window.localStorage.setItem('source', 'module 3.8.1');
            var obj = {
              "type": "submodule",
              "route": true,
              "current": this.translate.instant("L2Module3.subMenu3-7"),
              "next": this.translate.instant("L2Module3Finish.subMenu3-8"),
              "nextRoute": "/modules/module3/Module3.8"
            };
            this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
            this.Module3Service.setLocalStorage3(8);
          }
        },
        error => {
          this.LanguageService.handleError(error.error.message);
        }
      );
  }

  
}
