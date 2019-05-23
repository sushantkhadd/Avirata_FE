import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import {Module2Service} from './module2.service'
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-module2-7',
  templateUrl: './module2-7.component.html'
})
export class Module27Component implements OnInit {
  @ViewChild("instructionModal") public instructionModal: ModalDirective;

  public mainFlagModule2 = parseInt(
    window.localStorage.getItem("mainFlagModule2")
  );
  public subFlagModule2 = parseInt(
    window.localStorage.getItem("subFlagModule2")
  )
  constructor(
    public LanguageService: LanguageService,
    private LocalstoragedetailsService: LocalstoragedetailsService,
    private router: Router,
    public Module2Service: Module2Service,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public translate: TranslateService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  public startTest; passData = {}; ansJson = {}; showPart1Flag = false;
  public passFlags = {}; data; myjsondata; dummy; deleteAdd = []; questionCount;
  questionlist; optionArray; counter; disableIt; questionId; mainCounter;
  dummyArray = []; jsonObject = {}; ansJsonLength;
  public token;
  public playVideo = false;
  public apiEndStart; apiEndSendAns; apiEndFinish;
  vedioCompleteUrl;
  statVideoFlag;

  activeItem;
  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  questionFlag;
  urlArray = {};
  ngOnInit() {
    this.vedioCompleteUrl = "79vHVVtmIoQ";
    this.mainFlagModule2 = parseInt(
      window.localStorage.getItem("mainFlagModule2")
    );
    this.subFlagModule2 = parseInt(
      window.localStorage.getItem("subFlagModule2")
    );
    this.token = this.LocalstoragedetailsService.token;
    if (this.token == null) {
      this.router.navigate(["/"]);
    }
  console.log("ok ", this.mainFlagModule2, (this.mainFlagModule2 == 1))
    this.questionlist = [];
    this.dummyArray = [];
    this.questionId = "";
    this.disableIt = true;
    this.startTest = false

    if (this.mainFlagModule2 == 7) {
      if (this.subFlagModule2 == 1) {
        this.passData["apiUrl"] = "moduletwosingleurl/";
        this.passData["videoUrl"] = "";
        this.passData["status"] = true; //first time call
        this.passData["currentSubmodule"] = "Career - a process"; //static msg
        this.passData["nextSubmodule"] = "Career magic framework"; //static msg
      } else if (this.subFlagModule2 == 2) {
        this.startEvent2();
      }
    } else if (this.mainFlagModule2 > 7) {
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson2"));
      console.log("vcxxxx", urlJson);
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 2.7"
        );
        console.log("qWSS", index);
        var mainJson;
        mainJson = JSON.parse(urlJson["children"][index].url);
        console.log("hjbhjb", mainJson);
        if (urlJson["children"][index].url != null) {
          this.urlArray["src1"] = mainJson["2.7.1"];
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
    var apiUrl = "moduletwosingleurl/";
    this.apiCall(jsonBody, apiUrl, "start1");
  }

  startEvent2() {
    var jsonData = {}
    jsonData['submoduleid'] = window.localStorage.getItem('uuid')
    jsonData['event'] = "start"
    jsonData["useranswer"] = "";

    this.showPart1Flag = true;
    this.apiEndStart = 'l3module_ans_return_mcq/';
      this.apiEndSendAns = 'l3module_ans_return_mcq/';
      this.apiEndFinish = 'l3module_ans_return_mcq/';
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
      var apiUrl = "l3module_ans_return_mcq/";
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

  finishVideo(e) {
    console.log("aaaaaaa");
    if (e) {
      console.log(e);
      this.playVideo = false;
      this.instructionModal.show();
      var url ={}
      url['2.7.1'] = this.vedioCompleteUrl;
      console.log("urllll",url)
      var current2 = [];
      current2 = JSON.parse(window.localStorage.getItem("currentJson2")); 
      var index = current2["children"].findIndex(
        item => item.source == "module 2.7" );
      current2["children"][index].url = JSON.stringify(url); 
      window.localStorage.setItem("currentJson2", JSON.stringify(current2));
    } else {
      window.localStorage.setItem("mainFlagModule2", "1");
      this.router.navigate(["/modules/module2/Module2.7"]);
    }
  }

  finish2() {
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
      var apiUrl = "l3module_ans_return_mcq/";
      this.apiCall(jsonBody, apiUrl, "finish2");
    }
  }

  finish1() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["event"] = "finish";
    this.apiCall(jsonBody, "moduletwosingleurl/", "finish1");
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module2Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "start1") {
            // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 1.1', window.localStorage.getItem('username'), 10);
            this.passData["videoUrl"] = data["data"].url;
            this.vedioCompleteUrl = data["data"].url;
            this.playVideo = true;
          } else if (fun == "finish1") {
            this.instructionModal.hide();
            this.playVideo = false;
            this.statVideoFlag = true;
            this.mainFlagModule2 = 7;
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            console.log(data);
            this.subFlagModule2 = 2;
            window.localStorage.setItem("subFlagModule2", "2");
            this.questionFlag = true;
            this.startEvent2();
          } else if (fun == "start2") {
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
          } else if (fun == "finish2") {
            this.mainFlagModule2 = 8;
              window.localStorage.setItem('uuid', data['data'].nextuuid);
              window.localStorage.setItem('mainFlagModule2', '8');
              window.localStorage.setItem('subFlagModule2', '1');
              window.localStorage.setItem('source', 'module 2.8.1');
              this.Module2Service.setLocalStorage2(8);
              var obj = {
                "type": "submodule",
                "route": true,
                "current": this.translate.instant('L2Module2.subMenu2-7'),
                "next": this.translate.instant('L2Module2.subMenu2-8'),
                "nextRoute": "/modules/module2/Module2.8"
              }
              this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
          }
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }
}
