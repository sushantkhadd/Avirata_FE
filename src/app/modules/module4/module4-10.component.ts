import { Component, OnInit,ViewContainerRef} from '@angular/core';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {Module4Service} from './module4.service'
import { FullLayoutService } from '../../layouts/full-layout.service';

@Component({
  selector: 'app-module4-10',
  templateUrl: './module4-10.component.html'
})
export class Module410Component implements OnInit {
  public mainFlagModule4 = parseInt(window.localStorage.getItem('mainFlagModule4'));
  public subFlagModule4 = parseInt(window.localStorage.getItem('subFlagModule4'));
  public token; startVideoEvent;
  public passData = {};//used when CFU completed
  public videoData = {};passUrl;

  public currentSource = window.localStorage.getItem('source');

  constructor(public FullLayoutService:FullLayoutService, public LanguageService:LanguageService,public LocalstoragedetailsService: LocalstoragedetailsService, private router: Router, public Module4Service: Module4Service,public translate: TranslateService) { }

  ngOnInit() {
    this.passUrl='IkzkQ-Xft4c'
    this.currentSource = window.localStorage.getItem('source');
    this.startVideoEvent = false;

    this.token = this.LocalstoragedetailsService.token
    if (this.token == null) {
      this.router.navigate(['/']);
    }

    if (this.subFlagModule4 == 1) {
    }
     if (this.mainFlagModule4 < 10) {

    }
     else if (this.mainFlagModule4 == 10)
     {
      this.startVideoEvent = false;
      this.videoData['apiUrl'] = 'modulefourcfustart/';
    }
    else if (this.mainFlagModule4 > 10) {
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson4"));
      console.log("vcxxxx",urlJson)
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 4.10"
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
      var current4 = [];
      current4 = JSON.parse(window.localStorage.getItem("currentJson4")); 
      var index = current4["children"].findIndex(
      item => item.source == "module 4.10" );
      current4["children"][index].url = result["url"]; 
      window.localStorage.setItem("currentJson4", JSON.stringify(current4))
      window.localStorage.setItem('mainFlagModule4', '11');
      window.localStorage.setItem('subFlagModule4', '1');
      window.localStorage.setItem('source', 'module 4.11.1');
      this.Module4Service.setLocalStorage4(11);
      var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L4Module4.subMenu4-10'), "next": this.translate.instant('L4Module4Finish.subMenu4-11'), "nextRoute": "/modules/module4/Module4.11" }
      this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
    }
    else {
      window.localStorage.setItem('mainFlagModule4', '10');
      this.router.navigate(['/modules/module4/Module4.10']);
    }
  }
  singleCFUComplete(e) {
    this.subFlagModule4++;
    window.localStorage.setItem('subFlagModule4', this.subFlagModule4.toString());
  }
  start(){
    this.LanguageService.googleEventTrack('L4SubmoduleStatus', 'Module 4.10', window.localStorage.getItem('username'), 10);
  }
}
