import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Module3Service} from './module3.service'
import { FullLayoutService} from '../../layouts/full-layout.service'

@Component({
  selector: 'app-module3',
  templateUrl: './module3.component.html'
})
export class Module3Component implements OnInit {
  @ViewChild('instructionModal') public instructionModal: ModalDirective;
  public mainFlagModule3 = parseInt(window.localStorage.getItem('mainFlagModule3'));
  public subFlagModule3 = parseInt(window.localStorage.getItem('subFlagModule3'));
  constructor(public FullLayoutService: FullLayoutService, public LanguageService: LanguageService, public Module3Service: Module3Service, public router: Router, public LocalstoragedetailsService: LocalstoragedetailsService, public toastr: ToastsManager, vcr: ViewContainerRef, public translate: TranslateService) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  public jsonData; queCount = 0; ansJson = {}; data; showAnswer; passFlags = {}; saveData; showInst; flag; urlArray = {}; thumb_title;
  public dummy; deleteAdd = []; nextBtnFlag; passData = {}; showVideoFlag; passUrl; startFlag;
  ngOnInit() {
    this.passUrl = "6hO_xfdRq1g";
    this.showVideoFlag = false
    this.nextBtnFlag = false
    this.startFlag = false;
    if (this.mainFlagModule3 == 1) {
      this.startFlag = true;
      if (this.subFlagModule3 == 1) {
        this.start()
      } else
        if (this.subFlagModule3 == 2) {
          this.showInst = true
          this.start1()
        }
    } else if (this.mainFlagModule3 > 1) {
      this.passData['apiUrl'] = "";
      this.passData['status'] = false;  //first time call
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson3"));
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 3.1"
        );
        if (urlJson["children"][index].url != null) {
          var mainJson;
          mainJson = JSON.parse(urlJson["children"][index].url);
          this.passData["videoUrl"] = mainJson["3.1.1"];
        }
      }
    }
  }

  start() {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'start'
    this.apiCall(jsonBody, 'modulethreesingleurl/', 'start')
  }
  videoFinish(e) {
    if (e == true) {
      this.instructionModal.show()
      this.LanguageService.toShow();
      this.nextBtnFlag = true
    }
  }
  next() {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'finish'
    this.apiCall(jsonBody, 'modulethreesingleurl/', 'finish1')
  }

  start1() {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['useranswer'] = ''
    jsonBody['event'] = 'start'
    this.apiCall(jsonBody, 'modulethreemcq/', 'start1')
  }

  getAnswer(e) {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['useranswer'] = e
    // jsonBody['questionid'] = (this.data.questionid).toString()
    jsonBody['event'] = "answer"
    // console.log("json: ",jsonBody)
    this.apiCall(jsonBody, 'modulethreemcq/', 'sendAns')
    // }
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module3Service.apiCall(jsonBody, apiUrl)
      .subscribe(
      data => {
        if (fun == 'start') {
          this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 3.1', window.localStorage.getItem('username'), 10);
          this.passData['apiUrl'] = "modulethreesingleurl/";
          this.passData['videoUrl'] = data['data'].url;
          this.showVideoFlag = true
          this.passUrl = data['data'].url;
          var url = {}
          url['3.1.1'] = this.passUrl;
          var current3 = []
          current3 = JSON.parse(window.localStorage.getItem('currentJson3'))
          var index = current3['children'].findIndex(item => item.source == 'module 3.1');
          current3["children"][index].url = JSON.stringify(url);
          console.log("FINISH ", current3)
          window.localStorage.setItem('currentJson3', JSON.stringify(current3))
        } if (fun == 'finish1') {
          this.instructionModal.hide()
          this.LanguageService.toHide();
          this.showVideoFlag = false
          window.localStorage.setItem('uuid', data['data'].nextuuid)
          this.subFlagModule3 = this.subFlagModule3 + 1
          window.localStorage.setItem('subFlagModule3', this.subFlagModule3.toString())
          this.start1()
        }
        if (fun == "start1") {
          this.showAnswer = true;
          this.saveData = true;
          this.passFlags['saveData'] = this.saveData;
          this.passFlags['showAnswer'] = this.showAnswer;
          this.passFlags['questionType'] = "mcqTextOption";
          this.jsonData = data['data'].questionlist
          this.data = this.jsonData;

          this.dummy = this.jsonData

          for (var rec in this.dummy) {
            if (this.dummy[rec].answer == null || this.dummy[rec].answer == "") {
              this.deleteAdd.push(this.dummy[rec])
            }
          }
          this.dummy = []
          this.dummy = this.deleteAdd
          this.data = this.dummy[this.queCount]
          console.log("quec",this.queCount)
          this.queCount = 1;
          if(window.localStorage.getItem("source") == "module 3.1.2.1" || window.localStorage.getItem("source") == "module 3.1.2" || window.localStorage.getItem("source") == "module 3.1.2"){
            this.queCount = 1;
          }
          else if(window.localStorage.getItem("source") == "module 3.1.2.2"){
            this.queCount = 2;
          }
          else if(window.localStorage.getItem("source") == "module 3.1.2.3"){
            this.queCount = 3;
          }
          else if(window.localStorage.getItem("source") == "module 3.1.2.4"){
            this.queCount = 4;
          }
          else if(window.localStorage.getItem("source") == "module 3.1.2.5"){
            this.queCount = 5;
          }
          else if(window.localStorage.getItem("source") == "module 3.1.2.6"){
            this.queCount = 6;
          }
          else if(window.localStorage.getItem("source") == "module 3.1.2.7"){
            this.queCount = 7;
          }
          else if(window.localStorage.getItem("source") == "module 3.1.2.8"){
            this.queCount = 8;
          }
          // for (var rec in this.dummy) {
          //   if (this.dummy[rec].answer != null) {
          //     this.deleteAdd.push(rec)
          //     // delete this.dummy[rec]
          //     // this.dummy.splice(this.dummy[rec], 1)
          //     //   this.dummy=rec
          //     //   index ++ ;
          //   }
          // }

          // for (var i = 0; i < this.deleteAdd.length; i++) {
          //   this.dummy.splice(this.dummy[this.deleteAdd[i]], 1)
          // }
          // this.data = this.dummy[this.queCount]

          var index;

          this.data.options.forEach(element => {
            if (element.value == null) {
              index = this.data.options.indexOf(element)
              this.data.options.splice(index, 1)
            }
          });
          this.showInst = false
        }
        if (fun == "sendAns") {
          if (data['message'] == 'your answer stored' || data['message'] == 'your answer stored next question and uuid is') {
            this.queCount = this.queCount + 1
            window.localStorage.setItem('uuid', data['data'].nextuuid)
            this.showAnswer = true;
            this.saveData = true;
            this.passFlags['saveData'] = this.saveData;
            this.passFlags['showAnswer'] = this.showAnswer;
            this.passFlags['questionType'] = "mcqTextOption";
            this.jsonData = data['data'].questionlist[0]
            this.data = this.jsonData;
            console.log("MY DATA ", this.data,this.queCount)
            if(this.queCount==2){
              window.localStorage.setItem('source', "module 3.1.2.2")
            }
            else if(this.queCount==3){
              window.localStorage.setItem('source', "module 3.1.2.3")
            }
            else if(this.queCount==4){
              window.localStorage.setItem('source', "module 3.1.2.4")
            }
            else if(this.queCount==5){
              window.localStorage.setItem('source', "module 3.1.2.5")
            }
            else if(this.queCount==6){
              window.localStorage.setItem('source', "module 3.1.2.6")
            }
            else if(this.queCount==7){
              window.localStorage.setItem('source', "module 3.1.2.7")
            }
            else if(this.queCount==8){
              window.localStorage.setItem('source', "module 3.1.2.8")
            }
          } else if (data['message'] == 'exam finish' || data['message'] == 'submodule finish')
          {
            this.showVideoFlag = false;
            window.localStorage.setItem('uuid', data['data'].nextuuid)
            var current3 = [];
            current3 = JSON.parse(window.localStorage.getItem("currentJson3"));
            var index = current3["children"].findIndex(
              item => item.source == "module 3.1");
            var moduleJson = current3["children"][index]
            if(moduleJson["children"].length !=0){
            var index1 = moduleJson["children"].findIndex(
            item => item.source == "module 3.1.1");
            var parentUrls = {}
            if(moduleJson["children"][index1].url !="" && moduleJson["children"][index1].url !=null && moduleJson["children"][index1].url !=undefined){
            parentUrls['3.1.1'] = moduleJson["children"][index1].url;
            current3["children"][index].url = JSON.stringify(parentUrls);
            }
            window.localStorage.setItem("currentJson3", JSON.stringify(current3));
          }
            this.mainFlagModule3 = 2;
            this.subFlagModule3 = 1;
            window.localStorage.setItem('mainFlagModule3', '2');
            window.localStorage.setItem('subFlagModule3', '1');
            this.Module3Service.setLocalStorage3(2);
            var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module3.subMenu3-1'), "next": this.translate.instant('L2Module3Finish.subMenu3-2'), "nextRoute": "/modules/module3/Module3.2" }
            this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
          }
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      });
  }
}
