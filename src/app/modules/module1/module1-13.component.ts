import { Component, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "src/app/language.service";
import { FullLayoutService } from "src/app/layouts/full-layout.service";
import { Router } from "@angular/router";
import { LocalstoragedetailsService } from "src/app/services/localstoragedetails.service";
import { ToastsManager } from "ng6-toastr";
import { Module1Service } from "./module1.service";
import { environment } from "src/environments/environment";
import { ModalDirective } from "ngx-bootstrap";

@Component({
  selector: "app-module1-13",
  templateUrl: "./module1-13.component.html"
})
export class Module113Component implements OnInit {

  
  @ViewChild('staticImageModal') public staticImageModal: ModalDirective;
  @ViewChild('instructionModal') public instructionModal: ModalDirective;

  public mainFlagModule1 = parseInt(window.localStorage.getItem('mainFlagModule1'));
  public subFlagModule1 = parseInt(window.localStorage.getItem('subFlagModule1'));
  constructor(public FullLayoutService: FullLayoutService, public LanguageService: LanguageService, public Module1Service: Module1Service, public router: Router, public LocalstoragedetailsService: LocalstoragedetailsService, public toastr: ToastsManager, vcr: ViewContainerRef, public translate: TranslateService) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  public showVideoFlag; nextBtnFlag; passData = {}; passUrl; videoData = {}; urlArray = {}; lnk1; lnk2; flag;parentUrlJson = {}
  public statVideoFlag; thumb_title;
  ngOnInit() {
    this.lnk1 = ''
    this.lnk2 = ''
    this.urlArray["src1"] = "skGFDAhQrhE";
    this.urlArray["src2"] = "opHKXAPIynA";
    this.urlArray['v_thumb'] = './../../assets/img/video-thumb.png'

    this.showVideoFlag = false
    this.nextBtnFlag = false

    if (this.mainFlagModule1 == 13)
    {
      if (this.subFlagModule1 == 1)
      {
        this.start()
      } else if (this.subFlagModule1 == 2)
      {
        // this.start1()
      }
    }
    if (this.mainFlagModule1 > 13)
    {
      this.flag = 0;
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson1"));
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 1.1"
        );
        if (urlJson["children"][index].url != null)
        {
          var mainJson;
          mainJson = JSON.parse(urlJson["children"][index].url);
          this.urlArray["src1"] = mainJson["1.1.1"];
          this.urlArray["src2"] = mainJson["1.1.2"];
        } else {
          this.mapJSON();
        }
      } else {
        this.mapJSON();
      }
    }
  }

  mapJSON() {
    this.urlArray['src1'] = this.lnk1
    this.urlArray['src2'] = this.lnk2
  }

  start() {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'start'
    this.apiCall(jsonBody, 'moduleonesingleurl/', 'start')
  }

  videoFinish(e) {
    console.log("videoFinish",e);
    if (e == true)
    {
      this.instructionModal.show()
      this.LanguageService.toShow();
      this.nextBtnFlag = true
    }
  }

  next() {
    var jsonBody = {}
    jsonBody['submoduleid'] = window.localStorage.getItem('uuid')
    jsonBody['event'] = 'finish'
    this.apiCall(jsonBody, 'moduleonesingleurl/', 'finish1')
  }

  start1() {
    this.showVideoFlag = true
    this.videoData['apiUrl'] = 'moduleonecfustart/';
  }

  finishCFU(e) {
    if (e)
    {
      var current1 = [];
      current1 = JSON.parse(window.localStorage.getItem("currentJson1"));
      var index = current1["children"].findIndex(
      item => item.source == "module 1.1");
      var moduleJson = current1["children"][index]
      if(moduleJson["children"].length !=0){
      var index1 = moduleJson["children"].findIndex(
      item => item.source == "module 1.1.1");
      if(moduleJson["children"][index1].url !="" && moduleJson["children"][index1].url !=null && moduleJson["children"][index1].url !=undefined){
      this.parentUrlJson['1.1.1'] = moduleJson["children"][index1].url;
      }
      }
      this.parentUrlJson['1.1.2'] = e['url'];
      current1["children"][index].url = JSON.stringify(this.parentUrlJson);

      window.localStorage.setItem("currentJson1", JSON.stringify(current1));
      window.localStorage.setItem('mainFlagModule1', '14');
      window.localStorage.setItem('subFlagModule1', '1');
      window.localStorage.setItem('source', 'module 1.14');
      this.Module1Service.setLocalStorage1(14);
      var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module1.subMenu1-13'), "next": this.translate.instant('L2Module1Finish.subMenu1-14'), "nextRoute": "/modules/module1/Module1.14" }
      this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
    }
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module1Service.apiCall(jsonBody, apiUrl)
      .subscribe(
        data => {
          if (fun == 'start')
          {
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 1.1', window.localStorage.getItem('username'), 10);
            this.passData['apiUrl'] = "moduleonesingleurl/";
            this.passData['videoUrl'] = data['data'].url;
            this.showVideoFlag = true
            this.passUrl = data['data'].url;

            this.parentUrlJson["1.1.1"] = this.passUrl;
            var current1 = [];
            current1 = JSON.parse(window.localStorage.getItem("currentJson1"));
            var index = current1["children"].findIndex(
              item => item.source == "module 1.1");
            current1["children"][index].url = JSON.stringify(this.parentUrlJson);

            window.localStorage.setItem("currentJson1", JSON.stringify(current1));

            // var dummylocal = JSON.parse(window.localStorage.getItem('currentJson1'))
            // var index1 = dummylocal.children.findIndex(item =>
            //   item.source == "module 3.8");
            // dummylocal.children[index1].url = this.passUrl
            // window.localStorage.setItem('currentJson1', JSON.stringify(dummylocal))

          } else if (fun == 'finish1') {
            this.instructionModal.hide()
            this.LanguageService.toHide();
            this.showVideoFlag = false
            window.localStorage.setItem('uuid', data['data'].nextuuid)
            this.subFlagModule1 = this.subFlagModule1 + 1
            window.localStorage.setItem('subFlagModule1', this.subFlagModule1.toString())
            // this.start1()
          }
        },
        error => {
          this.LanguageService.handleError(error.error.message);
        });
  }

  showVideo(src, title,value) {
    // this.staticImageModal.show();
    // this.statVideoFlag = true;
    // this.statImageFlag = false;
    if (value == 1)
    {
      this.passData['videoUrl'] = src;
      this.thumb_title = title;
      this.flag = value;
    } else if (value == 2)
    {
      this.passData['videoUrl'] = src;
      this.thumb_title = title;
      this.flag = value;
    }

  }

  closeModal() {
    // this.imageSrc = "";
    this.statVideoFlag = false;
    this.passData['videoUrl'] = "";
    this.staticImageModal.hide();
    this.LanguageService.toHide();
  }

  singleCFUComplete(e) {
    // this.subFlagModule1++;
    // window.localStorage.setItem('subFlagModule2', this.subFlagModule1.toString());
  }
}
