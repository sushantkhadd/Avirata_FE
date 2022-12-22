import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Module0Service } from './module0.service'

@Component({
  selector: 'app-module0-16',
  templateUrl: './module0-16.component.html'
})
export class Module016Component implements OnInit {
  @ViewChild('instructionModal') public instructionModal: ModalDirective;

  public mainFlagModule0 = parseInt(
    window.localStorage.getItem("mainFlagModule0")
  );
  public subFlagModule0 = parseInt(
    window.localStorage.getItem("subFlagModule0")
  )
  showVideoFlag: boolean;
  passUrl: any;
  videoflag = 0;
  passValues = {};
  showCFU: boolean;
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
    // this.start();
  }
  start() {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'start'
    this.apiCall(jsonBody, 'modulezerosingleurl/', 'start', 0);
  }
  videoFinish(e, item) {
    this.videoflag = item
    if (e == true) {
      this.instructionModal.show()
      this.LanguageService.toShow();
      // this.nextBtnFlag = true
    }
  }
  next(item) {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'finish'
    if (item == 5) {

      this.apiCall(jsonBody, 'modulezerosingleurl/', 'finish1', item)
    } else {
      this.apiCall(jsonBody, 'modulezerosingleurl/', 'finish1', item)
    }

  }

  apiCall(jsonBody, apiUrl, fun, item) {
    this.passData['videoUrl']='';
    this.showVideoFlag = false;
    this.Module0Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "start") {
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 0.16', window.localStorage.getItem('username'), 10);
            this.showCFU = false;
            this.passValues['url'] = data['data'].url;            
            this.passData['videoUrl'] = data['data'].url;
            this.passData['apiUrl'] = "modulezerosingleurl/";

            this.showVideoFlag = true
            this.passUrl = data['data'].url;
            var current0 = [];
            current0 = JSON.parse(window.localStorage.getItem("currentJson0"));
            var index = current0["children"].findIndex(
              item => item.source == "module 0.16");
            current0["children"][index].url = this.passUrl;

            window.localStorage.setItem("currentJson0", JSON.stringify(current0));
          } else if (fun == "finish1") {

            if (item == 5) {
              this.instructionModal.hide();
              this.LanguageService.toHide();
              window.localStorage.setItem('uuid', data['data'].nextuuid)
              window.localStorage.setItem('mainFlagModule0', '17');
              window.localStorage.setItem('subFlagModule0', '1');
              window.localStorage.setItem('source', 'module 0.17');
              this.Module0Service.setLocalStorage0(3);
              var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module0.subMenu0-17'), "next": this.translate.instant('L2Module0Finish.subMenu0-17'), "nextRoute": "/modules/module0/Module0.17" }
              this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
            } else {
              this.instructionModal.hide();
              this.LanguageService.toHide();
            }

          }
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }


  nextvideo(item) {
    this.subFlagModule0 = this.subFlagModule0 + 1
    window.localStorage.setItem('subFlagModule0', this.subFlagModule0.toString());
    this.instructionModal.hide();
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'finish'
    if (item == 5) {
      this.apiCall(jsonBody, 'modulezerosingleurl/', 'finish1', item)

    } else {
      this.nextApiCall(jsonBody, 'modulezerosingleurl/', 'finish1')
    }

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

  finishPDF(e, item) {
    this.subFlagModule0 = this.subFlagModule0 + 1;
    window.localStorage.setItem('subFlagModule0', this.subFlagModule0.toString());
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'finish'
    this.nextApiCall(jsonBody, 'modulezerosingleurl/', 'finish1')
  }
}
