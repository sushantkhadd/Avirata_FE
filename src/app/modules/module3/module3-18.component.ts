import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { LanguageService } from 'src/app/language.service';
import { LocalstoragedetailsService } from 'src/app/services/localstoragedetails.service';
import { Module3Service } from './module3.service';
import { ToastsManager } from 'ng6-toastr';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {FullLayoutService} from '../../layouts/full-layout.service'
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-module3-18',
  templateUrl: './module3-18.component.html'
})
export class Module318Component implements OnInit {
  constructor(public FullLayoutService: FullLayoutService, public LanguageService: LanguageService, public Module3Service: Module3Service, public toastr: ToastsManager, public translate: TranslateService, public router: Router,public LocalstoragedetailsService: LocalstoragedetailsService) { }

  public finalCount;
  public imgUrl; passValues = {};
  public download; link; showCFU; apiUrl;
  public cfuQuestion = {};
  public startPdf; mainFlagModule3; subFlagModule3; finishJSONBody = {};
  private pdfUrl = environment.pdfUrl;pdf1;

  ngOnInit() {
    this.pdf1='https://s3-ap-southeast-1.amazonaws.com/maacpd/english/level1/module4/4.8_our+progress+card.pdf'
    this.startPdf = false
    this.mainFlagModule3 = parseInt(window.localStorage.getItem('mainFlagModule3'));
    this.subFlagModule3 = parseInt(window.localStorage.getItem('subFlagModule3'));

    if (this.mainFlagModule3 > 18) {
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
      var unlockJson={}
       unlockJson=JSON.parse(window.localStorage.getItem('currentJson3'))
      if (unlockJson['children'].length > 0) {
        var index = unlockJson['children'].findIndex(item =>
          item.source == "module 3.18");

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
      this.Module3Service.finishModuleCall(this.finishJSONBody, 18, '/modules/module4', '/modules/module4')
    }
  }

  start() {
    // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 4.9', window.localStorage.getItem('username'), 10);
    this.finishJSONBody['submoduleid'] = window.localStorage.getItem('uuid');
    this.finishJSONBody['useroption'] = "";
    this.finishJSONBody['event'] = "start";
    
    this.Module3Service.apiCall(this.finishJSONBody, 'modulethreesingleurl/')
      .subscribe(
      data => {
        if (data['message'] == 'ok' || data['message'] == 'submodule started') {
          this.passValues['url'] = data['data'].url;
          this.startPdf = true;
          var current3=[]
          current3=JSON.parse(window.localStorage.getItem('currentJson3'))
          var child={}
          var index=current3['children'].findIndex(item => item.source=='module 3.18');
          current3['children'][index].url=data['data'].url;
          window.localStorage.setItem('currentJson3',JSON.stringify(current3))
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      });
  }
}
