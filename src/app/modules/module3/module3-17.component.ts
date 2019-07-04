import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Module3Service } from '../module3/module3.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/language.service';
import { FullLayoutService } from 'src/app/layouts/full-layout.service';
import { Router } from '@angular/router';
import { LocalstoragedetailsService } from 'src/app/services/localstoragedetails.service';
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'app-module3-17',
  templateUrl: './module3-17.component.html'
})
export class Module317Component implements OnInit {

  constructor(public Module3Service: Module3Service,
    public translate: TranslateService,
    public LanguageService: LanguageService,
    public FullLayoutService: FullLayoutService,
    public router: Router,
    public LocalstoragedetailsService: LocalstoragedetailsService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  public mainFlagModule3; subFlagModule3;
  public question1; question2; question3; question4; question5; question6; questionid1; questionid2; questionid3; questionid4; questionid5; questionid6; answer1; answer2; answer3; answer4; answer5; answer6; stud_1; stud_2; stud_3; questionList; question_1; questionId_1; question_2; questionId_2; question_3; questionId_3; questionId_4; questionId_5; answer_1; answer_2; answer_3; answer_4; answer_5
  question_4; question_5; selectedId; studThreeFlag; studTwoFlag; studOneFlag; displayFormFlag; studDetails;radioFlagOne;
  public trimFlag; showLimit = {}; postWordCount = {};

  ngOnInit() {
    this.displayFormFlag = false;
    this.studOneFlag = false;
    this.studThreeFlag = false;
    this.studTwoFlag = false;
    this.answer_1 = "";
    this.answer_2 = "";
    this.answer_3 = "";
    this.answer_4 = "";
    this.answer_5 = "";

    this.mainFlagModule3 = parseInt(
      window.localStorage.getItem("mainFlagModule3")
    );
    this.subFlagModule3 = parseInt(
      window.localStorage.getItem("subFlagModule3")
    );

    this.postWordCount['1'] = 0;
    this.postWordCount['2'] = 0;
    this.postWordCount['3'] = 0;
    this.postWordCount['4'] = 0;
    this.postWordCount['5'] = 0;

    if (this.mainFlagModule3 == 17) {
      // if (
      //   this.subFlagModule3 == 1
      // ) {
        this.startEvent();
      // }
    }
  }

  ngDoCheck() {
    if (this.answer_1) {
      this.postWordCount['1'] = this.answer_1.trim().split(' ').length;
    }
    if (this.answer_2) {
      this.postWordCount['2'] = this.answer_2.trim().split(' ').length;
    }
    if (this.answer_3) {
      this.postWordCount['3'] = this.answer_3.trim().split(' ').length;
    }
    if (this.answer_4) {
      this.postWordCount['4'] = this.answer_4.trim().split(' ').length;
    }
    if (this.answer_5) {
      this.postWordCount['5'] = this.answer_5.trim().split(' ').length;
    }

    if (this.answer_1 != "" && this.answer_1 != undefined && this.answer_1 != null
      || this.answer_2 != "" && this.answer_2 != undefined && this.answer_2 != null
      || this.answer_3 != "" && this.answer_3 != undefined && this.answer_3 != null
      || this.answer_4 != "" && this.answer_4 != undefined && this.answer_4 != null
      || this.answer_5 != "" && this.answer_5 != undefined && this.answer_5 != null) {
      if (this.answer_1.trim().length == 0 || this.answer_2.trim().length == 0 ||
        this.answer_3.trim().length == 0 || this.answer_4.trim().length == 0 || this.answer_5.trim().length == 0) {
        this.trimFlag = true;
      }
      else if (this.postWordCount['1'] > 150 || this.postWordCount['1'] < 5) {
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
    } else{
      if (this.answer_1 == "" || this.answer_1 == null || this.answer_1 == undefined) {
        this.postWordCount['1'] = 0;
      }
      if (this.answer_2 == "" || this.answer_2 == null || this.answer_2 == undefined) {
        this.postWordCount['2'] = 0;
      }
      if (this.answer_3 == "" || this.answer_3 == null || this.answer_3 == undefined) {
        this.postWordCount['3'] = 0;
      }
      if (this.answer_4 == "" || this.answer_4 == null || this.answer_4 == undefined) {
        this.postWordCount['4'] = 0;
      }
      if (this.answer_5 == "" || this.answer_5 == null || this.answer_5 == undefined) {
        this.postWordCount['5'] = 0;
      }
    }


  }

  startEvent() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["useranswer"] = "";
    jsonBody["event"] = "start";
    var apiUrl = "l3module3freetext/";
    this.apiCall(jsonBody, apiUrl, "start");
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module3Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "start") {
            console.log('All Data', data);
            this.stud_1 = data["data"]["previous_answer"][0]["stud_1"];
            this.stud_2 = data["data"]["previous_answer"][1]["stud_2"];
            this.stud_3 = data["data"]["previous_answer"][2]["stud_3"];
            // stud_1
            this.question1 = this.stud_1[0].question
            this.question2 = this.stud_1[1].question
            this.answer1 = this.stud_1[0].answer
            this.answer2 = this.stud_1[1].answer
            //stud_2
            this.question3 = this.stud_2[0].question
            this.question4 = this.stud_2[1].question
            this.answer3 = this.stud_2[0].answer
            this.answer4 = this.stud_2[1].answer
            //stud_3
            this.question5 = this.stud_3[0].question
            this.question6 = this.stud_3[1].question
            this.answer5 = this.stud_3[0].answer
            this.answer6 = this.stud_3[1].answer

            this.questionList = data["data"]["questionlist"]
            console.log('questionlist', this.questionList);

            this.question_1 = this.questionList[0].question;
            this.questionId_1 = this.questionList[0].questionid

            this.question_2 = this.questionList[1].question;
            this.questionId_2 = this.questionList[1].questionid

            this.question_3 = this.questionList[2].question;
            this.questionId_3 = this.questionList[2].questionid

            this.question_4 = this.questionList[3].question;
            this.questionId_4 = this.questionList[3].questionid

            this.question_5 = this.questionList[4].question;
            this.questionId_5 = this.questionList[4].questionid

          } else if (fun == "finish") {
            this.mainFlagModule3 = 18;
            window.localStorage.setItem("subFlagModule3", "1");
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            window.localStorage.setItem("mainFlagModule3", "18");
            window.localStorage.setItem("source", "module 3.18.1");
            this.Module3Service.setLocalStorage3(18);
            var obj = {
              type: "submodule",
              route: true,
              current: this.translate.instant("L2Module3.subMenu3-17"),
              next: this.translate.instant("L2Module3Finish.subMenu3-18"),
              nextRoute: "/modules/module3/Module3.18"
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

  finish() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    var ansJson = {};
    ansJson[this.questionId_1] = (this.answer_1).trim();
    ansJson[this.questionId_2] = (this.answer_2).trim();
    ansJson[this.questionId_3] = (this.answer_3).trim();
    ansJson[this.questionId_4] = (this.answer_4).trim();
    ansJson[this.questionId_5] = (this.answer_5).trim();

    console.log('answrrs', ansJson)
    jsonBody["useranswer"] = ansJson;
    jsonBody["event"] = "answer";
    var apiUrl = "l3module3freetext/";
    this.apiCall(jsonBody, apiUrl, "finish");
  }

  onValueChanged($event, id) {
    this.displayFormFlag = true;
    this.selectedId = id;
    console.log('selected id', this.selectedId);

    if (this.studDetails == 1) {
      console.log("ewrewret");
      this.studTwoFlag = true;
      this.studThreeFlag = true;
    } else if (this.studDetails == 2) {
      this.studOneFlag = true;
      this.studThreeFlag = true;
    } else if (this.studDetails == 3) {
      this.studTwoFlag = true;
      this.studOneFlag = true;
    }
  }

  clear(){
    this.answer_1 = "";
    this.answer_2 = "";
    this.answer_3 = "";
    this.answer_4 = "";
    this.answer_5 = "";
    this.studDetails = "";
    this.selectedId = "";
  }

  goBack(){
    this.clear();
    this.studOneFlag = false;
    this.studTwoFlag = false;
    this.studThreeFlag = false;
    this.displayFormFlag = false;
  }

  handleInput(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  }

}
