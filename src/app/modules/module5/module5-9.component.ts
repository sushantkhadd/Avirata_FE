import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Module5Service } from './module5.service'
import { FullLayoutService } from 'src/app/layouts/full-layout.service';

@Component({
  selector: 'app-module5-9',
  templateUrl: './module5-9.component.html'
})
export class Module59Component implements OnInit {

  @ViewChild('instructionModal') public instructionModal: ModalDirective;

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
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 5.9', window.localStorage.getItem('username'), 10);   
              this.passValues['url'] = data['data'].url;
              this.showVideoFlag = true
            
            this.showVideoFlag = true
            var current0 = [];
            current0 = JSON.parse(window.localStorage.getItem("currentJson5"));
            var index = current0["children"].findIndex(
              item => item.source == "module 5.9");
            current0["children"][index].url = this.passUrl;

            window.localStorage.setItem("currentJson0", JSON.stringify(current0));

          } else if (fun == "finish1") {
            this.LanguageService.toHide();
            window.localStorage.setItem('uuid', data['data'].nextuuid)
            window.localStorage.setItem('mainFlagModule5', '10');
            window.localStorage.setItem('subFlagModule5', '1');
            window.localStorage.setItem('source', 'module 5.10');
            this.Module5Service.setLocalStorage5(9);
            var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module5.subMenu5-10'), "next": this.translate.instant('L2Module5Finish.subMenu5-10'), "nextRoute": "/modules/module5/Module5.10" }
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
