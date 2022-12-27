import { Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Module5Service } from './module5.service'
import { ToastsManager } from 'ng6-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-module5-18',
  templateUrl: './module5-18.component.html'
})
export class Module518Component implements OnInit {

  constructor(
    public LanguageService: LanguageService,
    public Module5Service: Module5Service,
    public toastr: ToastsManager,
    public translate: TranslateService,
    public router: Router,
    public LocalstoragedetailsService: LocalstoragedetailsService
  ) { }
  
  @ViewChild('confirmationModal') public confirmationModal: ModalDirective;
  @ViewChild('pdfModal') public pdfModal: ModalDirective;
  
  public finalCount;
  public imgUrl;
  passValues = {};
  public download;
  link;
  showCFU;
  apiUrl;
  public cfuQuestion = {};
  public startPdf;
  mainFlagModule5;
  subFlagModule5;
  finishJSONBody = {}; urlArray = {}; thumb_title; flag;
  private pdfUrl = environment.pdfUrl; submitFlag; errorMsgFlag={};
  pdf1; personId; userAnswer = {}; showLimit = {}; postWordCount = {}; zeroMsgFlag = {}
  public questionArray; que1; queId1; que2; queId2; que3; queId3; que4; queId4; que5; queId5; que6; queId6; que7; queId7; answer1; answer2; answer3; answer4; answer5; answer6; answer7;
  @ViewChild('assignForm') assignForm: NgForm; noHitFlag; 
  public inst = "तुम्ही स्वतः करिअर मार्गदर्शन केलेल्या ५ मुलांची नावे आणि त्यात तुम्हांला आलेले अनुभव आणि अडचणी लिहा.  त्यात  तुम्हांला अविरतचा कसा उपयोग झाला ते सविस्तर लिहा. हे लिहिण्यासाठी खालील आराखड्याचा वापर करा."  
  ""

  ngOnInit() {
    this.pdf1 =
      "https://s3-ap-southeast-1.amazonaws.com/maacpd/english/level1/module4/4.8_our+progress+card.pdf";
    this.startPdf = false;
    // this.noHitFlag = false;
    this.mainFlagModule5 = parseInt(
      window.localStorage.getItem("mainFlagModule5")
    );
    this.subFlagModule5 = parseInt(
      window.localStorage.getItem("subFlagModule5")
    );
    this.submitFlag = false;
    this.que1 = "";
    this.que2 = "";
    this.que3 = "";
    this.que4 = "";
    this.que5 = "";
    this.que6 = "";
    this.que7 = "";

    this.queId1 = "";
    this.queId2 = "";
    this.queId3 = "";
    this.queId4 = "";
    this.queId5 = "";
    this.queId6 = "";
    this.queId7 = "";

    this.answer1 = "";
    this.answer2 = "";
    this.answer3 = "";
    this.answer4 = "";
    this.answer5 = "";
    this.answer6 = "";
    this.answer7 = "";

    this.zeroMsgFlag['1'] = false;
    this.zeroMsgFlag['2'] = false;
    this.zeroMsgFlag['3'] = false;
    this.zeroMsgFlag['4'] = false;
    this.zeroMsgFlag['5'] = false;
    this.zeroMsgFlag['6'] = false;
    this.zeroMsgFlag['7'] = false;

    if (this.mainFlagModule5 == 18) {
        this.start1("");
    }
    if (this.mainFlagModule5 > 18) {
      this.flag = 0;
      this.showCFU = false;
      this.download = false;
      this.link = "";
      this.apiUrl = "/assets/jsonfile/module4_6.json";
      this.finalCount = 22;
      this.passValues["download"] = this.download;
      this.passValues["link"] = this.link;
      this.passValues["finalcount"] = this.finalCount;
      this.passValues["showcfu"] = this.showCFU;
      this.passValues["apiurl"] = this.apiUrl;
      this.passValues["unlockView"] = "static";
      var unlockJson = {};
      unlockJson = JSON.parse(window.localStorage.getItem("currentJson5"));
      if (unlockJson["children"].length > 0) {
        var index = unlockJson["children"].findIndex(
          item => item.source == "module 5.18"
        );
        if (unlockJson["children"][index].url != null) {
          var mainJson = JSON.parse(unlockJson["children"][index].url);
          this.urlArray["src1"] = mainJson["5.18.1"];
          this.urlArray["src2"] = mainJson["5.18.3"];
        }
      }
    }

    this.postWordCount['1'] = 0;
    this.postWordCount['2'] = 0;
    this.postWordCount['3'] = 0;
    this.postWordCount['4'] = 0;
    this.postWordCount['5'] = 0;
    this.postWordCount['6'] = 0;
    this.postWordCount['7'] = 0;
  }

  start1(val) {
    var jsonData = {}
    jsonData['submoduleid'] = window.localStorage.getItem("uuid");
    jsonData['event'] = 'start'
    jsonData['person'] = ''
    jsonData['useranswer'] = ''

    this.Module5Service.apiCall(
      jsonData,
      "modulefivepersonsinfo/"
    ).subscribe(
      data => {
        if (data["message"] == "ok" || data["message"] == "submodule started") {
          console.log("data", data)
          this.questionArray = data['data'].questionlist;
          this.noHitFlag = true;
          console.log('questions', this.questionArray)
          this.que1 = this.questionArray[0].question;
          this.queId1 = this.questionArray[0].questionid;
          this.que2 = this.questionArray[1].question;
          this.queId2 = this.questionArray[1].questionid;
          this.que3 = this.questionArray[2].question;
          this.queId3 = this.questionArray[2].questionid;
          this.que4 = this.questionArray[3].question;
          this.queId4 = this.questionArray[3].questionid;
          this.que5 = this.questionArray[4].question;
          this.queId5 = this.questionArray[4].questionid;
          this.que6 = this.questionArray[5].question;
          this.queId6 = this.questionArray[5].questionid;
          this.que7 = this.questionArray[6].question;
          this.queId7 = this.questionArray[6].questionid;
          if (data['data'].person1 == null || data['data'].person1 == "" || data['data'].person1 == undefined) {
            this.personId = 1
          } else if (data['data'].person2 == null || data['data'].person2 == "" || data['data'].person2 == undefined) {
            this.personId = 2
          } else if (data['data'].person3 == null || data['data'].person3 == "" || data['data'].person3 == undefined) {
            this.personId = 3
          } else if (data['data'].person4 == null || data['data'].person4 == "" || data['data'].person4 == undefined) {
            this.personId = 4
          } else if (data['data'].person5 == null || data['data'].person5 == "" || data['data'].person5 == undefined) {
            this.personId = 5
          } else {
            this.personId = 5
          }

          if (val != "" && val != undefined && val != null) {

          }
          else {
            window.localStorage.setItem("personId", this.personId)
          }
          this.clearField();
          if( window.localStorage.getItem("personId")=="6"){
            this.noHitFlag = false;
          }
          console.log("param")
          if ((data['data'].person1 != null && data['data'].person1 != "" && data['data'].person1 != undefined) && window.localStorage.getItem("personId") == "1") {
            this.answer1 = data['data'].person1[this.queId1]
            this.answer2 = data['data'].person1[this.queId2]
            this.answer3 = data['data'].person1[this.queId3]
            this.answer4 = data['data'].person1[this.queId4]
            this.answer5 = data['data'].person1[this.queId5]
            this.answer6 = data['data'].person1[this.queId6]
            this.answer7 = data['data'].person1[this.queId7]

          }
          if ((data['data'].person2 != null && data['data'].person2 != "" && data['data'].person2 != undefined) && window.localStorage.getItem("personId") == "2") {
            this.answer1 = data['data'].person2[this.queId1]
            this.answer2 = data['data'].person2[this.queId2]
            this.answer3 = data['data'].person2[this.queId3]
            this.answer4 = data['data'].person2[this.queId4]
            this.answer5 = data['data'].person2[this.queId5]
            this.answer6 = data['data'].person2[this.queId6]
            this.answer7 = data['data'].person2[this.queId7]

          }
          if ((data['data'].person3 != null && data['data'].person3 != "" && data['data'].person3 != undefined) && window.localStorage.getItem("personId") == "3") {
            this.answer1 = data['data'].person3[this.queId1]
            this.answer2 = data['data'].person3[this.queId2]
            this.answer3 = data['data'].person3[this.queId3]
            this.answer4 = data['data'].person3[this.queId4]
            this.answer5 = data['data'].person3[this.queId5]
            this.answer6 = data['data'].person3[this.queId6]
            this.answer7 = data['data'].person3[this.queId7]

          }
          if ((data['data'].person4 != null && data['data'].person4 != "" && data['data'].person4 != undefined) && window.localStorage.getItem("personId") == "4") {
            this.answer1 = data['data'].person4[this.queId1]
            this.answer2 = data['data'].person4[this.queId2]
            this.answer3 = data['data'].person4[this.queId3]
            this.answer4 = data['data'].person4[this.queId4]
            this.answer5 = data['data'].person4[this.queId5]
            this.answer6 = data['data'].person4[this.queId6]
            this.answer7 = data['data'].person4[this.queId7]

          }
          if ((data['data'].person5 != null && data['data'].person5 != "" && data['data'].person5 != undefined) && window.localStorage.getItem("personId") == "5") {
            this.answer1 = data['data'].person5[this.queId1]
            this.answer2 = data['data'].person5[this.queId2]
            this.answer3 = data['data'].person5[this.queId3]
            this.answer4 = data['data'].person5[this.queId4]
            this.answer5 = data['data'].person5[this.queId5]
            this.answer6 = data['data'].person5[this.queId6]
            this.answer7 = data['data'].person5[this.queId7]

          }
          // if(this.assignForm.value !=null && this.assignForm.value !="" && this.assignForm.value !=undefined){
          // this.tempForm = this.assignForm.value;
          // }
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
      );
  }

  next(assignForm: NgForm) {
    this.zeroMsgFlag['5'] = false;
    this.zeroMsgFlag['6'] = false;
    this.zeroMsgFlag['7'] = false;
    this.noHitFlag = false;

    if (window.localStorage.getItem("personId") == "5") {
      this.confirmationModal.show();
      this.LanguageService.toShow();
      this.personId=5;
      this.noHitFlag = false;
    }

    if (!assignForm.dirty) {
      console.log("No hit.....")
      this.personId = parseInt(window.localStorage.getItem("personId"))
      window.localStorage.setItem("personId", JSON.stringify(this.personId + 1))
      this.start1(this.personId)
    }
    else {
      console.log("hit")
      this.sendAnswer("next")
      setTimeout(() => {
        this.start1(this.personId)
      }, 300);
    }
  }

  confirmationModalHide() {
    window.localStorage.setItem("personId", "5")
    this.confirmationModal.hide();
    this.LanguageService.toHide();
    this.start1("");
  }

  finish1() {
    this.confirmationModal.hide();
    this.LanguageService.toHide();
    var jsonData = {}
    jsonData['submoduleid'] = window.localStorage.getItem("uuid");
    jsonData['event'] = 'finish'
    jsonData['person'] = ""
    jsonData['useranswer'] = ""
    this.Module5Service.apiCall(
      jsonData,
      "modulefivepersonsinfo/"
    ).subscribe(
      data => {
        if (data["message"] == "submodule finish") {
          this.subFlagModule5 = 3;
          window.localStorage.setItem('subFlagModule5', '3');
          window.localStorage.setItem("uuid", data['data'].nextuuid)
          this.startPdf = false;
          // this.start();
          //   this.mainFlagModule5 = 22;
          //   window.localStorage.setItem('mainFlagModule5', '22');
          //   window.localStorage.setItem('subFlagModule5', '1');
          //   window.localStorage.setItem('source', 'module 5.22.1');
          //   var obj = {
          //   "type": "submodule",
          //   "route": true,
          //   "current": this.translate.instant('L2Module5.subMenu5-21'),
          //   "next": this.translate.instant('L2Module5Finish.subMenu5-22'),
          //   "nextRoute": "/modules/module5/Module5.22"
          // }
          // this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
          // this.Module5Service.setLocalStorage5(22);
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
      );
  }

  clearField() {
    this.answer1 = "";
    this.answer2 = "";
    this.answer3 = "";
    this.answer4 = "";
    this.answer5 = "";
    this.answer6 = "";
    this.answer7 = "";
  }

  back(assignForm: NgForm) {
    this.zeroMsgFlag['1'] = false;
    this.zeroMsgFlag['2'] = false;
    this.zeroMsgFlag['3'] = false;
    this.zeroMsgFlag['4'] = false;
    this.zeroMsgFlag['5'] = false;
    this.zeroMsgFlag['6'] = false;
    this.zeroMsgFlag['7'] = false;
    
    // if(this.noHitFlag == false){
    //   this.showLimit['1']=true;
    //   this.showLimit['2']=true;
    //   this.showLimit['3']=true;
    //   this.showLimit['4']=true;
    //   this.showLimit['5']=true;
    //   this.showLimit['6']=true;
    //   this.showLimit['7']=true;
    // }
    
    this.noHitFlag = false;
    console.log("postWord",this.postWordCount['5'],this.showLimit['5'],this.postWordCount['6'],this.showLimit['6'],this.postWordCount['7'],this.showLimit['7'])
    if (assignForm.dirty == false) {
      console.log("No hit")
      this.personId = parseInt(window.localStorage.getItem("personId"))
      window.localStorage.setItem("personId", JSON.stringify(this.personId - 1))
      this.start1(this.personId);
    }
    else {
      if((this.postWordCount['5']<5 || this.postWordCount['5']>150) || (this.postWordCount['6']<5 || this.postWordCount['6']>150) || (this.postWordCount['7']<5 || this.postWordCount['7']>150)){
        console.log("No hit11111111111111")
        this.personId = parseInt(window.localStorage.getItem("personId"))
        window.localStorage.setItem("personId", JSON.stringify(this.personId - 1))
        this.start1(this.personId);
      }
      else{
      console.log("hit")
      this.sendAnswer("back")
      setTimeout(() => {
        this.start1(this.personId)
      }, 300);
    }
    }

  }

  hasNull(target) {
    for (var member in target) {
      if (target[member] == "" || target[member] == null || target[member] == undefined)
        return true;
    }
    return false;
  }

  ngDoCheck() {
    this.personId = window.localStorage.getItem("personId")

    // if (this.answer1) {
    //   this.postWordCount['1'] = this.answer1.trim().split(' ').length;
    // }
    // if (this.answer2) {
    //   this.postWordCount['2'] = this.answer2.trim().split(' ').length;
    // }
    // if (this.answer3) {
    //   this.postWordCount['3'] = this.answer3.trim().split(' ').length;
    // }
    if (this.answer5) {
      this.postWordCount['5'] = this.answer5.trim().split(/\s+/).length;
      if(this.postWordCount['5']>150 || this.postWordCount['5']<5){
        this.errorMsgFlag['5']=true;
      } else{
        this.errorMsgFlag['5']=false;
      }
      if(this.postWordCount['5']>150 || this.postWordCount['5']==0){
        this.showLimit['5'] = false;
      } else if(this.postWordCount['5'] >=5){
        this.showLimit['5'] = true;
      }
    }
    if (this.answer6) {
      this.postWordCount['6'] = this.answer6.trim().split(/\s+/).length;
      if(this.postWordCount['6']>150 || this.postWordCount['6']<5){
        this.errorMsgFlag['6']=true;
      } else{
        this.errorMsgFlag['6']=false;
      }
      if(this.postWordCount['6']>150 || this.postWordCount['6']==0){
        this.showLimit['6'] = false;
      } else if(this.postWordCount['6'] >=5){
        this.showLimit['6'] = true;
      }
    }
    if (this.answer7) {
      this.postWordCount['7'] = this.answer7.trim().split(/\s+/).length;
      if(this.postWordCount['7']>150 || this.postWordCount['7']<5){
        this.errorMsgFlag['7']=true;
      } else{
        this.errorMsgFlag['7']=false;
      }
      if(this.postWordCount['7']>150 || this.postWordCount['7']==0){
        this.showLimit['7'] = false;
      } else if(this.postWordCount['7'] >=5){
        this.showLimit['7'] = true;
      }
    }

    if (this.answer1 != "" && this.answer1 != undefined && this.answer1 != null ||
      this.answer2 != "" && this.answer2 != undefined && this.answer2 != null ||
      this.answer3 != "" && this.answer3 != undefined && this.answer3 != null ||
      this.answer4 != "" && this.answer4 != undefined && this.answer4 != null ||
      this.answer5 != "" && this.answer5 != undefined && this.answer5 != null ||
      this.answer6 != "" && this.answer6 != undefined && this.answer6 != null ||
      this.answer7 != "" && this.answer7 != undefined && this.answer7 != null) {
      if (this.answer1.trim().length == 0 ||
        this.answer2.trim().length == 0 ||
        this.answer3.trim().length == 0 ||
        this.answer4.trim().length == 0 ||
        this.answer5.trim().length == 0 ||
        this.answer6.trim().length == 0 ||
        this.answer7.trim().length == 0) {
        this.submitFlag = true;
      } 
      // else if (this.postWordCount['1'] > 150 || this.postWordCount['1'] < 5) {
      //   this.submitFlag = true;
      // } else if (this.postWordCount['2'] > 150 || this.postWordCount['2'] < 5) {
      //   this.submitFlag = true;
      // } else if (this.postWordCount['3'] > 150 || this.postWordCount['3'] < 5) {
      //   this.submitFlag = true;
      // } 
      else if (this.postWordCount['5'] > 150 || this.postWordCount['5'] < 5) {
        this.submitFlag = true;
      } else if (this.postWordCount['6'] > 150 || this.postWordCount['6'] < 5) {
        this.submitFlag = true;
      } else if (this.postWordCount['7'] > 150 || this.postWordCount['7'] < 5) {
        this.submitFlag = true;
      } else {
        this.submitFlag = false;
      }
    }

    // if (this.answer1 == "" || this.answer1 == null || this.answer1 == undefined) {
    //   this.postWordCount['1'] = 0;
    // }
    // if (this.answer2 == "" || this.answer2 == null || this.answer2 == undefined) {
    //   this.postWordCount['2'] = 0;
    // }
    // if (this.answer3 == "" || this.answer3 == null || this.answer3 == undefined) {
    //   this.postWordCount['3'] = 0;
    // }
    // if (this.answer4 == "" || this.answer4 == null || this.answer4 == undefined) {
    //   this.postWordCount['4'] = 0;
    // }
    if (this.answer5 == "" || this.answer5 == null || this.answer5 == undefined) {
      this.postWordCount['5'] = 0;
    }
    if (this.answer6 == "" || this.answer6 == null || this.answer6 == undefined) {
      this.postWordCount['6'] = 0;
    }
    if (this.answer7 == "" || this.answer7 == null || this.answer7 == undefined) {
      this.postWordCount['7'] = 0;
    }

  }

  sendAnswer(val) {
    this.userAnswer[this.queId1] = this.answer1.trim();
    this.userAnswer[this.queId2] = this.answer2.trim();
    this.userAnswer[this.queId3] = this.answer3.trim();
    this.userAnswer[this.queId4] = this.answer4.trim();
    this.userAnswer[this.queId5] = this.answer5.trim();
    this.userAnswer[this.queId6] = this.answer6.trim();
    this.userAnswer[this.queId7] = this.answer7.trim();
    console.log("userAnswer", this.userAnswer)
    var jsonData = {}
    jsonData['submoduleid'] = window.localStorage.getItem("uuid");
    jsonData['event'] = 'answer'
    jsonData['person'] = window.localStorage.getItem("personId");
    jsonData['useranswer'] = this.userAnswer;
    this.Module5Service.apiCall(
      jsonData,
      "modulefivepersonsinfo/"
    ).subscribe(
      data => {
        if (data["message"] == "your answer stored") {
          this.clearField();
          this.personId = parseInt(window.localStorage.getItem("personId"))
          if (val == "next") {
            window.localStorage.setItem("personId", JSON.stringify(this.personId + 1))
          }
          else if (val == "back") {
            window.localStorage.setItem("personId", JSON.stringify(this.personId - 1))
          }
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
      );
  }

  pdfModalHide() {
    this.pdfModal.hide();
    this.LanguageService.toHide();
    this.startPdf = false;
  }

  showPdf() {
    this.passValues["unlockView"] = "static";
    this.startPdf = true;
    var unlockJson = {};
    unlockJson = JSON.parse(window.localStorage.getItem("currentJson5"));
    if (unlockJson["children"].length > 0) {
      var index = unlockJson["children"].findIndex(
        item => item.source == "module 5.21"
      );
      if (unlockJson["children"][index].url != null) {
        var mainJson = JSON.parse(unlockJson["children"][index].url);
        this.urlArray["src1"] = mainJson["5.21.1"];
      }
    }
    this.passValues['url'] = this.urlArray["src1"]
    this.pdfModal.show();
    this.LanguageService.toShow();
  }


  numberOnly(event) {
    const charCode = (event.which) ? event.which : event.keyCode;
    console.log(event)
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

  showVideo(src, title, value) {
    // this.staticImageModal.show();
    // this.statVideoFlag = true;
    // this.statImageFlag = false;
    if (value == 1) {
      this.passValues['url'] = src;
      this.thumb_title = title;
      this.flag = value;
    } else if (value == 2) {
      this.passValues['url'] = src;
      this.thumb_title = title;
      this.flag = value;
    }
  }

  handleInput(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  }
}
