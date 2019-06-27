import { Component, OnInit, ViewContainerRef} from '@angular/core';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {Module0Service} from './module0.service'
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'app-module0-2',
  templateUrl: './module0-2.component.html'
})
export class Module02Component implements OnInit {

  public mainFlagModule0 = parseInt(
    window.localStorage.getItem("mainFlagModule0")
  );
  public subFlagModule0 = parseInt(
    window.localStorage.getItem("subFlagModule0")
  );
  constructor(
    public LanguageService: LanguageService,
    public LocalstoragedetailsService: LocalstoragedetailsService,
    public Module0Service: Module0Service,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public router: Router,
    public translate: TranslateService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  public data=[];
  questionType;
  passFlags = {};
  showAnswer;count;
  saveData;
  useranswer={};
  answer;
  queId;
  sumbitButton;questionlist;
  startFlag;
  public inst =
    "खालील विधान पूर्ण करा.";
  ngOnInit() {
    this.startFlag = false;
    this.showAnswer = true;
    this.saveData = true;
    this.passFlags["saveData"] = this.saveData;
    this.passFlags["showAnswer"] = this.showAnswer;
    this.questionType = "mcqTextOption";
    this.passFlags["questionType"] = this.questionType;

    if (this.mainFlagModule0 == 2)
    {
      // this.start()
    }
  }

  start() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["useranswer"] = "";
    jsonBody["event"] = "start";
    var apiUrl = "baselineone/";

    this.Module0Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true)
        {
          // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 1.3', window.localStorage.getItem('username'), 10);
          console.log("data ", data["data"].questionlist);
          this.questionlist =data["data"].questionlist
          for(let i=0; i< this.questionlist.length; i++){
            if(this.questionlist[i].answer == ""){
              this.data.push(this.questionlist[i])
            }
          }
          //this.data = data["data"];
           console.log('mcq data', this.data);
         
          this.startFlag = true;
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }

  saveAnswer(e) {
    if(e){
      console.log("ff ", e);
      this.sumbitButton = true;
      this.useranswer = e;
      console.log("ff ", this.useranswer);
      this.queId = Object.keys(this.useranswer)
      this.answer = this.useranswer[this.queId]
      console.log("savca",this.queId[0],this.answer)
     
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
    var apiUrl = "baselineone/";
    console.log("dasd ", jsonBody);
    }
    else if(val == "finish"){
      var jsonBody = {};

      jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
      jsonBody["questionid"] = this.queId[0];
      jsonBody["useranswer"] = this.answer;
      jsonBody["event"] = "finish";
      var apiUrl = "baselineone/";
      console.log("dasdqddddddddddddd ", jsonBody);
    }
    this.Module0Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        
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
          this.mainFlagModule0 = 3;
          window.localStorage.setItem("mainFlagModule0", "3");
          window.localStorage.setItem("subFlagModule0", "1");
          window.localStorage.setItem('source', 'module 0.3');
          var obj = {
            "type": "submodule",
            "route": true,
            "current": this.translate.instant("L2Module0.subMenu1-2"),
            "next": this.translate.instant("L2Module0Finish.subMenu0-3"),
            "nextRoute": "/modules/module0/baseline2"
          };
          this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
          this.Module0Service.setLocalStorage0(3);
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }

}
