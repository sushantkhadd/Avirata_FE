import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Module3Service } from './module3.service'
import { CommonService } from 'src/app/services/common.service';
import { FullLayoutService } from 'src/app/layouts/full-layout.service';

@Component({
  selector: 'app-module3-16',
  templateUrl: './module3-16.component.html'
})
export class Module316Component implements OnInit {
  public mainFlagModule3 = parseInt(
    window.localStorage.getItem("mainFlagModule3")
  );
  public subFlagModule3 = parseInt(
    window.localStorage.getItem("subFlagModule3")
  );
  passUrl: any;
  passValues={};
  startPdf: boolean;
  constructor(
    public LanguageService: LanguageService,
    private LocalstoragedetailsService: LocalstoragedetailsService,
    public Module3Service: Module3Service,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    public translate: TranslateService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  public passData = {};

  ngOnInit() {
    this.startPdf=false
    this.start();
  }

  start() {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'start'
    this.apiCall(jsonBody, 'modulethreesingleurl/', 'start');
  }  

  apiCall(jsonBody, apiUrl, fun) {
    if(fun == "finish1"){
      this.Module3Service.finishModuleCall(jsonBody, 16, '/modules/module4', '/modules/module4')
    }else{
      this.Module3Service.apiCall(jsonBody, apiUrl).subscribe(
        data => {
          if (data["status"] == true) {
            if (fun == "start") {
              this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 3.16', window.localStorage.getItem('username'), 10);

              this.passValues["url"] = data["data"].url;
              this.startPdf = true;
              this.passUrl = data['data'].url;
              var current3 = [];
              current3 = JSON.parse(window.localStorage.getItem("currentJson3"));
              var index = current3["children"].findIndex(
                item => item.source == "module 3.16");
              current3["children"][index].url = this.passUrl;

              window.localStorage.setItem("currentJson3", JSON.stringify(current3));
            } 
          }
        },
        error => {
          this.LanguageService.handleError(error.error.message);
        }
      );
    }
  }

  finishPDF(e) {
    var jsonBody = {};
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['event'] = 'finish';
    this.apiCall(jsonBody, 'modulethreesingleurl/', 'finish1');
  }
}
