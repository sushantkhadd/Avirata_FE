import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { LanguageService } from 'src/app/language.service';
import { LocalstoragedetailsService } from 'src/app/services/localstoragedetails.service';
import { Module5Service } from './module5.service';
import { ToastsManager } from 'ng6-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {FullLayoutService} from '../../layouts/full-layout.service'

@Component({
  selector: 'app-module5-16',
  templateUrl: './module5-16.component.html'
})
export class Module516Component implements OnInit {

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
     if (this.mainFlagModule5 < 16) {

    }
     else if (this.mainFlagModule5 == 16)
     {
      this.startVideoEvent = false;
      this.videoData['apiUrl'] = 'modulefivecfustart/';
    }
    else if (this.mainFlagModule5 > 16) {
      this.passData['apiUrl'] = "";
      this.passData['status'] = false;  //first time call

      if (this.FullLayoutService.currentJson5.length > 0) {
        var index = this.FullLayoutService.currentJson5.findIndex(item =>
          item.source == "module 5.16");
        if (this.FullLayoutService.currentJson5[index].url != null) {
          this.passData['videoUrl'] = this.FullLayoutService.currentJson5[index].url
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
      window.localStorage.setItem('mainFlagModule5', '17');
      window.localStorage.setItem('subFlagModule5', '1');
      window.localStorage.setItem('source', 'module 5.17');
      this.Module5Service.setLocalStorage5(9);
      var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module5.subMenu5-16'), "next": this.translate.instant('L2Module5Finish.subMenu5-17'), "nextRoute": "/modules/module5/Module5.17" }
      this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
    }
    else {
      window.localStorage.setItem('mainFlagModule5', '9');
      this.router.navigate(['/modules/module5/Module5.8']);
    }
  }
  singleCFUComplete(e) {
    this.subFlagModule5++;
    window.localStorage.setItem('subFlagModule5', this.subFlagModule5.toString());
  }
  start(){
    // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 1.2', window.localStorage.getItem('username'), 10);
  }

}
