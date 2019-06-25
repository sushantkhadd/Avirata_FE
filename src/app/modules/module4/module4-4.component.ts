import { Component, OnInit,ViewContainerRef} from '@angular/core';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {Module4Service} from './module4.service'
import { FullLayoutService } from '../../layouts/full-layout.service';

@Component({
  selector: 'app-module4-4',
  templateUrl: './module4-4.component.html'
})
export class Module44Component implements OnInit {
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
     if (this.mainFlagModule4 < 4) {

    }
     else if (this.mainFlagModule4 == 4)
     {
      this.startVideoEvent = false;
      this.videoData['apiUrl'] = 'modulefourcfustart/';
    }
    else if (this.mainFlagModule4 > 4) {
      this.passData['apiUrl'] = "";
      this.passData['status'] = false;  //first time call

      if (this.FullLayoutService.currentJson4.length > 0) {
        var index = this.FullLayoutService.currentJson4.findIndex(item =>
          item.source == "module 4.4");
        if (this.FullLayoutService.currentJson4[index].url != null) {
          this.passData['videoUrl'] = this.FullLayoutService.currentJson4[index].url
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
      window.localStorage.setItem('mainFlagModule4', '5');
      window.localStorage.setItem('subFlagModule4', '1');
      window.localStorage.setItem('source', 'module 4.5.1');
      this.Module4Service.setLocalStorage4(5);
      var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module4.subMenu4-4'), "next": this.translate.instant('L2Module4Finish.subMenu4-5'), "nextRoute": "/modules/module4/Module4.5" }
      this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
    }
    else {
      window.localStorage.setItem('mainFlagModule4', '4');
      this.router.navigate(['/modules/module4/Module4.4']);
    }
  }
  singleCFUComplete(e) {
    this.subFlagModule4++;
    window.localStorage.setItem('subFlagModule4', this.subFlagModule4.toString());
  }
  start(){
    // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 1.2', window.localStorage.getItem('username'), 10);
  }

}
