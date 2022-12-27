import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import { CommonService } from 'src/app/services/common.service';
import { FullLayoutService } from 'src/app/layouts/full-layout.service';
import { Module5Service } from './module5.service';

@Component({
  selector: 'app-module5-15',
  templateUrl: './module5-15.component.html'
})
export class Module515Component implements OnInit {

  public mainFlagModule5 = parseInt(window.localStorage.getItem('mainFlagModule5'));
  public subFlagModule5 = parseInt(window.localStorage.getItem('subFlagModule5'));

  download: boolean;
  passValues = {};
  finishJSONBody: any;
  startVideoEvent = true;
  showpdfFlag: boolean;
  constructor(public FullLayoutService: FullLayoutService, public LanguageService: LanguageService, public Module5Service: Module5Service, public router: Router, public LocalstoragedetailsService: LocalstoragedetailsService, public toastr: ToastsManager, vcr: ViewContainerRef, public translate: TranslateService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  public showVideoFlag; nextBtnFlag; passUrl; videoData = {};

  ngOnInit() {
    this.showVideoFlag=false    
  }

  start() {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'start'
    this.apiCall(jsonBody, 'modulefivesingleurl/', 'start')
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
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 5.15', window.localStorage.getItem('username'), 10);   
              this.passValues['url'] = data['data'].url;
              this.showVideoFlag = true
            
            this.showVideoFlag = true
            var current5 = [];
            current5 = JSON.parse(window.localStorage.getItem("currentJson5"));
            var index = current5["children"].findIndex(
              item => item.source == "module 5.15");
            current5["children"][index].url = this.passUrl;

            window.localStorage.setItem("currentJson5", JSON.stringify(current5));

          } else if (fun == "finish1") {
            this.LanguageService.toHide();
            window.localStorage.setItem('uuid', data['data'].nextuuid)
            window.localStorage.setItem('mainFlagModule5', '16');
            window.localStorage.setItem('subFlagModule5', '1');
            window.localStorage.setItem('source', 'module 5.16');
            this.Module5Service.setLocalStorage5(9);
            var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module5.subMenu5-16'), "next": this.translate.instant('L2Module5Finish.subMenu5-16'), "nextRoute": "/modules/module5/Module5.16" }
            this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
          }
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }

}
