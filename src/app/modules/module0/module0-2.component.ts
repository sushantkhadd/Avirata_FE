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
  answer;loader;
  queId;
  sumbitButton;questionlist;
  startFlag;
  public inst =
    "खाली दिलेल्या पर्यायांपैकी योग्य पर्याय निवडा.";
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
          console.log("data111111111", data["data"].questionlist);
          this.questionlist =data["data"].questionlist
          this.shuffle(this.questionlist);
          for(let i=0; i< this.questionlist.length; i++){
            if(this.questionlist[i].answer == ""){
              this.data.push(this.questionlist[i])
            }
          }
          var baselineCounter = 20-(this.data.length-1);
          window.localStorage.setItem("baselineCounter",JSON.stringify(baselineCounter))
          //this.data = data["data"];
           console.log('mcq data', this.data,baselineCounter);
         
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
      this.loader = true;
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

  shuffle(arra1) {
    var ctr = arra1.length, temp, index;
    // While there are elements in the array
    while (ctr > 0) {
      // Pick a random index
      index = Math.floor(Math.random() * ctr);
      // Decrease ctr by 1
      ctr--;
      // And swap the last element with it
      temp = arra1[ctr];
      arra1[ctr] = arra1[index];
      arra1[index] = temp;
    }
    return arra1;
  }
}
