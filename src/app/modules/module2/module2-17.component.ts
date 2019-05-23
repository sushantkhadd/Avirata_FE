import { Component, OnInit } from '@angular/core';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Module2Service } from './module2.service'
import { FullLayoutService } from '../../layouts/full-layout.service';
import { ToastsManager } from 'ng6-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'selector',
  templateUrl: './module2-17.component.html',
})
export class Module217Component implements OnInit {
  constructor(public FullLayoutService: FullLayoutService, public LanguageService: LanguageService, public Module2Service: Module2Service, public toastr: ToastsManager, public translate: TranslateService, public router: Router,public LocalstoragedetailsService: LocalstoragedetailsService) { }

  public finalCount;
  public imgUrl; passValues = {};
  public download; link; showCFU; apiUrl;
  public cfuQuestion = {};
  public startPdf; mainFlagModule2; subFlagModule2; finishJSONBody = {};
  private pdfUrl = environment.pdfUrl;pdf1;

  ngOnInit() {
    this.pdf1='https://s3-ap-southeast-1.amazonaws.com/maacpd/english/level1/module4/4.8_our+progress+card.pdf'
    this.startPdf = false
    this.mainFlagModule2 = parseInt(window.localStorage.getItem('mainFlagModule2'));
    this.subFlagModule2 = parseInt(window.localStorage.getItem('subFlagModule2'));

    if (this.mainFlagModule2 > 17) {
      this.showCFU = false;
      this.download = false;
      this.link = '';
      this.apiUrl = '/assets/jsonfile/module4_6.json'
      this.finalCount = 22;
      this.passValues['download'] = this.download;
      this.passValues['link'] = this.link;
      this.passValues['finalcount'] = this.finalCount;
      this.passValues['showcfu'] = this.showCFU;
      this.passValues['apiurl'] = this.apiUrl;
      this.passValues["unlockView"] = "static";
      var unlockJson={}
       unlockJson=JSON.parse(window.localStorage.getItem('currentJson2'))
      if (unlockJson['children'].length > 0) {
        var index = unlockJson['children'].findIndex(item =>
          item.source == "module 2.17");

        if (unlockJson['children'][index].url != null) {
          this.passValues['url'] = unlockJson['children'][index].url
        } 
      }
    }

  }
  finishPDF(e) {
    this.finishJSONBody['submoduleid'] = window.localStorage.getItem('uuid');
    this.finishJSONBody['useroption'] = "";
    this.finishJSONBody['event'] = "finish";
    if (e == true) {
      this.Module2Service.finishModuleCall(this.finishJSONBody, 17, '/modules/module3', '/modules/module3')
    }
  }

  start() {
    // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 4.9', window.localStorage.getItem('username'), 10);
    this.finishJSONBody['submoduleid'] = window.localStorage.getItem('uuid');
    this.finishJSONBody['useroption'] = "";
    this.finishJSONBody['event'] = "start";
    
    this.Module2Service.apiCall(this.finishJSONBody, 'moduletwosingleurl/')
      .subscribe(
      data => {
        if (data['message'] == 'ok' || data['message'] == 'submodule started') {
          this.passValues['url'] = data['data'].url;
          this.startPdf = true;
          var current2=[]
          current2=JSON.parse(window.localStorage.getItem('currentJson2'))
          var child={}
          var index=current2['children'].findIndex(item => item.source=='module 2.17');
          current2['children'][index].url=data['data'].url;
          window.localStorage.setItem('currentJson2',JSON.stringify(current2))
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      });
  }
}
