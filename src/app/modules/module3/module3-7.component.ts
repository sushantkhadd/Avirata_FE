import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Module3Service } from './module3.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/language.service';
import { FullLayoutService } from 'src/app/layouts/full-layout.service';
import { Router } from '@angular/router';
import { LocalstoragedetailsService } from 'src/app/services/localstoragedetails.service';
import { ToastsManager } from 'ng6-toastr';

@Component({
  selector: 'app-module3-7',
  templateUrl: './module3-7.component.html'
})
export class Module37Component implements OnInit {

  public mainFlagModule3 = parseInt(window.localStorage.getItem('mainFlagModule3'));
  public subFlagModule3 = parseInt(window.localStorage.getItem('subFlagModule3'));

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

    if (this.subFlagModule3 == 1)
    {
    }
    if (this.mainFlagModule3 < 7)
    {

    }
    else if (this.mainFlagModule3 == 7)
    {
      this.startVideoEvent = false;
      this.videoData['apiUrl'] = 'modulethreecfustart/';
    }
    else if (this.mainFlagModule3 > 7)
    {
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson3"));
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 3.7"
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
        item => item.source == "module 3.7");
      current3["children"][index].url = e['url'];

      window.localStorage.setItem("currentJson3", JSON.stringify(current3));
      window.localStorage.setItem('mainFlagModule3', '8');
      window.localStorage.setItem('subFlagModule3', '1');
      window.localStorage.setItem('source', 'module 3.8.1');
      this.Module3Service.setLocalStorage3(7);
      var obj = {
        "type": "submodule",
        "route": true,
        "current": this.translate.instant('L2Module3.subMenu3-7'),
        "next": this.translate.instant('L2Module3Finish.subMenu3-8'),
        "nextRoute": "/modules/module3/Module3.8"
      }
      this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
    }
    else
    {
      window.localStorage.setItem('mainFlagModule3', '7');
      this.router.navigate(['/modules/module3/Module3.7']);
    }
  }
  singleCFUComplete(e) {
    this.subFlagModule3++;
    window.localStorage.setItem('subFlagModule3', this.subFlagModule3.toString());
  }
  start() {
    this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 3.7', window.localStorage.getItem('username'), 10);
  }
  
}
