import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { LanguageService } from 'src/app/language.service';
import { LocalstoragedetailsService } from 'src/app/services/localstoragedetails.service';
import { Module5Service } from './module5.service';
import { ToastsManager } from 'ng6-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {FullLayoutService} from '../../layouts/full-layout.service'
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-module5-14',
  templateUrl: './module5-14.component.html'
})
export class Module514Component implements OnInit {

  public mainFlagModule5 = parseInt(window.localStorage.getItem('mainFlagModule5'));
  public subFlagModule5 = parseInt(window.localStorage.getItem('subFlagModule5'));
 
  @ViewChild('staticImageModal') public staticImageModal: ModalDirective;
  @ViewChild('instructionModal') public instructionModal: ModalDirective;

  showCFU: boolean;
  download: boolean;
  passValues = {};
  finishJSONBody: any;
  startVideoEvent;
  showpdfFlag: boolean;
  showVideoCFU; currentSource;
  constructor(public LanguageService: LanguageService, public Module5Service: Module5Service, public router: Router, public LocalstoragedetailsService: LocalstoragedetailsService, public toastr: ToastsManager, vcr: ViewContainerRef, public translate: TranslateService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  public showVideoFlag; nextBtnFlag; passData = {}; passUrl; videoData = {}; urlArray = {}; lnk1; lnk2; flag; parentUrlJson = {}; playVideo;
  public statVideoFlag; thumb_title; vedioCompleteUrl;

  ngOnInit() {
    this.lnk1 = '';
    this.lnk2 = '';
    this.urlArray["src1"] = "skGFDAhQrhE";
    this.urlArray["src2"] = "opHKXAPIynA";
    this.urlArray['v_thumb'] = './../../assets/img/video-thumb.png';
    this.showVideoFlag = false;
    if (this.mainFlagModule5 == 14) {
      if (this.subFlagModule5 == 1) {
        this.start();
      }
    }
  }

  start() {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['event'] = 'start';
    this.apiCall(jsonBody, 'modulefivesingleurl/', 'start');
  }

  videoFinish(e) {
    if (e == true) {
      this.instructionModal.show();
      this.LanguageService.toShow();
      this.nextBtnFlag = true;
    }
  }

  next() {
    this.subFlagModule5 = this.subFlagModule5 + 1;
    window.localStorage.setItem('subFlagModule5', this.subFlagModule5.toString());
    var jsonBody = {};
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['event'] = 'finish';
    this.apiCall(jsonBody, 'modulefivesingleurl/', 'finish1');
  }

  start2() {
    var jsonBody = {}
    jsonBody['currentsubmoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['useroption'] = '';
    jsonBody['event'] = 'start';
    this.apiCall(jsonBody, 'modulefivecfustart/', 'start2');
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.startVideoEvent = false;
    this.Module5Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "start") {
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 5.14', window.localStorage.getItem('username'), 10);
            this.passData["videoUrl"] = data["data"].url;
            this.vedioCompleteUrl = data["data"].url;
            this.playVideo = true;
            var url = {}
            url['5.14.1'] = this.vedioCompleteUrl;
            var current5 = [];
            current5 = JSON.parse(window.localStorage.getItem("currentJson5"));
            var index = current5["children"].findIndex(
              item => item.source == "module 5.14");
            current5["children"][index].url = JSON.stringify(url);
            window.localStorage.setItem("currentJson5", JSON.stringify(current5));
          } else if (fun == "finish1") {
            this.instructionModal.hide();
            this.LanguageService.toHide();
            this.playVideo = false;
            this.statVideoFlag = true;
            this.mainFlagModule5 = 14;
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            this.start2();
          } else if (fun == "start2") {
            this.videoData['apiUrl'] = 'modulefourcfustart/';
            this.videoData['videoUrl'] = data['data'].url;
            this.passUrl = 'IkzkQ-Xft4c';
            this.currentSource = window.localStorage.getItem('source');
            this.startVideoEvent = true;
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 5.15', window.localStorage.getItem('username'), 10);
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
      var current5 = [];
      current5 = JSON.parse(window.localStorage.getItem("currentJson5"));
      var index = current5["children"].findIndex(
        item => item.source == "module 5.14");
      current5["children"][index].url = e['url'];

      window.localStorage.setItem("currentJson5", JSON.stringify(current5));
      window.localStorage.setItem('mainFlagModule5', '15');
      window.localStorage.setItem('subFlagModule5', '1');
      window.localStorage.setItem('source', 'module 5.15');
      this.Module5Service.setLocalStorage5(15);
      var obj = {
        "type": "submodule",
        "route": true,
        "current": this.translate.instant('L2Module5.subMenu5-14'),
        "next": this.translate.instant('L2Module5Finish.subMenu5-15'),
        "nextRoute": "/modules/module5/Module5.15"
      }
      this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
    }
    else {
      window.localStorage.setItem('mainFlagModule5', '14');
      this.router.navigate(['/modules/module5/Module5.14']);
    }
  }
}
