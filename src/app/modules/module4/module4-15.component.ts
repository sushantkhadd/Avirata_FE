import { Component, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "src/app/language.service";
import { FullLayoutService } from "src/app/layouts/full-layout.service";
import { Router } from "@angular/router";
import { LocalstoragedetailsService } from "src/app/services/localstoragedetails.service";
import { ToastsManager } from "ng6-toastr";
import { Module4Service } from "./module4.service";
import { environment } from "src/environments/environment";
import { ModalDirective } from "ngx-bootstrap";

@Component({
  selector: 'app-module4-15',
  templateUrl: './module4-15.component.html'
})
export class Module415Component implements OnInit {

  @ViewChild('staticImageModal') public staticImageModal: ModalDirective;
  @ViewChild('instructionModal') public instructionModal: ModalDirective;

  public mainFlagModule4 = parseInt(window.localStorage.getItem('mainFlagModule4'));
  public subFlagModule4 = parseInt(window.localStorage.getItem('subFlagModule4'));

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

  public token; incomplete = false; playVideo = false; vedioCompleteUrl; showLimit = {};
  statVideoFlag; instFlag = false; postWordCount = {}; zeroFlag; assignData; questionlist;
  answer1; answer2; answer3; answer4; answer5; answer6; question1; question2; question3;
  question4; question5; question6; description; questionFlag; trimFlag; 
  urlArray = {}; nextFlag; queFlag; zeroMsgFlag = {}; 
  inst = "तुमच्या वर्गातील विद्यार्थ्यांमध्ये सकारात्मक मानसिकता निर्माण करण्याच्या दृष्टिने तुम्ही कोणते  उपक्रम घ्याल ते सविस्तर लिहा. खालील प्रत्येक विषयासंदर्भात एक उपक्रम नेमकेपणाने लिहा.";

  ngOnInit() {

    if (this.mainFlagModule4 == 15) {
      if(this.subFlagModule4 == 1){
        this.instFlag = true;

        this.zeroMsgFlag['1'] = false;
        this.zeroMsgFlag['2'] = false;
        this.zeroMsgFlag['3'] = false;
        this.vedioCompleteUrl = "79vHVVtmIoQ";
        this.token = this.LocalstoragedetailsService.token;
    
        if (this.token == null) {
          this.router.navigate(["/"]);
        }
    
        if ((localStorage.getItem("questionFlag") != undefined && localStorage.getItem("questionFlag") != null && localStorage.getItem("questionFlag") != "")) {
          this.questionFlag = true;
          console.log('qweqweqew')
    
        } else {
          this.questionFlag = false;
          console.log('qqqq')
        }
    
        if (window.localStorage.getItem("source") == "module 4.15.1") {
          this.questionFlag = false;
          console.log("btn scenario")
        }
    
        this.answer1 = "";
        this.answer2 = "";
        this.answer3 = "";
        this.queFlag = false;
    
        this.postWordCount['1'] = 0;
        this.postWordCount['2'] = 0;
        this.postWordCount['3'] = 0;
      }
    } else if (this.mainFlagModule4 > 15) {
      this.instFlag = false;
    }

   

  }

  reset() {
    this.answer1 = "";
    this.answer2 = "";
    this.answer3 = "";
    this.question1 = "";
    this.question2 = "";
    this.question3 = "";
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

    if (this.questionFlag == true) {
      if (this.answer1 != null && this.answer1 != "" && this.answer1 != undefined ||
        this.answer2 != null && this.answer2 != "" && this.answer2 != undefined ||
        this.answer3 != null && this.answer3 != "" && this.answer3 != undefined) {
        if (
          this.answer1.trim().length == 0 ||
          this.answer2.trim().length == 0 ||
          this.answer3.trim().length == 0 
        ) {
          this.trimFlag = true;
        } else if (this.postWordCount['1'] > 150 || this.postWordCount['1'] < 5) {
          this.trimFlag = true;
        } else if (this.postWordCount['2'] > 150 || this.postWordCount['2'] < 5) {
          this.trimFlag = true;
        } else if (this.postWordCount['3'] > 150 || this.postWordCount['3'] < 5) {
          this.trimFlag = true;
        } else {
          this.trimFlag = false;
        }
      }

    }

    else {
      if (this.answer1 != null && this.answer1 != "" && this.answer1 != undefined ||
        this.answer2 != null && this.answer2 != "" && this.answer2 != undefined ||
        this.answer3 != null && this.answer3 != "" && this.answer3 != undefined 
      ) {
        if (
          this.answer1.trim().length == 0 ||
          this.answer2.trim().length == 0 ||
          this.answer3.trim().length == 0
        ) {
          this.trimFlag = true;
        } else if (this.postWordCount['1'] > 150 || this.postWordCount['1'] < 5) {
          this.trimFlag = true;
        } else if (this.postWordCount['2'] > 150 || this.postWordCount['2'] < 5) {
          this.trimFlag = true;
        } else if (this.postWordCount['3'] > 150 || this.postWordCount['3'] < 5) {
          this.trimFlag = true;
        } else {
          this.trimFlag = false;
        }
      }

    }
  }

  startEvent2() {
    this.instFlag = false;
    this.nextFlag = false;
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["useranswer"] = "";
    jsonBody["event"] = "start";
    var apiUrl = "l4module4freetext/";
    this.apiCall(jsonBody, apiUrl, "start2");
  }

  finish2() {
    var jsonBody = {};
    var apiUrl = "l4module4freetext/";

    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    var ansJson = {};
    ansJson[this.questionlist[0].questionid] = (this.answer1).trim();
    ansJson[this.questionlist[1].questionid] = (this.answer2).trim();
    ansJson[this.questionlist[2].questionid] = (this.answer3).trim();
    jsonBody["useranswer"] = ansJson;
    jsonBody["event"] = "answer";
    console.log(ansJson, jsonBody);
    this.apiCall(jsonBody, apiUrl, "finish2");
  }

  submit() {
    var jsonBody = {};
    var apiUrl = "l4module4freetext/";
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    var ansJson = {};
    ansJson[this.questionlist[0].questionid] = (this.answer1).trim();
    ansJson[this.questionlist[1].questionid] = (this.answer2).trim();
    ansJson[this.questionlist[2].questionid] = (this.answer3).trim();
    jsonBody["useranswer"] = ansJson;
    jsonBody["event"] = "answer";
    console.log(ansJson, jsonBody);
    this.apiCall(jsonBody, apiUrl, "submit");
  }

  next() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["event"] = "finish";
    this.apiCall(jsonBody, "modulefoursingleurl/", "finish1");
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module4Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "finish1") {
            this.instructionModal.hide();
            this.LanguageService.toHide();
            this.mainFlagModule4 = 15;
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            console.log(data);
            this.subFlagModule4 = 2;
            window.localStorage.setItem("subFlagModule4", "7");
            this.questionFlag = true;
            window.localStorage.setItem("questionFlag", "true");
          } else if (fun == "start2") {
            this.assignData = data["data"].questionlist;
            console.log('hiiiiii assignData', this.assignData)
            // this.description = this.assignData.description;

            this.questionlist = this.assignData;
            console.log('hiiiiii', this.questionlist)
            this.question1 = this.questionlist[0].question;
            this.question2 = this.questionlist[1].question;
            this.question3 = this.questionlist[2].question;
            if (this.questionlist.length == 6) {
              this.queFlag = true;
              console.log(this.subFlagModule4, "subFlagModule4");
              this.question6 = this.questionlist[5].question;
            } else {
              this.queFlag = false;
            }

            this.instFlag = false;
          } else if (fun == "submit") {
            this.zeroMsgFlag['1'] = false;
            this.zeroMsgFlag['2'] = false;
            this.zeroMsgFlag['3'] = false;
            this.showLimit['1'] = true;
            this.showLimit['2'] = true;
            this.showLimit['3'] = true;
            this.postWordCount['1'] = 0;
            this.postWordCount['2'] = 0;
            this.postWordCount['3'] = 0;
            this.mainFlagModule4 = 15;
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            console.log(data);
            // this.subFlagModule4 = 2;
            window.localStorage.setItem("subFlagModule4", "16");
            window.localStorage.setItem("source", "module 4.16");
            this.questionFlag = false;
            localStorage.removeItem("questionFlag");
            this.reset();
            this.startEvent2();
          } else if (fun == "finish2") {

            var current4 = [];
            current4 = JSON.parse(window.localStorage.getItem("currentJson4"));
            var index = current4["children"].findIndex(
              item => item.source == "module 4.15");
            var moduleJson = current4["children"][index]
            if (moduleJson["children"].length != 0) {
              var index1 = moduleJson["children"].findIndex(
                item => item.source == "module 4.15.1");
              var parentUrls = {}
              if (moduleJson["children"][index1].url != "" && moduleJson["children"][index1].url != null && moduleJson["children"][index1].url != undefined) {
                parentUrls['4.15.1'] = moduleJson["children"][index1].url;
              }
              current4["children"][index].url = JSON.stringify(parentUrls);
            }
            window.localStorage.setItem("currentJson4", JSON.stringify(current4));

            this.statVideoFlag = true;
            this.mainFlagModule4 = 16;
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            window.localStorage.setItem("mainFlagModule4", "16");
            window.localStorage.setItem("subFlagModule4", "1");
            window.localStorage.setItem("source", "module 4.16");
            this.Module4Service.setLocalStorage4(16);
            var obj = {
              type: "submodule",
              route: true,
              current: this.translate.instant("L2Module4.subMenu4-15"),
              next: this.translate.instant("L2Module4Finish.subMenu4-16"),
              nextRoute: "/modules/module4/Module4.16"
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
