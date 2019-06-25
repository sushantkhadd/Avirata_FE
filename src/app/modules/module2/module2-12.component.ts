import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { LanguageService } from 'src/app/language.service';
import { LocalstoragedetailsService } from 'src/app/services/localstoragedetails.service';
import { Module2Service } from './module2.service';
import { ToastsManager } from 'ng6-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {FullLayoutService} from '../../layouts/full-layout.service'

@Component({
  selector: 'app-module2-12',
  templateUrl: './module2-12.component.html'
})
export class Module212Component implements OnInit {
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
     if (this.mainFlagModule2 < 12) {

    }
     else if (this.mainFlagModule2 == 12)
     {
      this.startVideoEvent = false;
      this.videoData['apiUrl'] = 'moduletwocfustart/';
    }
    else if (this.mainFlagModule2 > 12) {
      this.passData['apiUrl'] = "";
      this.passData['status'] = false;  //first time call

      if (this.FullLayoutService.currentJson2.length > 0) {
        var index = this.FullLayoutService.currentJson2.findIndex(item =>
          item.source == "module 2.12");
        if (this.FullLayoutService.currentJson2[index].url != null) {
          this.passData['videoUrl'] = this.FullLayoutService.currentJson2[index].url
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
      window.localStorage.setItem('mainFlagModule2', '13');
      window.localStorage.setItem('subFlagModule2', '1');
      window.localStorage.setItem('source', 'module 2.13');
      this.Module2Service.setLocalStorage2(13);
      var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module2.subMenu2-12'), "next": this.translate.instant('L2Module2Finish.subMenu2-13'), "nextRoute": "/modules/module2/Module2.13" }
      this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
    }
    else {
      window.localStorage.setItem('mainFlagModule2', '12');
      this.router.navigate(['/modules/module2/Module2.12']);
    }
  }
  singleCFUComplete(e) {
    this.subFlagModule2++;
    window.localStorage.setItem('subFlagModule2', this.subFlagModule2.toString());
  }
  start(){
    // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 1.2', window.localStorage.getItem('username'), 10);
  }
}
