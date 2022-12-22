import { Component, OnInit} from '@angular/core';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {Module3Service} from './module3.service'
import { FullLayoutService } from '../../layouts/full-layout.service';


@Component({
  selector: 'app-module3-2',
  templateUrl: './module3-2.component.html'
})
export class Module32Component implements OnInit {
  public mainFlagModule3 = parseInt(window.localStorage.getItem('mainFlagModule3'));
  public subFlagModule2 = parseInt(window.localStorage.getItem('subFlagModule2'));
  public token; startVideoEvent;
  public passData = {};//used when CFU completed
  public videoData = {}; passUrl;

  public currentSource = window.localStorage.getItem('source');

  constructor(public FullLayoutService: FullLayoutService, public LanguageService: LanguageService, public LocalstoragedetailsService: LocalstoragedetailsService, private router: Router, public Module3Service: Module3Service, public translate: TranslateService) { }

  ngOnInit() {
    this.passUrl='IkzkQ-Xft4c';
    this.currentSource = window.localStorage.getItem('source');
    this.startVideoEvent = false;

    this.token = this.LocalstoragedetailsService.token
    if (this.token == null)
    {
      this.router.navigate(['/']);
    }

    if (this.subFlagModule2 == 1)
    {
    }
    if (this.mainFlagModule3 < 2)
    {

    }
    else if (this.mainFlagModule3 == 2)
    {
      this.startVideoEvent = false;
      this.videoData['apiUrl'] = 'modulethreecfustart/';
    }
    else if (this.mainFlagModule3 > 2)
    {
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson3"));
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 3.2"
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
      var current3 = [];
      current3 = JSON.parse(window.localStorage.getItem("currentJson3"));
      var index = current3["children"].findIndex(
        item => item.source == "module 3.2");
      current3["children"][index].url = e['url'];

      window.localStorage.setItem("currentJson3", JSON.stringify(current3));
      window.localStorage.setItem('mainFlagModule3', '3');
      window.localStorage.setItem('subFlagModule3', '1');
      window.localStorage.setItem('source', 'module 3.2.2');
      this.Module3Service.setLocalStorage3(3);
      var obj = {
        "type": "submodule",
        "route": true,
        "current": this.translate.instant('L2Module3.subMenu3-2'),
        "next": this.translate.instant('L2Module3Finish.subMenu3-3'),
        "nextRoute": "/modules/module3/Module3.3"
      }
      this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
    }
    else
    {
      window.localStorage.setItem('mainFlagModule3', '2');
      this.router.navigate(['/modules/module3/Module3.2']);
    }
  }
  singleCFUComplete(e) {
    this.subFlagModule2++;
    window.localStorage.setItem('subFlagModule2', this.subFlagModule2.toString());
  }
  start() {
    this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 3.2', window.localStorage.getItem('username'), 10);
  }

}

