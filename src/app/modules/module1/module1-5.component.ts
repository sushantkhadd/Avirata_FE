import { Component, OnInit, ViewContainerRef, ViewChild } from "@angular/core";
import { LanguageService } from "src/app/language.service";
import { LocalstoragedetailsService } from "src/app/services/localstoragedetails.service";
import { Module1Service } from "./module1.service";
import { ToastsManager } from "ng6-toastr";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ModalDirective } from "ngx-bootstrap";
import { FullLayoutService } from "src/app/layouts/full-layout.service";

@Component({
  selector: "app-module1-5",
  templateUrl: "./module1-5.component.html"
})
export class Module15Component implements OnInit {

  @ViewChild('staticImageModal') public staticImageModal: ModalDirective;
  @ViewChild('instructionModal') public instructionModal: ModalDirective;

  public mainFlagModule1 = parseInt(window.localStorage.getItem('mainFlagModule1'));
  public subFlagModule1 = parseInt(window.localStorage.getItem('subFlagModule1'));
  constructor(public FullLayoutService: FullLayoutService, public LanguageService: LanguageService, public Module1Service: Module1Service, public router: Router, public LocalstoragedetailsService: LocalstoragedetailsService, public toastr: ToastsManager, vcr: ViewContainerRef, public translate: TranslateService) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  public showVideoFlag; nextBtnFlag; passData = {}; passUrl; videoData = {}; urlArray = {}; lnk1; lnk2; flag;
  public statVideoFlag; thumb_title;
  ngOnInit() {
    this.lnk1 = ''
    this.lnk2 = ''
    this.urlArray["src1"] = "skGFDAhQrhE";
    this.urlArray["src2"] = "opHKXAPIynA";
    this.urlArray['v_thumb'] = './../../assets/img/video-thumb.png'

    this.showVideoFlag = false
    this.nextBtnFlag = false

    if (this.mainFlagModule1 == 5)
    {
      if (this.subFlagModule1 == 1)
      {
        this.start()
      } else if (this.subFlagModule1 == 2)
      {
        // this.start1()
      }
    }
    if (this.mainFlagModule1 > 5)
    {
      this.flag = 0;
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson1"));
      if (urlJson["children"].length > 0)
      {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 1.5"
        );
        if (urlJson["children"][index].url != null)
        {
          var mainJson;
          mainJson = JSON.parse(urlJson["children"][index].url);
          this.urlArray["src1"] = mainJson["1.5.1"];
          this.urlArray["src2"] = mainJson["1.5.2"];
        }
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
      window.localStorage.setItem('mainFlagModule1', '6');
      window.localStorage.setItem('subFlagModule1', '1');
      window.localStorage.setItem('source', 'module 1.6.1');
      this.Module1Service.setLocalStorage1(6);
      var obj = {
        "type": "submodule",
        "route": true,
        "current": this.translate.instant('L2Module1.subMenu1-5'),
        "next": this.translate.instant('L2Module1.subMenu1-6'),
        "nextRoute": "/modules/module1/Module1.6"
      }
      this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
    }
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module1Service.apiCall(jsonBody, apiUrl)
      .subscribe(
        data => {
          if (fun == 'start')
          {
            // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 3.8', window.localStorage.getItem('username'), 10);
            this.passData['apiUrl'] = "moduleonesingleurl/";
            this.passData['videoUrl'] = data['data'].url;
            this.showVideoFlag = true
            this.passUrl = data['data'].url;

            // var dummylocal = JSON.parse(window.localStorage.getItem('currentJson1'))
            // var index1 = dummylocal.children.findIndex(item =>
            //   item.source == "module 3.8");
            // dummylocal.children[index1].url = this.passUrl
            // window.localStorage.setItem('currentJson1', JSON.stringify(dummylocal))

          } if (fun == 'finish1')
          {
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

  showVideo(src, title, value) {
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
