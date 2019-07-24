import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QuizService } from '../services/quiz.service';
//import { HelperService } from '../services/helper.service';
import { Option, Question, Quiz, QuizConfig } from './../models/index';
import 'rxjs/add/operator/map';
import { Injectable, ViewContainerRef } from '@angular/core';
import { environment } from './../../../../environments/environment';
// import { BaselineService } from './../../../modules/baseline/baseline.service';
import { Router } from "@angular/router";
import { LocalstoragedetailsService } from "../../../services/localstoragedetails.service";
import { Module1Service } from "../../../modules/module1/module1.service";
import { ToastsManager } from "ng6-toastr";
import { Module2Service } from "../../../modules/module2/module2.service";
import { TranslateService } from '@ngx-translate/core';
import {LanguageService} from '../../../language.service'
import { Module5Service } from 'src/app/modules/module5/module5.service';

@Component({
  selector: 'app-new-baseline',
  templateUrl: './new-baseline.component.html'
})
export class NewBaselineComponent implements OnInit {
  private selectedQuestionId; selectedAnswer; finishExamCard;userOption={};dummyAnsJson={};
  public moduleNumber; mySubmodule2; lastAns; mySubmodule4; mySubmodule5;mySubmodule0;mySubFlagmodule0;
  // public nextButtonFlag;answerJSON;
  // oldSelectedAns;endApiAnsHit;
  @Input() public passData;
  @Output() public sendAns = new EventEmitter<Object>();
  quizes: any[];
  mode = 'quiz';
  quizName: string;
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 0,  // indicates the time in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    // 'shuffleQuestions': false,
    // 'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };
  quiz: Quiz;

  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  showQuize = false; token; alreadyDone; finishExamCardonRun;
  public baselineSelectedAns; baselineSelectedQuestion; mySubmodule3;
  public apiEndStart; apiEndSendAns; apiEndFinish; startJson = {};queUrl;
  lastQueId; showLimit = {}; postWordCount = {}; answer1 = ""; freeText;
  constructor(private router: Router, private quizService: QuizService, public LocalstoragedetailsService: LocalstoragedetailsService, public Module1Service: Module1Service, public toastr: ToastsManager, vcr: ViewContainerRef, public Module2Service: Module2Service, public translate: TranslateService, public LanguageService: LanguageService, public Module5Service: Module5Service) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnChanges() {
    this.apiEndStart = this.passData.start;
    this.apiEndSendAns = this.passData.answer;
    this.apiEndFinish = this.passData.finish;
    this.startJson = this.passData.jsonData;
  }

  ngDoCheck() {
    if (this.answer1)
    {
      this.postWordCount['1'] = this.answer1.trim().split(' ').length;
    }
  }

  startExam() {
    this.quizService.startExam(this.startJson, this.token, this.apiEndStart)
      .subscribe(
      data => {
        if (data['message'] == 'submodule started') {
          console.log("sdddddddddddd")
          this.quiz = new Quiz(this.config, data['data'].questionlist)
          this.pager.count = this.quiz.questions.length;
          this.finishExamCard = false;
          this.showQuize = true;
          // this.queUrl
          console.log("quiz",this.quiz,this.quiz.questions[0].id)
          // for(var i=0; i<this.quiz.questions.length ; i++){
          //   this.quiz.questions[i].id = i;
          // }
         for(var i=0; i<this.quiz.questions.length; i++){
           if(this.quiz.questions[i].answered == true){
            this.dummyAnsJson[this.quiz.questions[i].id] = this.quiz.questions[i].ans;
            this.lastAns = this.quiz.questions[i].ans;
            this.lastQueId = this.quiz.questions[i].id;
           }
         }
         console.log("ansarr",this.dummyAnsJson)
        }
      },
      error => {
        if (error.error.message == 'token not found' || error.error.message == 'token not match') {

          this.toastr.error(this.translate.instant('Errors.tokenNotFound'));
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 4000)
        } else if (error.error.message == 'examtype is required' || error.error.message == 'examtype key is required') {
          this.toastr.error(this.translate.instant('Errors.examTypeReqAndWrong'));
        } else if (error.error.message == 'wrong examtype') {
          this.toastr.error(this.translate.instant('Errors.examTypeReqAndWrong'));
        } else if (error.error.message == 'json key error' || error.error.message == 'invalid request'|| error.error.message == 'unknown source'|| error.error.message == 'source is required') {
          this.toastr.error(this.translate.instant('Errors.wrongInfo'));
        } else if (error.error.message == 'access denied') {
          this.toastr.error(this.translate.instant('Errors.accessDenied'));
        }else if (error.error.message == 'your baseline test already done') {
          this.showQuize=false;
          this.finishExamCard=true;
        }
        else {
          this.toastr.error(this.translate.instant('Errors.cannotProceed'));
        }
      });
  }
  startEndLine() {
    this.showQuize = true;
    this.startJson['event'] = 'start';
    this.startJson['quizid'] = '';
    this.startJson['useroption'] = '';
    this.quizService.startExam(this.startJson, this.token, this.apiEndStart)
      .subscribe(
      data => {

        if (data['message'] == 'ok') {
          var que = [];
          que = data['data'].questions;
          // this.shuffle(que);
          this.quiz = new Quiz(this.config, que)

          this.pager.count = this.quiz.questions.length;
          this.finishExamCard = false;
          this.showQuize = true;
        }
        else if (data['message'] = 'exam finish') {
          window.localStorage.setItem('uuid', data['data'].nextuuid);
        }
      },
      error => {
        if (error.error.message == 'token not found' || error.error.message == 'token not match') {

          this.toastr.error(this.translate.instant('Errors.tokenNotFound'));
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 4000)
        } else if (error.error.message == 'examtype is required') {
          this.toastr.error(this.translate.instant('Errors.examTypeReqAndWrong'));
        } else if (error.error.message == 'wrong examtype') {
          this.toastr.error(this.translate.instant('Errors.examTypeReqAndWrong'));
        } else if (error.error.message == 'json key error') {
          this.toastr.error(this.translate.instant('Errors.wrongInfo'));
        } else if (error.error.message == 'access denied') {
          this.toastr.error(this.translate.instant('Errors.accessDenied'));
        } else if (error.error.message == 'source is required' || error.error.message == 'unknown source') {
          this.toastr.error(this.translate.instant('Errors.incompleteInfo'));
        } else if (error.error.message == 'module not started') {
          this.toastr.error(this.translate.instant('Errors.moduleNotStarted'));
        } else if (error.error.message == 'event is required') {
          this.toastr.error(this.translate.instant('Errors.userEventKeyReq'));
        } else if (error.error.message == 'wrong event') {
          this.toastr.error(this.translate.instant('Errors.wrongEvent'));
        } else if (error.error.message == "exam not started") {
          this.toastr.error(this.translate.instant('Errors.checkInfoAll'));
        } else if (error.error.message == "required quizid key") {
          this.toastr.error(this.translate.instant('Errors.checkInfoAll'));
        } else if (error.error.message == "quizid is required") {
          this.toastr.error(this.translate.instant('Errors.checkInfoAll'));
        } else if (error.error.message == "required useroption key") {
          this.toastr.error(this.translate.instant('Errors.checkInfoAll'));
        } else if (error.error.message == 'useroption is required') {
          this.toastr.error(this.translate.instant('Errors.checkInfoAll'));
        } else if (error.error.message == 'wrong quizid') {
          this.toastr.error(this.translate.instant('Errors.checkInfoAll'));
        } else if (error.error.message == 'wrong useroption') {
          this.toastr.error(this.translate.instant('Errors.checkInfoAll'));
        } else if (error.error.message == 'your endline test already done') {
          window.localStorage.setItem('uuid', error.error.data.nextuuid)

          window.localStorage.setItem('mainFlagModule6', '2')
          this.Module2Service.setLocalStorage2(2);
          window.localStorage.setItem('subFlagModule6', '1')
          this.toastr.success(this.translate.instant('Errors.alreadyCompletedExam1'))
          setTimeout(() => {
            this.router.navigate(['/modules/module6/endline2']);
          }, 3000)
        }

        else {
          this.toastr.error(this.translate.instant('Errors.cannotProceed'));
        }
      });
  }

  ngOnInit() {
    this.postWordCount['1'] = 0;
    // this.oldSelectedAns=""
    // this.nextButtonFlag=false
    // this.endApiAnsHit=false
    this.mySubmodule2 = parseInt(window.localStorage.getItem('mainFlagModule2'));
    this.mySubmodule3 = parseInt(window.localStorage.getItem('mainFlagModule3'));
    this.mySubmodule4 = parseInt(window.localStorage.getItem('mainFlagModule4'));
    this.mySubmodule5 = parseInt(window.localStorage.getItem('mainFlagModule5'));
    this.mySubmodule0 = parseInt(window.localStorage.getItem('mainFlagModule0'));
    this.mySubFlagmodule0 = parseInt(window.localStorage.getItem('subFlagModule0'));
    this.moduleNumber = window.localStorage.getItem('currentstatus');
    if (window.localStorage.getItem('token') == null) {
      this.router.navigate(['/']);
    }
    this.token = window.localStorage.getItem('token');
    this.loadQuiz();
    this.showQuize = false;
    this.finishExamCard = false;
    this.finishExamCardonRun = false;
    this.quizService.answerSendingError = false;
  }

  loadQuiz() {
    this.mode = 'quiz';
  }

  get filteredQuestions() {
    // var mainArray1: any = []
    // var mainArray2: any = []
    console.log("filterrrr",this.quiz)
    // for (let index = 0; index < this.quiz.questions.length; index++)
    // {
    //   const element = this.quiz.questions[index];
    //   if (element.options != null)
    //   {
    //     if (element.options.length == 0)
    //     {
    //       mainArray1.push(element);
    //     } else
    //     {
    //       console.log("element", element);
    //       mainArray2.push(element);
    //       console.log("mainArray2", this.quiz.questions, mainArray2);
    //       // this.quiz.questions = mainArray2
    //     }
    //     console.log(this.quiz.questions, mainArray1, mainArray2, 'mainArray', element);
    //   }
    // }
    // this.quiz.questions.push(mainArray2)
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question,id, option: Option, e) {
    if (e.target.checked) {
      question.answered = true;
      console.log("check",question,option,e,id)
    //  question.id = parseInt(this.LanguageService.get('aesEncryptionKey', question.id))
      console.log("question.id",this.filteredQuestions,this.pager.index,this.pager.index + this.pager.size,this.quiz.questions,question.id)
      this.lastAns='';
      this.lastQueId = '';
      question.options.forEach((x) => {
        if (x.id !== option.id) x.selected = false;
      });
      this.baselineSelectedAns = option.id;
    }
    else {
      question.answered = false;
      console.log("not checked")
      this.baselineSelectedAns=null
      // this.baselineSelectedQuestion = "";
      // this.endApiAnsHit=false
    }
   
    this.baselineSelectedQuestion = question.id;
    console.log("checkbox event",option.id,question.id,this.baselineSelectedAns,this.baselineSelectedQuestion)
    if (window.localStorage.getItem('currentstatus') == '2')
      console.log("1",this.baselineSelectedAns,this.baselineSelectedQuestion)
      // this.sendAnswer(this.baselineSelectedAns, this.baselineSelectedQuestion, this.apiEndSendAns);
    else if (window.localStorage.getItem('currentstatus') == '6') {
      console.log("2",this.baselineSelectedAns,this.baselineSelectedQuestion)
      // this.sendAnswerEndline(this.baselineSelectedAns, this.baselineSelectedQuestion);
    }
    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1, 2);
    }
  }

  finishExam() {
    this.onSubmit();
  }

  goTo(index: number, opearation: number) {
   if(opearation == 3){
   }
    if (opearation == 1) {
      if (this.quiz.questions[index].answered == true && index >= 0 && index < this.pager.count) {
        // this.pager.index = index;
        // this.mode = 'quiz';

        if (this.quizService.answerSendingError === false) {
          this.pager.index = index;
          this.mode = 'quiz';
          // this.nextButtonFlag=true
          console.log("selected",this.quiz.questions[index+1])
          console.log("selected1",this.baselineSelectedQuestion,this.baselineSelectedAns,this.quiz.questions[index+1].id,this.quiz.questions[index+1].ans)

          if(this.baselineSelectedQuestion == this.quiz.questions[index+1].id){
            if(this.quiz.questions[index+1].ans == null){
              console.log("NULLhit",this.baselineSelectedAns,this.baselineSelectedQuestion)
              console.log("NULLhit1",this.quiz.questions[index+1].ans,this.quiz.questions[index+1].id)
              console.log("useroption",this.userOption)
              if(window.localStorage.getItem('mainFlagModule2') == '1' || (window.localStorage.getItem('mainFlagModule0') == '3' && (window.localStorage.getItem('subFlagModule0') == '1' || window.localStorage.getItem('subFlagModule0') == '2'))){
                this.quiz.questions[index+1].ans=this.baselineSelectedAns
                this.userOption[this.quiz.questions[index + 1].id] = this.quiz.questions[index + 1].ans;
                console.log("useroption",this.userOption)
              }
              if (window.localStorage.getItem('currentstatus') == '1'){
                console.log("1")
                this.sendAnswer(this.baselineSelectedAns, this.baselineSelectedQuestion, this.apiEndSendAns);
              }else if (window.localStorage.getItem('currentstatus') == '6') {
                console.log("2")
                this.sendAnswerEndline(this.baselineSelectedAns, this.baselineSelectedQuestion);
              }
            }else if(this.quiz.questions[index+1].ans != null){
              if(this.quiz.questions[index+1].ans == this.baselineSelectedAns || this.baselineSelectedAns == null){
                console.log("SAME no hit")
              }else{
                if (window.localStorage.getItem('mainFlagModule2') == '7' || window.localStorage.getItem('mainFlagModule3') == '7' || window.localStorage.getItem('mainFlagModule4') == '2' ||
                  window.localStorage.getItem('mainFlagModule5') == '23' ||
                  window.localStorage.getItem('mainFlagModule4') == '11' ||
                  (window.localStorage.getItem('mainFlagModule0') == '3' && window.localStorage.getItem('subFlagModule0') == '3') ||
                  window.localStorage.getItem('mainFlagModule5') == '18')
                {
                  console.log("1")
                  this.sendAnswer(this.baselineSelectedAns, this.baselineSelectedQuestion, this.apiEndSendAns);
                }else if (window.localStorage.getItem('currentstatus') == '6') {
                  console.log("2")
                  this.sendAnswerEndline(this.baselineSelectedAns, this.baselineSelectedQuestion);
                }
                console.log("NOTSAME hit2",this.baselineSelectedAns,this.baselineSelectedQuestion)
                console.log("NOTSAME hit1.2",this.quiz.questions[index+1].ans,this.quiz.questions[index+1].id)
                if(window.localStorage.getItem('mainFlagModule2') == '1' ||
                (window.localStorage.getItem('mainFlagModule0') == '3' && (window.localStorage.getItem('subFlagModule0') == '1' || window.localStorage.getItem('subFlagModule0') == '2'))){
                  this.quiz.questions[index+1].ans=this.baselineSelectedAns
                  this.userOption[this.quiz.questions[index + 1].id] = this.quiz.questions[index + 1].ans;
                  console.log("useroption",this.userOption)
                }

              }
            }
          }else{
            console.log("not Match")
          }


        }
        else {
          this.toastr.error(this.translate.instant('Errors.chooseOptions'));
          // this.nextButtonFlag=false
        }




      }
      else {
        this.toastr.error(this.translate.instant('Errors.chooseOptions'));
      }
    }
    else if (opearation == 2)
    {
      console.log(this.filteredQuestions, "filteredQuestions");
      console.log("index",index,opearation,this.quiz.questions[index - 1].answered,this.pager.count)
      if (this.quiz.questions[index - 1].answered == true && index >= 0 && index < this.pager.count) {
        if (this.quizService.answerSendingError === false) {
          this.pager.index = index;
          this.mode = 'quiz';
          // this.nextButtonFlag=true
          console.log("selected",this.quiz.questions[index - 1])
          console.log("selected1",this.baselineSelectedQuestion,this.baselineSelectedAns,this.quiz.questions[index - 1].id)

          if(this.baselineSelectedQuestion == this.quiz.questions[index - 1].id){
            if(this.quiz.questions[index - 1].ans == null){
              console.log("NULLhit",this.baselineSelectedAns,this.baselineSelectedQuestion)
              this.quiz.questions[index - 1].ans=this.baselineSelectedAns;
              console.log("NULLhit1",this.quiz.questions[index - 1].ans,this.quiz.questions[index - 1].id)
              this.userOption[this.quiz.questions[index - 1].id] = this.quiz.questions[index - 1].ans;
              console.log("useroption",this.userOption)
              if (window.localStorage.getItem('currentstatus') == '1'){
                console.log("1")
                this.sendAnswer(this.baselineSelectedAns, this.baselineSelectedQuestion, this.apiEndSendAns);
              }else if (window.localStorage.getItem('currentstatus') == '6') {
                console.log("2")
                this.sendAnswerEndline(this.baselineSelectedAns, this.baselineSelectedQuestion);
              }
            }else if(this.quiz.questions[index - 1].ans != null){
              if(this.quiz.questions[index - 1].ans == this.baselineSelectedAns){
                console.log("SAME no hit")
              }else{
                if (window.localStorage.getItem('mainFlagModule2') == '7' || window.localStorage.getItem('mainFlagModule3') == '7' || window.localStorage.getItem('mainFlagModule4') == '2' ||
                  window.localStorage.getItem('mainFlagModule5') == '23' ||
                  window.localStorage.getItem('mainFlagModule4') == '11' ||
                  (window.localStorage.getItem('mainFlagModule0') == '3' && window.localStorage.getItem('subFlagModule0') == '3') ||
                  window.localStorage.getItem('mainFlagModule5') == '18')
                {
                  console.log("1")
                  this.sendAnswer(this.baselineSelectedAns, this.baselineSelectedQuestion, this.apiEndSendAns);
                }else if (window.localStorage.getItem('currentstatus') == '6') {
                  console.log("2")
                  this.sendAnswerEndline(this.baselineSelectedAns, this.baselineSelectedQuestion);
                }
                console.log("NOTSAME hit2",this.baselineSelectedAns,this.baselineSelectedQuestion)
                console.log("NOTSAME hit1.2",this.quiz.questions[index - 1].ans,this.quiz.questions[index - 1].id)
                if(window.localStorage.getItem('mainFlagModule2') == '1' ||
                (window.localStorage.getItem('mainFlagModule0') == '3' && (window.localStorage.getItem('subFlagModule0') == '1' || window.localStorage.getItem('subFlagModule0') == '2'))){
                  this.quiz.questions[index - 1].ans=this.baselineSelectedAns
                this.userOption[this.quiz.questions[index - 1].id] = this.quiz.questions[index - 1].ans;
                console.log("useroption",this.userOption)
                }

              }
            }
          }else{
            console.log("not Match")
          }


        }
        else {
          this.toastr.error(this.translate.instant('Errors.chooseOptions'));
          console.log("else")
          // this.nextButtonFlag=false
        }
      }
      else {
        this.toastr.error(this.translate.instant('Errors.chooseOptions'));
        console.log("else1")
        // this.nextButtonFlag=false
      }
    }else{
      if (this.quiz.questions[index].answered == true && index >= 0 && index < this.pager.count) {
        if (this.quizService.answerSendingError === false) {
          this.pager.index = index;
          this.mode = 'quiz';
          // this.nextButtonFlag=true
          console.log("selected33",this.quiz.questions[index])
          console.log("selected1",this.baselineSelectedQuestion,this.baselineSelectedAns)

          if(this.baselineSelectedQuestion == this.quiz.questions[index].id){
            if(this.quiz.questions[index].ans == null){
              console.log("NULLhit",this.baselineSelectedAns,this.baselineSelectedQuestion)
              console.log("NULLhit1",this.quiz.questions[index].ans,this.quiz.questions[index].id)
              this.quiz.questions[index].ans=this.baselineSelectedAns
              this.userOption[this.quiz.questions[index].id] = this.quiz.questions[index].ans;
              console.log("useroptionj",this.userOption)
              if (window.localStorage.getItem('mainFlagModule2') == '7' || window.localStorage.getItem('mainFlagModule3') == '7' || window.localStorage.getItem('mainFlagModule4') == '2' ||
                window.localStorage.getItem('mainFlagModule5') == '23' ||
                window.localStorage.getItem('mainFlagModule4') == '11' ||
                (window.localStorage.getItem('mainFlagModule0') == '3' && window.localStorage.getItem('subFlagModule0') == '3') ||
                window.localStorage.getItem('mainFlagModule5') == '18')
              {
                console.log("1")
                this.sendAnswer(this.baselineSelectedAns, this.baselineSelectedQuestion, this.apiEndSendAns);
              }else if (window.localStorage.getItem('currentstatus') == '6') {
                console.log("2")
                this.sendAnswerEndline(this.baselineSelectedAns, this.baselineSelectedQuestion);
              }
            }else if(this.quiz.questions[index].ans != null){
              if(this.quiz.questions[index].ans == this.baselineSelectedAns){
                console.log("SAME no hit")
              }else{
                if (window.localStorage.getItem('mainFlagModule2') == '7' || window.localStorage.getItem('mainFlagModule3') == '7' || window.localStorage.getItem('mainFlagModule4') == '2' ||
                  window.localStorage.getItem('mainFlagModule5') == '23' ||
                  window.localStorage.getItem('mainFlagModule4') == '11' ||
                  (window.localStorage.getItem('mainFlagModule0') == '3' && window.localStorage.getItem('subFlagModule0') == '3') ||
                  window.localStorage.getItem('mainFlagModule5') == '18')
                {
                  console.log("1")
                  this.sendAnswer(this.baselineSelectedAns, this.baselineSelectedQuestion, this.apiEndSendAns);
                }else if (window.localStorage.getItem('currentstatus') == '6') {
                  console.log("2")
                  this.sendAnswerEndline(this.baselineSelectedAns, this.baselineSelectedQuestion);
                }
                console.log("NOTSAME hit2",this.baselineSelectedAns,this.baselineSelectedQuestion)
                console.log("NOTSAME hit1.2",this.quiz.questions[index].ans,this.quiz.questions[index].id)
                if(window.localStorage.getItem('mainFlagModule2') == '1'){
                  this.quiz.questions[index].ans=this.baselineSelectedAns
                  this.userOption[this.quiz.questions[index].id] = this.quiz.questions[index].ans;
                  console.log("useroptionj",this.userOption)
                }

              }
            }
          }else{
            console.log("not Match")
          }


        }
        else {
          this.toastr.error(this.translate.instant('Errors.chooseOptions'));
          // this.nextButtonFlag=false
        }
      }
      else {
        this.toastr.error(this.translate.instant('Errors.chooseOptions'));
        // this.nextButtonFlag=false
      }
      this.finishExam()
    }
  }

  onSubmit() {
    let answers = [];
    this.quiz.questions.forEach(x =>
      x.options.forEach(y => {
        if (y.selected == true) {
          answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered': x.answered });

        }
      }));

    if (answers.length < this.pager.count) {
      // this.toastr.error(this.translate.instant('Errors.giveAllAns'));
    } else if (answers.length == this.pager.count) {
      if (window.localStorage.getItem('currentstatus') == '2' || window.localStorage.getItem('currentstatus') == '3' || window.localStorage.getItem('currentstatus') == '4' || window.localStorage.getItem('mainFlagModule0') == '3' || window.localStorage.getItem('mainFlagModule5') == '18'){
        this.sendAnswer(this.baselineSelectedAns, this.baselineSelectedQuestion, this.apiEndSendAns);
      }
      else {
        console.log("finish")
        // var obj = { "type": "submodule", "route": true, "current": this.translate.instant('Errors.currentChachni1'), "next": this.translate.instant('Errors.nextChachni1'), "nextRoute": "/modules/module6/endline2" }
        // //  check here
        // this.Module2Service.setLocalStorage2(2);
        // this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
        // window.localStorage.setItem('mainFlagModule6', '2')
        // window.localStorage.setItem('subFlagModule6', '1')
      }
    }
  }
  sendAnswer(baselineAns, baselineQueId, apiEndSendAns) {
    this.selectedQuestionId = baselineQueId;
    this.selectedAnswer = baselineAns;
    if (
      window.localStorage.getItem('mainFlagModule2') == '7' ||
      window.localStorage.getItem('mainFlagModule3') == '7' ||
      window.localStorage.getItem('mainFlagModule4') == '2' ||
      window.localStorage.getItem('mainFlagModule5') == '23' ||
      window.localStorage.getItem('mainFlagModule4') == '11' ||
      (window.localStorage.getItem('mainFlagModule0') == '3' && window.localStorage.getItem('subFlagModule0') == '3') || window.localStorage.getItem('mainFlagModule5') == '18')
    {
      if((this.lastAns != "" && this.lastAns != null && this.lastAns != undefined) && (this.lastQueId != "" && this.lastQueId != null && this.lastQueId != undefined))
      {
        console.log("lastans",this.lastAns,this.dummyAnsJson,this.lastQueId)
      }
      else{
        this.lastAns = baselineAns;
        this.dummyAnsJson[this.selectedQuestionId] = this.selectedAnswer;
        console.log("lastans1",this.lastAns)
        this.lastQueId = baselineQueId;
      }
      console.log("dummyjson",this.dummyAnsJson,this.pager.count)
     }

    this.token = window.localStorage.getItem('token');
    console.log("useroption",this.userOption)
    // var answerJSON = '{"submoduleid":"' + window.localStorage.getItem('uuid') + '","useranswer":"' + JSON.stringify(this.userOption) + '","event":"answer"}'

    var dummyAns = JSON.stringify(this.userOption)
    var mainAns = {};
    mainAns['submoduleid'] = window.localStorage.getItem('uuid');
    console.log("lastqu",this.pager.index,this.pager.count)
    if (((this.pager.index + 1) == (this.pager.count)) && (
      window.localStorage.getItem('mainFlagModule2') == '7' ||
      window.localStorage.getItem('mainFlagModule3') == '7' ||
      window.localStorage.getItem('mainFlagModule4') == '2' ||
      window.localStorage.getItem('mainFlagModule5') == '23' ||
      window.localStorage.getItem('mainFlagModule4') == '11' ||
      (window.localStorage.getItem('mainFlagModule0') == '3' && window.localStorage.getItem('subFlagModule0') == '3') ||
      window.localStorage.getItem('mainFlagModule5') == '18')
      && Object.keys(this.dummyAnsJson).length == this.pager.count)
    {
      mainAns['event'] = "finish";
    }
   else{
    mainAns['event'] = "answer";
   }
    if(window.localStorage.getItem('mainFlagModule2') == '1' || (window.localStorage.getItem('mainFlagModule0') == '3' && (window.localStorage.getItem('subFlagModule0') == '1' || window.localStorage.getItem('subFlagModule0') == '2'))){
      mainAns['useranswer'] = JSON.parse(dummyAns);
    }
    else if (
      window.localStorage.getItem('mainFlagModule2') == '7' ||
      window.localStorage.getItem('mainFlagModule3') == '7' ||
      window.localStorage.getItem('mainFlagModule4') == '2' ||
      window.localStorage.getItem('mainFlagModule5') == '23' ||
      window.localStorage.getItem('mainFlagModule4') == '11' ||
      (window.localStorage.getItem('mainFlagModule0') == '3' && window.localStorage.getItem('subFlagModule0') == '3') || window.localStorage.getItem('mainFlagModule5') == '18')
    {
      mainAns['useranswer'] = this.lastAns;
      mainAns['questionid'] = this.lastQueId;
    }

    console.log("jsonbody",mainAns)
    this.quizService.sendAnswer(mainAns, this.token, apiEndSendAns)
      .subscribe(
      data => {

        if (data['message'] == "submodule finish" || data['message'] == "module0 finish") {
          console.log("adsaffffffffffff")
          if(window.localStorage.getItem('mainFlagModule2') == '1'){
            var obj = {
              "type": "submodule",
              "route": true,
              "current": this.translate.instant('L2Module2.subMenu2-1'),
              "next": this.translate.instant('L2Module2Finish.subMenu2-2'),
              "nextRoute": "/modules/module2/Module2.2"
            }
            this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
            this.Module2Service.setLocalStorage2(2);
            window.localStorage.setItem('uuid', data['data'].nextuuid)

            window.localStorage.setItem('mainFlagModule2', '2')
            window.localStorage.setItem('subFlagModule2', '1')
          } else if(window.localStorage.getItem('mainFlagModule2') == '7'){
            var obj = {
              "type": "submodule",
              "route": true,
              "current": this.translate.instant('L2Module2.subMenu2-7'),
              "next": this.translate.instant('L2Module2Finish.subMenu2-8'),
              "nextRoute": "/modules/module2/Module2.8"
            }
            this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
            this.Module2Service.setLocalStorage2(8);
            window.localStorage.setItem('uuid', data['data'].nextuuid)

            window.localStorage.setItem('mainFlagModule2', '8')
            window.localStorage.setItem('subFlagModule2', '1')
          } else if (window.localStorage.getItem('mainFlagModule3') == '7')
          {
            console.log('module 3.7')
            var obj = {
              "type": "submodule",
              "route": true,
              "current": this.translate.instant('L2Module3.subMenu3-7'),
              "next": this.translate.instant('L2Module3Finish.subMenu3-8'),
              "nextRoute": "/modules/module3/Module3.8"
            }
            this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
            this.Module2Service.setLocalStorage2(8);
            window.localStorage.setItem('uuid', data['data'].nextuuid)

            window.localStorage.setItem('mainFlagModule3', '8')
            window.localStorage.setItem('subFlagModule3', '1')
          }
          else if(window.localStorage.getItem('mainFlagModule4') == '2'){
            var obj = {
              "type": "submodule",
              "route": true,
              "current": this.translate.instant('L2Module4.subMenu4-2'),
              "next": this.translate.instant('L2Module4Finish.subMenu4-3'),
              "nextRoute": "/modules/module4/Module4.3"
            }
            this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
            this.Module2Service.setLocalStorage2(3);
            window.localStorage.setItem('uuid', data['data'].nextuuid)

            window.localStorage.setItem('mainFlagModule4', '3')
            window.localStorage.setItem('subFlagModule4', '1')
          }
          else if (window.localStorage.getItem('mainFlagModule5') == '18')
          {
            if(window.localStorage.getItem('subFlagModule5') == '4'){
              var obj = {
                "type": "submodule",
                "route": true,
                "current": this.translate.instant('L2Module5.subMenu5-18'),
                "next": this.translate.instant('L2Module5Finish.subMenu5-19'),
                "nextRoute": "/modules/module5/Module5.19"
              }
              this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
              this.Module2Service.setLocalStorage2(19);
              window.localStorage.setItem('uuid', data['data'].nextuuid)
  
              window.localStorage.setItem('mainFlagModule5', '19')
              window.localStorage.setItem('subFlagModule5', '1')
            }
            else{
            window.localStorage.setItem('uuid', data['data'].nextuuid)
            window.localStorage.setItem('mainFlagModule5', '18')
            window.localStorage.setItem('subFlagModule5', '3')
            this.sendAns.emit("finish")
            }
          }
          else if(window.localStorage.getItem('mainFlagModule4') == '11'){
            var obj = {
              "type": "submodule",
              "route": true,
              "current": this.translate.instant('L2Module4.subMenu4-11'),
              "next": this.translate.instant('L2Module4Finish.subMenu4-12'),
              "nextRoute": "/modules/module4/Module4.12"
            }
            this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
            this.Module2Service.setLocalStorage2(12);
            window.localStorage.setItem('uuid', data['data'].nextuuid)

            window.localStorage.setItem('mainFlagModule4', '12')
            window.localStorage.setItem('subFlagModule4', '1')
          } else if(window.localStorage.getItem('mainFlagModule0') == '3'){
            if(window.localStorage.getItem('subFlagModule0') == '1'){
              window.localStorage.setItem('uuid', data['data'].nextuuid)
              window.localStorage.setItem('subFlagModule0', '2')
              this.sendAns.emit("finish")
            }
            else if(window.localStorage.getItem('subFlagModule0') == '2'){
              window.localStorage.setItem('uuid', data['data'].nextuuid)
              window.localStorage.setItem('subFlagModule0', '3')
              this.sendAns.emit("finish1")
            }
            else if(window.localStorage.getItem('subFlagModule0') == '3'){
              window.localStorage.setItem('mainFlagModule0', '4');
              window.localStorage.setItem('uuid', data['data'].nextuuid)
              window.localStorage.setItem("currentstatus", "1");
              window.localStorage.setItem('mainFlagModule1', '1');
              this.Module2Service.setLocalStorage2(4);
               var obj1 = { "type": "moduleFinish", "route": true, "current": this.translate.instant('L2Module0.subMenu1-3'), "next": this.translate.instant('L2Module1.title'), "nextRoute": "/dashboard", "finishHead": this.translate.instant('L2Module0.title'),
              "submoduleFinish":this.translate.instant('L2Module1Finish.submodule0-finish'),
            "submoduleSuccess":this.translate.instant('L2Module1Finish.submodule0-success') }
               this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj1));
            }
          }

        }
      },
      error => {
        this.toastr.error(this.translate.instant('Errors.cannotProceed'));
        this.quizService.answerSendingError = true;
      }//Catch Error if server is not Found
      );
  }

  sendAnswerEndline(baselineAns, baselineQueId) {
    this.selectedQuestionId = baselineQueId;
    this.selectedAnswer = baselineAns;
    this.token = window.localStorage.getItem('token');
    var answerJSON = {};

    answerJSON['examtype'] = window.localStorage.getItem('uuid');
    answerJSON['event'] = 'answer';
    answerJSON['quizid'] = this.selectedQuestionId;
    answerJSON['useroption'] = this.selectedAnswer;
    this.quizService.startExam(answerJSON, this.token, this.apiEndStart)
      .subscribe(
      data => {

        if (data['message'] == 'your answer successfully stored') {
          // this.quiz = new Quiz(this.config, data.data.questions)
          this.pager.count = this.quiz.questions.length;
          this.finishExamCard = false;
          this.showQuize = true;
          if (data['data'].nextuuid)
            window.localStorage.setItem('uuid', data['data'].nextuuid)
        } else if (data['message'] == 'exam finish') {
          window.localStorage.setItem('uuid', data['data'].nextuuid)
          window.localStorage.setItem('mainFlagModule6', '2')
          this.Module2Service.setLocalStorage2(2);
          window.localStorage.setItem('subFlagModule6', '1')
        }
      },
      error => {
        if (error.error.message == 'token not found' || error.error.message == 'token not match') {

          this.toastr.error(this.translate.instant('Errors.tokenNotFound'));
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 4000)
        } else if (error.error.message == 'examtype is required' || error.error.message == 'examtype is required') {
          this.toastr.error(this.translate.instant('Errors.examTypeReqAndWrong'));
        } else if (error.error.message == 'wrong examtype') {
          this.toastr.error(this.translate.instant('Errors.examTypeReqAndWrong'));
        } else if (error.error.message == 'json key error') {
          this.toastr.error(this.translate.instant('Errors.wrongInfo'));
        } else if (error.error.message == 'access denied') {
          this.toastr.error(this.translate.instant('Errors.accessDenied'));
        } else if (error.error.message == 'source is required' || error.error.message == 'unknown source') {
          this.toastr.error(this.translate.instant('Errors.incompleteInfo'));
        } else if (error.error.message == 'module not started') {
          this.toastr.error(this.translate.instant('Errors.moduleNotStarted'));
        } else if (error.error.message == 'event is required') {
          this.toastr.error(this.translate.instant('Errors.userEventKeyReq'));
        } else if (error.error.message == 'wrong event') {
          this.toastr.error(this.translate.instant('Errors.wrongEvent'));
        } else if (error.error.message == "exam not started") {
          this.toastr.error(this.translate.instant('Errors.checkInfoAll'));
        } else if (error.error.message == "required quizid key") {
          this.toastr.error(this.translate.instant('Errors.checkInfoAll'));
        } else if (error.error.message == "quizid is required") {
          this.toastr.error(this.translate.instant('Errors.checkInfoAll'));
        } else if (error.error.message == "required useroption key") {
          this.toastr.error(this.translate.instant('Errors.checkInfoAll'));
        } else if (error.error.message == 'useroption is required') {
          this.toastr.error(this.translate.instant('Errors.checkInfoAll'));
        } else if (error.error.message == 'wrong quizid') {
          this.toastr.error(this.translate.instant('Errors.checkInfoAll'));
        } else if (error.error.message == 'wrong useroption') {
          this.toastr.error(this.translate.instant('Errors.checkInfoAll'));
        }
        else {
          this.toastr.error(this.translate.instant('Errors.cannotProceed'));
        }
      });
  }
  finishBaselineExam(startJson, apiEndFinish) {
    this.token = window.localStorage.getItem('token');
    this.quizService.finishBaseline(startJson, this.token, apiEndFinish)
      .subscribe(
      data => {
        if (data['message'] == "all questions are required") {
          this.toastr.error(this.translate.instant('Errors.ansAllQuestions'));
          this.finishExamCard = false;
        } else if (data['message'] == "exam not started") {
          this.toastr.error(this.translate.instant('Errors.checkInfoAll'));
          this.finishExamCard = false;
        } else if (data['message'] == "give answers of questions") {
          this.toastr.error(this.translate.instant('Errors.ansAllQuestions'));
          this.finishExamCard = false;
        } else if (data['message'] == "wrong examtype") {
          this.toastr.error(this.translate.instant('Errors.chooseOptions'));

        } else if (data['message'] == "examtype is required") {
          this.toastr.error(this.translate.instant('Errors.chooseOptions'));

        } else if (data['message'] == "json key error") {
          this.toastr.error(this.translate.instant('Errors.wrongInfo'));

        } else if (data['message'] == "token not found") {
          this.toastr.error(this.translate.instant('Errors.tokenNotFound'));

        } else if (data['message'] == 'exam finish') {

          var obj = { "type": "submodule", "route": true, "current": this.translate.instant('Errors.currentChachni'), "next": this.translate.instant('Errors.nextChachni'), "nextRoute": "/modules/module1/Module1.4" }
          this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
          this.Module1Service.setLocalStorage1(4);
          window.localStorage.setItem('uuid', data['data'].nextuuid)

          window.localStorage.setItem('mainFlagModule1', '4')
          window.localStorage.setItem('subFlagModule1', '1')
        } else if (data['Response'] == "token not match") {
          this.toastr.error(this.translate.instant('Errors.tokenNotMatch'));
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 4000)
        } else {
          this.toastr.error(this.translate.instant('Errors.recheckInfo'));
        }
      },
      error => {
        this.toastr.error(this.translate.instant('Errors.cannotProceed'));
      }//Catch Error if server is not Found
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
