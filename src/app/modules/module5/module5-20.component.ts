import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FullLayoutService } from 'src/app/layouts/full-layout.service';
import { LanguageService } from 'src/app/language.service';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { LocalstoragedetailsService } from 'src/app/services/localstoragedetails.service';
import { environment } from 'src/environments/environment';
import { Module5Service } from './module5.service';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: "app-module5-20",
  templateUrl: "./module5-20.component.html"
})
export class Module520Component implements OnInit {
  
  @ViewChild("ratingModal") public ratingModal: ModalDirective;
  
  public mainFlagModule5 = parseInt(
    window.localStorage.getItem("mainFlagModule5")
  );
  public subFlagModule5 = parseInt(
    window.localStorage.getItem("subFlagModule5")
  );
  constructor(
    public LanguageService: LanguageService,
    public LocalstoragedetailsService: LocalstoragedetailsService,
    public Module5Service: Module5Service,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public router: Router,
    public translate: TranslateService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  public data;
  questionType;
  passFlags = {};
  showAnswer;count;
  saveData;question3;ansSelectCount;showText;finishPar3Flag;otherText1;
  answer;section3Mcq;selectedTasks;section6Counter;senAns={};
  sumbitButton;finishDisable;showLimit={};textanswer1;section6Flag;textanswer2;textanswer3;
  startFlag;tasks=[];counter;question;questionid;postWordCount={};trimFlag;
  public apiUrl;
 passData = {};
  public inst =
    "(भाग २) - अविरत टप्पा-४ बद्दल तुमचा अभिप्राय सविस्तर नोंदवा. ";
  ngOnInit() {
    this.startFlag = false;
    this.showAnswer = true;
    this.saveData = true;
    this.passFlags["saveData"] = this.saveData;
    this.passFlags["showAnswer"] = this.showAnswer;
    this.questionType = "mcqInBunch";
    this.passFlags["questionType"] = this.questionType;
    this.tasks = [{ "option": "a", "value": "हो" }, { "option": "b", "value": "नाही" }]
    this.finishDisable = false;
    this.section3Mcq = false;
    this.showText = false;
    this.counter=0;
    this.otherText1 ="";
    this.question="";
    this.questionid="";
    this.textanswer1="";
    this.textanswer2="";
    this.textanswer3="";
    this.trimFlag = false;
    this.section6Flag = false;

    this.postWordCount['1']=0;
    this.postWordCount['2']=0;
    this.postWordCount['3']=0;
    if (this.mainFlagModule5 == 20)
    {
      if (this.subFlagModule5 == 1) {
        this.startFlag = false;
        //this.start1()
      } else if (this.subFlagModule5 == 2) {
        this.startFlag = false;
        // this.start2()
      } else if (this.subFlagModule5 == 3) {
        this.startFlag = false;
        // this.start3()
      } else if (this.subFlagModule5 == 4) {
        this.startFlag = false;
        // this.start4()
      } else if (this.subFlagModule5 == 5) {
        this.startFlag = false;
        // this.start5()
      } else if (this.subFlagModule5 == 6) {
        this.startFlag = false;
        // this.start6()
        // this.startFlag= true;
      }
    }
  }

  ngDoCheck(){
    if (this.showText == true && this.otherText1.trim().length == 0) {
      this.finishPar3Flag = false
    } else {
      this.finishPar3Flag = true
    }

    // if (this.textanswer1) {
    //   this.postWordCount['1'] = this.textanswer1.trim().split(' ').length;
    // }
    // if (this.textanswer2) {
    //   this.postWordCount['2'] = this.textanswer2.trim().split(' ').length;
    // }
    // if (this.textanswer3) {
    //   this.postWordCount['3'] = this.textanswer3.trim().split(' ').length;
    // }

    if(this.textanswer1!= "" && this.textanswer1 !=null && this.textanswer1 != undefined){
      if (this.textanswer1.trim().length == 0)
      {
        this.trimFlag = true;
      } else
      {
        this.trimFlag = false;
      }
    }

    if(this.section6Counter==3){
      if(this.textanswer1.trim().length == 0 ||
      this.textanswer2.trim().length == 0 ||
      this.textanswer3.trim().length == 0){
        this.trimFlag = true;
      }
      else
      {
        this.trimFlag = false;
      }
      //  else if (this.postWordCount['1'] > 150 || this.postWordCount['1'] < 5){
      //   this.trimFlag = true;
      // } else if (this.postWordCount['2'] > 150 || this.postWordCount['2'] < 5){
      //   this.trimFlag = true;
      // } else if (this.postWordCount['3'] > 150 || this.postWordCount['3'] < 5){
      //   this.trimFlag = true;
      // }
    }
    
  }

  start2() {
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["useranswer"] = "";
    jsonBody["event"] = "start";
    this.apiCall(jsonBody, 'modulefivecmcq/', 'start2')
  }

  saveAnswer(e) {
    console.log("ff ", e);
    this.sumbitButton = true;
    this.answer = e;
    if(e){
      if(window.localStorage.getItem("subFlagModule5") == "5"){
        this.finish5();
      }
      else{
        this.submit();
      }
    }
   
  }
  submit() {
    var jsonBody = {};

    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["useranswer"] = this.answer;
    jsonBody["event"] = "answer";
    this.apiCall(jsonBody, 'modulefivecmcq/', 'finish2')
  }

  start1() {
    this.startFlag = true;
    var jsonData = {}
    jsonData['submoduleid'] = window.localStorage.getItem('uuid')
    jsonData['event'] = "start"
    jsonData["useranswer"] = "";

    this.apiUrl = "modulefive_return_answer/";

    this.passData['url'] = this.apiUrl;
    this.passData['jsonData'] = jsonData;
    console.log("start1")
    this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 5.20', window.localStorage.getItem('username'), 10);
  }

  finish1(e){
    if(e=="finish"){
      //this.startFlag = true;
      this.subFlagModule5=2;
      console.log("dsffffffffffAWQEW",this.startFlag)
      this.start2();
    }
  }

  start3() {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody["useranswer"] = "";
    jsonBody['event'] = "start"
    this.apiCall(jsonBody, 'modulefivecmcqselection/', 'start3')
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module5Service.apiCall(jsonBody, apiUrl)
      .subscribe(
        data => {
          if(fun == "start2"){
            console.log("data ", data["data"].questionlist);
          this.data = data["data"];
          // console.log('mcq data', this.data);
          this.startFlag = true;
          }
          if(fun == "finish2"){
            if (
              data["status"] == true &&
              data["message"] == "submodule finish"
            ){
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            this.mainFlagModule5 = 20;
            window.localStorage.setItem("mainFlagModule5", "20");
            window.localStorage.setItem("subFlagModule5", "3");
            this.subFlagModule5 = 3;
            this.start3();
          }
         }
          if(fun == "start3"){
            console.log("data ", data);
          this.question3 = data['data'].question;
          this.startFlag = true;
          this.selectedTasks = data['data'].statementlist;
          this.answer=[];
          this.ansSelectCount = this.selectedTasks.length + 1;
          }
          if(fun == "finish3"){
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            this.mainFlagModule5 = 20;
            window.localStorage.setItem("mainFlagModule5", "20");
            window.localStorage.setItem("subFlagModule5", "4");
            this.subFlagModule5 = 4;
            this.start4();
          }
          if(fun == "start4"){
            console.log("data ", data["data"]);
            this.question3 = data['data'].question;
            var newArr =[]
            newArr = data["data"].statementlist;
            this.startFlag = true;
            this.senAns = {}
            this.senAns[newArr[0].statementid] = ''
            this.senAns[newArr[1].statementid] = ''
            this.senAns[newArr[2].statementid] = ''
            this.senAns[newArr[3].statementid] = ''
            this.senAns[newArr[4].statementid] = ''
            this.tasks=[];
            for(let i=0; i<newArr.length;i++){
              this.tasks.push ({
                id: i + 1,
                statement :newArr[i].statement,
                statementid : newArr[i].statementid
            })
            }
            console.log("new obj",this.tasks)
          }
          if(fun == "finish4"){
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            this.mainFlagModule5 = 20;
            window.localStorage.setItem("mainFlagModule5", "20");
            window.localStorage.setItem("subFlagModule5", "5");
            this.subFlagModule5 = 5;
            this.start5();
          }
          if(fun == "start5"){
          console.log("data ", data["data"]);
          this.data = data["data"];
          this.startFlag = true;
          }
          if(fun == "finish5"){
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            this.mainFlagModule5 = 20;
            window.localStorage.setItem("mainFlagModule5", "20");
            window.localStorage.setItem("subFlagModule5", "6");
            this.subFlagModule5 = 6;
            this.start6()
          }
          if(fun == "start6"){
            console.log("data ", data["data"]);
            this.question = data["data"]["questionlist"][0].question;
            this.questionid = data["data"]["questionlist"][0].questionid;
            this.startFlag= true;
            this.section6Flag = true;
            if(this.questionid == "OB6xg0jN4n"){
              this.section6Counter=1;
            }
            else  if(this.questionid == "YzDaqBZxp1"){
              this.section6Counter=2;
            }
            else  if(this.questionid == "9K5xM5AxRk"){
              this.section6Counter=3;
            }

            window.localStorage.setItem("section6Counter",this.section6Counter)
          }
          if(fun == "finish6"){
            this.section6Counter = this.section6Counter + 1;
            if(data["message"] == "your answer stored next question and uuid is"){
            this.showLimit['1'] = true;
            this.showLimit['2'] = true;
            this.showLimit['3'] = true;
            this.postWordCount['1']=0;
            this.postWordCount['2']=0;
            this.postWordCount['3']=0;
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            window.localStorage.setItem("section6Counter",this.section6Counter)
            this.textanswer1="";
            this.question = data["data"]["questionlist"][0].question;
            this.questionid = data["data"]["questionlist"][0].questionid;
            this.startFlag= true;
            this.section6Flag = true;
            }
            else{
              window.localStorage.setItem("uuid", data["data"].nextuuid);
              this.mainFlagModule5 = 24;
              window.localStorage.setItem('mainFlagModule5', '21');
              window.localStorage.setItem('subFlagModule5', '1');
              window.localStorage.setItem('source', 'module 5.21');
              var obj = {
              "type": "submodule",
              "route": true,
              "current": this.translate.instant('L2Module5.subMenu5-21'),
              "next": this.translate.instant('L2Module5Finish.subMenu5-21'),
              "nextRoute": "/modules/module5/Module5.21"
              }
              this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
              this.Module5Service.setLocalStorage5(21);
            }
          }
        },
        error => {
          this.LanguageService.handleError(error.error.message);
        }
      );
  }

  onValueChanged(option) {
    this.counter=0;
    this.finishDisable = true;
    this.answer=[];
   
    if (option == 'a') {
      console.log("aaa")
      this.answer.push(option)
      this.section3Mcq = false
      this.otherText1="";
    } else if (option == 'b') {
      console.log("bbb")
      this.answer.push(option)
      this.section3Mcq = true
      this.showText=false;
      this.otherText1="";
    }

    console.log("answerarray",this.answer)
  }

  finish3(){
    if(this.showText == true && (this.otherText1 !="" && this.otherText1 !=null && this.otherText1 != undefined)){
      this.answer.push(this.otherText1.trim())
    }
    var jsonBody = {};

    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["useranswer"] = this.answer;
    jsonBody["event"] = "answer";
    this.apiCall(jsonBody, 'modulefivecmcqselection/', 'finish3')
  }

  taskSelect(e,i,statementId){
    console.log("Select",e,i,statementId)

    if (e.target.checked) {
      this.counter++;

      if (this.counter < this.ansSelectCount) {
        //  this.otherSelectDisable=true
        // this.selectedTasks.forEach((item, index) => {
        //   if (index == i) {
        //     item.answer = true;
        //   }
        // });
        this.answer.push(statementId)
        if (i == 10) {
          this.showText = true
        }
        console.log("answer",this.answer,i)
      }
      else {
        this.counter--;
        var t = <HTMLInputElement>document.getElementById(i);
        t.checked = false;
        console.log("t",t)
      }

    } else {
      this.finishPar3Flag = false
      console.log("else", this.selectedTasks.indexOf(statementId))
      this.counter--;
      this.answer.splice(this.answer.indexOf(statementId), 1)
      if(i==10){
        this.showText = false;
        this.otherText1="";
      }
      // this.selectedTasks.forEach((item, index) => {
      //   if (index == i) {
      //     item.answer = false;
      //   }
      // });
      console.log("i",i,this.answer)
    }
    console.log("Select", this.selectedTasks, this.counter)
  }

  start4(){
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["useranswer"] = "";
    jsonBody["event"] = "start";
    this.apiCall(jsonBody, 'modulefivefeedbacksec4/', 'start4')
  }

  start5(){
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["useranswer"] = "";
    jsonBody["event"] = "start";
    this.apiCall(jsonBody, 'modulefivecmcqselection/', 'start5')
    this.questionType = "checkBoxOption";
    this.passFlags["questionType"] = this.questionType;
  }

  finish5(){
    var jsonBody = {};

    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["useranswer"] = this.answer;
    jsonBody["event"] = "answer";
    this.apiCall(jsonBody, 'modulefivecmcqselection/', 'finish5')
  }

  start6(){
    var jsonBody = {};
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["useranswer"] = "";
    jsonBody["event"] = "start";
    this.apiCall(jsonBody, "modulefivefeedbacksec6/", "start6");
    if(window.localStorage.getItem("section6Counter")!="" && window.localStorage.getItem("section6Counter")!=null && window.localStorage.getItem("section6Counter")!=undefined){
      this.section6Counter = window.localStorage.getItem("section6Counter")
    }
    else{
    if(window.localStorage.getItem("source")=="module 5.20.6.1"){
      this.section6Counter = 1;
    } else if(window.localStorage.getItem("source")=="module 5.20.6.2"){
      this.section6Counter = 2;
    } else if(window.localStorage.getItem("source")=="module 5.20.6.3"){
      this.section6Counter = 3;
    }
    else{
      this.section6Counter = 1
    }
  }
   
  }

  finish6(){
    var jsonBody = {};
    var useranswer ={}
    if(window.localStorage.getItem("section6Counter")=="3"){
      var freetext={}
      freetext['1'] =this.textanswer1;
      freetext['2'] =this.textanswer2;
      freetext['3'] =this.textanswer3;
      useranswer[this.questionid]=freetext;
    }
    else{
      useranswer[this.questionid]=this.textanswer1;
    }
    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["useranswer"] = useranswer;
    jsonBody["event"] = "answer";
    this.apiCall(jsonBody, 'modulefivefeedbacksec6/', 'finish6')
    this.section6Flag = false;
  }

  up(index) {
    if (index <= 0 || index >= this.tasks.length) {
      return
    }
    var t = this.tasks[index];
    this.tasks[index] = this.tasks[index - 1];
    this.tasks[index - 1] = t;
  }
  down(index) {
    if (index < 0 || index >= this.tasks.length - 1) {
      return
    }
    var t = this.tasks[index];
    this.tasks[index] = this.tasks[index + 1];
    this.tasks[index + 1] = t;
  }

  mcqTasks() {

    console.log("dta",this.tasks)
    var passArray = []
    for (let item in this.tasks) {
      // console.log("ssss ",this.sortedTasks[item].id)
      passArray.push(this.tasks[item].id)
    }


    var index = 0
    for (let i in this.senAns) {
      // console.log("aa ",i)
      this.senAns[i] = passArray[index]
      index++
    }
    //   var str=JSON.stringify(this.sortedTasks)
    //  str=str.substring(1, str.length-1);
    console.log("FInal: ", this.senAns)
    this.ratingModal.show();
    this.LanguageService.toShow()
    // var jsonBody = {}
    // jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    // jsonBody['event'] = 'finish'
    // jsonBody['answer'] = senAns
    // this.apiCall(jsonBody, 'stmtpriorty/', 'finish1')
  }

  ratingModalHide(){
    this.ratingModal.hide();
    this.LanguageService.toHide()
  }

  finish4(){
    this.ratingModal.hide();
    this.LanguageService.toHide()
    var jsonBody = {};

    jsonBody["submoduleid"] = window.localStorage.getItem("uuid");
    jsonBody["useranswer"] = this.senAns;
    jsonBody["event"] = "answer";
    this.apiCall(jsonBody, 'modulefivefeedbacksec4/', 'finish4') 
  }
}
