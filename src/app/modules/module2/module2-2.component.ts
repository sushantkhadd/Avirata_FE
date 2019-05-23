import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/language.service';
import { FullLayoutService } from 'src/app/layouts/full-layout.service';
import { Router } from '@angular/router';
import { LocalstoragedetailsService } from 'src/app/services/localstoragedetails.service';
import { ToastsManager } from 'ng6-toastr';
import { Module2Service } from './module2.service';

@Component({
  selector: 'app-module2-2',
  templateUrl: './module2-2.component.html'
})
export class Module22Component implements OnInit {
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
     if (this.mainFlagModule2 < 2) {

    }
     else if (this.mainFlagModule2 == 2)
     {
      this.startVideoEvent = false;
      this.videoData['apiUrl'] = 'moduletwocfustart/';
    }
    else if (this.mainFlagModule2 > 2) {
      this.passData['apiUrl'] = "";
      this.passData['status'] = false;  //first time call

      if (this.FullLayoutService.currentJson2.length > 0) {
        var index = this.FullLayoutService.currentJson2.findIndex(item =>
          item.source == "module 2.2");
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
      window.localStorage.setItem('mainFlagModule2', '3');
      window.localStorage.setItem('subFlagModule2', '1');
      window.localStorage.setItem('source', 'module 2.3.1');
      this.Module2Service.setLocalStorage2(3);
      var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module2.subMenu2-2'), "next": this.translate.instant('L2Module2.subMenu2-3'), "nextRoute": "/modules/module2/Module2.3" }
      this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
    }
    else {
      window.localStorage.setItem('mainFlagModule2', '2');
      this.router.navigate(['/modules/module2/Module2.2']);
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
