import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FullLayoutService } from 'src/app/layouts/full-layout.service';
import { LanguageService } from 'src/app/language.service';
import { Module5Service } from './module5.service';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { LocalstoragedetailsService } from 'src/app/services/localstoragedetails.service';
import { environment } from 'src/environments/environment';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: "app-module5-17",
  templateUrl: "./module5-17.component.html"
})
export class Module517Component implements OnInit {

  @ViewChild('staticImageModal') public staticImageModal: ModalDirective;
  @ViewChild('instructionModal') public instructionModal: ModalDirective;

  public mainFlagModule5 = parseInt(window.localStorage.getItem('mainFlagModule5'));
  public subFlagModule5 = parseInt(window.localStorage.getItem('subFlagModule5'));

  download: boolean;
  passValues = {};
  finishJSONBody: any;
  startVideoEvent = true;
  showpdfFlag: boolean;
  showPart1Flag: boolean;
  apiEndStart: string;
  apiEndSendAns: string;
  apiEndFinish: string;
  constructor(public FullLayoutService: FullLayoutService, public LanguageService: LanguageService, public Module5Service: Module5Service, public router: Router, public LocalstoragedetailsService: LocalstoragedetailsService, public toastr: ToastsManager, vcr: ViewContainerRef, public translate: TranslateService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  public showVideoFlag; nextBtnFlag; passData = {}; passUrl; videoData = {}; urlArray = {}; lnk1; lnk2; flag; parentUrlJson = {}
  public statVideoFlag; thumb_title; vedioCompleteUrl;

  ngOnInit() {
    this.lnk1 = ''
    this.lnk2 = ''
    this.urlArray["src1"] = "skGFDAhQrhE";
    this.urlArray["src2"] = "opHKXAPIynA";
    this.urlArray['v_thumb'] = './../../assets/img/video-thumb.png';
    this.showVideoFlag = false
    if (this.mainFlagModule5 == 17) {
      if(window.localStorage.getItem('subFlagModule5') == '1'){
        this.start()
      }
      
    } else if (this.mainFlagModule5 > 17) {
      this.flag = 0;
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson5"));
      console.log("vcxxxx", urlJson)
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 5.17"
        );
        console.log("qWSS", index)
        var mainJson;
        mainJson = JSON.parse(urlJson["children"][index].url);
        if (mainJson != null) {
          this.urlArray["src1"] = mainJson["0.3.1"];
          this.urlArray["src2"] = mainJson["0.3.2"];
        } else {
          this.mapJSON();
        }
      } else {
        this.mapJSON();
      }
    }
  }

  mapJSON() {
    this.urlArray['src1'] = this.lnk1
    this.urlArray['src2'] = this.lnk2
  }

  start() {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'start'
    this.apiCall(jsonBody, 'modulefivesingleurl/', 'start')
  }

  videoFinish(e) {
    if (e == true) {
      this.instructionModal.show()
      this.LanguageService.toShow();
      this.nextBtnFlag = true
    }
  }

  nextvideo() {
    this.subFlagModule5 = this.subFlagModule5 + 1
    window.localStorage.setItem('subFlagModule5', this.subFlagModule5.toString());
    this.instructionModal.hide();
    this.showVideoFlag = false;
    this.nextApiCall();
  }

  next() {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'finish'
    this.apiCall(jsonBody, 'modulefivesingleurl/', 'finish1')
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.showVideoFlag = false
    this.Module5Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "start") {
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 5.17', window.localStorage.getItem('username'), 10);
            this.passData['apiUrl'] = "modulefivesingleurl/";
            this.passData['videoUrl'] = data['data'].url;           
            this.showVideoFlag = true
            var current0 = [];
            current0 = JSON.parse(window.localStorage.getItem("currentJson5"));
            var index = current0["children"].findIndex(
            item => item.source == "module 5.8");
            current0["children"][index].url = this.passUrl;
            window.localStorage.setItem("currentJson5", JSON.stringify(current0));

          } else if (fun == "finish1") {
            this.LanguageService.toHide();
            window.localStorage.setItem('uuid', data['data'].nextuuid)
            window.localStorage.setItem('mainFlagModule5', '9');
            window.localStorage.setItem('subFlagModule5', '1');
            window.localStorage.setItem('source', 'module 5.9');
            this.Module5Service.setLocalStorage5(9);
            var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module5.subMenu5-9'), "next": this.translate.instant('L2Module5Finish.subMenu5-9'), "nextRoute": "/modules/module5/Module5.9" }
            this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
          }
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }

  nextApiCall() {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'finish'
    this.Module5Service.apiCall(jsonBody, 'modulefivesingleurl/').subscribe(
      data => {
        if (data["status"] == true) {
          window.localStorage.setItem('uuid', data['data'].nextuuid)
          // this.start()
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }
  
  saveAnswer(e) {
    this.subFlagModule5 = this.subFlagModule5 + 1;    
    window.localStorage.setItem('subFlagModule5', this.subFlagModule5.toString());
    if (e == "finish") {
    if (this.subFlagModule5 == 2 || this.subFlagModule5 == 4 || this.subFlagModule5 >= 6) {      
        this.showPart1Flag = false;
        this.start1();
      }else{
        this.showPart1Flag = false;
        this.start2();
      }
    } else {
      if (this.subFlagModule5 == 6) {
        this.showPart1Flag = false;
        this.start1();
      }
    }


  }

  start1() {
    console.log("dsshfjds")
    var jsonData = {}
    jsonData['submoduleid'] = window.localStorage.getItem('uuid')
    jsonData['event'] = "start"
    jsonData["useranswer"] = "";

    this.showPart1Flag = true;
    this.apiEndStart = 'modulefivecmcq/';
    this.apiEndSendAns = 'modulefivecmcq/';
    this.apiEndFinish = 'modulefivecmcq/';
    // this.startJson['examtype'] = window.localStorage.getItem('uuid');

    this.passData['start'] = this.apiEndStart;
    this.passData['answer'] = this.apiEndSendAns;
    this.passData['finish'] = this.apiEndFinish;
    this.passData['jsonData'] = jsonData;
    this.LanguageService.googleEventTrack('L3SubmoduleStatus',
      'Module 5.17', window.localStorage.getItem('username'), 10);
  }

  start2() {
    var jsonData = {}
    jsonData['submoduleid'] = window.localStorage.getItem('uuid')
    jsonData['event'] = "start"
    jsonData["useranswer"] = "";

    this.showPart1Flag = true;
    this.apiEndStart = 'modulefive_return_answer/';
    this.apiEndSendAns = 'modulefive_return_answer/';
    this.apiEndFinish = 'modulefive_return_answer/';
    // this.startJson['examtype'] = window.localStorage.getItem('uuid');

    this.passData['start'] = this.apiEndStart;
    this.passData['answer'] = this.apiEndSendAns;
    this.passData['finish'] = this.apiEndFinish;
    this.passData['jsonData'] = jsonData;
  }
  showVideo(src, title, value) {
    if (value == 1) {
      this.passData['videoUrl'] = src;
      this.thumb_title = title;
      this.flag = value;
    } else if (value == 2) {
      this.passValues["url"] = src;
      this.thumb_title = title;
      this.flag = value;
      this.passValues["unlockView"] = "static";
    }

  }
}
