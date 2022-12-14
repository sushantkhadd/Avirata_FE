import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Module0Service } from './module0.service'
import { FullLayoutService } from 'src/app/layouts/full-layout.service';

@Component({
  selector: 'app-module0-3',
  templateUrl: './module0-3.component.html'
})
export class Module03Component implements OnInit {

  @ViewChild('instructionModal') public instructionModal: ModalDirective;

  public mainFlagModule0 = parseInt(window.localStorage.getItem('mainFlagModule0'));
  public subFlagModule0 = parseInt(window.localStorage.getItem('subFlagModule0'));
  showCFU: boolean;
  download: boolean;
  passValues = {};
  finishJSONBody: any;
  startVideoEvent = true;
  showpdfFlag: boolean;
  constructor(public FullLayoutService: FullLayoutService, public LanguageService: LanguageService, public Module0Service: Module0Service, public router: Router, public LocalstoragedetailsService: LocalstoragedetailsService, public toastr: ToastsManager, vcr: ViewContainerRef, public translate: TranslateService) {
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
    this.showVideoFlag=false
    if (this.mainFlagModule0 == 3) {
      this.start()
    }
  }


  start() {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'start'
    this.apiCall(jsonBody, 'modulezerosingleurl/', 'start')
  }
  videoFinish(e) {
    if (e == true) {
      this.instructionModal.show()
      this.LanguageService.toShow();
      this.nextBtnFlag = true
    }
  }

  nextvideo() {
    this.subFlagModule0 = this.subFlagModule0 + 1
    window.localStorage.setItem('subFlagModule0', this.subFlagModule0.toString());
    this.instructionModal.hide();
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'finish'
    this.nextApiCall(jsonBody, 'modulezerosingleurl/', 'finish1')
  }

  next() {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'finish'
    this.apiCall(jsonBody, 'modulezerosingleurl/', 'finish1')
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module0Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "start") {
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 0.3', window.localStorage.getItem('username'), 10);            
            this.passData['apiUrl'] = "modulezerosingleurl/";
            this.passData['videoUrl'] = data['data'].url;  
            if (this.subFlagModule0 == 2) {
              this.showCFU = false;
              this.passValues['url'] = data['data'].url;
              this.showVideoFlag = true
            } else {

            }
            this.showVideoFlag = true
            var current0 = [];
            current0 = JSON.parse(window.localStorage.getItem("currentJson0"));
            var index = current0["children"].findIndex(
              item => item.source == "module 0.3");
            current0["children"][index].url = this.passUrl;

            window.localStorage.setItem("currentJson0", JSON.stringify(current0));

          } else if (fun == "finish1") {
            this.LanguageService.toHide();
            window.localStorage.setItem('uuid', data['data'].nextuuid)
            window.localStorage.setItem('mainFlagModule0', '4');
            window.localStorage.setItem('subFlagModule0', '1');
            window.localStorage.setItem('source', 'module 0.4');
            this.Module0Service.setLocalStorage0(3);
            var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module0.subMenu0-2'), "next": this.translate.instant('L2Module0Finish.subMenu0-4'), "nextRoute": "/modules/module0/Module0.4" }
            this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
          }
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }

  nextApiCall(jsonBody, apiUrl, fun){
    this.Module0Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "finish1") {
            window.localStorage.setItem('uuid', data['data'].nextuuid)
            this.start()
          } 
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }

  finishPDF(e) {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'finish'
    this.apiCall(jsonBody, 'modulezerosingleurl/', 'finish1')
  }
}
