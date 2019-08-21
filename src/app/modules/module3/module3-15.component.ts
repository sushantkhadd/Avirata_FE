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
  selector: 'app-module3-15',
  templateUrl: './module3-15.component.html'
})
export class Module315Component implements OnInit {
  public finalCount;
  public imgUrl; passValues = {};
  public download; link; showCFU; apiUrl;
  public cfuQuestion = {};
  public startPdf; mainFlagModule3; subFlagModule3; finishJSONBody = {};
  private pdfUrl = environment.pdfUrl; pdf1;

  public showPDF; docData = {}; urlArray = {};

  constructor(public Module3Service: Module3Service, public FullLayoutService: FullLayoutService, public LanguageService: LanguageService, public router: Router, public LocalstoragedetailsService: LocalstoragedetailsService, public toastr: ToastsManager, vcr: ViewContainerRef, public translate: TranslateService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.pdf1 = 'https://s3-ap-southeast-1.amazonaws.com/maacpd/Level2/Module5/5.7/%E0%A5%AB.%E0%A5%AD+-+%E0%A4%85%E0%A4%AD%E0%A4%BF%E0%A4%95%E0%A5%8D%E0%A4%B7%E0%A4%AE%E0%A4%A4%E0%A4%BE+%E0%A4%9A%E0%A4%BE%E0%A4%9A%E0%A4%A3%E0%A5%80+%E0%A4%85%E0%A4%B9%E0%A4%B5%E0%A4%BE%E0%A4%B2+%E0%A4%B8%E0%A4%AE%E0%A4%9C%E0%A4%A3%E0%A5%87.pdf';

    this.mainFlagModule3 = parseInt(window.localStorage.getItem('mainFlagModule3'));
    this.subFlagModule3 = parseInt(window.localStorage.getItem('subFlagModule3'));

    this.urlArray['src1'] = ''
    this.urlArray['pdf_thumb'] = './../../assets/img/pdf_thumb.png';


    this.startPdf = false;

    if (this.mainFlagModule3 < 15) {

    }
    else if (this.mainFlagModule3 == 15) {

    }

    else if (this.mainFlagModule3 > 15) {
      this.docData['download'] = false
      this.docData['link'] = ''
      this.docData['state'] = 'static';
      this.passValues["unlockView"] = "static";

       var unlockJson={}
       unlockJson=JSON.parse(window.localStorage.getItem('currentJson3'))

      if (unlockJson['children'].length > 0) {
        var index = unlockJson['children'].findIndex(item =>
          item.source == "module 3.15");
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
    this.docData['apiurl'] = 'modulethreecfustart/';
    this.docData['apiurlResult'] = 'modulethreecfustart/';
    this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 3.15', window.localStorage.getItem('username'), 10);
  }

  checkAnswer(e) {
 console.log("complete status")
 console.log("com ",e)
    var current3=[]
    current3=JSON.parse(window.localStorage.getItem('currentJson3'))
    var child={}
     var index=current3['children'].findIndex(item => item.source=='module 3.15');
    current3['children'][index].url=e['url']
    console.log("urlllllllll",e['url'])
    window.localStorage.setItem('currentJson3',JSON.stringify(current3))

    this.mainFlagModule3 = 16;
    this.subFlagModule3 = 1;
    window.localStorage.setItem("mainFlagModule3", "16");
    window.localStorage.setItem("subFlagModule3", "1");
    this.Module3Service.setLocalStorage3(16);
    var obj = {
      type: "submodule",
      route: true,
      current: this.translate.instant("L2Module3.subMenu3-15"),
      next: this.translate.instant("L2Module3Finish.subMenu3-16"),
      nextRoute: "/modules/module3/Module3.16"
    };
    this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));

  }
}
