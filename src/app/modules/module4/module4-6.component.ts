import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { LocalstoragedetailsService } from "../../services/localstoragedetails.service";
import { LanguageService } from './../../language.service';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng6-toastr';
import { TranslateService } from '@ngx-translate/core';
import {Module4Service} from './module4.service'
import { CommonService } from 'src/app/services/common.service';
import { FullLayoutService } from 'src/app/layouts/full-layout.service';

@Component({
  selector: 'app-module4-6',
  templateUrl: './module4-6.component.html'
})
export class Module46Component implements OnInit {
  @ViewChild('staticImageModal') public staticImageModal: ModalDirective;
  @ViewChild('instructionModal') public instructionModal: ModalDirective;

  public mainFlagModule4 = parseInt(window.localStorage.getItem('mainFlagModule4'));
  public subFlagModule4 = parseInt(window.localStorage.getItem('subFlagModule4'));
  constructor(public FullLayoutService: FullLayoutService, public LanguageService: LanguageService, public Module4Service: Module4Service, public router: Router, public LocalstoragedetailsService: LocalstoragedetailsService, public toastr: ToastsManager, vcr: ViewContainerRef, public translate: TranslateService) {
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

    if (this.mainFlagModule4 == 6)
    {
      if (this.subFlagModule4 == 1)
      {
        this.start()
      } else if (this.subFlagModule4 == 2)
      {
        // this.start1()
      }
    }
    if (this.mainFlagModule4 > 6)
    {
      this.flag = 0;
      var urlJson = {};
      urlJson = JSON.parse(window.localStorage.getItem("currentJson4"));
      if (urlJson["children"].length > 0) {
        var index = urlJson["children"].findIndex(
          item => item.source == "module 4.6"
        );
        if (urlJson["children"][index].url != null)
        {
          var mainJson;
          mainJson = JSON.parse(urlJson["children"][index].url);
          this.urlArray["src1"] = mainJson["4.6.1"];
          this.urlArray["src2"] = mainJson["4.6.2"];
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
    this.apiCall(jsonBody, 'modulefoursingleurl/', 'start')
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
    this.apiCall(jsonBody, 'modulefoursingleurl/', 'finish1')
  }
  start1() {
    this.showVideoFlag = true
    this.videoData['apiUrl'] = 'modulefourcfustart/';
  }
  finishCFU(e) {
    if (e)
    {
      
      var url = {}
      var current4 = [];
      current4 = JSON.parse(window.localStorage.getItem("currentJson4"));
      var index = current4["children"].findIndex(
        item => item.source == "module 4.6");
      var moduleJson = current4["children"][index]
      if(moduleJson["children"].length !=0){
      var index1 = moduleJson["children"].findIndex(
      item => item.source == "module 4.6.1");
      if(moduleJson["children"][index1].url !="" && moduleJson["children"][index1].url !=null && moduleJson["children"][index1].url !=undefined){
      url['4.6.1'] = moduleJson["children"][index1].url;
      }
      }
      url['4.6.2'] = e['urls'];
      current4["children"][index].url = JSON.stringify(url);
      window.localStorage.setItem("currentJson4", JSON.stringify(current4));

      window.localStorage.setItem("currentJson4", JSON.stringify(current4));
      window.localStorage.setItem('mainFlagModule4', '7');
      window.localStorage.setItem('subFlagModule4', '1');
      window.localStorage.setItem('source', 'module 4.7.1');
      this.Module4Service.setLocalStorage4(7);
      var obj = { "type": "submodule", "route": true, "current": this.translate.instant('L2Module4.subMenu4-6'), "next": this.translate.instant('L2Module4Finish.subMenu4-7'), "nextRoute": "/modules/module4/Module4.7" }
      this.LocalstoragedetailsService.setModuleStatus(JSON.stringify(obj));
    }
  }

  apiCall(jsonBody, apiUrl, fun) {
    this.Module4Service.apiCall(jsonBody, apiUrl)
      .subscribe(
        data => {
          if (fun == 'start')
          {
            // this.LanguageService.googleEventTrack('SubmoduleStatus', 'Module 3.8', window.localStorage.getItem('username'), 10);
            this.passData['apiUrl'] = "modulefoursingleurl/";
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
            this.subFlagModule4 = this.subFlagModule4 + 1
            window.localStorage.setItem('subFlagModule4', this.subFlagModule4.toString())
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
