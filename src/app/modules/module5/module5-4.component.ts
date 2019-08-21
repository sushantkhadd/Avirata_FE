import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Module5Service } from './module5.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/language.service';
import { FullLayoutService } from 'src/app/layouts/full-layout.service';
import { Router } from '@angular/router';
import { LocalstoragedetailsService } from 'src/app/services/localstoragedetails.service';
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'app-module5-4',
  templateUrl: './module5-4.component.html'
})
export class Module54Component implements OnInit {

  mainFlagModule5;
  subFlagModule5;
  startPdf; flag; audioSrc = {}; passValues = {}; thumb_title;
  docData = {}; urlArray = {};

  constructor(
    public Module5Service: Module5Service,
    public translate: TranslateService,
    public LanguageService: LanguageService,
    public FullLayoutService: FullLayoutService,
    public router: Router,
    public LocalstoragedetailsService: LocalstoragedetailsService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.mainFlagModule5 = parseInt(
      window.localStorage.getItem("mainFlagModule5")
    );
    this.subFlagModule5 = parseInt(
      window.localStorage.getItem("subFlagModule5")
    );

    if (this.mainFlagModule5 < 4)
    {
    } else if (this.mainFlagModule5 == 4)
    {
      // this.startEvent();
    } else if (this.mainFlagModule5 > 4)
    {
      
      this.passValues["unlockView"] = "static";
      var unlockJson = {}
      unlockJson = JSON.parse(window.localStorage.getItem('currentJson5'))
      if (unlockJson['children'].length > 0)
      {
        var index = unlockJson['children'].findIndex(item =>
          item.source == "module 5.4");

        if (unlockJson['children'][index].url != null)
        {
          this.passValues['url'] = unlockJson['children'][index].url
        }
      }
    }
  }

  startEvent() {
    this.startPdf = true;
    this.docData["state"] = "dyanamic";
    this.docData["download"] = false;
    this.docData["link"] = "";
    this.docData["finalcount"] = 4;
    this.docData["showcfu"] = true;
    this.docData["apiurl"] = "modulefivecfustart/";
    this.docData["apiurlResult"] = "modulefivecfustart/";
    this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 5.4', window.localStorage.getItem('username'), 10);
  }

  checkAnswer(e) {
    console.log("abc",e)
    var current5 = [];
    current5 = JSON.parse(window.localStorage.getItem("currentJson5"));
    var index = current5["children"].findIndex(
      item => item.source == "module 5.4"
    );
      this.audioSrc["state"] = "static";
   
    current5["children"][index].url = e['url'];
    window.localStorage.setItem("currentJson5", JSON.stringify(current5));
    this.mainFlagModule5 = 5;
    window.localStorage.setItem("mainFlagModule5", "5");
    window.localStorage.setItem("subFlagModule5", "1");
    window.localStorage.setItem("source", "module 5.5");
    this.Module5Service.setLocalStorage5(5);
    var obj = {
      type: "submodule",
      route: true,
      current: this.translate.instant("L2Module5.subMenu5-4"),
      next: this.translate.instant("L2Module5Finish.subMenu5-5"),
      nextRoute: "/modules/module5/Module5.5"
    };
    this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
  }

}
