import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import {Module4Service} from './module4.service'
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-module4-1',
  templateUrl: './module4.component.html'
})
export class Module4Component implements OnInit {

  @ViewChild("instructionModal") public instructionModal: ModalDirective;

  public mainFlagModule4 = parseInt(
    window.localStorage.getItem("mainFlagModule4")
  );
  public subFlagModule4 = parseInt(
    window.localStorage.getItem("subFlagModule4")
  )
  constructor(
    public LanguageService: LanguageService,
    private LocalstoragedetailsService: LocalstoragedetailsService,
    private router: Router,
    public Module4Service: Module4Service,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public translate: TranslateService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  public startTest; passData = {}; ansJson = {}; startFlag = false;
  public passFlags = {}; data; myjsondata; dummy; deleteAdd = []; questionCount;
  questionlist; optionArray; counter; disableIt; questionId; mainCounter;
  dummyArray = []; jsonObject = {}; ansJsonLength;
  public token;sumbitButton;answer;description;questionType; showAnswer;saveData;
  public playVideo = false;
  public apiEndStart; apiEndSendAns; apiEndFinish;
  vedioCompleteUrl;
  statVideoFlag;nextFlag;
  questionFlag;;
  urlArray = {};
  public inst = "खालील व्यक्ती समायोजित आहेत की नाही त्याबद्दल योग्य पर्याय निवडा."
  ngOnInit() {
    this.vedioCompleteUrl = "79vHVVtmIoQ";
    this.mainFlagModule4 = parseInt(
      window.localStorage.getItem("mainFlagModule4")
    );
    this.subFlagModule4 = parseInt(
      window.localStorage.getItem("subFlagModule4")
    );
    this.token = this.LocalstoragedetailsService.token;
    if (this.token == null) {
      this.router.navigate(["/"]);
    }
  console.log("ok ", this.mainFlagModule4, (this.mainFlagModule4 == 1))
    this.questionlist = [];
    this.dummyArray = [];
    this.questionId = "";
    this.disableIt = true;
    this.startTest = false

    if (this.mainFlagModule4 == 1) {
      if (this.subFlagModule4 == 1) {
        this.passData["apiUrl"] = "modulefoursingleurl/";
        this.passData["videoUrl"] = "";
        this.passData["status"] = true; //first time call
        this.passData["currentSubmodule"] = "Career - a process"; //static msg
        this.passData["nextSubmodule"] = "Career magic framework"; //static msg
      } else if (this.subFlagModule4 == 2) {
        this.startEvent2();
      }
    } else if (this.mainFlagModule4 > 1) {
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson4"));
      console.log("vcxxxx", urlJson);
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 4.7"
        );
        console.log("qWSS", index);
        var mainJson;
        mainJson = JSON.parse(urlJson["children"][index].url);
        console.log("hjbhjb", mainJson);
        if (urlJson["children"][index].url != null) {
          this.urlArray["src1"] = mainJson["4.1.1"];
          this.passData["videoUrl"] = this.urlArray["src1"];
        }
      }
    }
  }

  //removed this method if start event not required
  startEvent1() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["event"] = "start";
    var apiUrl = "modulefoursingleurl/";
    this.apiCall(jsonBody, apiUrl, "start1");
  }

  startEvent2() {
    this.startFlag = false;
    this.showAnswer = true;
    this.saveData = true;
    this.passFlags['saveData'] = this.saveData;
    this.passFlags['showAnswer'] = this.showAnswer;
    this.questionType = "mcqInBunch";
    this.passFlags['questionType'] = this.questionType;

    var jsonBody = {};
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['useranswer'] = ""
    jsonBody['event'] = 'start';
    var apiUrl = "l3statement_with_mcq/";

    this.Module4Service.apiCall(jsonBody, apiUrl)
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

  finishVideo(e) {
    console.log("aaaaaaa");
    if (e) {
      console.log(e);
      this.nextFlag = true; 
      this.subFlagModule4 = 2;
      this.instructionModal.show();
      var url ={}
      url['4.1.1'] = this.vedioCompleteUrl;
      console.log("urllll",url)
      var current4 = [];
      current4 = JSON.parse(window.localStorage.getItem("currentJson4")); 
      var index = current4["children"].findIndex(
        item => item.source == "module 4.1" );
      current4["children"][index].url = JSON.stringify(url); 
      window.localStorage.setItem("currentJson4", JSON.stringify(current4));
    } else {
      window.localStorage.setItem("mainFlagModule4", "1");
      this.router.navigate(["/modules/module4/Module4.1"]);
    }
  }

  finish1() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["event"] = "finish";
    this.apiCall(jsonBody, "modulefoursingleurl/", "finish1");
  }


  saveAnswer(e) {
    console.log("ff ", e)
    this.sumbitButton = true;
    this.answer = e;
    this.submit();
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module4Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "start1") {
            // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 1.1', window.localStorage.getItem('username'), 10);
            this.passData["videoUrl"] = data["data"].url;
            this.vedioCompleteUrl = data["data"].url;
            this.playVideo = true;
          } else if (fun == "finish1") {
            this.instructionModal.hide();
            // this.playVideo = false;
            // this.statVideoFlag = true;
            this.mainFlagModule4 = 1;
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            console.log(data);
            this.subFlagModule4 = 2;
            window.localStorage.setItem("subFlagModule4", "2");
            this.questionFlag = true;
            this.startEvent2();
            this.nextFlag = false; 
          } 
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }

  submit() {

    var jsonBody = {}

    jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['useranswer'] = this.answer
    jsonBody['event'] = 'answer';
    var apiUrl = "l3statement_with_mcq/";
    console.log("dasd ", jsonBody)

    this.Module4Service.apiCall(jsonBody, apiUrl)
      .subscribe(
        data => {
          if (data['status'] == true && data['message'] == "your answer stored next question and uuid is")
          {
            window.localStorage.setItem('uuid', data['data'].nextuuid);
            this.subFlagModule4 = this.subFlagModule4 + 1
            window.localStorage.setItem('subFlagModule4', this.subFlagModule4.toString())
            console.log("data ", data['data'])
            this.data = data['data']
            this.sumbitButton = false;
            this.description = data['data'].description;
          } else if (data['status'] == true && data['message'] == "submodule finish")
          {
            this.description = data['data'].description;
            this.startFlag = false;
            window.localStorage.setItem('uuid', data['data'].nextuuid);
            // this.mainFlagModule4 = 2;
            window.localStorage.setItem('mainFlagModule4', '2');
            window.localStorage.setItem('subFlagModule4', '1');
            window.localStorage.setItem('source', 'module 4.2.1');
            var obj = {
              "type": "submodule",
              "route": true,
              "current": this.translate.instant('L2Module4.subMenu4-1'),
              "next": this.translate.instant('L2Module4.subMenu4-2'),
              "nextRoute": "/modules/module4/Module4.2"
            }
            this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
            this.Module4Service.setLocalStorage4(2);
          }
        },
        error => {
          this.LanguageService.handleError(error.error.message);
        });

  }

}
