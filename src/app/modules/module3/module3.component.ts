import { Component, OnInit, ViewContainerRef, ViewChild } from "@angular/core";
import { LanguageService } from "src/app/language.service";
import { LocalstoragedetailsService } from "src/app/services/localstoragedetails.service";
import { Module3Service } from "./module3.service";
import { ToastsManager } from "ng6-toastr";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ModalDirective } from "ngx-bootstrap";
import { FullLayoutService } from "src/app/layouts/full-layout.service";

@Component({
  selector: "app-module3",
  templateUrl: "./module3.component.html"
})
export class Module3Component implements OnInit {
 
  @ViewChild('staticImageModal') public staticImageModal: ModalDirective;
  @ViewChild('instructionModal') public instructionModal: ModalDirective;

  public mainFlagModule3 = parseInt(window.localStorage.getItem('mainFlagModule3'));
  public subFlagModule3 = parseInt(window.localStorage.getItem('subFlagModule3'));

  showCFU: boolean;
  download: boolean;
  passValues = {};
  finishJSONBody: any;
  startVideoEvent;
  showpdfFlag: boolean;
  showVideoCFU; currentSource;
  constructor(public FullLayoutService: FullLayoutService, public LanguageService: LanguageService, public Module3Service: Module3Service, public router: Router, public LocalstoragedetailsService: LocalstoragedetailsService, public toastr: ToastsManager, vcr: ViewContainerRef, public translate: TranslateService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  public showVideoFlag; nextBtnFlag; passData = {}; passUrl; videoData = {}; urlArray = {}; lnk1; lnk2; flag; parentUrlJson = {}; playVideo;
  public statVideoFlag; thumb_title; vedioCompleteUrl;

  ngOnInit() {
    this.lnk1 = '';
    this.lnk2 = '';
    this.urlArray["src1"] = "skGFDAhQrhE";
    this.urlArray["src2"] = "opHKXAPIynA";
    this.urlArray['v_thumb'] = './../../assets/img/video-thumb.png';
    this.showVideoFlag=false;
    if (this.mainFlagModule3 == 1) {
      if(this.subFlagModule3 == 1){
        this.start();
      }
    }
  }

  start() {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['event'] = 'start';
    this.apiCall(jsonBody, 'modulethreesingleurl/', 'start');
  }

  videoFinish(e) {
    if (e == true) {
      this.instructionModal.show();
      this.LanguageService.toShow();
      this.nextBtnFlag = true;
    }
  }

  next() {
    this.subFlagModule3 = this.subFlagModule3 + 1
    window.localStorage.setItem('subFlagModule3', this.subFlagModule3.toString());
    var jsonBody = {};
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['event'] = 'finish';
    this.apiCall(jsonBody, 'modulethreesingleurl/', 'finish1');
  }

  start2() {
    var jsonBody = {}
    jsonBody['currentsubmoduleid'] = window.localStorage.getItem('uuid');
    jsonBody['useroption']= '';
    jsonBody['event'] = 'start';
    this.apiCall(jsonBody, 'modulethreecfustart/', 'start2');
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.startVideoEvent=false;
    this.Module3Service.apiCall(jsonBody, apiUrl).subscribe(
      data => {
        if (data["status"] == true) {
          if (fun == "start") {
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 3.1', window.localStorage.getItem('username'), 10);
            this.passData["videoUrl"] = data["data"].url;
            this.vedioCompleteUrl = data["data"].url;
            this.playVideo = true;
            var url ={}
            url['3.1.1'] = this.vedioCompleteUrl;
            console.log("urllll",url)
            var current3 = [];
            current3 = JSON.parse(window.localStorage.getItem("currentJson3")); 
            var index = current3["children"].findIndex(
              item => item.source == "module 3.1" );
            current3["children"][index].url = JSON.stringify(url); 
            window.localStorage.setItem("currentJson3", JSON.stringify(current3));

            // this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 3.1', window.localStorage.getItem('username'), 10);            
            // this.passData['apiUrl'] = "modulethreesingleurl/";
            // this.passData['videoUrl'] = data['data'].url;  
            // this.showVideoFlag = true;
            // var current3 = [];
            // current3 = JSON.parse(window.localStorage.getItem("currentJson3"));
            // var index = current3["children"].findIndex(
            //   item => item.source == "module 3.1");
            // //current1["children"][index].url = this.passUrl;
            // window.localStorage.setItem("currentJson3", JSON.stringify(current3));

          } else if (fun == "finish1") {

            this.instructionModal.hide();
            this.LanguageService.toHide();
            this.playVideo = false;
            this.statVideoFlag = true;
            this.mainFlagModule3 = 1;
            window.localStorage.setItem("uuid", data["data"].nextuuid);
            this.start2();
            // this.LanguageService.toHide();
            // window.localStorage.setItem('uuid', data['data'].nextuuid)
            // window.localStorage.setItem('mainFlagModule3', '2');
            // window.localStorage.setItem('subFlagModule3', '1');
            // window.localStorage.setItem('source', 'module 3.2');
            // this.Module3Service.setLocalStorage3(2);
            // var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module3.subMenu3-1'), "next": this.translate.instant('L2Module3Finish.subMenu3-2'), "nextRoute": "/modules/module3/Module3.2" }
            // this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
          } else if (fun == "start2") {
            this.videoData['apiUrl'] = 'modulethreecfustart/';
            this.videoData['videoUrl'] = data['data'].url;
            console.log('hello pravin',this.videoData)
            this.passUrl='IkzkQ-Xft4c';
            this.currentSource = window.localStorage.getItem('source');
            this.startVideoEvent = true;
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 3.2', window.localStorage.getItem('username'), 10);            
            this.showVideoCFU = true;
          }
        }
      },
      error => {
        this.LanguageService.handleError(error.error.message);
      }
    );
  }2

  finishCFU(e) {
    if (e)
    {
      var current3 = [];
      current3 = JSON.parse(window.localStorage.getItem("currentJson3"));
      var index = current3["children"].findIndex(
        item => item.source == "module 3.1");
      current3["children"][index].url = e['url'];

      window.localStorage.setItem("currentJson3", JSON.stringify(current3));
      window.localStorage.setItem('mainFlagModule3', '2');
      window.localStorage.setItem('subFlagModule3', '1');
      window.localStorage.setItem('source', 'module 3.2');
      this.Module3Service.setLocalStorage3(2);
      var obj = {
        "type": "submodule",
        "route": true,
        "current": this.translate.instant('L2Module3.subMenu3-1'),
        "next": this.translate.instant('L2Module3Finish.subMenu3-2'),
        "nextRoute": "/modules/module3/Module3.2"
      }
      this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
    }
    else
    {
      window.localStorage.setItem('mainFlagModule3', '1');
      this.router.navigate(['/modules/module3/Module3.1']);
    }
  }

  

}
