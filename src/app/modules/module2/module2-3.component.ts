import { Component, OnInit,ViewContainerRef, ViewChild} from '@angular/core';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {Module2Service} from './module2.service'
import { FullLayoutService } from '../../layouts/full-layout.service';
import { ToastsManager } from 'ng6-toastr';
import { ModalDirective } from 'ngx-bootstrap';


@Component({
  selector: 'app-module2-3',
  templateUrl: './module2-3.component.html'
})
export class Module23Component implements OnInit {
  public mainFlagModule2 = parseInt(window.localStorage.getItem('mainFlagModule2'));
  public subFlagModule2 = parseInt(window.localStorage.getItem('subFlagModule2'));
  public token; startVideoEvent;
  public passData = {};//used when CFU completed
  public videoData = {};passUrl;

  public currentSource = window.localStorage.getItem('source');

  constructor(public FullLayoutService:FullLayoutService, public LanguageService:LanguageService,public LocalstoragedetailsService: LocalstoragedetailsService, private router: Router, public Module2Service: Module2Service,public translate: TranslateService) { }

  ngOnInit() {
    this.passUrl='IkzkQ-Xft4c'
    this.currentSource = window.localStorage.getItem('source');
    this.startVideoEvent = false;

    this.token = this.LocalstoragedetailsService.token
    if (this.token == null) {
      this.router.navigate(['/']);
    }

    if (this.subFlagModule2 == 1) {
    }
     if (this.mainFlagModule2 < 3) {

    }
     else if (this.mainFlagModule2 == 3)
     {
      this.startVideoEvent = false;
      this.videoData['apiUrl'] = 'moduletwocfustart/';
    }
    else if (this.mainFlagModule2 > 3) {
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson2"));
      console.log("vcxxxx",urlJson)
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 2.3"
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
      var current2 = [];
      current2 = JSON.parse(window.localStorage.getItem("currentJson2")); 
      var index = current2["children"].findIndex(
      item => item.source == "module 2.3" );
      current2["children"][index].url = result["url"]; 
      window.localStorage.setItem("currentJson2", JSON.stringify(current2))
      window.localStorage.setItem('mainFlagModule2', '4');
      window.localStorage.setItem('subFlagModule2', '1');
      window.localStorage.setItem('source', 'module 2.4.1');
      this.Module2Service.setLocalStorage2(4);
      var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module2.subMenu2-3'), "next": this.translate.instant('L2Module2Finish.subMenu2-4'), "nextRoute": "/modules/module2/Module2.4" }
      this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
    }
    else {
      window.localStorage.setItem('mainFlagModule2', '3');
      this.router.navigate(['/modules/module2/Module2.3']);
    }
  }
  singleCFUComplete(e) {
    this.subFlagModule2++;
    window.localStorage.setItem('subFlagModule2', this.subFlagModule2.toString());
  }
  start(){
    this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 2.3', window.localStorage.getItem('username'), 10);
  }


}