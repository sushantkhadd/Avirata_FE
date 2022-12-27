import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Module2Service } from './module2.service'
import { ModalDirective } from 'ngx-bootstrap';
import { ToastsManager } from 'ng6-toastr';


@Component({
  selector: 'app-module2-13',
  templateUrl: './module2-13.component.html'
})
export class Module213Component implements OnInit {

  @ViewChild('staticImageModal') public staticImageModal: ModalDirective;
  @ViewChild('instructionModal') public instructionModal: ModalDirective;

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

  public token; incomplete = false; playVideo = false; vedioCompleteUrl; showLimit = {};
  statVideoFlag; instFlag = true; postWordCount = {}; zeroFlag; assignData; questionlist;
  answer1; answer2; answer3; answer4; answer5; answer6; question1; question2; question3;
  question4; question5; question6; description; questionFlag; trimFlag; mainFlagModule2;
  urlArray = {}; nextFlag; queFlag; zeroMsgFlag = {}; subFlagModule2;
  public inst =
    "दिलेल्या प्रसंगांमध्ये पात्रांचा प्रतिसाद कोणत्या अविवेकी विचारांमधून (धारणांमधून) निर्माण झाला आहे ते लिहा.";

  ngOnInit() {
    this.zeroMsgFlag['1'] = false;
    this.zeroMsgFlag['2'] = false;
    this.zeroMsgFlag['3'] = false;
    this.zeroMsgFlag['4'] = false;

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

    if ((localStorage.getItem("questionFlag") != undefined && localStorage.getItem("questionFlag") != null && localStorage.getItem("questionFlag") != "") ||
      this.subFlagModule2 == 2) {
      this.questionFlag = true;
      console.log('qweqweqew')

    } else {
      this.questionFlag = false;
      console.log('qqqq')
    }

    if (window.localStorage.getItem("source") == "module 2.16.1") {
      this.questionFlag = false;
      console.log("btn scenario")
    }

    this.answer1 = "";
    this.answer2 = "";
    this.answer3 = "";
    this.answer4 = "";
    this.queFlag = false;

    this.postWordCount['1'] = 0;
    this.postWordCount['2'] = 0;
    this.postWordCount['3'] = 0;
    this.postWordCount['4'] = 0;

    if (this.mainFlagModule2 == 13) {

      this.instFlag = true;
    } else if (this.mainFlagModule2 > 13) {

    }
  }

  reset() {
    this.answer1 = "";
    this.answer2 = "";
    this.answer3 = "";
    this.answer4 = "";
    this.question1 = "";
    this.question2 = "";
    this.question3 = "";
    this.question4 = "";
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

    if (this.questionFlag == true) {
      if (this.answer1 != null && this.answer1 != "" && this.answer1 != undefined ||
        this.answer2 != null && this.answer2 != "" && this.answer2 != undefined ||
        this.answer3 != null && this.answer3 != "" && this.answer3 != undefined ||
        this.answer4 != null && this.answer4 != "" && this.answer4 != undefined) {
        if (
          this.answer1.trim().length == 0 ||
          this.answer2.trim().length == 0 ||
          this.answer3.trim().length == 0 ||
          this.answer4.trim().length == 0
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
        } else {
          this.trimFlag = false;
        }
      }

    }

    else {
      if (this.answer1 != null && this.answer1 != "" && this.answer1 != undefined ||
        this.answer2 != null && this.answer2 != "" && this.answer2 != undefined ||
        this.answer3 != null && this.answer3 != "" && this.answer3 != undefined ||
        this.answer4 != null && this.answer4 != "" && this.answer4 != undefined 
      ) {
        if (
          this.answer1.trim().length == 0 ||
          this.answer2.trim().length == 0 ||
          this.answer3.trim().length == 0 ||
          this.answer4.trim().length == 0 
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
    var apiUrl = "l4module2freetext/";
    this.apiCall(jsonBody, apiUrl, "start2");
  }

  finish2() {
    var jsonBody = {};
    var apiUrl = "l4module2freetext/";

    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    var ansJson = {};
    ansJson[this.questionlist[0].questionid] = (this.answer1).trim();
    ansJson[this.questionlist[1].questionid] = (this.answer2).trim();
    ansJson[this.questionlist[2].questionid] = (this.answer3).trim();
    ansJson[this.questionlist[3].questionid] = (this.answer4).trim();
    jsonBody["useranswer"] = ansJson;
    jsonBody["event"] = "answer";
    console.log(ansJson, jsonBody);
    this.apiCall(jsonBody, apiUrl, "finish2");
  }

  submit() {
    var jsonBody = {};
    var apiUrl = "l4module2freetext/";
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    var ansJson = {};
    ansJson[this.questionlist[0].questionid] = (this.answer1).trim();
    ansJson[this.questionlist[1].questionid] = (this.answer2).trim();
    ansJson[this.questionlist[2].questionid] = (this.answer3).trim();
    ansJson[this.questionlist[3].questionid] = (this.answer4).trim();
    jsonBody["useranswer"] = ansJson;
    jsonBody["event"] = "answer";
    console.log(ansJson, jsonBody);
    this.apiCall(jsonBody, apiUrl, "submit");
  }

  next() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["event"] = "finish";
    this.apiCall(jsonBody, "moduletwosingleurl/", "finish1");
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module2Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "finish1") {
            this.instructionModal.hide();
            this.LanguageService.toHide();
            this.mainFlagModule2 = 13;
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            console.log(data);
            this.subFlagModule2 = 2;
            window.localStorage.setItem("subFlagModule1", "7");
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
            this.question4 = this.questionlist[3].question;
            if (this.questionlist.length == 6) {
              this.queFlag = true;
              console.log(this.subFlagModule2, "subFlagModule2");
              this.question6 = this.questionlist[5].question;
            } else {
              this.queFlag = false;
            }

            this.instFlag = false;
          } else if (fun == "submit") {
            this.zeroMsgFlag['1'] = false;
            this.zeroMsgFlag['2'] = false;
            this.zeroMsgFlag['3'] = false;
            this.zeroMsgFlag['4'] = false;
            this.showLimit['1'] = true;
            this.showLimit['2'] = true;
            this.showLimit['3'] = true;
            this.showLimit['4'] = true;
            this.postWordCount['1'] = 0;
            this.postWordCount['2'] = 0;
            this.postWordCount['3'] = 0;
            this.postWordCount['4'] = 0;
            this.mainFlagModule2 = 13;
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            console.log(data);
            this.subFlagModule2 = 2;
            window.localStorage.setItem('mainFlagModule2', '14');
            window.localStorage.setItem("subFlagModule2", "1");
            window.localStorage.setItem("source", "module 2.14");
            this.questionFlag = false;
            localStorage.removeItem("questionFlag");
            this.reset();
            this.startEvent2();
          } else if (fun == "finish2") {

            var current2 = [];
            current2 = JSON.parse(window.localStorage.getItem("currentJson2"));
            var index = current2["children"].findIndex(
              item => item.source == "module 2.13");
            var moduleJson = current2["children"][index]
            if (moduleJson["children"].length != 0) {
              var index1 = moduleJson["children"].findIndex(
                item => item.source == "module 2.13.1");
              var parentUrls = {}
              if (moduleJson["children"][index1].url != "" && moduleJson["children"][index1].url != null && moduleJson["children"][index1].url != undefined) {
                parentUrls['2.13.1'] = moduleJson["children"][index1].url;
              }
              current2["children"][index].url = JSON.stringify(parentUrls);
            }
            window.localStorage.setItem("currentJson2", JSON.stringify(current2));

            this.statVideoFlag = true;
            this.mainFlagModule2 = 14;
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            window.localStorage.setItem("mainFlagModule2", "14");
            window.localStorage.setItem("subFlagModule2", "1");
            window.localStorage.setItem("source", "module 2.14");
            this.Module2Service.setLocalStorage2(14);
            var obj = {
              type: "submodule",
              route: true,
              current: this.translate.instant("L2Module2.subMenu2-14"),
              next: this.translate.instant("L2Module2Finish.subMenu2-14"),
              nextRoute: "/modules/module2/Module2.14"
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
