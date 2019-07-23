import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { LanguageService } from 'src/app/language.service';
import { Module1Service } from './module1.service';
import { Router } from '@angular/router';
import { LocalstoragedetailsService } from 'src/app/services/localstoragedetails.service';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-module1-10',
  templateUrl: './module1-10.component.html'
})
export class Module110Component implements OnInit {

  public mainFlagModule1 = parseInt(window.localStorage.getItem('mainFlagModule1'));
  public subFlagModule1 = parseInt(window.localStorage.getItem('subFlagModule1'));
  constructor(public LanguageService: LanguageService, public Module43Service: Module1Service, public router: Router, public LocalstoragedetailsService: LocalstoragedetailsService, public toastr: ToastsManager, vcr: ViewContainerRef, public translate: TranslateService) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  public mainJson = {}; passData6 = {}; showInst; queCount;
  startFlag;audioSrc ={};startAudio;
  public inst =
    "दिलेल्या प्रसंगातील घटना (A) - अविवेकी धारणा (B) - प्रतिसाद (C) - वाद,संवाद, प्रतिवाद(D) हे ओळखा. प्रत्येक प्रसंगाचा ऑडिओ देखील तुम्ही ऐकला आहे. (त्या त्या चौकटीत योग्य मुद्दा नेऊन (Drag-drop) ठेवा.)";
  ngOnInit() {
    this.queCount = 0

    if (this.mainFlagModule1 == 10)
    {
      this.showInst = true
      // this.start1()
    }
  }
  start1() {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'start'
    this.apiCall(jsonBody, "moduleonemcqstartfinish/", "start1");
  }
  getAnswer6(e) {
    console.log("get ans ", e)
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['event'] = 'finish'
    this.apiCall(jsonBody, "moduleonemcqstartfinish/", "finish1");
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module43Service.apiCall(jsonBody, apiUrl)
      .subscribe(
        data => {
          if (fun == "start1")
          {
            this.passData6 = data["data"];
            this.passData6['type'] = 'single'
            this.showInst = false;
            console.log("audioourl",data["data"].url)
            this.audioSrc['url'] = data["data"].url;
            this.audioSrc["state"] = "dynamic";
            this.startAudio = true;
            // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 4.12', window.localStorage.getItem('username'), 10);
          } else if (fun == "finish1")
          {
            if (data['message'] == "submodule finish next uuid is")
            {
              window.localStorage.setItem('uuid', data['data'].nextuuid)
              this.subFlagModule1++;
              window.localStorage.setItem("subFlagModule1", JSON.stringify(this.subFlagModule1));
              this.start1();
              // this.toastr.success(this.translate.instant("L2common.rightanswer"));
            } else if (data['message'] == "submodule finish")
            {
              window.localStorage.setItem('uuid', data['data'].nextuuid)
              this.mainFlagModule1 = 11;
              this.subFlagModule1 = 1;
              window.localStorage.setItem('mainFlagModule1', '11');
              window.localStorage.setItem('subFlagModule1', '1');
              this.Module43Service.setLocalStorage1(11);
              var obj = {
                "type": "submodule",
                "route": true,
                "current": this.translate.instant('L2Module1.subMenu1-10'),
                "next": this.translate.instant('L2Module1Finish.subMenu1-11'),
                "nextRoute": "/modules/module1/Module1.11"
              }
              this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
            }
          }
        },
        error => {
          this.LanguageService.handleError(error.error.message);
        });
  }

  finishAudio(e){
    if(e){
      this.startAudio=false;
    }
  }
}
