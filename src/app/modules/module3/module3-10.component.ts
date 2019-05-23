import { Component, OnInit} from '@angular/core';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {Module3Service} from './module3.service'
import { FullLayoutService } from '../../layouts/full-layout.service';

@Component({
  selector: 'app-module3-10',
  templateUrl: './module3-10.component.html'
})
export class Module310Component implements OnInit {
  public mainFlagModule3 = parseInt(window.localStorage.getItem('mainFlagModule3'));
  public subFlagModule3 = parseInt(window.localStorage.getItem('subFlagModule3'));
  public token; startVideoEvent;
  public passData = {};//used when CFU completed
  public videoData = {};passUrl;

  public currentSource = window.localStorage.getItem('source');

  constructor(public FullLayoutService:FullLayoutService, public LanguageService:LanguageService,public LocalstoragedetailsService: LocalstoragedetailsService, private router: Router, public Module3Service: Module3Service,public translate: TranslateService) { }

  ngOnInit() {
    this.passUrl='IkzkQ-Xft4c'
    this.currentSource = window.localStorage.getItem('source');
    this.startVideoEvent = false;

    this.token = this.LocalstoragedetailsService.token
    if (this.token == null) {
      this.router.navigate(['/']);
    }

    if (this.subFlagModule3 == 1) {
    }
     if (this.mainFlagModule3 < 10) {

    }
     else if (this.mainFlagModule3 == 10)
     {
      this.startVideoEvent = false;
      this.videoData['apiUrl'] = 'modulethreecfustart/';
    }
    else if (this.mainFlagModule3 > 10) {
      this.passData['apiUrl'] = "";
      this.passData['status'] = false;  //first time call

      if (this.FullLayoutService.currentJson3.length > 0) {
        var index = this.FullLayoutService.currentJson3.findIndex(item =>
          item.source == "module 3.10");
        if (this.FullLayoutService.currentJson3[index].url != null) {
          this.passData['videoUrl'] = this.FullLayoutService.currentJson3[index].url
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
      window.localStorage.setItem('mainFlagModule3', '11');
      window.localStorage.setItem('subFlagModule3', '1');
      window.localStorage.setItem('source', 'module 3.11');
      this.Module3Service.setLocalStorage3(11);
      var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module3.subMenu3-10'), "next": this.translate.instant('L2Module3.subMenu3-11'), "nextRoute": "/modules/module3/Module3.11" }
      this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
    }
    else {
      window.localStorage.setItem('mainFlagModule3', '10');
      this.router.navigate(['/modules/module3/Module3.13']);
    }
  }
  singleCFUComplete(e) {
    this.subFlagModule3++;
    window.localStorage.setItem('subFlagModule3', this.subFlagModule3.toString());
  }
  start(){
    // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 1.2', window.localStorage.getItem('username'), 10);
  }
}
