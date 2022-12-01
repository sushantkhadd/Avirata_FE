import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import {Module4Service} from './module4.service'

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
  public data=[]; questionType; passFlags = {}; showAnswer; saveData; useranswer={}; sumbitButton; startFlag;description;answer;queId;loader;questionlist=[];
  public inst = "खाली दिलेली तंत्रे मानसिक स्वास्थ्य संवर्धनात मोडतात का ते लिहा "
  ngOnInit() {
    this.startFlag = false;
    this.showAnswer = true;
    this.saveData = true;
    this.passFlags['saveData'] = this.saveData;
    this.passFlags['showAnswer'] = this.showAnswer;
    this.questionType = "mcqTextOption";
    this.passFlags['questionType'] = this.questionType;

    if (this.mainFlagModule4 == 11)
    {
      // this.start()
    }
  }

  start() {
    var jsonBody = {};
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['useranswer'] = "";
    jsonBody['event'] = 'start';
    var apiUrl = "l3module4_ans_return_mcq/";

    this.Module4Service.apiCall(jsonBody, apiUrl)
      .subscribe(
        data => {
          if (data['status'] == true)
          {
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 4.11', window.localStorage.getItem('username'), 10);
            console.log("data ", data['data'])
            this.questionlist =data["data"].questionlist
            for(let i=0; i< this.questionlist.length; i++){
              if(this.questionlist[i].answer == ""){
                this.data.push(this.questionlist[i])
              }
            }
           
            console.log("datttaaaa",this.data)
            var baselineCounter = 5-(this.data.length-1);
            if(this.data == [] || baselineCounter == 6){
              console.log("sdsdsdfsdfsdfsdf")
              this.answer = this.questionlist[this.questionlist.length-1].answer;
              this.submit("finish1")
            }
            window.localStorage.setItem("baselineCounter",JSON.stringify(baselineCounter))
            this.startFlag = true;
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
      var apiUrl = "l3module4_ans_return_mcq/";
      console.log("dasd ", jsonBody);
      }
      else if(val == "finish"){
        var jsonBody = {};
  
        jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
        jsonBody["questionid"] = this.queId[0];
        jsonBody["useranswer"] = this.answer;
        jsonBody["event"] = "finish";
        var apiUrl = "l3module4_ans_return_mcq/";
        console.log("dasdqddddddddddddd ", jsonBody);
      }
      else if(val == "finish1"){
        var jsonBody = {};
  
        jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
        jsonBody["questionid"] = this.questionlist[this.questionlist.length-1].questionid;
        jsonBody["useranswer"] = this.answer;
        jsonBody["event"] = "finish";
        var apiUrl = "l3module4_ans_return_mcq/";
        console.log("dasdqddddddddddddd ", jsonBody);
      }
      this.Module4Service.apiCall(jsonBody, apiUrl).subscribe(
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
            this.mainFlagModule4 = 12;
            window.localStorage.setItem("mainFlagModule4", "12");
            window.localStorage.setItem("subFlagModule4", "1");
            window.localStorage.setItem('source', 'module 4.12.1');
            var obj = {
              "type": "submodule",
              "route": true,
              "current": this.translate.instant("L2Module4.subMenu4-11"),
              "next": this.translate.instant("L2Module4Finish.subMenu4-12"),
              "nextRoute": "/modules/module4/Module4.12"
            };
            this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
            this.Module4Service.setLocalStorage4(12);
          }
        },
        error => {
          this.LanguageService.handleError(error.error.message);
        }
      );
  }4
}
