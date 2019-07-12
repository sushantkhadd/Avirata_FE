import { Component, OnInit, ViewChild, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import {Module2Service} from '../../modules/module2/module2.service'
import { DxRadioGroupComponent } from 'devextreme-angular';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html'
})
export class FeedbackComponent implements OnInit {
  @Output() public sendAns = new EventEmitter<Object>();
  @Input() public passData;

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
  @ViewChild("eventRadioGroup") eventRadioGroup: DxRadioGroupComponent;
  public startTest; ansJson = {}; showPart1Flag = false;
  public passFlags = {}; data; myjsondata; dummy; deleteAdd = []; questionCount;
  questionlist; optionArray=[]; counter; disableIt; questionId; mainCounter;type1Ans;type2Ans;
  dummyArray = []; jsonObject = {}; ansJsonLength;statement=[];priorities=[];queType;userAnswer={};submitFlag;
  public token;startJson={};apiurl;queArray1=[];queArray2=[];freeTextFlag;textanswer1;freetextId;onlyCnt;jsonBody1={};
 

  activeItem;activeItem1;
  pager = {
    index: 0,
    size: 1,
    count: 1
  };
  questionFlag;
  

  ngOnInit() {
    this.textanswer1="";
    this.freeTextFlag = false
    this.submitFlag = true;
    console.log("this.apssda",this.passData)
    this.startJson = this.passData.jsonData;
    this.apiurl = this.passData.url;
    console.log("EQRERSDDA",this.apiurl,this.startJson)
    this.apiCall(this.startJson, this.apiurl, 'start');
  }

  onValueChanged(e, id,queType) {
    //this.freeTextFlag = false;
    this.submitFlag = false;
    var optionId;
    this.jsonObject = {};
    this.queType = queType;
    for(let i=0; i< this.optionArray.length ; i++){
      if(e.value == this.optionArray[i].value){
        
        optionId = this.optionArray[i].option
        console.log("ghgqfgdh")
    }
  }
    this.jsonObject["useranswer"] = optionId;
    this.jsonObject["questionid"] = id;
    this.ansJson[id] = e.value;
    this.ansJsonLength = Object.keys(this.ansJson).length;
    console.log(this.activeItem.answer,optionId,queType,this.activeItem,this.activeItem.question_type);
    // if(this.activeItem.answer == ""){
      if(this.onlyCnt <=4){
        if(optionId=="c"){
          this.freeTextFlag = true;
          console.log("1")
        }
        else{
          this.freeTextFlag = false;
          this.textanswer1=""
          console.log("11")
        }
      }
      else if(this.onlyCnt ==5){
        if(optionId=="a"){
          this.freeTextFlag = true;
          console.log("2")
        }
        else{
          this.freeTextFlag = false;
          this.textanswer1=""
          console.log("22")
        }
      }
      else if(this.onlyCnt >=6){
        if(optionId=="b"){
          this.freeTextFlag = true;
          console.log("3")
        }
        else{
          this.freeTextFlag = false;
          this.textanswer1=""
          console.log("33")
        }
      // }
    }
  }

  ngOnChanges() {
    if (this.eventRadioGroup != undefined && this.eventRadioGroup != null) {
      this.eventRadioGroup.instance.option("value", '');
    }
  }

  ngDoCheck(){
    if(this.freeTextFlag==true &&(this.textanswer1 !="" && this.textanswer1 != null && this.textanswer1 != undefined) ){
      if (this.textanswer1.trim().length == 0){
        this.submitFlag = true;
      }
      else {
        this.submitFlag = false
      }
    }
    
  }

  previous() {
    var jsonBody = {};
    this.jsonBody1={};
    this.submitFlag = true;
    this.onlyCnt = this.onlyCnt-1;
    this.userAnswer["answer"]=this.textanswer1.trim();
    this.freeTextFlag = false;
    this.queArray1[this.questionCount-1].answer  =  this.jsonObject["useranswer"]
    this.queArray2[this.questionCount-1].answer  =  this.textanswer1.trim()
    console.log("prev",this.questionCount,this.queArray1,this.queArray2)
    if(this.queArray1[this.questionCount-2].answer != ""){
      this.optionArray=[];
      this.priorities=[];
      for(let i=0; i< this.queArray1[this.questionCount-2].options.length ; i++){
        if(this.queArray1[this.questionCount-2].options[i].value !=""){
          this.optionArray.push(this.queArray1[this.questionCount-2].options[i])
          this.priorities.push(this.queArray1[this.questionCount-2].options[i].value)
        }
      }
      for(let i=0; i< this.optionArray.length ; i++){
          if(this.queArray1[this.questionCount-2].answer == this.optionArray[i].option){
            this.type1Ans = this.optionArray[i].value
            console.log("ghgqfgdh")
            
        }
      }
      if(this.queArray1[this.questionCount-2].question_type <=4 && this.queArray1[this.questionCount-2].answer=="c"){
          this.freeTextFlag = true
          this.textanswer1 = this.queArray2[this.questionCount-2].answer
          console.log("ghgqfgdh111111111",this.textanswer1)
        }
        else if(this.queArray1[this.questionCount-2].question_type ==5 && this.queArray1[this.questionCount-2].answer=="a"){
          this.freeTextFlag = true
          this.textanswer1 = this.queArray2[this.questionCount-2].answer
          console.log("ghgqfgdh111111111",this.textanswer1)
        }
        else if(this.queArray1[this.questionCount-2].question_type >=6 && this.queArray1[this.questionCount-2].answer=="b"){
          this.freeTextFlag = true
          this.textanswer1 = this.queArray2[this.questionCount-2].answer
          console.log("ghgqfgdh111111111",this.textanswer1)
        }
        else{
          this.freeTextFlag = false
          this.textanswer1="";
          console.log("ghgqfgd")
      }
          jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
          jsonBody["event"] = "answer";
          jsonBody["useranswer"] = this.queArray1[this.questionCount-1].answer;
          jsonBody["questionid"] = this.queArray1[this.questionCount-1].questionid;
        
          this.jsonBody1['submoduleid'] = window.localStorage.getItem('uuid')
          this.jsonBody1["event"] = "answer";
          this.jsonBody1["useranswer"] = this.queArray2[this.questionCount-1].answer;
          this.jsonBody1["questionid"] = this.queArray2[this.questionCount-1].questionid;

      console.log("UUUUUUUUUUU",this.queArray1[this.questionCount-2].question_type,this.queArray1[this.questionCount-2].answer)
    }

    else{
      this.type1Ans = ""
      this.textanswer1="";
      jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
      jsonBody["event"] = "answer";
      jsonBody["useranswer"] = this.jsonObject["useranswer"];
      jsonBody["questionid"] = this.jsonObject["questionid"];

      this.jsonBody1['submoduleid'] = window.localStorage.getItem('uuid')
      this.jsonBody1["event"] = "answer";
      this.jsonBody1["useranswer"] =  this.userAnswer["answer"];
      this.jsonBody1["questionid"] = this.activeItem1.questionid;
    }
    console.log("typeans",this.type1Ans,this.queArray1[this.questionCount-2].answer,this.optionArray,this.optionArray[0].value)

    this.apiCall(jsonBody, this.apiurl, "back");

   
    
    console.log("jsonbody",this.activeItem1,this.ansJson)
  }

  next() {
    var jsonBody = {};
    this.jsonBody1 = {};
    this.submitFlag = true;
    this.onlyCnt = this.onlyCnt+1;
    this.userAnswer["answer"]=this.textanswer1.trim();
    this.freeTextFlag = false;
    // console.log("cnttttttttttttttt",this.questionCount)
    // console.log("ewewesfdxdzcxaSXXX",this.queArray1[this.counter-1].answer)
    this.queArray1[this.questionCount-1].answer  =  this.jsonObject["useranswer"]
    this.queArray2[this.questionCount-1].answer  =  this.textanswer1.trim()
    console.log("next",this.questionCount,this.queArray1,this.queArray2)
    if(this.queArray1[this.questionCount].answer != ""){
      this.optionArray=[];
      this.priorities=[];
      for(let i=0; i< this.queArray1[this.questionCount].options.length ; i++){
        if(this.queArray1[this.questionCount].options[i].value !=""){
          this.optionArray.push(this.queArray1[this.questionCount].options[i])
          this.priorities.push(this.queArray1[this.questionCount].options[i].value)
        }
      }
      for(let i=0; i< this.optionArray.length ; i++){
          if(this.queArray1[this.questionCount].answer == this.optionArray[i].option){
            this.type1Ans = this.optionArray[i].value
            console.log("ghgqfgdh")
            
        }
      }
      if(this.queArray1[this.questionCount].question_type <=4 && this.queArray1[this.questionCount].answer=="c"){
          this.freeTextFlag = true
          this.textanswer1 = this.queArray2[this.questionCount].answer
          console.log("ghgqfgdh111111111",this.textanswer1)
      }
      else if(this.queArray1[this.questionCount].question_type ==5 && this.queArray1[this.questionCount].answer=="a"){
        this.freeTextFlag = true
        this.textanswer1 = this.queArray2[this.questionCount].answer
        console.log("ghgqfgdh111111111",this.textanswer1)
      }
      else if(this.queArray1[this.questionCount].question_type >=6 && this.queArray1[this.questionCount].answer=="b"){
        this.freeTextFlag = true
        this.textanswer1 = this.queArray2[this.questionCount].answer
        console.log("ghgqfgdh111111111",this.textanswer1)
      }
        else{
          this.freeTextFlag = false
          this.textanswer1="";
          console.log("ghgqfgd")
      }
        jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
        jsonBody["event"] = "answer";
        jsonBody["useranswer"] = this.queArray1[this.questionCount-1].answer;
        jsonBody["questionid"] = this.queArray1[this.questionCount-1].questionid;

        this.jsonBody1['submoduleid'] = window.localStorage.getItem('uuid')
        this.jsonBody1["event"] = "answer";
        this.jsonBody1["useranswer"] = this.queArray2[this.questionCount-1].answer;
        this.jsonBody1["questionid"] = this.queArray2[this.questionCount-1].questionid;
      console.log("UUUUUUUUUUU",this.queArray1[this.questionCount].question_type,this.queArray1[this.questionCount].answer,this.type1Ans)
    }

    else{
      this.type1Ans = ""
      this.textanswer1="";
      jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
      jsonBody["event"] = "answer";
      jsonBody["useranswer"] = this.jsonObject["useranswer"];
      jsonBody["questionid"] = this.jsonObject["questionid"];

      this.jsonBody1['submoduleid'] = window.localStorage.getItem('uuid')
      this.jsonBody1["event"] = "answer";
      this.jsonBody1["useranswer"] =  this.userAnswer["answer"];
      this.jsonBody1["questionid"] = this.activeItem1.questionid;
    
    }
    
    this.apiCall(jsonBody, this.apiurl, "next");

    // setTimeout(() => {
    //   this.apiCall(jsonBody1, this.apiurl, "next1");
    // }, 200);
   

    console.log("jsonbody",this.activeItem1,this.ansJson)
  }

  finish2() {
    var jsonBody = {}
    this.jsonBody1 = {}
    this.userAnswer["answer"]=this.textanswer1.trim();
    if (Object.keys(this.ansJson).length != 8)
    {
      this.toastr.error("You must give all answers");
      console.log("no hit", Object.keys(this.ansJson).length);
    } else
    {
      if(this.queArray1[7].answer != ""){
        jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
        jsonBody["event"] = "answer";
        jsonBody["useranswer"] = this.queArray1[7].answer;
        jsonBody["questionid"] = this.queArray1[7].questionid;

        this.jsonBody1['submoduleid'] = window.localStorage.getItem('uuid')
        this.jsonBody1["event"] = "finish";
        this.jsonBody1["useranswer"] = this.queArray2[7].answer;
        this.jsonBody1["questionid"] = this.queArray2[7].questionid;
      
      }
     else{
      jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
      jsonBody["event"] = "answer";
      jsonBody["useranswer"] = this.jsonObject["useranswer"];
      jsonBody["questionid"] = this.jsonObject["questionid"];

     }
      console.log("finishhh",this.jsonBody1)
      this.apiCall(jsonBody, this.apiurl, "answer");

      // setTimeout(() => {
      //   this.apiCall(jsonBody1, this.apiurl, "finish");
      // }, 200);
      
    }
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module2Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
           if (fun == "start") {
            this.questionlist = data["data"].questionlist;
            console.log("queslist",this.questionlist)
               this.counter = 1;
               this.questionCount = 1;
               this.onlyCnt = 1
              for(let i=0;i< this.questionlist.length;i++)
              {
                var str = this.questionlist[i].question_type
                if(str.includes(".") == false){
                  this.queArray1.push(this.questionlist[i])
                }
                else{
                  this.queArray2.push(this.questionlist[i])
                }
              }
              console.log("queArray",this.queArray1,this.queArray2)
              this.activeItem = this.queArray1[0];
              this.activeItem1 = this.queArray2[0];
              for(let i=0; i< this.activeItem.options.length ; i++){
                if(this.activeItem.options[i].value !=""){
                  this.optionArray.push(this.activeItem.options[i])
                  this.priorities.push(this.activeItem.options[i].value)
                }
              }
                console.log("statement",this.activeItem,this.optionArray)
                console.log("cnttttttttttttttt",this.counter)
              if(this.activeItem.answer !=""){
                for(let i=0; i< this.optionArray.length ; i++){
                  if(this.activeItem.answer == this.optionArray[i].option){
                    this.type1Ans = this.optionArray[i].value
                    console.log("ghgqfgdh")
                    this.jsonObject["useranswer"] = this.activeItem.answer;
                    this.jsonObject["questionid"] = this.activeItem.questionid;
                    this.submitFlag = false;
                  }
                }
                if(this.activeItem.question_type <=4 && this.activeItem.answer == "c"){
                  this.freeTextFlag = true;
                  this.textanswer1 = this.activeItem1.answer
                }
                else if(this.activeItem.question_type ==5 && this.activeItem.answer == "a"){
                  this.freeTextFlag = true;
                  this.textanswer1 = this.activeItem1.answer
                }
                else if(this.activeItem.question_type >=6 && this.activeItem.answer == "b"){
                  this.freeTextFlag = true;
                  this.textanswer1 = this.activeItem1.answer
                }
                else{
                  this.freeTextFlag = false;
                  this.textanswer1="";
                }
              }
          } else if(fun == "next"){
            // var jsonBody1={}
            // jsonBody1['submoduleid'] = window.localStorage.getItem('uuid')
            // jsonBody1["event"] = "answer";
            // jsonBody1["useranswer"] =  this.userAnswer["answer"];
            // jsonBody1["questionid"] = this.activeItem1.questionid;
           
            this.apiCall(this.jsonBody1, this.apiurl, "next1");
          
          } else if (fun == "next1") {
            
            this.counter = this.queArray1.indexOf(this.activeItem);
            const newIndex = this.counter === this.queArray1.length - 1 ? 0 : this.counter + 1;
            this.activeItem = this.queArray1[newIndex];
            this.activeItem1 = this.queArray2[newIndex];
            console.log(this.counter, Object.keys(this.jsonObject).length);
            this.counter++;
            this.questionCount  = this.questionCount + 1;
            //this.freeTextFlag = false;
            //this.textanswer1 ="";
            this.optionArray=[];
            this.priorities=[];
            //this.eventRadioGroup.instance.option("value", '');
            for(let i=0; i< this.activeItem.options.length ; i++){
              if(this.activeItem.options[i].value !=""){
                this.optionArray.push(this.activeItem.options[i])
                this.priorities.push(this.activeItem.options[i].value)
              }
            }
          }
          else if(fun == "answer"){
            // var jsonBody1={}
            // jsonBody1['submoduleid'] = window.localStorage.getItem('uuid')
            // jsonBody1["event"] = "finish";
            // jsonBody1["useranswer"] = this.userAnswer["answer"];
            // jsonBody1["questionid"] = this.activeItem1.questionid;
           
            this.apiCall(this.jsonBody1, this.apiurl, "finish");
          
          } else if(fun == "back"){
           
            this.apiCall(this.jsonBody1, this.apiurl, "back1");
          
          }
           else if (fun == "back1") {
            
            this.counter = this.queArray1.indexOf(this.activeItem);
            const newIndex = this.counter === 0 ? this.queArray1.length - 1 : this.counter - 1;
            this.activeItem = this.queArray1[newIndex];
            this.activeItem1 = this.queArray2[newIndex];
            console.log(this.counter)
            this.counter--;
            this.questionCount  = this.questionCount - 1;
            //this.freeTextFlag = false;
            //this.textanswer1 ="";
            this.optionArray=[];
            this.priorities=[];
            //this.eventRadioGroup.instance.option("value", '');
            for(let i=0; i< this.activeItem.options.length ; i++){
              if(this.activeItem.options[i].value !=""){
                this.optionArray.push(this.activeItem.options[i])
                this.priorities.push(this.activeItem.options[i].value)
              }
            }
            console.log("after",this.activeItem,this.ansJson,this.activeItem)
          } else if (fun == "finish") {
            window.localStorage.setItem('uuid', data['data'].nextuuid)
            window.localStorage.setItem('subFlagModule5', '2')
            this.sendAns.emit("finish")
          }
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }
}
