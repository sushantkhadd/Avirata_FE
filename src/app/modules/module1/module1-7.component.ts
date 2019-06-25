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
      this.passData['apiUrl'] = "";
      this.passData['status'] = false;  //first time call

      if (this.FullLayoutService.currentJson1.length > 0)
      {
        var index = this.FullLayoutService.currentJson1.findIndex(item =>
          item.source == "module 1.7");
        if (this.FullLayoutService.currentJson1[index].url != null)
        {
          this.passData['videoUrl'] = this.FullLayoutService.currentJson1[index].url
        } else
        {
          this.passData['videoUrl'] = this.passUrl
        }
      } else
      {
        this.passData['videoUrl'] = this.passUrl
      }
    }
  }
  finishCFU(e) {
    if (e)
    {
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
    // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 1.2', window.localStorage.getItem('username'), 10);
  }

}
