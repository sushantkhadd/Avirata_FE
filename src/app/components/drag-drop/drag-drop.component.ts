import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewContainerRef } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { ToastsManager } from "ng6-toastr";
import { LanguageService } from "../../language.service"

@Component({
  selector: "app-drag-drop-component",
  templateUrl: "./drag-drop.component.html",
  styleUrls: ["./drag-drop.component.scss"]
})
export class DragDropComponent implements OnInit {
  @ViewChild("rankModal") public rankModal: ModalDirective; //To Open/Close Modal from Typescript
  public mainFlagModule1 = parseInt(window.localStorage.getItem('mainFlagModule1'));
  public mainFlagModule3 = parseInt(window.localStorage.getItem('mainFlagModule3'));

  public subFlagModule1 = parseInt(window.localStorage.getItem('subFlagModule1'));
  public subFlagModule3 = parseInt(window.localStorage.getItem('subFlagModule3'));
  @Input() public data;
  question;
  ansJson = {};
  @Output() public sendAns = new EventEmitter<Object>();
  constructor(
    public translate: TranslateService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public LanguageService: LanguageService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  droppedItems1 = [];
  droppedItems2 = [];
  droppedItems3 = [];
  droppedItems4 = [];
  droppedItems5 = [];
  statement = [];
  dragEnabled = true;
  check1;
  check2;
  check3;
  check4;
  check5;
  disableReset;
  disableNext;
  rightFlag;
  options = [];
  jsonForAns = {};
  nextFlag = false;
  resetFlag = false;
  optionArray; description; queCount;
  singlejsonForAns = {};
  public singleDummy = {};

  ngOnInit() {
    // this.statement
    // this.data = "";
    this.resetFlag = false;
    this.jsonForAns = {
      "1": "मूर्त अनुभव:",
      "2": "पूर्वानुभावाशी जोड:",
      "3": "सूत्र शोधणे:",
      "4": "तपासून पाहणे:"
    };
    this.singlejsonForAns = {
      "1": "प्रथम पातळी:",
      "2": "द्वितीय पातळी:",
      "3": "तृतीय पातळी:",
      "4": "चतुर्थ पातळी:",
      "5": "पाचवी पातळी:"
    };
    if (window.localStorage.getItem('mainFlagModule1') == '8' || window.localStorage.getItem('mainFlagModule1') == '10')
    {
      this.queCount = parseInt(window.localStorage.getItem('subFlagModule1'))
    }else if (window.localStorage.getItem('mainFlagModule3') == '12')
    {
      this.queCount = parseInt(window.localStorage.getItem('subFlagModule3'))
    }
  }
  ngOnChanges() {
    this.statement = [];
    this.reset();
    this.resetFlag = false;
    this.rightFlag = false;
    this.ansJson = {};
    console.log("data ", this.data, this.data.type);
    this.question = this.data.question;
    this.options = this.data.options;
    if (this.data.description != "" && this.data.description != null && this.data.description != undefined)
    {
      this.description = JSON.parse(this.data.description);
    }
    if (this.data.type == "multiple")
    {
      this.optionArray = [
        {
          id: "1",
          name: "मूर्त अनुभव:",
          type: "draggable"
        },
        {
          id: "2",
          name: "पूर्वानुभावाशी जोड:",
          type: "draggable"
        },
        {
          id: "3",
          name: "सूत्र शोधणे:",
          type: "draggable"
        },
        {
          id: "4",
          name: "तपासून पाहणे:",
          type: "draggable"
        }
      ];

      this.options.forEach(element => {
        var jsonDummy = {};
        jsonDummy = JSON.parse(element.value);
        element.stmt = jsonDummy["statement"];
        element.ans = jsonDummy["answer"];
      });
      for (let i = 0; i < this.options.length; i++)
      {
        this.statement.push({
          stmt: this.options[i].stmt,
          option: this.options[i].option
        });
      }
      console.log("stmt:- ", this.statement);
    } else if (this.data.type == "single")
    {
      if (this.mainFlagModule1 == 10 || this.mainFlagModule3 == 12) {
          this.optionArray = [];
          var i = 0;
          this.options.forEach(element => {
            var jsonDummy = {};
            i++;
            var option = element.option;
            jsonDummy = JSON.parse(element.value);
            element.sub_que = jsonDummy["sub_que"];
            element.response = jsonDummy["response"];
            this.optionArray.push({
              name: jsonDummy["sub_que"],
              response: jsonDummy["response"],
              id: i,
              type: "draggable",
              option: option,
              rightAnswer: "rightAnswer" + i
            });
            console.log("jsonDummy:- ", this.optionArray);
          });
          console.log(this.data);
          for (let element in this.optionArray) {
            this.statement.push({
              stmt: this.optionArray[element].response,
              option: this.optionArray[element].option
            });
          }

          for (let element in this.optionArray) {
            if (this.optionArray[element].id != undefined) {
              this.singleDummy[
                this.optionArray[element].id
              ] = this.optionArray[element].id;
              console.log("singleDummy", this.singleDummy);
            }
            this.shuffle(this.statement);
          }
        } else if (
          this.mainFlagModule1 == 8
        )
        {
          this.optionArray = [];
          var i = 0;
          this.options.forEach(element => {
            var jsonDummy = {};
            i++;
            var option = element.option;
            console.log(this.data, element, "maindata");
            if (element != "" && element != null && element != undefined)
            {
            jsonDummy = JSON.parse(element.value);
            }
            element.sub_que = jsonDummy["sub_que"];
            element.response = jsonDummy["response"];
            this.optionArray.push({
              name: jsonDummy["sub_que"],
              response: jsonDummy["response"],
              id: i,
              type: "draggable",
              option: option,
              rightAnswer: "rightAnswer" + i
            });
            console.log("jsonDummy:- ", this.optionArray);
          });

          for (let element in this.optionArray) {
            this.statement.push({
              stmt: this.optionArray[element].response,
              option: this.optionArray[element].option
            });
          }

          for (let element in this.optionArray) {
            if (this.optionArray[element].id != undefined) {
              this.singleDummy[
                this.optionArray[element].id
              ] = this.optionArray[element].id;
              console.log("singleDummy", this.singleDummy);
            }
            this.shuffle(this.optionArray);
          }
        }
    }
  }

  onAnyDrop1(e: any, id) {
    this.droppedItems1.push(e.dragData);
    this.removeItem(e.dragData, this.optionArray);
    console.log("dropped items1", this.droppedItems1);
    if (this.droppedItems1.length == 1) {
      this.check1 = true;
    } else {
      this.check1 = false;
    }
    if (this.droppedItems1.length == 4) {
      this.disableReset = false;
    } else {
      this.disableReset = true;
    }
    this.ansJson[id] = this.droppedItems1[0]["id"];
  }

  onAnyDrop2(e: any, id) {
    this.droppedItems2.push(e.dragData);
    this.removeItem(e.dragData, this.optionArray);
    console.log("dropped items2", this.droppedItems2);
    if (this.droppedItems2.length == 1) {
      this.check2 = true;
    } else {
      this.check2 = false;
    }
    this.ansJson[id] = this.droppedItems2[0]["id"];
  }

  onAnyDrop3(e: any, id) {
    this.droppedItems3.push(e.dragData);
    this.removeItem(e.dragData, this.optionArray);
    console.log("dropped items3", this.droppedItems3);
    if (this.droppedItems3.length == 1) {
      this.check3 = true;
    } else {
      this.check3 = false;
    }
    this.ansJson[id] = this.droppedItems3[0]["id"];
  }

  onAnyDrop4(e: any, id) {
    this.droppedItems4.push(e.dragData);
    this.removeItem(e.dragData, this.optionArray);
    console.log("dropped items4", this.droppedItems4);
    if (this.droppedItems4.length == 1) {
      this.check4 = true;
    } else {
      this.check4 = false;
    }
    this.ansJson[id] = this.droppedItems4[0]["id"];
  }

  removeItem(item: any, list: Array<any>) {
    let index = list
      .map(function(e) {
        return e.name;
      })
      .indexOf(item.name);
    list.splice(index, 1);
  }

  next() {
    var dummy = {};
    for (let item in this.ansJson) {
      // console.log(item, this.ansJson[item])
    }
    this.options.forEach(element => {
      dummy[element.option] = element.ans;
    });

    this.rightFlag = true;

    if (Object.keys(dummy).length == Object.keys(this.ansJson).length) {
      for (let key in dummy) {
        if (dummy[key] == this.ansJson[key]) {
          continue;
        } else {
          this.rightFlag = false;
          break;
        }
      }
    } else {
      this.rightFlag = false;
    }

    this.rankModal.show();
    this.LanguageService.toShow();
    
  }

  ngDoCheck() {
   this.subFlagModule1 = parseInt(window.localStorage.getItem('subFlagModule1'));
   this.subFlagModule3 = parseInt(window.localStorage.getItem('subFlagModule3'));
    if (this.data.type == "multiple") {
      if (this.check1 && this.check2 && this.check3 && this.check4) {
        this.nextFlag = true;
        this.resetFlag = false;
      } else {
        this.nextFlag = false;
        this.resetFlag = true;
      }
    } else {
      if (
        this.check1 &&
        this.check2 &&
        this.check3 &&
        this.check4
      ) {
        this.nextFlag = true;
        this.resetFlag = false;
      } else {
        this.nextFlag = false;
        this.resetFlag = true;
      }
    }

    if (window.localStorage.getItem('mainFlagModule1') == '8' || window.localStorage.getItem('mainFlagModule1') == '10')
    {
      this.queCount = parseInt(window.localStorage.getItem('subFlagModule1'))
    }else if (window.localStorage.getItem('mainFlagModule3') == '12')
    {
      this.queCount = parseInt(window.localStorage.getItem('subFlagModule3'))
    }
  }

  rankConfirmNext() {
    this.rankModal.hide();
    this.LanguageService.toHide();
    this.sendAns.emit(this.ansJson);
  }
  reset() {
    this.nextFlag = false;
    this.resetFlag = false;
    this.ansJson = {};
    this.droppedItems1 = [];
    this.droppedItems2 = [];
    this.droppedItems3 = [];
    this.droppedItems4 = [];
    // this.droppedItems5 = []
    this.check1 = false;
    this.check2 = false;
    this.check3 = false;
    this.check4 = false;
    // this.check5 = false
    this.optionArray = [
      {
        id: "1",
        name: "मूर्त अनुभव:",
        type: "draggable"
      },
      {
        id: "2",
        name: "पूर्वानुभावाशी जोड:",
        type: "draggable"
      },
      {
        id: "3",
        name: "सूत्र शोधणे:",
        type: "draggable"
      },
      {
        id: "4",
        name: "तपासून पाहणे:",
        type: "draggable"
      }
    ];
  }

  singleonAnyDrop1(e: any,stmt) {
    this.droppedItems1.push(e.dragData);
    // this.removeItem(e.dragData, this.optionArray);
    console.log("dropped items", this.droppedItems1[0],  stmt);
    console.log("stmt",stmt)
    if (this.droppedItems1.length == 1) {
      this.check1 = true;
    } else {
      this.check1 = false;
    }
    if (this.droppedItems1.length == 4) {
      this.disableReset = false;
    } else {
      this.disableReset = true;
    }

    if (this.droppedItems1[0].option == stmt.option) {
      this.removeItem(e.dragData, this.optionArray);
    } else {
      this.toastr.error(this.translate.instant("Errors.wrongAns"));
      setTimeout(() => {
        this.droppedItems1 = [];
        this.check1 = false;
      }, 1000);
    }

    if (this.check1 && this.check2 && this.check3 && this.check4){
      this.toastr.success(this.translate.instant("Errors.rightAns"));
    }
  }

  singleonAnyDrop2(e: any,stmt) {
    this.droppedItems2.push(e.dragData);
    // this.removeItem(e.dragData, this.optionArray);
    console.log("dropped items2",  this.droppedItems2[0], stmt);
    if (this.droppedItems2.length == 1) {
      this.check2 = true;
    } else {
      this.check2 = false;
    }

    if (this.droppedItems2[0].option == stmt.option) {
      this.removeItem(e.dragData, this.optionArray);
    } else {
      this.toastr.error(this.translate.instant("Errors.wrongAns"));
      setTimeout(() => {
        this.droppedItems2 = [];
        this.check2 = false;
      }, 1000);
    }

    if (this.check1 && this.check2 && this.check3 && this.check4){
      this.toastr.success(this.translate.instant("Errors.rightAns"));
    }
  }

  singleonAnyDrop3(e: any,stmt) {
    this.droppedItems3.push(e.dragData);
    // this.removeItem(e.dragData, this.optionArray);
    console.log("dropped items3", this.droppedItems3[0], stmt);
    if (this.droppedItems3.length == 1) {
      this.check3 = true;
    } else {
      this.check3 = false;
    }

    if (
      this.droppedItems3[0].option == stmt.option
    ) {
      this.removeItem(e.dragData, this.optionArray);
    } else {
      this.toastr.error(this.translate.instant("Errors.wrongAns"));
      setTimeout(() => {
        this.droppedItems3 = [];
        this.check3 = false;
      }, 1000);
    }

    if (this.check1 && this.check2 && this.check3 && this.check4){
      this.toastr.success(this.translate.instant("Errors.rightAns"));
    }
  }

  singleonAnyDrop4(e: any,stmt) {
    this.droppedItems4.push(e.dragData);
    // this.removeItem(e.dragData, this.optionArray);
    console.log("dropped items4", this.droppedItems4[0], stmt);
    if (this.droppedItems4.length == 1) {
      this.check4 = true;
    } else {
      this.check4 = false;
    }

    if (this.droppedItems4[0].option == stmt.option) {
      this.removeItem(e.dragData, this.optionArray);
    } else {
      this.toastr.error(this.translate.instant("Errors.wrongAns"));
      setTimeout(() => {
        this.droppedItems4 = [];
        this.check4 = false;
      }, 1000);
    }

    if (this.check1 && this.check2 && this.check3 && this.check4){
      this.toastr.success(this.translate.instant("Errors.rightAns"));
    }
  }
  // singleonAnyDrop5(e: any, id) {
  //   this.droppedItems5.push(e.dragData);
  //   // this.removeItem(e.dragData, this.optionArray);
  //   console.log("dropped items4", this.droppedItems5);
  //   if (this.droppedItems5.length == 1) {
  //     this.check5 = true;
  //   } else {
  //     this.check5 = false;
  //   }
  //   this.ansJson[this.data[id].questionid] = this.droppedItems5[0]["id"];
  //   if (
  //     this.ansJson[this.data[id].questionid] ==
  //     this.singleDummy[this.data[id].questionid]
  //   ) {
  //     this.removeItem(e.dragData, this.optionArray);
  //   } else {
  //     this.toastr.error(this.translate.instant("Errors.wrongAns"));
  //     setTimeout(() => {
  //       this.droppedItems5 = [];
  //       this.check5 = false;
  //     }, 1000);
  //   }
  // }

  singlereset() {
    this.nextFlag = false;
    this.resetFlag = false;
    this.ansJson = {};
    this.droppedItems1 = [];
    this.droppedItems2 = [];
    this.droppedItems3 = [];
    this.droppedItems4 = [];
    this.droppedItems5 = [];
    this.check1 = false;
    this.check2 = false;
    this.check3 = false;
    this.check4 = false;
    this.check5 = false;
    // this.optionArray = [
    //   {
    //     id: "a",
    //     name: "प्रथम पातळी:",
    //     type: "draggable"
    //   },
    //   {
    //     id: "b",
    //     name: "द्वितीय पातळी:",
    //     type: "draggable"
    //   },
    //   {
    //     id: "c",
    //     name: "तृतीय पातळी:",
    //     type: "draggable"
    //   },
    //   {
    //     id: "d",
    //     name: "चतुर्थ पातळी:",
    //     type: "draggable"
    //   },
    //   {
    //     id: "e",
    //     name: "पाचवी पातळी:",
    //     type: "draggable"
    //   }
    // ];
    this.resetSingle();
  }

  shuffle(arra1) {
    var ctr = arra1.length, temp, index;
    // While there are elements in the array
    while (ctr > 0)
    {
      // Pick a random index
      index = Math.floor(Math.random() * ctr);
      // Decrease ctr by 1
      ctr--;
      // And swap the last element with it
      temp = arra1[ctr];
      arra1[ctr] = arra1[index];
      arra1[index] = temp;
    }
    console.log(arra1)
    return arra1;
  }

  resetSingle() {
    this.optionArray = [];
    var i = 0;
    this.options.forEach(element => {
      var jsonDummy = {};
      i++;
      var option = element.option;
      jsonDummy = JSON.parse(element.value);
      element.sub_que = jsonDummy["sub_que"];
      element.response = jsonDummy["response"];
      this.optionArray.push({
        name: jsonDummy["sub_que"],
        response: jsonDummy["response"],
        id: i,
        type: "draggable",
        option: option,
        rightAnswer: "rightAnswer" + i
      });
      console.log("jsonDummy:- ", this.optionArray);
    });
    this.shuffle(this.optionArray);
  }

  singlenext() {
    this.sendAns.emit(true);
  }
}
