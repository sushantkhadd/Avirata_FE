import { Component, OnInit} from '@angular/core';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {Module3Service} from './module3.service'
import { FullLayoutService } from '../../layouts/full-layout.service';

@Component({
  selector: 'app-module3-6',
  templateUrl: './module3-6.component.html'
})
export class Module36Component implements OnInit {
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
     if (this.mainFlagModule3 < 6) {

    }
     else if (this.mainFlagModule3 == 6)
     {
      this.startVideoEvent = false;
      this.videoData['apiUrl'] = 'modulethreecfustart/';
    }
    else if (this.mainFlagModule3 > 6) {
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson3"));
      console.log("vcxxxx",urlJson)
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 3.6"
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
  finishCFU(result) {
    if (result["status"] == true) {
      console.log("event",result)
      var current3 = [];
      current3 = JSON.parse(window.localStorage.getItem("currentJson3")); 
      var index = current3["children"].findIndex(
      item => item.source == "module 3.6" );
      current3["children"][index].url = result["urls"]; 
      window.localStorage.setItem("currentJson3", JSON.stringify(current3))
      window.localStorage.setItem('mainFlagModule3', '7');
      window.localStorage.setItem('subFlagModule3', '1');
      window.localStorage.setItem('source', 'module 3.7');
      this.Module3Service.setLocalStorage3(7);
      var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module3.subMenu3-6'), "next": this.translate.instant('L2Module3Finish.subMenu3-7'), "nextRoute": "/modules/module3/Module3.7" }
      this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
    }
    else {
      window.localStorage.setItem('mainFlagModule3', '6');
      this.router.navigate(['/modules/module3/Module3.6']);
    }
  }
  singleCFUComplete(e) {
    this.subFlagModule3++;
    window.localStorage.setItem('subFlagModule3', this.subFlagModule3.toString());
  }
  start(){
    this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 3.6', window.localStorage.getItem('username'), 10);
  }

}
