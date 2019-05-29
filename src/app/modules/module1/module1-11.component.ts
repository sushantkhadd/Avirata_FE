import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/language.service';
import { FullLayoutService } from 'src/app/layouts/full-layout.service';
import { LocalstoragedetailsService } from 'src/app/services/localstoragedetails.service';
import { Router } from '@angular/router';
import { Module1Service } from './module1.service';
import { ToastsManager } from 'ng6-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { CommonService } from 'src/app/services/common.service';

declare var jQuery: any;

@Component({
  selector: "app-module1-11",
  templateUrl: "./module1-11.component.html"
})
export class Module111Component implements OnInit {
  @ViewChild("instructionModal") public instructionModal: ModalDirective;

  public mainFlagModule1 = parseInt(
    window.localStorage.getItem("mainFlagModule1")
  );
  public subFlagModule1 = parseInt(
    window.localStorage.getItem("subFlagModule1")
  );
  constructor(
    public CommonService: CommonService,
    public LanguageService: LanguageService,
    private LocalstoragedetailsService: LocalstoragedetailsService,
    private router: Router,
    public Module1Service: Module1Service,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public translate: TranslateService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  public token;
  public incomplete = false;
  passData = {};
  public playVideo = false;
  vedioCompleteUrl;
  statVideoFlag;

  assignData;
  questionlist;
  answer1;
  answer2;
  answer3;
  answer4;
  answer5;
  answer6;
  question1;
  question2;
  question3;
  question4;
  question5;
  question6;
  description;
  questionFlag;
  trimFlag;
  urlArray = {};nextFlag;
  public inst =
    "Assignment: दिलेल्या प्रसंगातील अविवेकी विचार शोधून त्यांच्याशी तिन्ही पद्धतीने प्रतिवाद कसा कराल ते लिहा. इतरांनी लिहिलेल्या उत्तरांवर प्रतिक्रिया दया.";

  ngOnInit() {
    this.vedioCompleteUrl = "79vHVVtmIoQ";
    this.mainFlagModule1 = parseInt(
      window.localStorage.getItem("mainFlagModule1")
    );
    this.subFlagModule1 = parseInt(
      window.localStorage.getItem("subFlagModule1")
    );
    this.token = this.LocalstoragedetailsService.token;
    if (this.token == null) {
      this.router.navigate(["/"]);
    }

    if (localStorage.getItem("questionFlag") != undefined && localStorage.getItem("questionFlag") != null && localStorage.getItem("questionFlag") != ""){
      this.questionFlag = true;
    } else
    {
      this.questionFlag = false;
    }

    this.answer1 = "";
    this.answer2 = "";
    this.answer3 = "";
    this.answer4 = "";
    this.answer5 = "";
    this.answer6 = "";

    if (this.mainFlagModule1 == 11) {
      if (this.subFlagModule1 == 1) {
        this.passData["apiUrl"] = "moduleonesingleurl/";
        this.passData["videoUrl"] = "";
        this.passData["status"] = true; //first time call
        this.passData["currentSubmodule"] = "Career - a process"; //static msg
        this.passData["nextSubmodule"] = "Career magic framework"; //static msg
      } else if (this.subFlagModule1 == 2) {
        this.startEvent2();
      }
    } else if (this.mainFlagModule1 > 11) {
      // this.passData["apiUrl"] = "moduleonesingleurl/";
      // var unlockJson = {};
      // unlockJson = JSON.parse(window.localStorage.getItem("currentJson1"));
      // if (unlockJson["children"].length > 0) {
      //   var index = unlockJson["children"].findIndex(
      //     item => item.source == "module 1.11"
      //   );

      //   if (unlockJson["children"][index].url != null) {
      //     this.passData["videoUrl"] = unlockJson["children"][index].url;
      //   }
      // }
      // this.passData["status"] = false; //first time call
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson1"));
      console.log("vcxxxx", urlJson);
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 1.11"
        );
        console.log("qWSS", index);
        var mainJson;
        mainJson = JSON.parse(urlJson["children"][index].url);
        console.log("hjbhjb", mainJson);
        if (urlJson["children"][index].url != null) {
          this.urlArray["src1"] = mainJson["1.11.1"];
          this.passData["videoUrl"] = this.urlArray["src1"];
        }
      }
    }
  }

  reset() {
    this.answer1 = "";
    this.answer2 = "";
    this.answer3 = "";
    this.answer4 = "";
    this.answer5 = "";
    this.answer6 = "";
    this.question1 = "";
    this.question2 = "";
    this.question3 = "";
    this.question4 = "";
    this.question5 = "";
    this.question6 = "";
  }

  ngDoCheck() {
    if (this.questionFlag == true) {
      if (
        this.answer1.trim().length == 0 ||
        this.answer2.trim().length == 0 ||
        this.answer3.trim().length == 0 ||
        this.answer4.trim().length == 0 ||
        this.answer5.trim().length == 0 ||
        this.answer6.trim().length == 0
      ) {
        this.trimFlag = true;
      } else {
        this.trimFlag = false;
      }
    } else {
      if (
        this.answer1.trim().length == 0 ||
        this.answer2.trim().length == 0 ||
        this.answer3.trim().length == 0 ||
        this.answer4.trim().length == 0 ||
        this.answer5.trim().length == 0
      ) {
        this.trimFlag = true;
      } else {
        this.trimFlag = false;
      }
    }
  }

  //removed this method if start event not required
  startEvent1() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["event"] = "start";
    var apiUrl = "moduleonesingleurl/";
    this.apiCall(jsonBody, apiUrl, "start1");
  }

  startEvent2() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["useranswer"] = "";
    jsonBody["event"] = "start";
    var apiUrl = "moduleonerebtmcq/";
    this.apiCall(jsonBody, apiUrl, "start2");
  }

  finishVideo(e) {
    console.log("aaaaaaa");
    if (e == true) {
      console.log(e);
      this.nextFlag = true; 
      this.subFlagModule1 = 2;
      this.instructionModal.show();
    } else {
      window.localStorage.setItem("mainFlagModule1", "11");
      this.router.navigate(["/modules/Module1.11"]);
    }
  }

  finish2() {
    var jsonBody = {};
    var apiUrl = "moduleonerebtmcq/";

    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    var ansJson = {};
    ansJson[this.questionlist[0].questionid] = this.answer1;
    ansJson[this.questionlist[1].questionid] = this.answer2;
    ansJson[this.questionlist[2].questionid] = this.answer3;
    ansJson[this.questionlist[3].questionid] = this.answer4;
    ansJson[this.questionlist[4].questionid] = this.answer5;
    jsonBody["useranswer"] = ansJson;
    jsonBody["event"] = "answer";
    console.log(ansJson, jsonBody);
    this.apiCall(jsonBody, apiUrl, "finish2");
  }

  submit() {
    var jsonBody = {};
    var apiUrl = "moduleonerebtmcq/";
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    var ansJson = {};
    ansJson[this.questionlist[0].questionid] = this.answer1;
    ansJson[this.questionlist[1].questionid] = this.answer2;
    ansJson[this.questionlist[2].questionid] = this.answer3;
    ansJson[this.questionlist[3].questionid] = this.answer4;
    ansJson[this.questionlist[4].questionid] = this.answer5;
    ansJson[this.questionlist[5].questionid] = this.answer6;
    jsonBody["useranswer"] = ansJson;
    jsonBody["event"] = "answer";
    console.log(ansJson, jsonBody);
    this.apiCall(jsonBody, apiUrl, "submit");
  }

  next() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["event"] = "finish";
    this.apiCall(jsonBody, "moduleonesingleurl/", "finish1");
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module1Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "start1") {
            // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 1.1', window.localStorage.getItem('username'), 10);
            this.passData["videoUrl"] = data["data"].url;
            this.vedioCompleteUrl = data["data"].url;

            // var current1 = [];
            // current1 = JSON.parse(window.localStorage.getItem("currentJson1"));
            // var child = {};
            // var index = current1["children"].findIndex(
            //   item => item.source == "module 1.13"
            // );
            // current1["children"][index].url = data["data"].url;
            // console.log("FINISH ", current1);
            // window.localStorage.setItem(
            //   "currentJson1",
            //   JSON.stringify(current1)
            // );
            this.playVideo = true;
          } else if (fun == "finish1") {
            this.instructionModal.hide();
            // this.playVideo = false;
            //this.statVideoFlag = true;
            this.mainFlagModule1 = 11;
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            console.log(data);
            this.subFlagModule1 = 2;
            window.localStorage.setItem("subFlagModule1", "2");
            this.questionFlag = true;
            window.localStorage.setItem("questionFlag","true");
            this.startEvent2();
            this.nextFlag = false;
          } else if (fun == "start2") {
            // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 1.1', window.localStorage.getItem('username'), 10);
            this.assignData = data["data"].result;
            this.description = this.assignData.description;
            this.questionlist = this.assignData.questionlist;
            this.question1 = this.questionlist[0].question;
            this.question2 = this.questionlist[1].question;
            this.question3 = this.questionlist[2].question;
            this.question4 = this.questionlist[3].question;
            this.question5 = this.questionlist[4].question;
            if (this.questionFlag == true) {
              console.log(this.subFlagModule1, "subFlagModule1");
              this.question6 = this.questionlist[5].question;
            }
            console.log(data);
            console.log(this.question6, "this.question6");
          } else if (fun == "submit") {
            this.mainFlagModule1 = 11;
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            console.log(data);
            this.subFlagModule1 = 2;
            window.localStorage.setItem("subFlagModule1", "2");
            this.questionFlag = false;
            localStorage.removeItem("questionFlag");
            this.reset();
            this.startEvent2();
          } else if (fun == "finish2") {
            var url = {};
            url["1.11.1"] = this.vedioCompleteUrl;
            var current1 = [];
            current1 = JSON.parse(window.localStorage.getItem("currentJson1"));
            var index = current1["children"].findIndex(
              item => item.source == "module 1.11"
            );
            current1["children"][index].url = JSON.stringify(url);
            window.localStorage.setItem(
              "currentJson1",
              JSON.stringify(current1)
            );
            this.statVideoFlag = true;
            this.mainFlagModule1 = 12;
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            window.localStorage.setItem("mainFlagModule1", "12");
            window.localStorage.setItem("subFlagModule1", "1");
            window.localStorage.setItem("source", "module 1.12");
            this.Module1Service.setLocalStorage1(12);
            var obj = {
              type: "submodule",
              route: true,
              current: this.translate.instant("L2Module1.subMenu1-11"),
              next: this.translate.instant("L2Module1.subMenu1-12"),
              nextRoute: "/modules/module1/Module1.12"
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
}
