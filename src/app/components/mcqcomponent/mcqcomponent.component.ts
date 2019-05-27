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
  public statement; tasks; priorities = []; questionType; showAnswer; selectedAnswer; description;
  public correctAns; rightFlag; submitFlag; imgUrlJson; ansTypeFlag; showCorrectAns;

  public ansSelectCount; counter; selectedTasks = []; ans1; ans2; showAns1; showAns2; queUrl;title;
  public nextQueFlag; subPriorities; sendYesNoType; mysubModule3; mysubModule4; mysubModule1;
  public onlyPopUpAns; mysubModule; submitFlagMCQ; mysubModule0; mysubModule6; mysubModule7;mysubModule2;totalQueCount;
  constructor() { }

  ngOnInit() {
    this.submitFlagMCQ = false
    this.mysubModule = parseInt(window.localStorage.getItem('mainFlagModule5'))
    this.mysubModule3 = parseInt(window.localStorage.getItem('mainFlagModule3'))
    this.mysubModule4 = parseInt(window.localStorage.getItem('mainFlagModule4'))
    this.mysubModule0 = parseInt(window.localStorage.getItem('mainFlagModule0'))
    this.mysubModule6 = parseInt(window.localStorage.getItem('mainFlagModule6'))
    this.mysubModule7 = parseInt(window.localStorage.getItem('mainFlagModule7'))
    this.mysubModule1 = parseInt(window.localStorage.getItem('mainFlagModule1'))
    this.mysubModule2 = parseInt(window.localStorage.getItem('mainFlagModule2'))
    if(window.localStorage.getItem('mainFlagModule1')== '1' || window.localStorage.getItem('mainFlagModule1')== '4' || window.localStorage.getItem('mainFlagModule1')== '6'){
      this.queCount = parseInt(window.localStorage.getItem('subFlagModule1'))
    }
    else if(window.localStorage.getItem('mainFlagModule2')== '3' || window.localStorage.getItem('mainFlagModule2')== '9' || window.localStorage.getItem('mainFlagModule2')== '11'){
      this.queCount = parseInt(window.localStorage.getItem('subFlagModule2'))
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
        }
    } else if (this.questionType == 'mcqTextOption' && window.localStorage.getItem('mainFlagModule2') == '3') {
        console.log("data",this.data.questionlist[0].question,this.data.questionlist[0].options)
        this.priorities= []
       // this.priorities = this.data.questionlist[0].question;
        this.tasks = this.data.questionlist[0].options;
        this.statement = this.data.questionlist[0].question;
      for (var i = 0; i < this.tasks.length; i++)
      {
        if (this.data.questionlist[0].options[i].value != null)
        {
          this.priorities.push(this.data.questionlist[0].options[i].value)
        }
      }
      console.log("options",this.priorities)

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
      this.passFlags["popuptype"] != "description" &&
      this.mysubModule0 != 3 &&
      this.mysubModule0 != 2 &&
      this.mysubModule6 != 2 &&
      this.mysubModule7 != 2
    ) {
      if (this.showAnswer == true) {
        if (this.questionType == 'mcqTextOption' && window.localStorage.getItem('mainFlagModule2') == '3'){
          for(var i=0; i< this.data.questionlist[0].options.length ; i++){
            // console.log("optionsadddddd",$event.value,this.data.questionlist[0].options)
      
              if($event.value == this.data.questionlist[0].options[i].value){
               this.onlyPopUpAns = this.data.questionlist[0].options[i].option;
                console.log("dfdgfdgfdff" , this.onlyPopUpAns)
              }
              
             }
        }else if (window.localStorage.getItem('mainFlagModule3') == '1' || window.localStorage.getItem('mainFlagModule3') == '5' || window.localStorage.getItem('mainFlagModule3') == '9' || window.localStorage.getItem('mainFlagModule3') == '11'){
          console.log("sadfffffffff",this.data)
          for(var i=0; i< this.data.options.length ; i++){
            // console.log("optionsadddddd",$event.value,this.data.questionlist[0].options)
      
              if($event.value == this.data.options[i].value){
               this.onlyPopUpAns = this.data.options[i].option;
                console.log("dfdgfdgfdff" , this.onlyPopUpAns)
              }
              
             }
        } else{
          for (var item1 of this.tasks) {
            console.log("dd ", item1);
            if (item1.value == $event.value) {
              if (item1.option == this.correctAns) {
                this.rightFlag = true;
                // this.rankModal.show()
                console.log("right ans")
              } else {
                this.rightFlag = false;
                console.log("wrong ans")
                // this.rankModal.show()
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
    this.sendAns.emit(this.onlyPopUpAns)
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

  submitYesNo() {
    this.sendAns.emit(this.sendYesNoType)

  }
  submit() {
    if (this.passFlags['popuptype'] != 'description') {
      this.rankModal.show()
    } else {
      this.instructionModal.show()
    }
  }


  rankConfirmNext() {
    if (window.localStorage.getItem('mainFlagModule2') == '3' && window.localStorage.getItem('subFlagModule2') == '4') {
      this.sendAns.emit(this.selectedAnswer)
      this.rankModal.hide()
      if (this.eventRadioGroup != undefined && this.eventRadioGroup != null) {
        this.eventRadioGroup.instance.option("value", '');
      }
    } else if (window.localStorage.getItem('mainFlagModule2') == '3' && window.localStorage.getItem('subFlagModule2') == '10') {
      this.sendAns.emit(this.selectedTasks)
      this.rankModal.hide()
    }else if (window.localStorage.getItem('mainFlagModule1') == '2' || window.localStorage.getItem('mainFlagModule1') == '6') {
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
          this.eventRadioGroup.instance.option("value", '');
        }
      }
    }
    else {
      console.log("this.tasks",this.tasks,this.selectedAnswer)
      for (var item of this.tasks) {
        if (item.value == this.selectedAnswer) {
          console.log("emit even6t")
          this.sendAns.emit(item.option)
          this.rankModal.hide()
          this.eventRadioGroup.instance.option("value", '');
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

  }

  emitData() {
    this.instructionModal.hide()
    console.log("ans", this.onlyPopUpAns)
    this.sendAns.emit(this.onlyPopUpAns)
  }

  ngDoCheck() {
    if(window.localStorage.getItem('mainFlagModule1')== '2' || window.localStorage.getItem('mainFlagModule1')== '4' || window.localStorage.getItem('mainFlagModule1')== '6'){
      this.queCount = parseInt(window.localStorage.getItem('subFlagModule1'))
    }
    else if(window.localStorage.getItem('mainFlagModule2')== '3' || window.localStorage.getItem('mainFlagModule2')== '9' || window.localStorage.getItem('mainFlagModule2')== '11'){
      this.queCount = parseInt(window.localStorage.getItem('subFlagModule2'))
    }

    if (this.questionType == 'checkBoxOption') {
      console.log("ddd ", this.selectedTasks[0], this.selectedTasks[1], this.ans1, this.ans2)
      if (this.selectedTasks.length == 2) {
        this.submitFlag = true

        if ((this.ans1 == this.selectedTasks[0] || this.ans2 == this.selectedTasks[0]) && (this.ans1 == this.selectedTasks[1] || this.ans2 == this.selectedTasks[1])) {
          this.rightFlag = true
        } else {
          this.rightFlag = false
        }

      }
    }
  }

  scrollUp() {
    window.scrollTo(0, 0);
  }
}
