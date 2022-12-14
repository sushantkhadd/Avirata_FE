import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Module0Service } from './module0.service'

@Component({
  selector: 'app-module0-11',
  templateUrl: './module0-11.component.html'
})
export class Module011Component implements OnInit {
  @ViewChild('instructionModal') public instructionModal: ModalDirective;

  public mainFlagModule0 = parseInt(
    window.localStorage.getItem("mainFlagModule0")
  );
  public subFlagModule0 = parseInt(
    window.localStorage.getItem("subFlagModule0")
  )
  showVideoFlag: boolean;
  passUrl: any;
  nextBtnFlag: boolean;
  constructor(
    public LanguageService: LanguageService,
    private LocalstoragedetailsService: LocalstoragedetailsService,
    private router: Router,
    public Module0Service: Module0Service,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public translate: TranslateService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  public passData = {};
  ngOnInit() {
    this.start();
  }
  start() {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'start';
    console.log('hello start', jsonBody)
    this.apiCall(jsonBody, 'modulezerosingleurl/', 'start');

  }
  videoFinish(e) {
    if (e == true) {
      this.instructionModal.show();
      this.LanguageService.toShow();
    }
  }
  nextvideo() {
    this.subFlagModule0 = this.subFlagModule0 + 1
    window.localStorage.setItem('subFlagModule0', this.subFlagModule0.toString());
    this.instructionModal.hide();
    this.nextBtnFlag = true
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
    console.log('hello apicall', jsonBody)

    this.Module0Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "start") {
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 0.11', window.localStorage.getItem('username'), 10);
            this.passData['apiUrl'] = "modulezerosingleurl/";
            this.passData['videoUrl'] = data['data'].url;
            this.showVideoFlag = true
            this.passUrl = data['data'].url;
            var current0 = [];
            current0 = JSON.parse(window.localStorage.getItem("currentJson0"));
            var index = current0["children"].findIndex(
              item => item.source == "module 0.11");
            current0["children"][index].url = this.passUrl;

            window.localStorage.setItem("currentJson0", JSON.stringify(current0));
          } else if (fun == "finish1") {
            this.instructionModal.hide();
            this.LanguageService.toHide();
            window.localStorage.setItem('uuid', data['data'].nextuuid)
            window.localStorage.setItem('mainFlagModule0', '12');
            window.localStorage.setItem('subFlagModule0', '1');
            window.localStorage.setItem('source', 'module 0.12');
            this.Module0Service.setLocalStorage0(3);
            var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module0.subMenu0-12'), "next": this.translate.instant('L2Module0Finish.subMenu0-12'), "nextRoute": "/modules/module0/Module0.12" }
            this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
          }
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }

  nextApiCall(jsonBody, apiUrl, fun) {
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
}
