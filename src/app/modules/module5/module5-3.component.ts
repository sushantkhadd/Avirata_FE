import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Module5Service } from './module5.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/language.service';
import { FullLayoutService } from 'src/app/layouts/full-layout.service';
import { Router } from '@angular/router';
import { LocalstoragedetailsService } from 'src/app/services/localstoragedetails.service';
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'app-module5-3',
  templateUrl: './module5-3.component.html'
})
export class Module53Component implements OnInit {
  public mainFlagModule5 = parseInt(window.localStorage.getItem('mainFlagModule5'));
  public subFlagModule5 = parseInt(window.localStorage.getItem('subFlagModule5'));
  public token; startVideoEvent;
  public passData = {};//used when CFU completed
  public videoData = {};passUrl;

  public currentSource = window.localStorage.getItem('source');

  constructor(public FullLayoutService:FullLayoutService, public LanguageService:LanguageService,public LocalstoragedetailsService: LocalstoragedetailsService, private router: Router, public Module5Service: Module5Service,public translate: TranslateService) { }

  ngOnInit() {
    this.passUrl='IkzkQ-Xft4c'
    this.currentSource = window.localStorage.getItem('source');
    this.startVideoEvent = false;

    this.token = this.LocalstoragedetailsService.token
    if (this.token == null) {
      this.router.navigate(['/']);
    }

    if (this.subFlagModule5 == 1) {
    }
     if (this.mainFlagModule5 < 3) {

    }
     else if (this.mainFlagModule5 == 3)
     {
      this.startVideoEvent = false;
      this.videoData['apiUrl'] = 'modulefivecfustart/';
    }
    else if (this.mainFlagModule5 > 3) {
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson5"));
      console.log("vcxxxx",urlJson)
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 5.3"
        );
        console.log("qWSS",index)
        if (urlJson["children"][index].url != null)
        {
          console.log("qWSS",index,urlJson["children"][index].url)
          this.passData['videoUrl'] = urlJson["children"][index].url
        } else {
          this.passData['videoUrl'] = this.passUrl
        }
      } else {
        this.passData['videoUrl'] = this.passUrl
      }
    }
  }
  finishCFU(result) {
    if (result["status"] == true) {
      console.log("event",result)
      var current5 = [];
      current5 = JSON.parse(window.localStorage.getItem("currentJson5")); 
      var index = current5["children"].findIndex(
      item => item.source == "module 5.3" );
      current5["children"][index].url = result["url"]; 
      window.localStorage.setItem("currentJson5", JSON.stringify(current5))
      window.localStorage.setItem('mainFlagModule5', '4');
      window.localStorage.setItem('subFlagModule5', '1');
      window.localStorage.setItem('source', 'module 5.4.1');
      this.Module5Service.setLocalStorage5(4);
      var obj = { 
        "type": "submodule", 
        "route": true, 
        "current": this.translate.instant('L2Module5.subMenu5-3'), 
        "next": this.translate.instant('L2Module5Finish.subMenu5-4'), 
        "nextRoute": "/modules/module5/Module5.4" }
      this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
    }
    else {
      window.localStorage.setItem('mainFlagModule5', '3');
      this.router.navigate(['/modules/module5/Module5.3']);
    }
  }
  singleCFUComplete(e) {
    this.subFlagModule5++;
    window.localStorage.setItem('subFlagModule5', this.subFlagModule5.toString());
  }
  start(){
    this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 5.3', window.localStorage.getItem('username'), 10);
  }


}