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
  vedioCompleteUrl; showLimit = {};
  statVideoFlag; instFlag; postWordCount = {}; zeroFlag;

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
  urlArray = {}; nextFlag; queFlag; zeroMsgFlag = {};
  public inst =
    "खाली १ प्रसंग दिला आहे. त्यातील घटना (A), दोन्ही पात्रांचे अविवेकी विचार (धारणा) (iB), दोन्ही पात्रांचे प्रतिसाद (C) , iB शी केलेला वाद, संवाद, प्रतिवाद (प्रश्न प्रतिप्रश्न या स्वरूपात) आणि त्यामुळे बदललेले विवेकी विचार (rB) आणि शेवटी दोन्ही पात्रांचा बदललेला प्रतिसाद (C) हा पायरी-पायरी ने लिहा.";

  ngOnInit() {
    this.zeroMsgFlag['1'] = false;
    this.zeroMsgFlag['2'] = false;
    this.zeroMsgFlag['3'] = false;
    this.zeroMsgFlag['4'] = false;
    this.zeroMsgFlag['5'] = false;
    this.zeroMsgFlag['6'] = false;

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

    if ((localStorage.getItem("questionFlag") != undefined && localStorage.getItem("questionFlag") != null && localStorage.getItem("questionFlag") != "") ||
      this.subFlagModule1 == 2) {
      this.questionFlag = true;
      console.log('qweqweqew')

    } else {
      this.questionFlag = false;
      console.log('qqqq')
    }

    if(window.localStorage.getItem("source")=="module 1.11.2.2"){
      this.questionFlag = false;
      console.log("btn scenario")
    }

    this.answer1 = "";
    this.answer2 = "";
    this.answer3 = "";
    this.answer4 = "";
    this.answer5 = "";
    this.answer6 = "";
    this.queFlag = false;

    this.postWordCount['1'] = 0;
    this.postWordCount['2'] = 0;
    this.postWordCount['3'] = 0;
    this.postWordCount['4'] = 0;
    this.postWordCount['5'] = 0;
    this.postWordCount['6'] = 0;

    if (this.mainFlagModule1 == 11) {
      if (this.subFlagModule1 == 1) {
        this.passData["apiUrl"] = "moduleonesingleurl/";
        this.passData["videoUrl"] = "";
        this.passData["status"] = true; //first time call
        this.passData["currentSubmodule"] = "Career - a process"; //static msg
        this.passData["nextSubmodule"] = "Career magic framework"; //static msg
      } else if (this.subFlagModule1 == 2) {
        this.instFlag = true;
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

    if (this.answer1) {
      this.postWordCount['1'] = this.answer1.trim().split(/\s+/).length;
    }
    if (this.answer2) {
      this.postWordCount['2'] = this.answer2.trim().split(/\s+/).length;
    }
    if (this.answer3) {
      this.postWordCount['3'] = this.answer3.trim().split(/\s+/).length;
    }
    if (this.answer4) {
      this.postWordCount['4'] = this.answer4.trim().split(/\s+/).length;
    }
    if (this.answer5) {
      this.postWordCount['5'] = this.answer5.trim().split(/\s+/).length;
    }
    if (this.answer6) {
      this.postWordCount['6'] = this.answer6.trim().split(/\s+/).length;
    }

    if (this.answer1 == "" || this.answer1 == null || this.answer1 == undefined) {
      this.postWordCount['1'] = 0;
      // this.zeroMsgFlag['1']=true
    }
    if (this.answer2 == "" || this.answer2 == null || this.answer2 == undefined) {
      this.postWordCount['2'] = 0;
      // this.zeroMsgFlag['2']=true
    }
    if (this.answer3 == "" || this.answer3 == null || this.answer3 == undefined) {
      this.postWordCount['3'] = 0;
      // this.zeroMsgFlag['3']=true
    }
    if (this.answer4 == "" || this.answer4 == null || this.answer4 == undefined) {
      this.postWordCount['4'] = 0;
      // this.zeroMsgFlag['4']=true
    }
    if (this.answer5 == "" || this.answer5 == null || this.answer5 == undefined) {
      this.postWordCount['5'] = 0;
      // this.zeroMsgFlag['5']=true
    }
    if (this.answer6 == "" || this.answer6 == null || this.answer6 == undefined) {
      this.postWordCount['6'] = 0;
      // this.zeroMsgFlag['6']=true
    }

    if (this.questionFlag == true) {
      if (this.answer1 != null && this.answer1 != "" && this.answer1 != undefined ||
        this.answer2 != null && this.answer2 != "" && this.answer2 != undefined ||
        this.answer3 != null && this.answer3 != "" && this.answer3 != undefined ||
        this.answer4 != null && this.answer4 != "" && this.answer4 != undefined ||
        this.answer5 != null && this.answer5 != "" && this.answer5 != undefined ||
        this.answer6 != null && this.answer6 != "" && this.answer6 != undefined) {
        if (
          this.answer1.trim().length == 0 ||
          this.answer2.trim().length == 0 ||
          this.answer3.trim().length == 0 ||
          this.answer4.trim().length == 0 ||
          this.answer5.trim().length == 0 ||
          this.answer6.trim().length == 0
        ) {
          this.trimFlag = true;
        } else if (this.postWordCount['1'] > 150 || this.postWordCount['1'] < 5) {
          this.trimFlag = true;
        } else if (this.postWordCount['2'] > 150 || this.postWordCount['2'] < 5) {
          this.trimFlag = true;
        } else if (this.postWordCount['3'] > 150 || this.postWordCount['3'] < 5) {
          this.trimFlag = true;
        } else if (this.postWordCount['4'] > 150 || this.postWordCount['4'] < 5) {
          this.trimFlag = true;
        } else if (this.postWordCount['5'] > 150 || this.postWordCount['5'] < 5) {
          this.trimFlag = true;
        } else if (this.postWordCount['6'] > 150 || this.postWordCount['6'] < 5) {
          this.trimFlag = true;
        } else {
          this.trimFlag = false;
        }
      }

    }

    else {
      if (this.answer1 != null && this.answer1 != "" && this.answer1 != undefined ||
        this.answer2 != null && this.answer2 != "" && this.answer2 != undefined ||
        this.answer3 != null && this.answer3 != "" && this.answer3 != undefined ||
        this.answer4 != null && this.answer4 != "" && this.answer4 != undefined ||
        this.answer5 != null && this.answer5 != "" && this.answer5 != undefined
      ) {
        if (
          this.answer1.trim().length == 0 ||
          this.answer2.trim().length == 0 ||
          this.answer3.trim().length == 0 ||
          this.answer4.trim().length == 0 ||
          this.answer5.trim().length == 0
        ) {
          this.trimFlag = true;
        } else if (this.postWordCount['1'] > 150 || this.postWordCount['1'] < 5) {
          this.trimFlag = true;
        } else if (this.postWordCount['2'] > 150 || this.postWordCount['2'] < 5) {
          this.trimFlag = true;
        } else if (this.postWordCount['3'] > 150 || this.postWordCount['3'] < 5) {
          this.trimFlag = true;
        } else if (this.postWordCount['4'] > 150 || this.postWordCount['4'] < 5) {
          this.trimFlag = true;
        } else if (this.postWordCount['5'] > 150 || this.postWordCount['5'] < 5) {
          this.trimFlag = true;
        } else {
          this.trimFlag = false;
        }
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
    this.instFlag = false;
    this.nextFlag = false;
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
      this.LanguageService.toShow()
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
    ansJson[this.questionlist[0].questionid] = (this.answer1).trim();
    ansJson[this.questionlist[1].questionid] = (this.answer2).trim();
    ansJson[this.questionlist[2].questionid] = (this.answer3).trim();
    ansJson[this.questionlist[3].questionid] = (this.answer4).trim();
    ansJson[this.questionlist[4].questionid] = (this.answer5).trim();
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
    ansJson[this.questionlist[0].questionid] = (this.answer1).trim();
    ansJson[this.questionlist[1].questionid] = (this.answer2).trim();
    ansJson[this.questionlist[2].questionid] = (this.answer3).trim();
    ansJson[this.questionlist[3].questionid] = (this.answer4).trim();
    ansJson[this.questionlist[4].questionid] = (this.answer5).trim();
    ansJson[this.questionlist[5].questionid] = (this.answer6).trim();
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
            this.playVideo = true;
          } else if (fun == "finish1") {
            this.instFlag = true;
            this.instructionModal.hide();
            this.LanguageService.toHide();
            // this.playVideo = false;
            //this.statVideoFlag = true;
            this.mainFlagModule1 = 11;
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            console.log(data);
            this.subFlagModule1 = 2;
            window.localStorage.setItem("subFlagModule1", "2");
            this.questionFlag = true;
            window.localStorage.setItem("questionFlag", "true");
            //this.startEvent2();
            //this.nextFlag = false;
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
            if (this.questionlist.length == 6) {
              this.queFlag = true;
              // this.showLimit['6']=true
              console.log(this.subFlagModule1, "subFlagModule1");
              this.question6 = this.questionlist[5].question;
            } else {
              this.queFlag = false;
              // this.showLimit['6']=false;
            }
            console.log(data);
            console.log(this.question6, "this.question6");

          } else if (fun == "submit") {
            // this.queFlag = false;
            // this.zeroMsgFlag= false;
            this.zeroMsgFlag['1'] = false;
            this.zeroMsgFlag['2'] = false;
            this.zeroMsgFlag['3'] = false;
            this.zeroMsgFlag['4'] = false;
            this.zeroMsgFlag['5'] = false;
            this.zeroMsgFlag['6'] = false;
            this.showLimit['1'] = true;
            this.showLimit['2'] = true;
            this.showLimit['3'] = true;
            this.showLimit['4'] = true;
            this.showLimit['5'] = true;
            this.showLimit['6'] = false;
            this.postWordCount['1'] = 0;
            this.postWordCount['2'] = 0;
            this.postWordCount['3'] = 0;
            this.postWordCount['4'] = 0;
            this.postWordCount['5'] = 0;
            this.mainFlagModule1 = 11;
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            console.log(data);
            this.subFlagModule1 = 2;
            window.localStorage.setItem("subFlagModule1", "2");
            window.localStorage.setItem("source", "module 1.11.2.2");
            this.questionFlag = false;
            localStorage.removeItem("questionFlag");
            this.reset();
            this.startEvent2();
          } else if (fun == "finish2") {

            var current1 = [];
            current1 = JSON.parse(window.localStorage.getItem("currentJson1"));
            var index = current1["children"].findIndex(
              item => item.source == "module 1.11");
            var moduleJson = current1["children"][index]
            if(moduleJson["children"].length !=0){
            var index1 = moduleJson["children"].findIndex(
            item => item.source == "module 1.11.1");
            var parentUrls = {}
            parentUrls['1.11.1'] = moduleJson["children"][index1].url;
            }
            current1["children"][index].url = JSON.stringify(parentUrls);
            window.localStorage.setItem("currentJson1", JSON.stringify(current1));

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
              next: this.translate.instant("L2Module1Finish.subMenu1-12"),
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

  handleInput(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  }

  zeroTrue() {
    this.showLimit['1'] = true;
    this.zeroMsgFlag['1'] = true;
    console.log('eqwewr', this.showLimit['1'], this.zeroMsgFlag['1'])
  }
}
