import { Component, OnInit} from '@angular/core';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {Module1Service} from './module1.service'
import { FullLayoutService } from '../../layouts/full-layout.service';


@Component({
  selector: 'app-module1-7',
  templateUrl: './module1-7.component.html'
})
export class Module17Component implements OnInit {
  public mainFlagModule1 = parseInt(window.localStorage.getItem('mainFlagModule1'));
  public subFlagModule1 = parseInt(window.localStorage.getItem('subFlagModule1'));
  public token; startVideoEvent;
  public passData = {};//used when CFU completed
  public videoData = {}; passUrl;

  public currentSource = window.localStorage.getItem('source');

  constructor(public FullLayoutService: FullLayoutService, public LanguageService: LanguageService, public LocalstoragedetailsService: LocalstoragedetailsService, private router: Router, public Module1Service: Module1Service, public translate: TranslateService) { }

  ngOnInit() {
    this.passUrl = 'IkzkQ-Xft4c'
    this.currentSource = window.localStorage.getItem('source');
    this.startVideoEvent = false;

    this.token = this.LocalstoragedetailsService.token
    if (this.token == null)
    {
      this.router.navigate(['/']);
    }

    if (this.subFlagModule1 == 1)
    {
    }
    if (this.mainFlagModule1 < 7)
    {

    }
    else if (this.mainFlagModule1 == 7)
    {
      this.startVideoEvent = false;
      this.videoData['apiUrl'] = 'moduleonecfustart/';
    }
    else if (this.mainFlagModule1 > 7)
    {
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson1"));
      console.log("vcxxxx",urlJson)
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 1.7"
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
  finishCFU(e) {
    if (e)
    {
      console.log("event",e)
      var current1 = [];
      current1 = JSON.parse(window.localStorage.getItem("currentJson1"));
      var index = current1["children"].findIndex(
        item => item.source == "module 1.7");
      current1["children"][index].url = e['url'];

      window.localStorage.setItem("currentJson1", JSON.stringify(current1));
      window.localStorage.setItem('mainFlagModule1', '8');
      window.localStorage.setItem('subFlagModule1', '1');
      window.localStorage.setItem('source', 'module 1.8.1');
      this.Module1Service.setLocalStorage1(8);
      var obj = {
        "type": "submodule",
        "route": true,
        "current": this.translate.instant('L2Module1.subMenu1-7'),
        "next": this.translate.instant('L2Module1Finish.subMenu1-8'),
        "nextRoute": "/modules/module1/Module1.8"
      }
      this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
    }
    else
    {
      window.localStorage.setItem('mainFlagModule1', '7');
      this.router.navigate(['/modules/module1/Module1.7']);
    }
  }
  singleCFUComplete(e) {
    this.subFlagModule1++;
    window.localStorage.setItem('subFlagModule1', this.subFlagModule1.toString());
  }
  start() {
    this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 1.7', window.localStorage.getItem('username'), 10);
  }

}
