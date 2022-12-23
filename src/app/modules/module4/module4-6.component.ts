import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import {Module4Service} from './module4.service'
import { CommonService } from 'src/app/services/common.service';
import { FullLayoutService } from 'src/app/layouts/full-layout.service';

@Component({
  selector: 'app-module4-6',
  templateUrl: './module4-6.component.html'
})
export class Module46Component implements OnInit {
  public mainFlagModule4 = parseInt(window.localStorage.getItem('mainFlagModule4'));
  public subFlagModule4 = parseInt(window.localStorage.getItem('subFlagModule4'));
  public token; startVideoEvent;
  public passData = {};//used when CFU completed
  public videoData = {}; passUrl;

  public currentSource = window.localStorage.getItem('source');

  constructor(public FullLayoutService: FullLayoutService, public LanguageService: LanguageService, public LocalstoragedetailsService: LocalstoragedetailsService, private router: Router, public Module4Service: Module4Service, public translate: TranslateService) { }

  ngOnInit() {
    this.passUrl='IkzkQ-Xft4c';
    this.currentSource = window.localStorage.getItem('source');
    this.startVideoEvent = false;

    this.token = this.LocalstoragedetailsService.token
    if (this.token == null)
    {
      this.router.navigate(['/']);
    }

    if (this.subFlagModule4 == 1)
    {
    }
    if (this.mainFlagModule4 < 6)
    {

    }
    else if (this.mainFlagModule4 == 6)
    {
      this.startVideoEvent = false;
      this.videoData['apiUrl'] = 'modulefourcfustart/';
    }
    else if (this.mainFlagModule4 > 6)
    {
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson4"));
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 4.6"
        );
        if (urlJson["children"][index].url != null)
        {
          this.passData['videoUrl'] = urlJson["children"][index].url
        } else {
          this.passData['videoUrl'] = this.passUrl
        }
      } else {
        this.passData['videoUrl'] = this.passUrl
      }
    }
  }

  finishCFU(e) {
    if (e)
    {
      var current4 = [];
      current4 = JSON.parse(window.localStorage.getItem("currentJson4"));
      var index = current4["children"].findIndex(
        item => item.source == "module 4.6");
      current4["children"][index].url = e['url'];

      window.localStorage.setItem("currentJson4", JSON.stringify(current4));
      window.localStorage.setItem('mainFlagModule4', '7');
      window.localStorage.setItem('subFlagModule4', '1');
      window.localStorage.setItem('source', 'module 4.7.1');
      this.Module4Service.setLocalStorage4(7);
      var obj = {
        "type": "submodule",
        "route": true,
        "current": this.translate.instant('L4Module4.subMenu4-6'),
        "next": this.translate.instant('L4Module4Finish.subMenu4-7'),
        "nextRoute": "/modules/module4/Module4.3"
      }
      this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
    }
    else
    {
      window.localStorage.setItem('mainFlagModule4', '6');
      this.router.navigate(['/modules/module4/Module4.6']);
    }
  }
  singleCFUComplete(e) {
    this.subFlagModule4++;
    window.localStorage.setItem('subFlagModule4', this.subFlagModule4.toString());
  }
  start() {
    this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 4.6', window.localStorage.getItem('username'), 10);
  }

}

