import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import {Module1Service} from './module1.service'
import { CommonService } from 'src/app/services/common.service';
import { FullLayoutService } from 'src/app/layouts/full-layout.service';

@Component({
  selector: 'app-module1',
  templateUrl: './module1.component.html'
})
export class Module1Component implements OnInit {

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

    if (this.mainFlagModule1 == 1)
    {
      if (this.subFlagModule1 == 1)
      {
        this.start()
      } else if (this.subFlagModule1 == 2)
      {
        // this.start1()
      }
    }
    if (this.mainFlagModule1 > 1)
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
      this.parentUrlJson['1.1.1'] = moduleJson["children"][index1].url;
      }
      this.parentUrlJson['1.1.2'] = e['url'];
      current1["children"][index].url = JSON.stringify(this.parentUrlJson);

      window.localStorage.setItem("currentJson1", JSON.stringify(current1));
      window.localStorage.setItem('mainFlagModule1', '2');
      window.localStorage.setItem('subFlagModule1', '1');
      window.localStorage.setItem('source', 'module 1.2');
      this.Module1Service.setLocalStorage1(2);
      var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module1.subMenu1-1'), "next": this.translate.instant('L2Module1Finish.subMenu1-2'), "nextRoute": "/modules/module1/Module1.2" }
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
