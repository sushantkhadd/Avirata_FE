import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Module1Service } from './module1.service'
import { FullLayoutService } from 'src/app/layouts/full-layout.service';

@Component({
  selector: 'app-module1',
  templateUrl: './module1.component.html'
})
export class Module1Component implements OnInit {

  @ViewChild('staticImageModal') public staticImageModal: ModalDirective;
  @ViewChild('instructionModal') public instructionModal: ModalDirective;

  public mainFlagModule1 = parseInt(window.localStorage.getItem('mainFlagModule1'));
  public subFlagModule1 = parseInt(window.localStorage.getItem('subFlagModule1'));
  showCFU: boolean;
  download: boolean;
  passValues = {};
  finishJSONBody: any;
  startVideoEvent = true;
  showpdfFlag: boolean;
  constructor(public FullLayoutService: FullLayoutService, public LanguageService: LanguageService, public Module1Service: Module1Service, public router: Router, public LocalstoragedetailsService: LocalstoragedetailsService, public toastr: ToastsManager, vcr: ViewContainerRef, public translate: TranslateService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  public showVideoFlag; nextBtnFlag; passData = {}; passUrl; videoData = {}; urlArray = {}; lnk1; lnk2; flag; parentUrlJson = {}
  public statVideoFlag; thumb_title; vedioCompleteUrl;

  ngOnInit() {
    this.lnk1 = '';
    this.lnk2 = '';
    // this.urlArray["src1"] = "skGFDAhQrhE";
    // this.urlArray["src2"] = "opHKXAPIynA";
    this.urlArray['v_thumb'] = './../../assets/img/video-thumb.png';
    this.showVideoFlag=false;
    if (this.mainFlagModule1 == 1) {
      this.start()
    }else if (this.mainFlagModule1 > 1) {
      this.flag = 0;
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson1"));
      console.log("vcxxxx",urlJson)
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 1.1"
        );
        console.log("qWSS",index)
        var mainJson;
        mainJson = JSON.parse(urlJson["children"][index].url);
        console.log("hjbhjb",mainJson['1.1.1'])
        if (mainJson != null)
        {
          this.urlArray["src1"] = mainJson["1.1.1"];
          this.urlArray["src2"] = mainJson["1.1.2"];
        } else {
          this.mapJSON();
        }
      } else {
        this.mapJSON();
      }
    }
  }

  mapJSON() {
    console.log("mapJSON",this.lnk1, this.lnk2);
    this.urlArray['src1'] = this.lnk1
    this.urlArray['src2'] = this.lnk2
    }

  start() {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['event'] = 'start';
    this.apiCall(jsonBody, 'moduleonesingleurl/', 'start');
  }

  videoFinish(e) {
    if (e == true) {
      this.instructionModal.show();
      this.LanguageService.toShow();
      this.nextBtnFlag = true;
    }
  }

  nextvideo() {
    this.subFlagModule1 = this.subFlagModule1 + 1;
    window.localStorage.setItem('subFlagModule1', this.subFlagModule1.toString());
    this.instructionModal.hide();
    this.showVideoFlag=false;    
  }

  next() {
    var jsonBody = {};
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['event'] = 'finish';
    this.apiCall(jsonBody, 'moduleonesingleurl/', 'finish1');
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module1Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "start") {
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 0.1', window.localStorage.getItem('username'), 10);            
            this.passData['apiUrl'] = "moduleonesingleurl/";
            this.passData['videoUrl'] = data['data'].url;  
            if (this.subFlagModule1 == 2) {
              this.showCFU = false;
              this.passValues['url'] = data['data'].url;
              this.showVideoFlag = true;
            } else {

            }
            this.showVideoFlag = true;
            var current1 = [];
            current1 = JSON.parse(window.localStorage.getItem("currentJson1"));
            var index = current1["children"].findIndex(
              item => item.source == "module 0.1");
            //current1["children"][index].url = this.passUrl;

            window.localStorage.setItem("currentJson1", JSON.stringify(current1));

          } else if (fun == "finish1") {
            this.LanguageService.toHide();
            window.localStorage.setItem('uuid', data['data'].nextuuid)
            window.localStorage.setItem('mainFlagModule1', '2');
            window.localStorage.setItem('subFlagModule1', '1');
            window.localStorage.setItem('source', 'module 1.2');
            this.Module1Service.setLocalStorage1(1);
            var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module1.subMenu1-1'), "next": this.translate.instant('L2Module1Finish.subMenu1-2'), "nextRoute": "/modules/module1/Module1.2" }
            this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
          }
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }

  nextApiCall(fun){
    var jsonBody = {};
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['event'] = 'finish';
    this.Module1Service.apiCall(jsonBody, 'moduleonesingleurl/').subscribe(
      data => {
        if (data["status"] == true) {         
            window.localStorage.setItem('uuid', data['data'].nextuuid);
            this.start();
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }

  finishPDF(e) {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['event'] = 'finish';
    this.apiCall(jsonBody, 'moduleonesingleurl/', 'finish1');
  }

  showVideo(src, title,value) {    
    if (value == 1)
    {
      this.passData['videoUrl'] = src;
      this.thumb_title = title;
      this.flag = value;
    } else if (value == 2)
    {
      this.passValues["url"] = src;
      this.thumb_title = title;
      this.flag = value;
      // this.passValues["unlockView"] = "static";
    }
  
  }
}
