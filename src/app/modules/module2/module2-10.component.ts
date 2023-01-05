import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Module2Service } from './module2.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/language.service';
import { FullLayoutService } from 'src/app/layouts/full-layout.service';
import { Router } from '@angular/router';
import { LocalstoragedetailsService } from 'src/app/services/localstoragedetails.service';
import { ToastsManager } from 'ng6-toastr';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: "app-module2-10",
  templateUrl: "./module2-10.component.html"
})
export class Module210Component implements OnInit {

  @ViewChild('staticImageModal') public staticImageModal: ModalDirective;
  @ViewChild("instructionModal") public instructionModal: ModalDirective;

  public mainFlagModule2 = parseInt(
    window.localStorage.getItem("mainFlagModule2")
  );
  public subFlagModule2 = parseInt(
    window.localStorage.getItem("subFlagModule2")
  );
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
  questionlist; optionArray; counter; disableIt; mainCounter;
  dummyArray = []; jsonObject = {};
  public token;
  public playVideo = false;
  vedioCompleteUrl;
  statVideoFlag;
  public apiEndStart; apiEndSendAns; apiEndFinish;
  activeItem;
  questionFlag;
  urlArray = {};nextFlag;
  answer;
  question;
  subFlagModule1;
  questionid; trimFlag; showLimit; postWordCount; startFlag;
  inst="सुनील असं का वागला असेल? तुमचे मत लिहा."

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

    if (this.mainFlagModule2 == 10) {
      if (this.subFlagModule2 == 1) {
        this.startEvent1();
      } else if (this.subFlagModule2 == 2) {
        this.startFlag = false;
        // this.startEvent2();
      }
    } else if (this.mainFlagModule2 > 10) {
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson2"));
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 2.10"
        );
        var mainJson;
        mainJson = JSON.parse(urlJson["children"][index].url);
        console.log("hjbhjb", mainJson);
        if (urlJson["children"][index].url != null) {
          this.urlArray["src1"] = mainJson["2.10.1"];
          this.passData["videoUrl"] = this.urlArray["src1"];
        }
      }
    }
  }

  startEvent1() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["event"] = "start";
    var apiUrl = "moduletwosingleurl/";
    this.apiCall(jsonBody, apiUrl, "start1");
  }

  finishVideo(e) {
    console.log("aaaaaaa");
    if (e == true) {
      console.log(e);
      this.nextFlag = true; 
      this.subFlagModule2 = 2;
      this.instructionModal.show();
      this.LanguageService.toShow();
    } else {
      window.localStorage.setItem("mainFlagModule2", "10");
      this.router.navigate(["/modules/module2/Module2.10"]);
    }
  }

  startEvent2() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["useranswer"] = "";
    jsonBody["event"] = "start";
    var apiUrl = "l4module2freetext/";
    this.apiCall(jsonBody, apiUrl, "start2");
  }

  finish1() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["event"] = "finish";
    this.apiCall(jsonBody, "moduletwosingleurl/", "finish1");
  }

  finish2() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    var ansJson = {};
    ansJson[this.questionid] = (this.answer).trim();
    jsonBody["useranswer"] = ansJson;
    jsonBody["event"] = "answer";
    var apiUrl = "l4module2freetext/";
    this.apiCall(jsonBody, apiUrl, "finish2");
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module2Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "start1") {
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 2.10', window.localStorage.getItem('username'), 10);
            this.passData["videoUrl"] = data["data"].url;
            this.vedioCompleteUrl = data["data"].url;
            this.playVideo = true;
            var url ={}
            url['2.10.1'] = this.vedioCompleteUrl;
            console.log("urllll",url)
            var current2 = [];
            current2 = JSON.parse(window.localStorage.getItem("currentJson2")); 
            var index = current2["children"].findIndex(
              item => item.source == "module 2.10" );
            current2["children"][index].url = JSON.stringify(url); 
            window.localStorage.setItem("currentJson2", JSON.stringify(current2));
          } else if (fun == "finish1") {
            this.instructionModal.hide();
            this.LanguageService.toHide();
            this.playVideo = false;
            this.statVideoFlag = true;
            this.mainFlagModule2 = 10;
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            console.log(data);
            this.subFlagModule2 = 2;
            window.localStorage.setItem("subFlagModule2", "2");
            this.questionFlag = true;
            // this.startEvent2();
            this.nextFlag = false;
          } else if (fun == "start2") {
            console.log("start2");
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 2.10', window.localStorage.getItem('username'), 10);
            this.startFlag = true;
            this.question = data["data"]["questionlist"][0].question;
            this.questionid = data["data"]["questionlist"][0].questionid;          
          } else if (fun == "finish2") {
            this.mainFlagModule2 = 2;
            window.localStorage.setItem("subFlagModule2", "2");
            window.localStorage.setItem(
              "uuid",
              data["data"].nextuuid
            );
            window.localStorage.setItem("mainFlagModule2", "11");
            window.localStorage.setItem("subFlagModule2", "1");
            window.localStorage.setItem("source", "module 2.11.1");
            this.Module2Service.setLocalStorage2(11);
            var obj = {
              type: "submodule",
              route: true,
              current: this.translate.instant(
                "L2Module2.subMenu2-10"
              ),
              next: this.translate.instant(
                "L2Module2Finish.subMenu2-11"
              ),
              nextRoute: "/modules/module2/Module2.11"
            };
            this.LocalstoragedetailsService.setModuleStatus(
              JSON.stringify(obj)
            );
          }
          
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }

  ngDoCheck() {
    if (this.answer) {
      this.postWordCount = this.answer.trim().split(/\s+/).length;
      if (this.postWordCount == 0 || this.postWordCount > 150) {
        this.showLimit = false
      }
      else if (this.postWordCount >= 7) {
        this.showLimit = true
      }
    }
    if (this.answer != null && this.answer != "" && this.answer != undefined) {
      if (this.answer.trim().length == 0) {
        this.trimFlag = true;
      } else if (this.postWordCount > 150 || this.postWordCount < 7) {
        this.trimFlag = true;
      } else {
        this.trimFlag = false;
      }
    }
    else {
      if (this.answer == "" || this.answer == null || this.answer == undefined) {
        this.postWordCount = 0;
      }
    }
  }

}
