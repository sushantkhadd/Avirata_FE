import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { LanguageService } from "src/app/language.service";
import { ModalDirective } from "ngx-bootstrap";
import { DxRadioGroupComponent } from 'devextreme-angular';

@Component({
  selector: 'app-mcqcomponent',
  templateUrl: './mcqcomponent.component.html',
  styleUrls: ['./mcqcomponent.component.scss']
})
export class McqcomponentComponent implements OnInit {
  @ViewChild('rankModal') public rankModal: ModalDirective;
  @ViewChild('instructionModal') public instructionModal: ModalDirective;
  //To Open/Close Modal from Typescript
  @Input() public data;
  @Input() public passFlags;public queCount;
  @Output() public sendAns = new EventEmitter<Object>();
  @ViewChild("eventRadioGroup") eventRadioGroup: DxRadioGroupComponent;
  public statement; tasks; priorities = []; questionType;  showAnswer; selectedAnswer; description;queDescription;alreadyAns;alreadyAns1;mcqTextOption=[];questionImg;answerImg;
  public correctAns; rightFlag; submitFlag; imgUrlJson; ansTypeFlag; showCorrectAns;
  public bunchCounter;bunchList;bunchOptions;userOptions={};mcqBunchFlag = false;totalBunchCounter = 1;bunchSelectedAns=[];mcqOption:any = []; priorities1=[];priorities2=[]
  public ansSelectCount; counter; selectedTasks = []; ans1; ans2; showAns1; showAns2; queUrl;title;rightAnsId;rightAnsArray=[];
  public nextQueFlag; subPriorities; sendYesNoType; mysubModule3; mysubModule4; mysubModule1;
  public onlyPopUpAns; mysubModule; submitFlagMCQ; mysubModule0; mysubModule6; mysubModule7;mysubModule2;mysubModule5;totalQueCount;mysubFlagModule5;
  constructor(public lang: LanguageService) { }

  ngOnInit() {
    this.submitFlagMCQ = false
    this.mysubModule = parseInt(window.localStorage.getItem('mainFlagModule5'))
    this.mysubModule3 = parseInt(window.localStorage.getItem('mainFlagModule3'))
    this.mysubModule4 = parseInt(window.localStorage.getItem('mainFlagModule4'))
    this.mysubModule5 = parseInt(window.localStorage.getItem('mainFlagModule5'))
    this.mysubFlagModule5 = parseInt(window.localStorage.getItem('subFlagModule5'))
    this.mysubModule0 = parseInt(window.localStorage.getItem('mainFlagModule0'))
    this.mysubModule6 = parseInt(window.localStorage.getItem('mainFlagModule6'))
    this.mysubModule7 = parseInt(window.localStorage.getItem('mainFlagModule7'))
    this.mysubModule1 = parseInt(window.localStorage.getItem('mainFlagModule1'))
    this.mysubModule2 = parseInt(window.localStorage.getItem('mainFlagModule2'))
    if(window.localStorage.getItem('mainFlagModule0') == '30' || window.localStorage.getItem('mainFlagModule1')== '1' || window.localStorage.getItem('mainFlagModule1')== '4' || window.localStorage.getItem('mainFlagModule1')== '6'){
      this.queCount = parseInt(window.localStorage.getItem('subFlagModule1'))
    }
    else if(window.localStorage.getItem('mainFlagModule2')== '4' || window.localStorage.getItem('mainFlagModule2')== '3' || window.localStorage.getItem('mainFlagModule2')== '9' || window.localStorage.getItem('mainFlagModule2')== '11'){
      this.queCount = parseInt(window.localStorage.getItem('subFlagModule2'))
    }
    else if(window.localStorage.getItem('mainFlagModule4')== '5' || window.localStorage.getItem('mainFlagModule4')== '7'){
      this.queCount = parseInt(window.localStorage.getItem('subFlagModule4'))
    } else if (window.localStorage.getItem('mainFlagModule3') == '9' || window.localStorage.getItem('mainFlagModule3') == '11' || window.localStorage.getItem('mainFlagModule3') == '8' || window.localStorage.getItem('mainFlagModule3') == '5')
    {
      this.queCount = parseInt(window.localStorage.getItem('subFlagModule3'))
    }

    if(window.localStorage.getItem('mainFlagModule2')== '9'){
      this.totalQueCount = 7;
    }
    else if(window.localStorage.getItem('mainFlagModule2')== '11'){
      this.totalQueCount = 5;
    }
    this.nextQueFlag = false
    this.queUrl = false
    this.counter = 0
    this.ansTypeFlag = false;
    if (
      window.localStorage.getItem("mainFlagModule3") == "4" ||
      window.localStorage.getItem("mainFlagModule3") == "1"
    ) {
      this.queUrl = true;
    } else {
      this.queUrl = false;
    }
    // var checkBtn : any = document.getElementsByClassName('dx-radiobutton')[0].setAttribute('aria-checked','true');
  }

  ngOnChanges() {
    this.submitFlagMCQ = false
    this.showCorrectAns = ''
    this.scrollUp()
    // console.log("dsds ",typeof(this.eventRadioGroup.instance.option("value")))
    //     if(this.eventRadioGroup.value !="" && this.eventRadioGroup.instance.option("value") != null && this.eventRadioGroup.instance.option("value") !=undefined)
    // {
    this.counter = 0
    console.log("dsds: ", this.passFlags)
    this.selectedTasks = []
    // }
    this.imgUrlJson = {}
    if (this.eventRadioGroup != undefined && this.eventRadioGroup != null) {
      this.eventRadioGroup.instance.option("value", '');
    }

    this.submitFlag = false
    this.correctAns = '';
    this.rightFlag = false;
    console.log("ss: ", this.data)
    this.priorities = []
    this.questionType = this.passFlags.questionType;
    this.showAnswer = this.passFlags.showAnswer;
    this.statement = this.data.question;
    // console.log(parseInt(window.localStorage.getItem('mainFlagModule7')) ,(this.mysubModule7 == 3),this.data.title)
    if(parseInt(window.localStorage.getItem('mainFlagModule7')) == 3){
    this.title=this.data.title;
    }

    if (this.questionType == 'mcqYesNoOption') {
      this.subPriorities = []
      this.tasks = this.data.mainOption;
      for (var i = 0; i < this.tasks.length; i++) {
        this.priorities.push(this.data.mainOption[i].value)
      }

      for (var i = 0; i < this.data.options.length; i++) {
        this.subPriorities.push(this.data.options[i].value)
      }
    } else if (this.questionType == 'mcqWithTwoStatements') {
        console.log("data",this.data)
        this.priorities= []
        for(var i=0; i< this.data.statementlist.length ; i++){
          this.priorities.push(this.data.statementlist[i].statement)
          if(this.data.statementlist[i].rightanswer==true){
            this.showCorrectAns = this.data.statementlist[i].statement;
            this.rightAnsId = this.data.statementlist[i].statementid;
          }
        }
        this.description = this.data.description 
    } else if (this.questionType == 'mcqTextOption' && (window.localStorage.getItem('mainFlagModule0') == '30' || window.localStorage.getItem('mainFlagModule2') == '4' || window.localStorage.getItem('mainFlagModule2') == '3' || window.localStorage.getItem('mainFlagModule4') == '5' || window.localStorage.getItem('mainFlagModule3') == '9' || window.localStorage.getItem('mainFlagModule3') == '11' || window.localStorage.getItem('mainFlagModule3') == '8' || window.localStorage.getItem('mainFlagModule3') == '5' || window.localStorage.getItem('mainFlagModule4')== '7')) {
        console.log("data",this.data.questionlist[0].question,this.data.questionlist[0].options)
        this.priorities= []
       // this.priorities = this.data.questionlist[0].question;
       for(let i=0; i< this.data.questionlist[0].options.length; i++){
         if(this.data.questionlist[0].options[i].value != "" && this.data.questionlist[0].options[i].value != null && this.data.questionlist[0].options[i].value != undefined){
           this.mcqTextOption.push(this.data.questionlist[0].options[i])
         }
       }
       console.log("this.taskssss",this.mcqTextOption)
       this.tasks = this.data.questionlist[0].options;
        this.statement = this.data.questionlist[0].question;
      for (var i = 0; i < this.tasks.length; i++)
      {
        if (this.data.questionlist[0].options[i].value != null && this.data.questionlist[0].options[i].value != "")
        {
          this.priorities.push(this.data.questionlist[0].options[i].value)
        }
      }
      console.log("options",this.priorities)

    } else if(this.questionType == 'mcqInBunch'){
      console.log("mcqbunchdata",this.data)
      if(window.localStorage.getItem("mainFlagModule5")=="23" || window.localStorage.getItem("mainFlagModule5")=="18"){
       
        this.tasks = this.data.questionlist;
        this.bunchList = this.tasks;
        console.log("this.tasks",this.tasks)
        for(let i=0; i<this.tasks.length;i++){
          this.statement = this.tasks[i].question;
          this.mcqOption.push(this.tasks[i].options)
          //this.priorities=[];
          console.log("option",this.mcqOption)
            
        }
        console.log("option111",this.mcqOption)
        for(let j=0; j<=this.mcqOption.length; j++){
         // this.priorities=[] 
            if (this.mcqOption[0][j].value != "")
            {
              this.priorities.push(this.mcqOption[0][j].value)
              console.log("priorities",this.priorities)
            }
        }
        //var priorities1=[] 
        for(let j=0; j<=this.mcqOption.length; j++){
          //this.priorities=[] 
         
          if (this.mcqOption[1][j].value != "")
          {
            this.priorities1.push(this.mcqOption[1][j].value)
            console.log("priorities",this.priorities1)
          }
        
      }
      //this.priorities=[] 
      for(let j=0; j<=this.mcqOption.length; j++){
        //var priorities2=[] 
        if (this.mcqOption[2][j].value != "")
        {
          this.priorities2.push(this.mcqOption[2][j].value)
          console.log("priorities",this.priorities2)
        }
    }
        // for(let j=0; j<this.mcqOption.length; j++){
        //  // this.priorities=[]
        //   if (this.mcqOption[j].value != "")
        //     {
        //       this.priorities.push(this.mcqOption[j].value)
        //       console.log("priorities",this.priorities)
        //     }
        // }
        console.log("priorities11",this.priorities,this.statement,this.mcqOption[0][0])
      }
      else {
        this.tasks = this.data.statementlist;
        console.log("bunchmcq",this.tasks);
        this.bunchOptions = [{"option":"a","value":"अस्वास्थ्याशी निगडित"},
                            {"option":"b","value":"आजाराशी निगडित"},
                            {"option":"c","value":"वरील दोन्हीशी निगडित नाही"}];
          for(var i=0; i<this.bunchOptions.length;i++){
            this.priorities.push(this.bunchOptions[i].value)
  
          }
        console.log("mcqbunch options",this.priorities)
        for(var i=0; i<this.tasks.length;i++){
          this.statement = this.tasks[i].statement;
        }
  
        this.bunchCounter = 5;
        this.totalBunchCounter = 25 - this.tasks.length;
        this.bunchList = this.tasks.splice(0,this.bunchCounter)
        if(window.localStorage.getItem('mainFlagModule4') == "12"){
           console.log("ansss",this.bunchList[0].answer,this.bunchOptions[0].option)
           var dummyObj={}
           for(let i=0;i<this.bunchOptions.length;i++){
  
              if(this.bunchList[0].answer == this.bunchOptions[i].option){
                dummyObj['1']=this.bunchOptions[i].value;
              }
             if(this.bunchList[1].answer == this.bunchOptions[i].option){
                dummyObj['2']=this.bunchOptions[i].value;
              }
             if(this.bunchList[2].answer == this.bunchOptions[i].option){
                dummyObj['3']=this.bunchOptions[i].value;
              }
             if(this.bunchList[3].answer == this.bunchOptions[i].option){
                dummyObj['4']=this.bunchOptions[i].value;
              }
             if(this.bunchList[4].answer == this.bunchOptions[i].option){
                dummyObj['5']=this.bunchOptions[i].value;
              }
              console.log("final", dummyObj)
          }
          this.bunchSelectedAns.push(dummyObj['1'])
          this.bunchSelectedAns.push(dummyObj['2'])
          this.bunchSelectedAns.push(dummyObj['3'])
          this.bunchSelectedAns.push(dummyObj['4'])
          this.bunchSelectedAns.push(dummyObj['5'])
  
          for(let j=0; j< this.bunchList.length;j++){
            this.userOptions[this.bunchList[j].statementid] = this.bunchList[j].answer
          }
          if(Object.keys(this.userOptions).length == 5){
            this.mcqBunchFlag = true;
           }
        }
  
        console.log("mcqbunch options",this.bunchList,this.totalBunchCounter,this.tasks.length,this.bunchSelectedAns,dummyObj,this.userOptions)
      }
     
    } else if (window.localStorage.getItem('mainFlagModule5') == '7' || window.localStorage.getItem('mainFlagModule3') == '7' || window.localStorage.getItem('mainFlagModule4') == '11') {
      console.log("data",this.data)
      this.priorities= []
      if(window.localStorage.getItem('mainFlagModule3') == '7' || window.localStorage.getItem('mainFlagModule4') == '11'){
        this.bunchList = this.data.splice(0,1)  
        this.queCount = parseInt( window.localStorage.getItem("subFlagModule1"))
        this.alreadyAns = this.bunchList[0].answer
        for(let i=0; i< this.bunchList[0].options.length; i++){
          if(this.bunchList[0].options[i].value !="" && this.bunchList[0].options[i].value !=null && this.bunchList[0].options[i].value !=undefined){
            this.mcqTextOption.push(this.bunchList[0].options[i])
          }
        }
        if(this.bunchList[0].question_url !=null){
          this.questionImg = this.bunchList[0].question_url;
          this.answerImg = this.bunchList[0].answer_url;
        }
        console.log("mcqtextoptionarr",this.mcqTextOption,this.bunchList,this.questionImg,this.answerImg)
        if(window.localStorage.getItem('mainFlagModule3') == '7'){
          this.description = this.bunchList[0].description;
        }
      }
      else{
        this.bunchList = this.data.questionlist.splice(0,1)    
        this.queCount = 1;
        this.description = this.bunchList[0].description;
        console.log("desc",this.description)
      }
      // this.priorities = this.data.questionlist[0].question;
     
      this.statement = this.bunchList[0].question;
      this.queDescription = this.bunchList[0].description;
      this.tasks = this.bunchList[0].options;
      for (var i = 0; i < this.tasks.length; i++)
      {
        if (this.bunchList[0].options[i].value != "" && this.bunchList[0].options[i].value != undefined)
        {
          this.priorities.push(this.bunchList[0].options[i].value)
          console.log("priorities",this.priorities)
          if(window.localStorage.getItem('mainFlagModule3') == '7' || window.localStorage.getItem('mainFlagModule4') == '11'){
            if(this.alreadyAns !="" && this.alreadyAns != null && this.alreadyAns!=undefined){
              if(this.alreadyAns == this.bunchList[0].options[i].option){
                this.alreadyAns1 = this.bunchList[0].options[i].value
                this.submitFlag = true;
                
                // let rightanswer ;
                // rightanswer = this.lang.get(
                //   "aesEncryptionKey",
                //   this.bunchList[0].rightanswer)
                //   this.bunchList[0].rightanswer = rightanswer
                //   console.log("rightans",rightanswer,this.bunchList)
                //   for(let j=0; j< this.bunchList[0].options.length;j++){
                //     if(this.bunchList[0].rightanswer == this.bunchList[0].options[j].option){
                //      this.showCorrectAns = this.bunchList[0].options[j].value
                //      if(this.alreadyAns1 == this.showCorrectAns){
                //        this.rightFlag = true;
                //      }
                //      else{
                //        this.rightFlag = false;
                //      }
                //     }
                //   }
                  this.userOptions[this.bunchList[0].questionid]=this.bunchList[0].answer;
                  this.onlyPopUpAns = this.bunchList[0].answer;
                  console.log("userans",this.userOptions)
            }
          }
        }
        }
       
      }
     console.log("options",this.bunchList,this.alreadyAns)
     
  } else if (this.questionType == 'checkBoxOption') {
    console.log("data",this.data)
    this.tasks = this.data.statementlist
    this.ansSelectCount = this.tasks.length + 1;
    for(let i=0; i<this.tasks.length; i++){
      if(this.tasks[i].rightanswer == true){
        this.rightAnsArray.push(this.tasks[i].statement)
        this.rightFlag=true;
      }
    }
    console.log("rightans",this.rightAnsArray)
    // this.priorities= []
    // // this.priorities = this.data.questionlist[0].question;
    // this.bunchList = this.data.questionlist.splice(0,1)
    // this.statement = this.bunchList[0].question;
    // this.tasks = this.bunchList[0].options;
    // for (var i = 0; i < this.tasks.length; i++)
    // {
    //   if (this.bunchList[0].options[i].value != "")
    //   {
    //     this.priorities.push(this.bunchList[0].options[i].value)
    //     console.log("priorities",this.priorities)
    //   }
    // }
   console.log("options",this.bunchList)
} else {

      this.tasks = this.data.options;
      console.log("rewewewses",this.data,this.tasks)

      for (var i = 0; i < this.tasks.length; i++)
      {
        if (this.data.options[i].value != "")
        {
          this.priorities.push(this.data.options[i].value)
          console.log("priorities",this.priorities)
        }
      }
      if (this.showAnswer == true) {
        this.correctAns = this.data.rightanswer;
        console.log("correctans",this.correctAns)
        if (window.localStorage.getItem('mainFlagModule2') == '3' && window.localStorage.getItem('subFlagModule2') == '4') {
          this.description = this.data.statement
        } else {
          this.description = this.data.description
        }

        for (var item1 of this.tasks) {
          if (item1.option == this.correctAns) {
            this.showCorrectAns = item1.value
          }
        }
      }

    }



    if (this.questionType == 'mcqImageOption' && this.data.url != '') {
      this.imgUrlJson = JSON.parse(this.data.url)
    }

    if (window.localStorage.getItem('mainFlagModule2') == '3' && window.localStorage.getItem('subFlagModule2') == '10') {
      this.questionType = 'checkBoxOption'
      this.ansSelectCount = 3
      this.description = this.data.statement
      console.log("aSHIWNI ", this.correctAns.charAt(2), (this.correctAns.trim()).charAt(2))
      this.ans1 = this.correctAns.charAt(0)
      this.ans2 = this.correctAns.charAt(2)
      for (let ans of this.tasks) {
        if (ans.option == this.ans1) {
          this.showAns1 = ans.value
        }
        if (ans.option == this.ans2) {
          this.showAns2 = ans.value
        }
      }
    }
  }

  onValueChanged($event) {
    this.submitFlag = true
    this.selectedAnswer = $event.value
    if (
      this.passFlags["popuptype"] != "description" 
    ) {
      if (this.showAnswer == true) {
        if (this.questionType == 'mcqTextOption' && (window.localStorage.getItem('mainFlagModule0') == '30' || window.localStorage.getItem('mainFlagModule2') == '4' || window.localStorage.getItem('mainFlagModule2') == '3' || window.localStorage.getItem('mainFlagModule4') == '5' || window.localStorage.getItem('mainFlagModule3') == '9' || window.localStorage.getItem('mainFlagModule3') == '11' || window.localStorage.getItem('mainFlagModule3') == '8'  || window.localStorage.getItem('mainFlagModule3') == '5' || window.localStorage.getItem('mainFlagModule4')== '7')){
          console.log('this. questionlist',this.data.questionlist)
          for(let i=0; i< this.data.questionlist[0].options.length ; i++){
            // console.log("optionsadddddd",$event.value,this.data.questionlist[0].options)
              if(this.data.questionlist[0].options[i].value !="" && this.data.questionlist[0].options[i].value !=null){
                console.log("iiiiiiii",i)
              if($event.value == this.data.questionlist[0].options[i].value){
               this.onlyPopUpAns = this.data.questionlist[0].options[i].option;
                console.log("dfdgfdgfdff" , this.onlyPopUpAns)
              }
            }
              this.description = this.data.description;
              // if(this.data.questionlist[0].options[i].value !="" && this.data.questionlist[0].options[i].value !=null){
              //   if(this.onlyPopUpAns==this.data.questionlist[0].rightanswer){
              //     this.rightFlag = true
              //   }
              //   else{
                  
              //     if(this.data.questionlist[0].rightanswer == this.data.questionlist[0].options[i].option){
              //       this.showCorrectAns =this.data.questionlist[0].options[i].value;
              //       console.log("correctans" , this.showCorrectAns)
              //     }
              //     this.rightFlag=false
              //     console.log("correctans" ,this.data.questionlist[0].rightanswer,this.data.questionlist[0].options[i].option)
              //   }
              // }
           
             }

             for(let j=0;j<this.mcqTextOption.length;j++){
              if(this.onlyPopUpAns==this.data.questionlist[0].rightanswer){
                this.rightFlag = true
                console.log("rightflag")
              }
              else{ 
                if(this.data.questionlist[0].rightanswer == this.mcqTextOption[j].option){
                  this.showCorrectAns =this.mcqTextOption[j].value;
                  console.log("correctans 22" , this.showCorrectAns)
                }
                this.rightFlag=false
                // console.log("correctans" ,this.data.questionlist[0].rightanswer,this.mcqTextOption[j].option)
              }
             }
             
        }else if (window.localStorage.getItem('mainFlagModule3') == '1' || window.localStorage.getItem('mainFlagModule3') == '9' || window.localStorage.getItem('mainFlagModule3') == '8' || window.localStorage.getItem('mainFlagModule3') == '11'){
          console.log("sadfffffffff",this.data)
          for(var i=0; i< this.data.options.length ; i++){
            // console.log("optionsadddddd",$event.value,this.data.questionlist[0].options)

              if($event.value == this.data.options[i].value){
               this.onlyPopUpAns = this.data.options[i].option;
                console.log("dfdgfdgfdff" , this.onlyPopUpAns)
              }

             }
        } else if (window.localStorage.getItem('mainFlagModule5') == '7')
        {
          console.log("bunchList",this.bunchList)

          for(let j=0; j< this.bunchList[0].options.length;j++){
            if($event.value == this.bunchList[0].options[j].value){
              var optionId = this.bunchList[0].options[j].option
            }
            if(this.bunchList[0].rightanswer == this.bunchList[0].options[j].option){
             this.showCorrectAns = this.bunchList[0].options[j].value
             if($event.value == this.showCorrectAns){
               this.rightFlag = true;
             }
             else{
               this.rightFlag = false;
             }
            }
          }

             this.userOptions[this.bunchList[0].questionid]=optionId
          console.log("val",$event.value,optionId,this.userOptions,this.showCorrectAns)

        }  else if (window.localStorage.getItem('mainFlagModule0') == '30' || window.localStorage.getItem('mainFlagModule3') == '7' || window.localStorage.getItem('mainFlagModule4') == '11')
        {
          console.log("bunchList",this.bunchList,$event.value)
        
            // let rightanswer ;
            // rightanswer = this.lang.get(
            //   "aesEncryptionKey",
            //   this.bunchList[0].rightanswer)
            //   console.log("encryptans",rightanswer)
            //   this.bunchList[0].rightanswer = rightanswer
            //   console.log("rightans",rightanswer,this.bunchList)
          

          for(let j=0; j< this.bunchList[0].options.length;j++){
            if($event.value == this.bunchList[0].options[j].value){
              this.onlyPopUpAns = this.bunchList[0].options[j].option
            }
            // if(this.bunchList[0].rightanswer == this.bunchList[0].options[j].option){
            //  this.showCorrectAns = this.bunchList[0].options[j].value
            //  if($event.value == this.showCorrectAns){
            //    this.rightFlag = true;
            //  }
            //  else{
            //    this.rightFlag = false;
            //  }
            // }
          }

          // for(let i=0;i<this.mcqTextOption.length;i++){
          //   console.log("optionId",this.onlyPopUpAns)
          //   if(optionId==this.bunchList[0].rightanswer){
          //     this.rightFlag = true
          //     console.log("rightflag")
          //   }
          //   else{ 
          //     if(this.bunchList[0].rightanswer == this.mcqTextOption[i].option){
          //       this.showCorrectAns =this.mcqTextOption[i].value;
          //       console.log("correctans" , this.showCorrectAns)
          //     }
          //     this.rightFlag=false
          //     console.log("correctans" ,this.bunchList[0].rightanswer,this.mcqTextOption[i].option,this.showCorrectAns)
          //   }
          //  }
             this.userOptions[this.bunchList[0].questionid]=this.onlyPopUpAns
          console.log("val",$event.value,optionId,this.userOptions,this.showCorrectAns)

        } else{
          for (var item1 of this.tasks) {
            console.log("dd ", item1);
            if (item1.value != "")
            {
              if (item1.value == $event.value)
              {
                if (item1.option == this.correctAns)
                {
                  this.rightFlag = true;
                  // this.rankModal.show()
                  console.log("right ans")
                } else
                {
                  this.rightFlag = false;
                  console.log("wrong ans")
                  // this.rankModal.show()
                }
              }
            }
          }
        }

      } else {
        this.submitFlagMCQ = true;
        for (var item of this.tasks) {
          if (item.value == $event.value) {
            if (this.mysubModule != 3) {
              this.sendAns.emit(item.option);
            } else {
              this.onlyPopUpAns = item.option;
            }
            // this.eventRadioGroup.instance.option("value", '');
          }
        }
      }
    }
    else {
      for (var item of this.tasks) {
        if (item.value == $event.value) {
          this.onlyPopUpAns = item.option;
        }
      }
    }

  }

  goNext5_3() {
    console.log("qsaDDDDDD",this.onlyPopUpAns)
    this.submitFlagMCQ = false
    if (window.localStorage.getItem('mainFlagModule2') == '4' || window.localStorage.getItem('mainFlagModule2') == '3' || window.localStorage.getItem('mainFlagModule3') == '9' || window.localStorage.getItem('mainFlagModule3') == '11' || window.localStorage.getItem('mainFlagModule3') == '8'  || window.localStorage.getItem('mainFlagModule3') == '5' || window.localStorage.getItem('mainFlagModule4') == '5' || window.localStorage.getItem('mainFlagModule4') == '7'){
      this.rankModal.show()
      this.lang.toShow();
     //this.data.description = this.data.description
     console.log("data.sescr",this.data.description)
    }else if(window.localStorage.getItem('mainFlagModule5') == '7' || window.localStorage.getItem('mainFlagModule0') == '30'){
      this.rankModal.show()
      this.lang.toShow();

      // this.userOptions[this.bunchList[0].questionid] =
    }else if(window.localStorage.getItem('mainFlagModule3') == '7' || window.localStorage.getItem('mainFlagModule4') == '11'){
      console.log("rightans",this.bunchList[0].rightanswer,this.bunchList,this.mcqTextOption)
      let rightanswer ;
      rightanswer = this.lang.get(
        "aesEncryptionKey",
        this.bunchList[0].rightanswer)
        console.log("encryptans",rightanswer)
        this.bunchList[0].rightanswer = rightanswer
        console.log("rightans",rightanswer,this.bunchList)

        for(let i=0;i<this.mcqTextOption.length;i++){
          console.log("optionId",this.onlyPopUpAns)
          if(this.onlyPopUpAns==this.bunchList[0].rightanswer){
            this.rightFlag = true
            console.log("rightflag")
          }
          else{ 
            if(this.bunchList[0].rightanswer == this.mcqTextOption[i].option){
              this.showCorrectAns =this.mcqTextOption[i].value;
              console.log("correctans" , this.showCorrectAns)
            }
            this.rightFlag=false
            console.log("correctans" ,this.bunchList[0].rightanswer,this.mcqTextOption[i].option,this.showCorrectAns)
          }
         }
         setTimeout(() => {
          this.rankModal.show()
          this.lang.toShow();
         }, 200);
     

      // this.userOptions[this.bunchList[0].questionid] =
    }
    else if(this.questionType == 'checkBoxOption'){
      if(window.localStorage.getItem('mainFlagModule5') == '11' || window.localStorage.getItem('mainFlagModule5') == '9' || window.localStorage.getItem('mainFlagModule5') == '13'){
        this.rankModal.show();
        this.lang.toShow();
        this.description = this.data.description
        console.log("data.sescr",this.data.description)
        //this.onlyPopUpAns = this.selectedTasks
      }
      else{
        this.sendAns.emit(this.selectedTasks)
      }

    }
    else{
      this.sendAns.emit(this.onlyPopUpAns)
    }
    // setTimeout(() => {
    // this.sendAns.emit(this.onlyPopUpAns)
    // }, 1000);

  }

  onValueChangedYesNoType($event) {
    console.log($event.value)
    if ($event.value == 'हो') {
      this.submitFlag = false
      this.nextQueFlag = true
    } else {
      this.sendYesNoType = ''
      this.submitFlag = true
      this.nextQueFlag = false
    }

    if(this.questionType == 'mcqWithTwoStatements'){

      console.log("option",$event,this.data.statementlist)
      this.sendYesNoType= "";
      for(var i=0; i< this.data.statementlist.length ; i++){
      console.log("optionsadddddd",$event,this.data.statementlist[i].statement)

        if($event.value == this.data.statementlist[i].statement){
         this.sendYesNoType = this.data.statementlist[i].statementid;
          console.log("dfdgfdgfdff" , this.sendYesNoType)
        }
        if(this.rightAnsId == this.sendYesNoType){
          this.rightFlag = true;
        }
        else{
          this.rightFlag = false;
        }
       }
    }
  }
  onValueChangedYesNoType2($event) {
    this.submitFlag = true
    for (var item of this.data.options) {
      if (item.value == $event.value) {
        this.sendYesNoType = item.option
      }
    }

  }
  onValueChangedMcqBunch($event,id,i){
    if(window.localStorage.getItem('mainFlagModule5') == "23" || window.localStorage.getItem("mainFlagModule5")=="18"){
      console.log("onvalue",$event.value,id,i)
      for(let j=0; j< this.mcqOption.length;j++){
        if($event.value == this.mcqOption[i][j].value){
          var optionId = this.mcqOption[i][j].option
        }
      }
      this.userOptions[id]=optionId
      console.log("useroption",this.userOptions,Object.keys(this.userOptions).length)
        if(Object.keys(this.userOptions).length == 3){
          this.mcqBunchFlag = true;
         }
    }
    else{
      console.log("onvalue",$event.value,id)
      for(let j=0; j< this.bunchOptions.length;j++){
        if($event.value == this.bunchOptions[j].value){
          var optionId = this.bunchOptions[j].option
        }
      }
  
        this.userOptions[id]=optionId
  
        console.log("useroption",this.userOptions,Object.keys(this.userOptions).length)
        if(Object.keys(this.userOptions).length == 5){
          this.mcqBunchFlag = true;
         }
    }
    
  }
  submitYesNo() {

    if(this.questionType == "mcqInBunch"){
      console.log("mcqbunch",this.bunchCounter)
      this.bunchList = this.tasks.splice(0,this.bunchCounter)
      this.sendAns.emit(this.userOptions)
      this.userOptions={};
      this.totalBunchCounter = this.totalBunchCounter + this.bunchCounter;
      this.mcqBunchFlag = false;
      this.bunchSelectedAns = [];
      if(window.localStorage.getItem('mainFlagModule4') == "12"){
        var dummyObj={}
        for(let i=0;i<this.bunchOptions.length;i++){
            if(this.bunchList.length !=0)
           {
             if(this.bunchList[0].answer == this.bunchOptions[i].option){
             dummyObj['1']=this.bunchOptions[i].value;
           }
          if(this.bunchList[1].answer == this.bunchOptions[i].option){
             dummyObj['2']=this.bunchOptions[i].value;
           }
          if(this.bunchList[2].answer == this.bunchOptions[i].option){
             dummyObj['3']=this.bunchOptions[i].value;
           }
          if(this.bunchList[3].answer == this.bunchOptions[i].option){
             dummyObj['4']=this.bunchOptions[i].value;
           }
          if(this.bunchList[4].answer == this.bunchOptions[i].option){
             dummyObj['5']=this.bunchOptions[i].value;
            }
          }
           console.log("final", dummyObj)
       }
       this.bunchSelectedAns.push(dummyObj['1'])
       this.bunchSelectedAns.push(dummyObj['2'])
       this.bunchSelectedAns.push(dummyObj['3'])
       this.bunchSelectedAns.push(dummyObj['4'])
       this.bunchSelectedAns.push(dummyObj['5'])
       for(let j=0; j< this.bunchList.length;j++){
        this.userOptions[this.bunchList[j].statementid] = this.bunchList[j].answer
      }
      if(Object.keys(this.userOptions).length == 5){
        this.mcqBunchFlag = true;
       }
       window.scroll(0,0)
     }
      console.log("anssss", this.bunchSelectedAns)
      window.scroll(0, 0)
    } else if(window.localStorage.getItem('mainFlagModule5') == "18"){
      this.sendAns.emit(this.sendYesNoType)
    }
    else{
      this.rankModal.show()
      this.lang.toShow()
      // this.rightFlag = true;
    }

  }
  submit() {
    if (this.passFlags['popuptype'] != 'description') {
      this.rankModal.show()
      this.lang.toShow()
    } else {
      this.instructionModal.show()
      this.lang.toShow()
    }
  }


  rankConfirmNext() {
    // if (window.localStorage.getItem('mainFlagModule2') == '3' && window.localStorage.getItem('subFlagModule2') == '4') {
    //   this.sendAns.emit(this.selectedAnswer)
    //   this.rankModal.hide()
    //   this.lang.toHide();
    //   if (this.eventRadioGroup != undefined && this.eventRadioGroup != null) {
    //     this.eventRadioGroup.instance.option("value", '');
    //   }
    // } else if (window.localStorage.getItem('mainFlagModule2') == '3' && window.localStorage.getItem('subFlagModule2') == '10') {
    //   this.sendAns.emit(this.selectedTasks)
    //   this.rankModal.hide()
    //   this.lang.toHide();
    // }else 
    if (window.localStorage.getItem('mainFlagModule1') == '2' || window.localStorage.getItem('mainFlagModule1') == '6') {
      var dummy=this.tasks;
      var obj=[];
      for (var i = 0; i < dummy.length; i++)
      {
        console.log("forloopdata",this.data)
        if (this.data.options[i].value != "")
        {
          obj.push(this.tasks[i])
          console.log("priorities",obj)
        }
      }
      console.log("this.tasks",this.tasks,this.selectedAnswer)
      for (var item of obj) {
        if (item.value == this.selectedAnswer) {
          console.log("emit even6t")
          this.sendAns.emit(item.option)
          this.rankModal.hide()
          this.lang.toHide();
          this.eventRadioGroup.instance.option("value", '');
        }
      }
    } else if(window.localStorage.getItem('mainFlagModule5') == '7' || window.localStorage.getItem('mainFlagModule0') == '30' || window.localStorage.getItem('mainFlagModule3') == '7' || window.localStorage.getItem('mainFlagModule4') == '11'){
      this.rankModal.hide()
      this.lang.toHide();
      // this.queCount = this.queCount + 1;
      // console.log("quecount",this.queCount)
      if((window.localStorage.getItem('mainFlagModule5') == '7')){
      if(Object.keys(this.userOptions).length == 3){
        this.sendAns.emit(this.userOptions)
      }
       else{
        this.priorities= []
        // this.priorities = this.data.questionlist[0].question;
        this.bunchList = this.data.questionlist.splice(0,1)
        this.statement = this.bunchList[0].question;
        this.tasks = this.bunchList[0].options;
        this.description = this.bunchList[0].description;
        for (var i = 0; i < this.tasks.length; i++)
        {
          if (this.bunchList[0].options[i].value != "" && this.bunchList[0].options[i].value != undefined)
          {
            this.priorities.push(this.bunchList[0].options[i].value)
            console.log("priorities",this.priorities)
          }
        }
       console.log("options",this.bunchList,this.userOptions,this.description)
      }

      if(this.queCount >= 3){
        this.queCount = 3;
      }
    }
    else if((window.localStorage.getItem('mainFlagModule0') == '30') || window.localStorage.getItem('mainFlagModule3') == '7' || window.localStorage.getItem('mainFlagModule4') == '11'){
      console.log("userOptions",this.userOptions)
      this.sendAns.emit(this.userOptions)
      this.priorities= []
      this.mcqTextOption=[]
      this.queDescription="";
      this.questionImg=null;
      this.answerImg=null;
        // this.priorities = this.data.questionlist[0].question;
        console.log("options12222222222",this.data)
        if((window.localStorage.getItem('mainFlagModule0') == '30')){
          this.bunchList = this.data.questionlist.splice(0,1)    
          // this.queCount = 1;
        }else{
          this.bunchList = this.data.splice(0,1)
        }
          
          if(this.bunchList[0].question_url !=null){
            this.questionImg = this.bunchList[0].question_url;
            this.answerImg = this.bunchList[0].answer_url;
          }
          this.queDescription = this.bunchList[0].description;
          if(window.localStorage.getItem('mainFlagModule3') == '7'){
            this.description = this.bunchList[0].description;
          }
          console.log("options11111111111",this.bunchList,this.userOptions,this.questionImg,this.answerImg)
            this.alreadyAns = this.bunchList[0].answer
          
            for(let i=0; i< this.bunchList[0].options.length; i++){
              if(this.bunchList[0].options[i].value !="" && this.bunchList[0].options[i].value !=null && this.bunchList[0].options[i].value !=undefined){
                this.mcqTextOption.push(this.bunchList[0].options[i])
              }
            }
        
        this.statement = this.bunchList[0].question;
        this.tasks = this.bunchList[0].options;
        console.log("options",this.bunchList,this.userOptions,this.alreadyAns)
       this.userOptions={};
      
        for (var i = 0; i < this.tasks.length; i++)
        {
          if (this.bunchList[0].options[i].value != "" && this.bunchList[0].options[i].value != undefined)
          {
            this.priorities.push(this.bunchList[0].options[i].value)
            console.log("priorities",this.priorities,this.bunchList)
            if(window.localStorage.getItem('mainFlagModule3') == '7' || window.localStorage.getItem('mainFlagModule4') == '11'){
              if(this.alreadyAns !="" && this.alreadyAns != null && this.alreadyAns!=undefined){
                if(this.alreadyAns == this.bunchList[0].options[i].option){
                  this.alreadyAns1 = this.bunchList[0].options[i].value
                  this.submitFlag = true;
                  // let rightanswer ;
                  // rightanswer = this.lang.get(
                  //   "aesEncryptionKey",
                  //   this.bunchList[0].rightanswer)
                  //   this.bunchList[0].rightanswer = rightanswer
                     console.log("rightans",this.alreadyAns1,this.bunchList)
                    for(let j=0; j< this.bunchList[0].options.length;j++){
                      if(this.bunchList[0].rightanswer == this.bunchList[0].options[j].option){
                       this.showCorrectAns = this.bunchList[0].options[j].value
                       if(this.alreadyAns1 == this.showCorrectAns){
                         this.rightFlag = true;
                       }
                       else{
                         this.rightFlag = false;
                       }
                      }
                    }
                    this.userOptions[this.bunchList[0].questionid]=this.bunchList[0].answer
                    console.log("userans",this.userOptions)
              }
            }
          }
          }
        }
       
       
    }
      this.rankModal.hide()
      this.lang.toHide();
      this.submitFlag = false;
      this.queCount = this.queCount + 1;
      console.log("quecount1",this.queCount)
    } else if(this.questionType == 'mcqWithTwoStatements'){
      this.rankModal.hide()
      this.lang.toHide();
      this.sendAns.emit(this.sendYesNoType)
    } else if(this.questionType == 'checkBoxOption'){
      this.rankModal.hide()
      this.lang.toHide();
      this.sendAns.emit(this.selectedTasks)
    }
    else {
      console.log("this.tasks",this.tasks,this.selectedAnswer)
      for (var item of this.tasks) {
        if(item.value !=""){
        if (item.value == this.selectedAnswer) {
          console.log("emit even6t")
          this.sendAns.emit(item.option)
          this.rankModal.hide()
          this.lang.toHide();
          this.eventRadioGroup.instance.option("value", '');
        }
      }
    }
    }
  }

  setradio(id) {
    this.submitFlag = true
    this.selectedAnswer = id
    if (this.showAnswer == true) {
      if (this.selectedAnswer == this.correctAns) {
        this.rightFlag = true
        // this.rankModal.show()
      } else {
        this.rightFlag = false
        // this.rankModal.show()
      }
    }
  }

  taskSelect(e, i, statementId) {
    // var temp =[];
    console.log("Select", statementId, this.counter, this.ansSelectCount, i)
    if (e.target.checked) {
      this.counter++;

      if (this.counter < this.ansSelectCount) {
        //  this.otherSelectDisable=true
        // this.selectedTasks.forEach((item, index) => {
        //   if (index == i) {
        //     item.answer = true;
        //   }
        // });
        this.selectedTasks.push(statementId)
      }
      else {
        this.counter--;
        var t = <HTMLInputElement>document.getElementById(i);
        t.checked = false;
      }

    } else {
      this.submitFlag = false
      console.log("else", this.selectedTasks.indexOf(statementId))
      this.counter--;
      this.selectedTasks.splice(this.selectedTasks.indexOf(statementId), 1)
      // this.selectedTasks.forEach((item, index) => {
      //   if (index == i) {
      //     item.answer = false;
      //   }
      // });
    }
    console.log("Select", this.selectedTasks, this.counter)
    if(window.localStorage.getItem("mainFlagModule5")=="23" || window.localStorage.getItem("mainFlagModule5")=="18"){
      if(this.selectedTasks.length >= 1){
        this.submitFlag = true;
      }
    }

  }

  emitData() {
    this.instructionModal.hide()
    this.lang.toHide();
    console.log("ans", this.onlyPopUpAns)
    if(window.localStorage.getItem('mainFlagModule5')== '11'){
      this.sendAns.emit(this.selectedTasks)
    }else{
      this.sendAns.emit(this.onlyPopUpAns)
    }
  }

  ngDoCheck() {
    if(window.localStorage.getItem('mainFlagModule1')== '2' || window.localStorage.getItem('mainFlagModule1')== '4' || window.localStorage.getItem('mainFlagModule1')== '6'){
      this.queCount = parseInt(window.localStorage.getItem('subFlagModule1'))
    }
    else if(window.localStorage.getItem('mainFlagModule2')== '4' || window.localStorage.getItem('mainFlagModule2')== '3' || window.localStorage.getItem('mainFlagModule2')== '9' || window.localStorage.getItem('mainFlagModule2')== '11'){
      this.queCount = parseInt(window.localStorage.getItem('subFlagModule2'))
    }
    else if(window.localStorage.getItem('mainFlagModule4')== '5' || window.localStorage.getItem('mainFlagModule4')== '7'){
      this.queCount = parseInt(window.localStorage.getItem('subFlagModule4'))
    } else if (window.localStorage.getItem('mainFlagModule3') == '9' || window.localStorage.getItem('mainFlagModule3') == '11' || window.localStorage.getItem('mainFlagModule3') == '8' || window.localStorage.getItem('mainFlagModule3') == '5')
    {
      this.queCount = parseInt(window.localStorage.getItem('subFlagModule3'))
    }

    if (this.questionType == 'checkBoxOption') {
      // console.log("ddd ", this.selectedTasks[0], this.selectedTasks[1], this.ans1, this.ans2)
      if(window.localStorage.getItem('mainFlagModule5')== '9'){
        if (this.selectedTasks.length >= 5) {
          this.submitFlag = true
        }
      }
      else if(window.localStorage.getItem('mainFlagModule5')== '11' || window.localStorage.getItem('mainFlagModule5')== '13'){
        if (this.selectedTasks.length >= 1) {
          this.submitFlag = true
        }
      }

    }
  }

  scrollUp() {
    window.scrollTo(0, 0);
  }
}