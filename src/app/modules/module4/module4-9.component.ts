import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Module4Service } from './module4.service'
import { FullLayoutService } from '../../layouts/full-layout.service'
import { ModalDirective } from 'ngx-bootstrap';
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'app-module4-9',
  templateUrl: './module4-9.component.html'
})
export class Module49Component implements OnInit {

  @ViewChild('staticImageModal') public staticImageModal: ModalDirective;
  @ViewChild('instructionModal') public instructionModal: ModalDirective;

  public mainFlagModule4 = parseInt(
    window.localStorage.getItem("mainFlagModule4")
  );
  public subFlagModule4 = parseInt(
    window.localStorage.getItem("subFlagModule4")
  )

  public showVideoFlag; nextBtnFlag; passData = {}; passUrl; videoData = {}; urlArray = {}; lnk1; lnk2; flag; parentUrlJson = {}; playVideo; statVideoFlag; thumb_title; vedioCompleteUrl;
  showCFU: boolean; download: boolean; passValues = {}; finishJSONBody: any; startVideoEvent;
  showpdfFlag: boolean; showVideoCFU; currentSource;

  constructor(public LanguageService: LanguageService, public Module4Service: Module4Service, public router: Router, public LocalstoragedetailsService: LocalstoragedetailsService, public toastr: ToastsManager, vcr: ViewContainerRef, public translate: TranslateService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.lnk1 = '';
    this.lnk2 = '';
    this.urlArray["src1"] = "skGFDAhQrhE";
    this.urlArray["src2"] = "opHKXAPIynA";
    this.urlArray['v_thumb'] = './../../assets/img/video-thumb.png';
    this.showVideoFlag = false;
    if (this.mainFlagModule4 == 9) {
      if (this.subFlagModule4 == 1) {
        this.start();
      }
    } else if (this.mainFlagModule4 > 9) {
      this.flag = 0;
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson4"));
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 4.9"
        );
        if (urlJson["children"][index].url != null) {
          var mainJson;
          mainJson = JSON.parse(urlJson["children"][index].url);
          this.urlArray["src1"] = mainJson["4.9.1"];
          this.urlArray["src2"] = mainJson["4.9.2"];
        } else {
          this.mapJSON();
          console.log('map json', this.mapJSON);
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

  showVideo(src, title, value) {
    // this.staticImageModal.show();
    // this.statVideoFlag = true;
    // this.statImageFlag = false;
    if (value == 1) {
      this.passData['videoUrl'] = src;
      this.thumb_title = title;
      this.flag = value;
    } else if (value == 2) {
      this.passData['videoUrl'] = src;
      this.thumb_title = title;
      this.flag = value;
    }
  }

  start() {
    var jsonBody = {};
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['event'] = 'start';
    this.apiCall(jsonBody, 'modulefoursingleurl/', 'start');
  }

  videoFinish(e) {
    if (e == true) {
      this.instructionModal.show();
      this.LanguageService.toShow();
      this.nextBtnFlag = true;
    }
  }

  next() {
    this.subFlagModule4 = this.subFlagModule4 + 1;
    window.localStorage.setItem('subFlagModule4', this.subFlagModule4.toString());
    var jsonBody = {};
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['event'] = 'finish';
    this.apiCall(jsonBody, 'modulefoursingleurl/', 'finish1');
  }

  start2() {
    var jsonBody = {}
    jsonBody['currentsubmoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['useroption'] = '';
    jsonBody['event'] = 'start';
    this.apiCall(jsonBody, 'modulefourcfustart/', 'start2');
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.startVideoEvent = false;
    this.Module4Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "start") {
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 4.9', window.localStorage.getItem('username'), 10);
            this.passData["videoUrl"] = data["data"].url;
            this.vedioCompleteUrl = data["data"].url;
            this.playVideo = true;
            var url = {}
            url['4.9.1'] = this.vedioCompleteUrl;
            var current4 = [];
            current4 = JSON.parse(window.localStorage.getItem("currentJson4"));
            var index = current4["children"].findIndex(
              item => item.source == "module 4.9");
            current4["children"][index].url = JSON.stringify(url);
            window.localStorage.setItem("currentJson4", JSON.stringify(current4));
          } else if (fun == "finish1") {
            this.instructionModal.hide();
            this.LanguageService.toHide();
            this.playVideo = false;
            this.statVideoFlag = true;
            this.mainFlagModule4 = 9;
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            this.start2();
          } else if (fun == "start2") {
            this.videoData['apiUrl'] = 'modulefourcfustart/';
            this.videoData['videoUrl'] = data['data'].url;
            this.passUrl = 'IkzkQ-Xft4c';
            this.currentSource = window.localStorage.getItem('source');
            this.startVideoEvent = true;
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 4.10', window.localStorage.getItem('username'), 10);
            this.showVideoCFU = true;
          }
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  } 2

  finishCFU(e) {
    if (e) {
      var current4 = [];
      current4 = JSON.parse(window.localStorage.getItem("currentJson4"));
      var index = current4["children"].findIndex(
        item => item.source == "module 4.9");
      current4["children"][index].url = e['url'];

      window.localStorage.setItem("currentJson4", JSON.stringify(current4));
      window.localStorage.setItem('mainFlagModule4', '10');
      window.localStorage.setItem('subFlagModule4', '1');
      window.localStorage.setItem('source', 'module 4.10');
      this.Module4Service.setLocalStorage4(10);
      var obj = {
        "type": "submodule",
        "route": true,
        "current": this.translate.instant('L2Module4.subMenu4-9'),
        "next": this.translate.instant('L2Module4Finish.subMenu4-10'),
        "nextRoute": "/modules/module4/Module4.10"
      }
      this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
    }
    else {
      window.localStorage.setItem('mainFlagModule4', '9');
      this.router.navigate(['/modules/module4/Module4.9']);
    }
  }
}
