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
  constructor(public FullLayoutService: FullLayoutService, public LanguageService: LanguageService, public Module3Service: Module3Service, public router: Router, public LocalstoragedetailsService: LocalstoragedetailsService, public toastr: ToastsManager, vcr: ViewContainerRef, public translate: TranslateService) {
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

    if (this.mainFlagModule3 == 1)
    {
      if (this.subFlagModule3 == 1)
      {
        this.start()
      } else if (this.subFlagModule3 == 2)
      {
        // this.start1()
      }
    }
    if (this.mainFlagModule3 > 1)
    {
      this.flag = 0;
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson3"));
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 3.1"
        );
        if (urlJson["children"][index].url != null)
        {
          var mainJson;
          mainJson = JSON.parse(urlJson["children"][index].url);
          this.urlArray["src1"] = mainJson["3.1.1"];
          this.urlArray["src2"] = mainJson["3.1.2"];
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
    this.apiCall(jsonBody, 'modulethreesingleurl/', 'start')
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
    this.apiCall(jsonBody, 'modulethreecfustart/', 'finish1')
  }

  start1() {
    this.showVideoFlag = true
    this.videoData['apiUrl'] = 'modulethreecfustart/';
  }

  finishCFU(e) {
    if (e)
    {
      var current3 = [];
      current3 = JSON.parse(window.localStorage.getItem("currentJson3"));
      var index = current3["children"].findIndex(
      item => item.source == "module 3.1");
      var moduleJson = current3["children"][index]
      if(moduleJson["children"].length !=0){
      var index3 = moduleJson["children"].findIndex(
      item => item.source == "module 3.1.1");
      if(moduleJson["children"][index3].url !="" && moduleJson["children"][index3].url !=null && moduleJson["children"][index3].url !=undefined){
      this.parentUrlJson['3.1.1'] = moduleJson["children"][index3].url;
      }
      }
      this.parentUrlJson['3.1.2'] = e['url'];
      current3["children"][index].url = JSON.stringify(this.parentUrlJson);

      window.localStorage.setItem("currentJson3", JSON.stringify(current3));
      window.localStorage.setItem('mainFlagModule3', '2');
      window.localStorage.setItem('subFlagModule3', '1');
      window.localStorage.setItem('source', 'module 3.2');
      this.Module3Service.setLocalStorage3(2);
      var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module3.subMenu3-1'), "next": this.translate.instant('L2Module3Finish.subMenu3-2'), "nextRoute": "/modules/module3/Module3.2" }
      this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
    }
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module3Service.apiCall(jsonBody, apiUrl)
      .subscribe(
        data => {
          if (fun == 'start')
          {
            this.LanguageService.googleEventTrack('L3SubmoduleStatus', 'Module 3.1', window.localStorage.getItem('username'), 10);
            this.passData['apiUrl'] = "modulethreesingleurl/";
            this.passData['videoUrl'] = data['data'].url;
            this.showVideoFlag = true
            this.passUrl = data['data'].url;

            this.parentUrlJson["1.1.1"] = this.passUrl;
            var current3 = [];
            current3 = JSON.parse(window.localStorage.getItem("currentJson3"));
            var index = current3["children"].findIndex(
              item => item.source == "module 3.1");
            current3["children"][index].url = JSON.stringify(this.parentUrlJson);

            window.localStorage.setItem("currentJson3", JSON.stringify(current3));

            // var dummylocal = JSON.parse(window.localStorage.getItem('currentJson3'))
            // var index3 = dummylocal.children.findIndex(item =>
            //   item.source == "module 3.8");
            // dummylocal.children[index3].url = this.passUrl
            // window.localStorage.setItem('currentJson3', JSON.stringify(dummylocal))

          } else if (fun == 'finish1') {
            this.instructionModal.hide()
            this.LanguageService.toHide();
            this.showVideoFlag = false
            window.localStorage.setItem('uuid', data['data'].nextuuid)
            this.subFlagModule3 = this.subFlagModule3 + 1
            window.localStorage.setItem('subFlagModule3', this.subFlagModule3.toString())
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
    // this.subFlagModule3++;
    // window.localStorage.setItem('subFlagModule2', this.subFlagModule3.toString());
  }
}
