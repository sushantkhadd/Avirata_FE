import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import { Module0Service } from './module0.service'
import { FullLayoutService } from 'src/app/layouts/full-layout.service';

@Component({
  selector: 'app-module0-3',
  templateUrl: './module0-3.component.html'
})
export class Module03Component implements OnInit {

  @ViewChild('instructionModal') public instructionModal: ModalDirective;

  public mainFlagModule0 = parseInt(window.localStorage.getItem('mainFlagModule0'));
  public subFlagModule0 = parseInt(window.localStorage.getItem('subFlagModule0'));
  showCFU: boolean;
  download: boolean;
  passValues={};
  finishJSONBody: any;
  constructor(public FullLayoutService: FullLayoutService, public LanguageService: LanguageService, public Module0Service: Module0Service, public router: Router, public LocalstoragedetailsService: LocalstoragedetailsService, public toastr: ToastsManager, vcr: ViewContainerRef, public translate: TranslateService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  public showVideoFlag; nextBtnFlag; passData = {}; passUrl; videoData = {}; urlArray = {}; lnk1; lnk2; flag; parentUrlJson = {}
  public statVideoFlag; thumb_title; vedioCompleteUrl;

  ngOnInit() {
    this.lnk1 = ''
    this.lnk2 = ''
    this.urlArray["src1"] = "skGFDAhQrhE";
    this.urlArray["src2"] = "opHKXAPIynA";
    this.urlArray['v_thumb'] = './../../assets/img/video-thumb.png'

    this.showVideoFlag = false

    if (this.mainFlagModule0 == 3) {
      this.start()
    }

    else if (this.mainFlagModule0 > 3) {

      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson0"));
      console.log("vcxxxx", urlJson);
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 0.3"
        );
        console.log("qWSS", index);
        // var mainJson;
        // mainJson = JSON.parse(urlJson["children"][index].url);
        // console.log("hjbhjb", mainJson);
        if (urlJson["children"][index].url != null) {
          // this.urlArray["src1"] = mainJson["4.1.1"];
          this.passData["videoUrl"] = urlJson["children"][index].url;
        }
      }
    }
  }


  start() {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'start'
    this.apiCall(jsonBody, 'modulezerosingleurl/', 'start')
  }
  videoFinish(e) {
    console.log('video finish', e)
    if (e == true) {
      this.instructionModal.show()
      this.LanguageService.toShow();
      this.nextBtnFlag = true
    }
  }
  next() {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'finish'
    this.apiCall(jsonBody, 'modulezerosingleurl/', 'finish1')
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module0Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "start") {
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 0.3', window.localStorage.getItem('username'), 10);

            this.passData['apiUrl'] = "modulezerosingleurl/";
            this.passData['videoUrl'] = data['data'].url;
            console.log("sacsac", this.passData)

            if (this.subFlagModule0 == 2) {
              this.showCFU = false;
              this.passValues['url'] = data['data'].url;
            } else {

            }
            this.showVideoFlag = true
            this.passUrl = data['data'].url;
            var current0 = [];
            current0 = JSON.parse(window.localStorage.getItem("currentJson0"));
            var index = current0["children"].findIndex(
              item => item.source == "module 0.3");
            current0["children"][index].url = this.passUrl;

            window.localStorage.setItem("currentJson0", JSON.stringify(current0));
          } else if (fun == "finish1") {
            this.instructionModal.hide();
            this.LanguageService.toHide();
            window.localStorage.setItem('uuid', data['data'].nextuuid)
            window.localStorage.setItem('mainFlagModule0', '4');
            window.localStorage.setItem('subFlagModule0', '1');
            window.localStorage.setItem('source', 'module 0.4');
            this.Module0Service.setLocalStorage0(3);
            var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module0.subMenu0-2'), "next": this.translate.instant('L2Module0Finish.subMenu0-3'), "nextRoute": "/modules/module0/baseline1" }
            this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
          }
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }

  finishPDF(e) {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'finish'
    this.apiCall(jsonBody, 'modulezerosingleurl/', 'finish1')
  }
}
