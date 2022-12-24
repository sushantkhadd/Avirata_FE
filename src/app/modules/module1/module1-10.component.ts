import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { LanguageService } from 'src/app/language.service';
import { Module1Service } from './module1.service';
import { Router } from '@angular/router';
import { LocalstoragedetailsService } from 'src/app/services/localstoragedetails.service';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import { FullLayoutService } from 'src/app/layouts/full-layout.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-module1-10',
  templateUrl: './module1-10.component.html'
})
export class Module110Component implements OnInit {

  public finalCount;
  public imgUrl; passValues = {};
  public download; link; showCFU; apiUrl;
  public cfuQuestion = {};
  public startPdf; mainFlagModule1; subFlagModule1; finishJSONBody = {};
  private pdfUrl = environment.pdfUrl; pdf1;

  public showPDF; docData = {}; urlArray = {};

  constructor(public Module1Service: Module1Service, public FullLayoutService: FullLayoutService, public LanguageService: LanguageService, public router: Router, public LocalstoragedetailsService: LocalstoragedetailsService, public toastr: ToastsManager, vcr: ViewContainerRef, public translate: TranslateService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.pdf1 = 'https://s3-ap-southeast-1.amazonaws.com/maacpd/Level2/Module5/5.7/%E0%A5%AB.%E0%A5%AD+-+%E0%A4%85%E0%A4%AD%E0%A4%BF%E0%A4%95%E0%A5%8D%E0%A4%B7%E0%A4%AE%E0%A4%A4%E0%A4%BE+%E0%A4%9A%E0%A4%BE%E0%A4%9A%E0%A4%A3%E0%A5%80+%E0%A4%85%E0%A4%B9%E0%A4%B5%E0%A4%BE%E0%A4%B2+%E0%A4%B8%E0%A4%AE%E0%A4%9C%E0%A4%A3%E0%A5%87.pdf';

    this.mainFlagModule1 = parseInt(window.localStorage.getItem('mainFlagModule1'));
    this.subFlagModule1 = parseInt(window.localStorage.getItem('subFlagModule1'));

    this.urlArray['src1'] = ''
    this.urlArray['pdf_thumb'] = './../../assets/img/pdf_thumb.png';


    this.startPdf = false;

    if (this.mainFlagModule1 < 10) {

    }
    else if (this.mainFlagModule1 == 10) {

    }

    else if (this.mainFlagModule1 > 10) {
      this.docData['download'] = false
      this.docData['link'] = ''
      this.docData['state'] = 'static';
      this.passValues["unlockView"] = "static";

       var unlockJson={}
       unlockJson=JSON.parse(window.localStorage.getItem('currentJson1'))

      if (unlockJson['children'].length > 0) {
        var index = unlockJson['children'].findIndex(item =>
          item.source == "module 1.10");
          console.log("unlockjson",unlockJson['children'][index].url)
        if (unlockJson['children'][index].url != null) {
          this.passValues['url'] = unlockJson['children'][index].url
        }
      }
      this.docData['showcfu'] = false;

    }
  }
  start() {
    console.log("pdf")
    this.startPdf = true;
    this.docData['state'] = 'dyanamic';
    this.docData['download'] = false;
    this.docData['link'] = '';
    this.docData['finalcount'] = 4;
    this.docData['showcfu'] = true;
    this.docData['apiurl'] = 'moduleonecfustart/';
    this.docData['apiurlResult'] = 'moduleonecfustart/';
    this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 1.10', window.localStorage.getItem('username'), 10);
  }

  checkAnswer(e) {
 console.log("complete status")
 console.log("com ",e)
    var current1=[]
    current1=JSON.parse(window.localStorage.getItem('currentJson1'))
    var child={}
     var index=current1['children'].findIndex(item => item.source=='module 1.10');
    current1['children'][index].url=e['url']
    console.log("urlllllllll",e['url'])
    window.localStorage.setItem('currentJson1',JSON.stringify(current1))

    this.mainFlagModule1 = 11;
    this.subFlagModule1 = 1;
    window.localStorage.setItem("mainFlagModule1", "11");
    window.localStorage.setItem("subFlagModule1", "1");
    this.Module1Service.setLocalStorage1(11);
    var obj = {
      type: "submodule",
      route: true,
      current: this.translate.instant("L2Module1.subMenu1-10"),
      next: this.translate.instant("L2Module1Finish.subMenu1-11"),
      nextRoute: "/modules/module1/Module1.11"
    };
    this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));

  }
}
